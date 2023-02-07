const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const HomeRouter = require('./HomeRouter')




const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/home', HomeRouter)
    
}

module.exports = routes