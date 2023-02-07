const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser) {
                resolve({
                    err: 1,
                    msg: 'Email đã được sử dụng'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
            })
            if (createdUser) {
                resolve({
                    err: 0,
                    msg: 'Đã thêm 1 admin !',
                    data: createdUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    err: 1,
                    message: 'Email này chưa đăng ký'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                resolve({
                    err: 1,
                    message: 'Sai mật khẩu'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                err: 0,
                msg: 'Đăng nhập thành công',
                user: checkUser.name,
                access_token,
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    err: 1,
                    msg: 'The user is not defined'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                err: 0,
                msg: 'Delete user success',
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                err: 0,
                msg: 'Success',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}



module.exports = {
    createUser,
    loginUser,
    deleteUser,
    getAllUser,

}