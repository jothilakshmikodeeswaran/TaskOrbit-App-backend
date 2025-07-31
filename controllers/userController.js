import User from "../models/User.js";
import { signToken } from "../utils/auth.js";


// POST /api/users/register - Create a new user
export const registerUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = signToken(newUser);
        res.status(201).json({ token, user: newUser });
    } catch (err) {
        if (err.code === 11000 && err.keyValue?.email) {
            return res.status(400).json({ message: 'Email Already Exists!' });
        }
        // if (err.code === 11000) {
        //   return res.status(400).json({ message: 'Duplicate value detected!' });
        // }

        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(e => e.message);
            console.log(messages[0]);
            return res.status(400).json({ errors: messages[0] });
        }
        res.status(400).json({ error: err.message } || 'Registration failed!');
    }

};

// POST /api/users/login - Authenticate a user and return a token
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(400).json({ error: "User not found" });
        }

        const isValid = await foundUser.isCorrectPassword(password);

        if (!isValid) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        const token = signToken(foundUser);
        res.status(200).json({ token, user: foundUser });
    } catch (err) {

        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(e => e.message);
            console.log(messages[0]);
            return res.status(400).json({ errors: messages[0] });
        }
        res.status(500).json({ error: err.message } || "Login failed !");
    }



    // const messages = Object.values(error.errors).map(e => e.message);
    //   return res.status(400).json({ errors: messages });
    //      const user = await User.findOne({ email: req.body.email });

    //   if (!user) {
    //     return res.status(400).json({ message: "Can't find this user" });
    //   }

    //   const correctPw = await user.isCorrectPassword(req.body.password);

    //   if (!correctPw) {
    //     return res.status(400).json({ message: "Wrong password!" });
    //   }

    //   const token = signToken(user);
    //   res.json({ token, user });
};