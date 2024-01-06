import { Router } from 'express';
import UsuarioController from './controllers/Usuario.controller';
import { LoginController } from './controllers/Login.controller';
import { verifyAuth } from './middlewares/verifyAuth';

const usuarioController = new UsuarioController();
const loginController = new LoginController();

const router = Router();

router.get('/usuarios', usuarioController.listaUsuarios);
router.post('/usuario', usuarioController.criaUsuario);
router.get('/usuario/:id', verifyAuth, usuarioController.listaUsuarioPorId);
router.delete('/usuario/:id', usuarioController.deletaUsuarioPorId);

router.post('/login', loginController.login);

export default router;