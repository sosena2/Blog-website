import mongoose from "mongoose";

const StorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: function () {
                return this.status !== "draft";
            },
            trim: true,

        },
        slug: {
            type: String, 
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: function () {
                return this.status !== "draft";
            },
        },
        tags: {
            type: [String],
            required: true,
            default: [],
            },
        coverImage: {
            type: String,
            required: function () {
                return this.status !== "draft";
            },
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