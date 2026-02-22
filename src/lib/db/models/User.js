import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password:{
            type: String,
            required:true,
        },
        username: {
            type: String,
            trim: true,
            default: "",
        },
        bio: {
            type: String,
            trim: true,
            default: "",
        },
        profileImage: {
            type: String,
            default: "",
        },
        language: {
            type: String,
            default: "English",
        },
        timezone: {
            type: String,
            default: "UTC-05:00 Eastern Time",
        },
        notifications: {
            comments: { type: Boolean, default: true },
            likes: { type: Boolean, default: true },
            followers: { type: Boolean, default: true },
        },
        savedStories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Story",
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

if (!User.schema.path("savedStories")) {
    User.schema.add({
        savedStories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Story",
            },
        ],
    });
}

if (!User.schema.path("username")) {
    User.schema.add({
        username: { type: String, trim: true, default: "" },
        bio: { type: String, trim: true, default: "" },
        profileImage: { type: String, default: "" },
        language: { type: String, default: "English" },
        timezone: { type: String, default: "UTC-05:00 Eastern Time" },
        notifications: {
            comments: { type: Boolean, default: true },
            likes: { type: Boolean, default: true },
            followers: { type: Boolean, default: true },
        },
    });
}

export default User;