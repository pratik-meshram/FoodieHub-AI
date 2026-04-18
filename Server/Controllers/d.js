const user = require("../Model/user-model");
const bcrypt = require("bcrypt");


const register = async (req, res) => {
    try {
        const { username, email, pass } = req.body;
        if (!username || !email || !pass) {
            return res.status(400).json({ message: "all field required" });
        }
        const userE = await user.findOne({ email });

        if (userE) {
            return res.status(409).json({ message: "user alredy register" });
        }

        const hashedPassword = await bcrypt.hash(pass, 10);

        const NewUser = await user.create({
            username, email, pass: hashedPassword
        });

        // remove password from response
        const { pass: _, ...userData } = NewUser._doc;

        return res.status(201).json({
            message: "usre created",
            NewUserData: userData,
        })
    } catch (error) {
        return res.status(500).json({ message: "error" })

    }

}




const login = async (req, res) => {

    try {

        const { email, pass } = req.body;

        if (!email || !pass) {
            return res.status(400).json({ message: "required fields" });
        }

        const userE = await user.findOne({ email });

        if (!userE) {
            return res.status(404).json({ message: "user not found" });
        }

        // if (userE.pass !== pass) {
        //     return res.status(401).json({ message: "pass wrong" });
        // }

        const isMatch = await bcrypt.compare(pass, userE.pass)

        if (!isMatch) {
            return res.status(401).json({ message: "Wrong password" });
        }

        const { pass: _, ...userData } = userE._doc;


        return res.status(200).json({
            message: "login user",
            data: userData
        })

    } catch (error) {
        return res.status(500).json({ message: "error" })
    }

}