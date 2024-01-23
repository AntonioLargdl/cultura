import mongoose from "mongoose";

const CodigoSchema = new mongoose.Schema({
    no: { type: Number, required: true },
    codigo: { type: String, required: true, unique: true },
    status: { type: Boolean, default:false, required:true},
    email: { type: String },
})

const codigoModel = mongoose.model('Codigo', CodigoSchema)

export default codigoModel;