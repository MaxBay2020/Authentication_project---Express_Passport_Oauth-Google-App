import express from 'express'

import passport from 'passport'

const router = express.Router()


// auth login
router.get('/login', (req,res) => {
    res.render('login', {user:req.user})
})

// auth with google
// 使用passport.authenticate()方法作为中间健
// 第一个参数：使用的strategy的名字
// 第二个参数：参数，在里面我们可以指定，要从google账户中获取什么信息回来
// 使用了passport的路由，就不需要写回调函数了
router.get('/google', passport.authenticate('google', {
    scope: ['profile'], // 从google账户中获取信息的范围；将想要获取的google账户的信息放在一个数组中
}))

// auth logout
// log out的原理就是：因为我们的userID存到了cookie中，我们只需要销毁即可
router.get('/logout', (req,res)=>{
    // 使用passport来处理登出的业务
    // 因为我们使用了passport来进行authentication，因此可以使用req.logout()方法来log out用户
    req.logout()
    res.redirect('/')
})

// 这是成功使用google登录后，跳转到的路由
// 使用中间键：passport.authenticate('google')，它会自动获取code值，然后和google交互，然后获得用户信息
router.get('/google/redirect', passport.authenticate('google'), (req,res) => [

    res.redirect('/profile')
    // res.send(req.user)
])


export default router
