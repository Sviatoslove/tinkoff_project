
export const validatorConfig = {
  name: {
    isRequired: {
      message: 'Обязательно для заполнения',
    },
    min: {
      message: 'Длина поля "Название счёта" не менее 2 символов',
      length:'2'
    },
  },
  icon: {
    isRequired: {
      message: 'Чтобы продолжить выберите иконку',
    },
  },
  balance: {
    isRequired: {
      message: 'Обязательно для заполнения',
    },
    minBalance: {
      message: 'Недопустимое значение суммы операции, она должна быть больше 0',
      value:'1'
    },
    isContainDigit: {
      message: 'Недопустимое значение суммы операции, введите число, пожалуйста',
    },
  },
  category: {
    isRequired: {
      message: 'Обязательно для заполнения',
    },
    min: {
      message: 'Длина поля "Категории" не менее 2 символов',
      length:'2'
    },
  },
}