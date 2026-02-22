import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,

        },
        slug: {
            type: String, 
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            required: true,
            default: [],
            },
        coverImage: {
            type: String,
            required: true,
            },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }, 
        status: {
            type: String,
            enum: ["draft","published"],
            default: "draft",
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },

    {timestamps: true},
);

export default mongoose.models.Story || mongoose.model("Story", StorySchema);