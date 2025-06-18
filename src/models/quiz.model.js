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
        validate: {
            validator: function(value) {
                return this.options.includes(value);
            },message: 'Correct answer must be one of the provided options'
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
const sectionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return this.questions.every(q => q.subject === value);
            },
            message: 'All questions in a section must belong to the same subject'
        }
    },
    questions: {
        type: [questionSchema],
        required: true,
        validate: [questions => questions.length > 0, 'At least one question is required']
    }
});
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
    sections: {
        type: [sectionSchema],
        required: true,
        validate: [sections => sections.length > 0, 'At least one subject section is required']
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