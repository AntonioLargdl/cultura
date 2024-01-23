import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
    lote: {type: String, required:true},
    tag: {type: String, required:true, unique: true},
    usuario: [{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}],
    pet: [{type: mongoose.Schema.Types.ObjectId, ref: 'Pet'}],
});

const tagModel = mongoose.model('Tag', TagSchema);

export default tagModel;