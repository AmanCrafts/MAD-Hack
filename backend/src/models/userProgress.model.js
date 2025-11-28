import mongoose from 'mongoose';

const userProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    status: {
        type: String,
        enum: ['not_started', 'in_progress', 'completed'],
        default: 'not_started'
    },
    quizScore: {
        type: Number,
        default: 0
    },
    isBookmarked: {
        type: Boolean,
        default: false
    },
    lastAccessed: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

userProgressSchema.index({ userId: 1, topicId: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

export default UserProgress;
