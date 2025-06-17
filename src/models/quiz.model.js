import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: [String],
        required: true,
        validate: [options => options.length >= 2, 'At least two options are required']
    },
    correctAnswer: {
        type: String,
        required: true,
        validate: function(value) {
            return this.options.includes(value);
        }
    }, 
    subject: {
        type: String,
        required: true,
        trim: true
    },
    negativeMarking: {
        type: Number,
        default: 0
    }
})

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    questions: {
        type: [questionSchema],
        required: true,
        validate: [questions => questions.length > 0, 'At least one question is required']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;