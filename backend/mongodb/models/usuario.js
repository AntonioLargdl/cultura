import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    email: {type: String, required:true, unique: true},
    username: {type: String, required:true, unique: true},
    image: {type: String, required:true},
    password: {type: String, required:true},
    rol: {type: String, required:true},
});

const usuarioModel = mongoose.model('Usuario', UsuarioSchema);

export default usuarioModel;