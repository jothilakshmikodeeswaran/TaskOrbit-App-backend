import mongoose, { Schema } from "mongoose";


const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status:{
        type: String,
        enum: ['To-Do', 'In Progress', 'Completed'],
        default: 'To Do',
    },
    progress:{
        type: Number,
    },
    deadline:{
        type: Date,
    },

});

const Project = mongoose.model("Project", projectSchema);
export default Project;