import mongoose from "mongoose";
const monDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODDB_URI || 'mongodb://127.0.0.1:27017/socialCircleDB');
        console.log('monDb Connected');
        return mongoose.connection;
    }
    catch (error) {
        console.error('monDb error:', error);
        throw new Error('monDb connectiono failed.');
    }
};
export default monDb;
