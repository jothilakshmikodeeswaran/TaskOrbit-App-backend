import mongoose, { Schema } from "mongoose";


const employeeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Manager', 'vice-president','PrincipleDeveloper','SeniorDeveloper',
            'JuniorDeveloper','QAEngineer','UI/UX-Desinger','Support','HR','BusinessAnalyst'
        ],
    },
    sex: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    profilepic: {
        type: String,
    },
    joinedAt: {
        type: Date,
    },
    bio: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;