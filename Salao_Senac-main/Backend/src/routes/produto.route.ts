import { Router } from 'express';
import { ProdutoController } from '../controllers/produto.controller';

const router = Router();
const produtoController = new ProdutoController();

router.get('/produtos', produtoController.create);
router.get('/produtos', produtoController.findAll);
router.get('/produtos/:id', produtoController.findById);
router.put('/produtos/:id', produtoController.update);
router.delete('/produtos/:id', produtoController.delete);

export default router;
