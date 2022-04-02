import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {type: String},
    googleID: {type: String}, // 因为用户可以使用google进行登录，因此user集合中应该包含googleID这个字段；
    thumbnail: {type:String},
})

const User = mongoose.model('User', userSchema)

export default User
