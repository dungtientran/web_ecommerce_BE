const Home = require("../models/Home")


const getHome = () => {

    return new Promise(async (resolve, reject) => {
        try {
            const home = await Home.find()
            resolve({
                err: 0,
                msg: 'Success',
                data: home
            })
        } catch (e) {
            reject(e)
        }
    })

}
const createHome = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            const home = await Home.create(
                {
                    banner: data.banner,
                    collectionName: data.collection,
                    category: data.category,
                    hslider1: data.hslider1,
                    hslider2: data.hslider2,
                    hslider3: data.hslider3,
                    hslider4: data.hslider4,
                    hslider5: data.hslider5,
                },
            )
            resolve({
                status: 'OK',
                message: 'Success',
                data: home
            })
        } catch (e) {
            reject(e)
        }
    })

}



module.exports = {
    getHome,
    createHome
}