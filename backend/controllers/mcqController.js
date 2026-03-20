const { Mcq } = require("../models/Mcqs")

const getAllMcqByid = async (req, res) => {
    const { id } = req.params
    const result = await Mcq.findAll({ attributes: ["ques", "op1", "op2", "op3", "op4", "correctOp"], where: { testIntroId: id } })
    res.json(result)
}

const addMcq = async (req, res) => {
    const { introId } = req.params
    const { question, choice1, choice2, choice3, choice4, correctAns } = req.body
    const result = await Mcq.create({ ques: question, op1: choice1, op2: choice2, op3: choice3, op4: choice4, correctOp: correctAns, testIntroId: introId })
    res.json({ message: 'added successfully' })
}

const deleteMcq = async (req, res) => {
    const { id } = req.params
    const result = await Mcq.findByPk(id)
    if (!result) return res.json({ message: "Intro not found" })
    await result.destroy()
    res.json({ message: "successfully deleted" })
}

module.exports = { getAllMcqByid, addMcq, deleteMcq }
