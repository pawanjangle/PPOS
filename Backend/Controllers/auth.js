const User = require("../Models/user");
const bcrypt = require('bcrypt');
const { SignJWT } = require('jose');

exports.signup = async (req, res) => {
    const { firstName, lastName, email, password, contactNo } = req.body;
    try {
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(401).json({ message: "User already exist" })
        }
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds)
        const newUser = new User({
            firstName, lastName, email, password: hashedPassword, contactNo
        })
        try {
            const user = await newUser.save();
            if (user) {
                return res.status(200).json({ message: "Signup Successful" })
            }
        }
        catch (err) {
            console.log(err)
            return res.status(400).json({ message: "Something went wrong" })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: "Something went wrong" })
    }

}
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (user) {
            const authorizedUser = bcrypt.compareSync(password, user.password)
            if (authorizedUser) {
                const secretKey = new TextEncoder().encode(process.env.jwtSecret); // Replace with your actual secret key
                const alg = 'HS256'
                const token = await new SignJWT({ _id : user._id }).setProtectedHeader({ alg }).sign(secretKey);
                return res.status(200).json({ token, user })
            }
            else {
                return res.status(401).json({ message: "Wrong Email or Password" })
            }
        }
        else {
            return res.status(401).json({ message: "Wrong Email or Password" })
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ message: "Something went wrong" })
    }
}