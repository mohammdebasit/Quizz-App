const { result } = require("../models/result")
const { testIntro } = require("../models/testIntro")
const { user } = require("../models/user")

const addResult = async (req, res) => {
    try {
        const { testIntroId } = req.params
        const { correctAsn, totalQues, percentage } = req.body

        await result.create({ testIntroId, correctAsn, totalQues, percentage, userId: req.user.id })
        res.json({ message: "added Successfully" })

    } catch (error) {
        res.json({ message: error.message })
    }
}


const getResult = async (req, res) => {
    try {
        // console.log( req.user.id );
        if (req.user.role == "admin") {
            const results = await result.findAll({ include: [{ model: testIntro, attributes: ["title"] }, { model: user, attributes: ["name"] }] })
            res.json(results)
        } else {
            const results = await result.findAll({ where: { userId: req.user.id }, include: { model: testIntro, attributes: ["title"] } })
            res.json(results)
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = { addResult, getResult }