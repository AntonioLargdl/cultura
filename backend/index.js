import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './mongodb/connect.js';
import cookieParser from 'cookie-parser';
// Rutas
import codigoRouter from './routes/codigo.route.js';
import socioRouter from './routes/socio.route.js';
import usuarioRouter from './routes/usuario.route.js';
import tagRouter from './routes/tag.route.js';
import petRouter from './routes/pet.route.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:'20mb'}));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(cookieParser({ sameSite: 'none', secure: true }));

app.get('/', (req, res) => {
    res.send({ message : 'Hello World!' })
})
// Rutas
app.use('/api/v1/codigos', codigoRouter)
app.use('/api/v1/socios', socioRouter)
app.use('/api/v1/usuarios', usuarioRouter)
app.use('/api/v1/tag', tagRouter)
app.use('/api/v1/pet', petRouter)

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, () => console.log('Server started at http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }
}

startServer ();