import { Schema, Types } from 'mongoose';
const reactionSchema = new Schema({
    reactionId: { type: Types.ObjectId, default: new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), get: (date) => {
            if (date)
                return date.toISOString().split("T")[0];
        }
    },
});
export default reactionSchema;
