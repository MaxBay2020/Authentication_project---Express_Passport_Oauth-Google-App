// 这个文件因为包含了密钥，因此要添加到.gitignore文件中

export default {
    google: {
        clientID: '1063158178901-gc0bil6kri97knd1lh0jpg9hip6v9rta.apps.googleusercontent.com',
        clientSecret: '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'
    },
    mongodb: {
        dbURI: 'mongodb+srv://wangxiaobei:13ULovEi14962464@cluster0.xpnhi.mongodb.net/GoogleOAuthProject?retryWrites=true&w=majority'
    },
    session: {
        cookieKey: 'googleoauthproject'
    }
}
