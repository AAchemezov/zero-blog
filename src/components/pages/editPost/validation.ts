import * as Yup from 'yup';

const SendPostSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, 'Не меньше 10 символов')
    .max(300, 'Не больше 300 символов')
    .required('Обязательное поле'),
  body: Yup.string()
    .min(10, 'Не меньше 10 символов')
    .max(300, 'Не больше 300 символов')
    .required('Обязательное поле'),
});

export default SendPostSchema;
