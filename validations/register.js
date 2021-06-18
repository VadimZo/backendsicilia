import { body } from 'express-validator';

export const registerValidations = [
  body('phone', 'Введите номер телефона')
    .isLength({
      min: 11,
      max: 20,
    })
    .withMessage('Допустимое кол-во символов в номере телефона 11.'),
  body('password', 'Укажите пароль')
    .isString()
    .isLength({
      min: 6,
    })
    .withMessage('​Минимальная длина пароля 6 символов')
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error('Пароли не совпадают');
      } else {
        return value;
      }
    }),
];
