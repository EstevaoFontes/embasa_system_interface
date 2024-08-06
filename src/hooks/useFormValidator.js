import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

export const useFormValidator = () => {

    const schema = yup.object().shape({

        informadoPor:
            yup.string()
                .required('O nome de quem informou é obrigatório.'),
        motivo:
            yup.string()
                .required('Selecione uma opção.'),
        extravasando:
            yup.string()
                .required('Selecione uma opção.'),
    })

    return{
        schema,
        yupResolver
    }
}