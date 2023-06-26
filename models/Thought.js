const {Schema, model, Types} = require('mongoose');
// import moment for date formatting
const moment = require('moment');

// adding the ReactionSchema as a subdocument to the ThoughtSchema
const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent thought _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        // use moment to format the date
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)

// create the ThoughtSchema
const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        // use moment to format the date
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true,
        },
        // use ReactionSchema to validate data for a reaction
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
)
// get total count of reactions 
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;