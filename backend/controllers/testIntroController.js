const { testIntro } = require("../models/testIntro")

const getAllIntro = async (req, res) => {
    let result;
    if (req.user.role == "admin") {
        result = await testIntro.findAll({ attributes: ["id", "title", "descrip", "time", "isActive"] })
    } else {
        result = await testIntro.findAll({ attributes: ["id", "title", "descrip", "time",] })
    }

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

const isActive = async (req, res) => {
    const { id } = req.params
    const result = await testIntro.findByPk(id)

    result.isActive = req.body.value
    await result.save()

    res.json({ message: "Successfully deactivated the test" })
}

module.exports = { getAllIntro, addIntro, deleteIntro, isActive }
