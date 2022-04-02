// 引包
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import keys from './keys.js'

import User from '../models/User.js'

// 这个方法会将已经登录的用户序列化，之后存在cookie中
// 这个方法会在passport的回调函数执行完后，自动执行
passport.serializeUser((user, done) => {
    // 我们需要将登录用户身上的某个能找到该用户的属性序列化；比如user的id（来自于mongoDB）
    // 序列化之后的userID会发送到浏览器，并存在cookie中
    done(null, user.id)
})

// 这个方法会在浏览器做请求的时候，将cookie中存储的数据发过来，之后再进行反序列化
// 反序列化之后的数据，我们再拿来去mongoDB数据库中查询，是否有这个用户
passport.deserializeUser(async (userID, done) => {
    const user = await User.findById(userID)
    if(user) done(null, user) // 之后会将user存到req对象中了
})

// 第一个参数：使用什么strategy
// 第二个参数：回调函数；这个回调函数在passport使用code参数和google交互获得真实的用户信息后触发
passport.use(new GoogleStrategy({
    // strategy的选项
    // clientID和clientSecret来自于console.develop.google申请的本项目的api密钥
    // 这就告诉google，我这个项目要进行google oauth了
    // 我们将clientID和clientSecret的值存在了keys.js文件中，我们不会将keys.js文件上传，以免别人知道了我们的密钥
    // clientID: '1063158178901-gc0bil6kri97knd1lh0jpg9hip6v9rta.apps.googleusercontent.com',
    // clientSecret: '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'
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect', // 设置如果用户同意使用google登录后，我们的路由跳转到哪里；注意！这里不需要写localhost:3000
}, async (accessToken, refreshToken, profile, done)=>{
    // passport的回调函数，这个回调函数在passport使用code参数和google交互获得真实的用户信息后触发；
    // accessToken：可以使用这个参数获得gmail中的邮件
    // refreshToken：用来重新获得accessToken
    // profile：这个就是我们用passport从google获取的用户信息了
    // done：在这个回调函数执行完后会调用done函数
    console.log('passport callback fired')
    console.log(profile.id, profile.displayName)

    // 先根据googleID查询用户，如果用户存在，则读取数据；如果不存在再创建用户
    const user = await User.findOne({googleID: profile.id})
    if(user){
        console.log('user existed!: '+user)
        // 调用done之后，会执行passport.serializeUser()方法
        done(null, user)
    }
    else{
        const newUser = new User({
            username: profile.displayName,
            googleID: profile.id,
            thumbnail: profile._json.image.url,
        })
        await newUser.save()
        console.log('new user created: '+newUser)
        // 调用done之后，会执行passport.serializeUser()方法
        done(null, newUser)
    }

}))

export default passport
