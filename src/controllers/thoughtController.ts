import { Request, Response } from 'express';
import Thought from '../models/Thought.js';
import User from '../models/User.js';

export const getThoughts = async (_req: Request, res: Response) => {        
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ error: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!thought) {
      res.status(404).json({ error: 'Thought not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ error: 'Thought not found' });
      return;
    }
    await User.findByIdAndUpdate(
      thought.thoughtId,
      { $pull: {thoughts: req.params.thoughtId}},
      { new: true }
    );
    res.json({ message: 'Thought eliminated' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const addReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true }
        );
        res.json(reaction);
    } catch (err) {
        res.status(500).json(err);
    }
}   

export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const reaction = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        res.json(reaction);
    } catch (err) {
        res.status(500).json(err);
    }
}



