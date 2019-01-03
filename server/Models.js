import mongoose from 'mongoose';

const todo = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
})

export default mongoose.model('Todo', todo);
