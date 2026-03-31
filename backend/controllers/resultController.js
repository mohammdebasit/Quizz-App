const { result } = require("../models/result")
const { testIntro } = require("../models/testIntro")
const { user } = require("../models/user")

const addResult = async (req, res) => {
    try {
        const { testIntroId } = req.params
        const { correctAsn, totalQues, percentage } = req.body

        const existing = await result.findOne({ where: { testIntroId: testIntroId, userId: req.user.id } })
        if (existing) return res.json({ message: "already added" })

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
            const results = await result.findAll({ include: [{ model: testIntro, attributes: ["title"] }, { model: user, attributes: ["name"] }], attributes: ["correctAsn", "totalQues", "percentage"] })
            res.json(results)
        } else {
            const results = await result.findAll({ where: { userId: req.user.id }, include: { model: testIntro, attributes: ["title"] }, attributes: ["correctAsn", "totalQues", "percentage"] })
            res.json(results)
        }
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getResultById = async (req, res) => {
    const { testIntroId } = req.params
    const UserId = req.user.id
    const response = await result.findOne({ where: { userId: UserId, testIntroId: testIntroId } })
    if (response) {
        return res.json({ attempted: true })
    } else {
        return res.json({ attempted: false })
    }
}


module.exports = { addResult, getResult, getResultById }