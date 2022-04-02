import express from 'express'
const router = express.Router()

// 创建一个中间键，用来判断用户是否登录了
const authCheck = (req,res,next)=>{
    if(req.user){
        // 如果用户已经登录了，req中肯定会存在user；则使用next()函数，执行下一个中间键
        next()
    }else{
        // 如果用户没登录，则重定向到登录页面
        res.redirect('/auth/login')
    }
}

// 将这个中间键放到下面的位置，如果authCheck中执行了next函数，则继续向下执行，否则不向下执行
router.get('/', authCheck, (req,res)=>{
    res.render('profile',{user:req.user})
})

export default router
