import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './mongodb/connect.js';
import cookieParser from 'cookie-parser';
// Rutas
import usuarioRouter from './routes/usuario.route.js';
import locacionesRouter from './routes/locaciones.route.js';
import directorioRouter from './routes/directorios.route.js';
import carteleraRouter from './routes/cartelera.route.js';
import portafoliosRouter from './routes/portafolio.route.js';
import categoriasRouter from './routes/categorias.route.js';
import blogRouter from './routes/blog.route.js';

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
app.use('/api/v1/usuarios', usuarioRouter)
app.use('/api/v1/locaciones', locacionesRouter)
app.use('/api/v1/directorios', directorioRouter)
app.use('/api/v1/carteleras', carteleraRouter)
app.use('/api/v1/portafolios', portafoliosRouter)
app.use('/api/v1/categorias', categoriasRouter)
app.use('/api/v1/blog', blogRouter)

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, () => console.log('Server started at http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }
}

startServer ();