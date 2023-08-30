const newsletter = require("../models/newsletter");

const newsCtrl = async (req, res) => {
    const email = req.body
    const saved = await new newsletter(email)
    // console.log(saved)
    saved.save()
    .then(data => {data.json({
        message: "Thank you for Subscribing to our Newsletters"
    })})
    .catch(err => console.log(err))
}

module.exports = newsCtrl;