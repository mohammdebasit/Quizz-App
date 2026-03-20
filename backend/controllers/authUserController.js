const { user } = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const Register = async (req, res) => {
    const { name, email, password, role } = req.body

    try {
        const existingUser = await user.findOne({ where: { email } })
        if (existingUser) return res.json({ message: "Account already exist with these email" })

        const hashPassword = await bcrypt.hash(password, 10)
        await user.create({ name, email, password: hashPassword, role })
        res.json({ message: "Successfully Created an Account" })

    } catch (error) {
        res.json({ message: "Server is down" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        //checking, is user exist
        const existingUser = await user.findOne({ where: { email } })
        if (!existingUser) return res.json({ message: " email not found" })
        //is the password correct?
        const ckeckPass = await bcrypt.compare(password, existingUser.password)
        if (!ckeckPass) return res.json({ message: "Credential not match" })

        const token = jwt.sign({ id: existingUser.id, name: existingUser.name, email, role: existingUser.role }, process.env.SECREAT_KEY)
        res.json({ token, role: existingUser.role })

    } catch (error) {
        res.json({ message: "Server is down" })
    }


}

module.exports = { Register, login }