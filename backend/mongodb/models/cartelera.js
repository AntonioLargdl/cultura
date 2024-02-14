import mongoose from "mongoose";

const CarteleraSchema = new mongoose.Schema({
    name: {type: String, required:true, unique: false },
    date: {type: String, required:true, unique: false },
    begin: {type: String, required:false, unique: false},
    end: {type: String, required:false, unique: false},
    location: {type: String, required:true},
    image: {type: String, required:true},
});

const carteleraModel = mongoose.model('Cartelera', CarteleraSchema);

export default carteleraModel;