import User from "../models/User.js";
import { signToken } from "../utils/auth.js";


// POST /api/users/register - Create a new user
export const registerUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = signToken(newUser);
        res.status(201).json({ token, user: newUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
//      try {
//     const user = await User.create(req.body);
//     const token = signToken(user);
//     res.status(201).json({ token, user });
//   } catch (err) {
//     res.status(400).json(err);
//   }
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
        res.status(500).json({ error: err.message });
    }


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