import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { io, getRecieverSocketId } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) =>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password"); 

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller ", error.message);
        res.status(500).json({message: "Internal server error"})
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, recieverId: userToChatId},
                {senderId: userToChatId, recieverId: myId}
            ],
        });

        res.status(200).json(messages);

    } catch (error) {
        console.log("Error in getMessages controller ", error.message);
        res.status(500).json({message: "Internal server error"})
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { id: recieverId } = req.params;
        const { text, image } = req.body;
        const senderId = req.user._id;

        let imageUrl;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        const recieverSocketId = getRecieverSocketId(recieverId);
        const senderSocketId = getRecieverSocketId(senderId); // Get sender's socket ID

        // Emit to receiver if they are online
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        // Emit to sender
        // if (senderSocketId) {
        //     io.to(senderSocketId).emit("newMessage", newMessage);
        // }

        res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
