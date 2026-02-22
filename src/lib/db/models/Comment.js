import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        storyId : {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Story",
            required: true,
        },
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {timestamp: true}
);

export default mongoose.models.comment || mongoose.model("Comment", CommentSchema);