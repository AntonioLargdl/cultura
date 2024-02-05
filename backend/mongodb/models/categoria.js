import mongoose from "mongoose";

const NameCategory = new mongoose.Schema({
    es: {type: String, required:true},
    en: {type: String, required:true},
    fr: {type: String, required:true},
})

const CategoriaSchema = new mongoose.Schema({ 
    name: {type: NameCategory, required:true, unique: true},
    slug: {type: String, required:true},
    type: {type: String, required:true},
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}],
})

const categoriasModel = mongoose.model('Categorias', CategoriaSchema);

export default categoriasModel;