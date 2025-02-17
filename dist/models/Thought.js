import { Schema, model } from 'mongoose';
import reactionSchema from './Reaction.js';
// interface IThought extends Document {
//     thoughtText: string;
//     createdAt: Date;
//     username: string;
//     reactions?: typeof reactionSchema[];
//     reactionCount: number;
//     thoughtId: Object;
// }
const thoughtSchema = new Schema({
    thoughtId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },
    createdAt: { type: Date, default: Date.now(),
        get: (date) => {
            if (date)
                return date.toISOString().split("T")[0];
        }
    },
    username: { type: String, required: true },
    reactions: [reactionSchema]
    // {
    //     reactionId: { type: ObjectId, default: () => new Types.ObjectId() },
    //     reactionBody: { type: String, required: true, maxlength: 280 },
    //     username: { type: String, required: true },
    //     createdAt: { type: Date, default: Date.now }
    // }
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions ? this.reactions.length : 0;
});
const Thought = model('Thought', thoughtSchema);
export default Thought;
