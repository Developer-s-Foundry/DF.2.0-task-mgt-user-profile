import { UserService } from '../services/user_services';
import { Router } from 'express';

const userService = new UserService();
const router = Router();

router.get('/users/:id', (req, res) => userService.getUserProfile(req, res));

export default router;
