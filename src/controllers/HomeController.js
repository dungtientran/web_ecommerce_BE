const HomeService = require('../services/HomeService')


const getHome = async (req, res) => {
    try {
        const response = await HomeService.getHome()
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(404).json({
            message: e
        })
    }
}

const createHome = async (req, res) => {
    try {
        const response = await HomeService.createHome(req.body)
        return res.status(200).json(response)
        
    } catch (error) {
        return res.status(404).json({
            msg: error
        })
    }
}

module.exports = {
    getHome,
    createHome
}