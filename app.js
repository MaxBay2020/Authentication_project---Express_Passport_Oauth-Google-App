import express from 'express'
import authRoutes from './routes/auth-routes.js'
import profileRoutes from './routes/profile-routes.js'

import mongoose from 'mongoose'
import keys from './config/keys.js'

import cookieSession from 'cookie-session'
import passport from 'passport'



mongoose.connect(keys.mongodb.dbURI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    ()=>console.log('connected to MongoDB')
)

// 必须在app.js文件中引入passport的配置文件！不然passport.setup.js文件不会被执行
import passportSetup from './config/passport-setup.js'

const app = express()
app.set('view engine', 'ejs')

// 设置cookie session
app.use(cookieSession({
    maxAge: 24*60*60*1000, // cookie中的数据能存1天
    keys: [keys.session.cookieKey] // 里面可以写多个健，cookie会用里面任意一个健来将加密后的userId存储起来；每个健都是一个字符串；这个信息需要保密，因此需要存在keys.js文件中
}))

// 初始化passport
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req,res) => {
  // res.render('home', {user:req.user})
})

app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)


app.listen(3000, ()=>{
  console.log(`App is running at port 3000!`)
})
