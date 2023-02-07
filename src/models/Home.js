const mongoose = require('mongoose')
const homeSchema = new mongoose.Schema(
    {
        banner: { type: Array },
        collectionName: {type: Array},
        category: {type: Array},
        hslider1: { type: Object },
        hslider2: {type: Object},
        hslider3: {type: Object},
        hslider4: { type: Array },
        hslider5: { type: Array },
    },
    {
        timestamps: true
    }
);
const Home = mongoose.model("Home", homeSchema);
module.exports = Home;