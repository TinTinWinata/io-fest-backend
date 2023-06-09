import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import {
  bodyEmailValidation,
  bodyEmptyValidation,
  bodyLengthValidation,
  cookieEmptyValidation,
  errorValidator,
} from '../middlewares/validator.middleware';

const router = Router();

router.post(
  '/login',
  bodyEmptyValidation(['email', 'password']),
  bodyEmailValidation(['email']),
  errorValidator,
  authController.login
);
router.post(
  '/register',
  bodyEmptyValidation(['email', 'name', 'username', 'password']),
  bodyEmailValidation(['email']),
  bodyLengthValidation(['password'], [8], [16]),
  errorValidator,
  authController.register
);
router.delete(
  '/logout',
  cookieEmptyValidation(['refreshToken']),
  errorValidator,
  authController.logout
);
router.get(
  '/token',
  cookieEmptyValidation(['refreshToken']),
  errorValidator,
  authController.refreshToken
);
router.post(
  '/login-google-token',
  bodyEmptyValidation(['token']),
  errorValidator,
  authController.loginGoogleToken
);

export default router;
