import { body } from 'express-validator';
import User from '../../model/signup';

export const registerUserValidation = [
	body('firstName').isString(),
	body('email')
		.isEmail()
		.custom(async (value) => {
			const findUser = await User.findOne({ email: value });

			if (findUser) {
				throw new Error('Email is already taken');
			}
		}),
	body('lastName').isString(),
	body('address').isString(),
	body('password').isString().isStrongPassword(),
	body('confirmPassword').custom(async (value, { req }) => {
		if (value !== req.body.password) {
			throw 'Please match the password';
		}
	}),
];
