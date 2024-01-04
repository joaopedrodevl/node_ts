import { Router } from 'express';
import UsuarioController from './controllers/Usuario.controller';

const usuarioController = new UsuarioController();

const router = Router();

router.get('/usuarios', usuarioController.listaUsuarios);

router.post('/usuario', usuarioController.criaUsuario);

router.get('/usuario/:id', usuarioController.listaUsuarioPorId);

router.delete('/usuario/:id', usuarioController.deletaUsuarioPorId);

export default router;