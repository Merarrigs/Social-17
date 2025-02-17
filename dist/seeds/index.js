import mongoose from "mongoose";
import monDb from '../config/connection.js';
import User from "../models/User.js";
import Thought from "../models/Thought.js";
const dataSeed = async () => {
    await monDb();
    console.log('mondb Online');
    await User.deleteMany({});
    await Thought.deleteMany({});
    const ListOfUsers = [
        {
            username: 'Koi-fetch',
            email: 'fetchk01@qwery.com'
        },
        {
            username: 'RageMaster',
            email: 'masterR@rooty.com'
        },
        {
            username: 'Bubbletip',
            email: 'bubbles090@chicky.com'
        }
    ];
    const listUsers = await User.insertMany(ListOfUsers);
    const brainIdea = [
        {
            thoughtText: 'Love the look!',
            username: listUsers[0].username,
            thoughtId: listUsers[0]._id
        },
        {
            thoughtText: 'Hate the look!',
            username: listUsers[1].username,
            thoughtId: listUsers[1]._id
        },
        {
            thoughtText: 'Neutral about it',
            username: listUsers[2].username,
            thoughtId: listUsers[2]._id
        }
    ];
    await Thought.insertMany(brainIdea);
    console.log('Idea inserted');
    mongoose.connection.close();
    console.log('Connection closed');
};
dataSeed().catch((err) => {
    console.error(err);
    mongoose.connection.close();
});
