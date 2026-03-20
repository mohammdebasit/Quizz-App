const { testIntro } = require("../models/testIntro")

const getAllIntro = async (req, res) => {
    const result = await testIntro.findAll({ attributes: ["id","title", "descrip", "time"] })
    res.json(result)
}

const addIntro = async (req, res) => {
    const { Description, time, title } = req.body
    const result = await testIntro.create({ title: title, descrip: Description, time: time })
    res.json({ message: 'added successfully' })
}

const deleteIntro = async (req, res) => {
    const { id } = req.params
    const result = await testIntro.findByPk(id)
    if (!result) return res.json({ message: "Intro not found" })
    await result.destroy()
    res.json({ message: "successfully deleted" })
}

module.exports = { getAllIntro, addIntro, deleteIntro }



















// Description
// :
// "qwerty"
// time
// :
// "1234"
// title
// :
// "qwerty"