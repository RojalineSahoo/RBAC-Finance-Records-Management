import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, 'Please add an amount'],
    },

    type: {
        type: String,
        required: true,
        enum: ['income', 'expense'],
    },

    category: {
        type: String,
        required: [true, "Please specify the category"]
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model('Record', recordSchema);