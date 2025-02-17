import User from '../models/User.js';
export const getUsers = async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getSoloUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts');
        if (!user) {
            res.status(404).json({ message: 'User does not exist' });
        }
        else {
            res.json(user);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true, runValidators: true });
        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'something went wrong' });
    }
};
export const deleteUser = async (req, res) => {
    const { pickUser } = req.params;
    try {
        const result = await User.findByIdAndDelete({ _id: pickUser });
        res.status(200).json(result);
        console.log(`user: ${result} deleted`);
    }
    catch (err) {
        console.log('error');
        res.status(500).json(err);
    }
};
export const addFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true }).populate('friends');
        if (!user) {
            res.status(404).json({ message: 'ID doest not exist' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'something went wrong' });
    }
};
export const removeFriend = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true }).populate('friends');
        if (!user) {
            res.status(404).json({ message: 'ID does not exist' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: 'something went wrong' });
    }
};
