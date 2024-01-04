import express, {Response} from 'express';
import router from './routes';

const app = express();
const porta = 3000;

app.use(express.json()); // Ativa o uso de JSON no Express
app.use(express.urlencoded({ extended: true })); // Ativa o uso de query strings no Express
app.use(router); // Ativa o uso das rotas criadas no Express

app.get('/', (req, res): Response => {
    return res.status(200).json({ message: 'DioBank API v1' });
});

app.listen(porta, (): void => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});