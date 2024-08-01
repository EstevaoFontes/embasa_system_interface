import dayjs from 'dayjs';

export const calcula_hora_hoje = (data_inicial) => {

    const data_inicio = dayjs(new Date(data_inicial), 'DD/MM/YYYY, HH:mm')
    const data_fim = dayjs(new Date(), 'DD/MM/YYYY, HH:mm')

    const horas_calculadas = data_fim.diff(data_inicio, 'hour')

    return horas_calculadas
}

export const calcula_hora_com_data_final_string = (data_inicial, data_final) => {
    // Separar a data e a hora
    const [datePart, timePart] = data_final.split(' - ');

    // Separar os componentes da data
    const [day, month, year] = datePart.split('/').map(Number);

    // Separar os componentes da hora
    const [hours, minutes] = timePart.split(':').map(Number);

    // Criar o objeto Date
    const data_final_formatada = new Date(year, month - 1, day, hours, minutes);

    const data_inicio = dayjs(new Date(data_inicial), 'DD/MM/YYYY, HH:mm')
    const data_fim = dayjs(data_final_formatada, 'DD/MM/YYYY, HH:mm')

    const hora_calculada = data_fim.diff(data_inicio, 'hour')

    return hora_calculada
}

export const calcula_hora_com_data_final_dataJS = (data_inicial, data_final) => {

    const data_inicio = dayjs(new Date(data_inicial), 'DD/MM/YYYY, HH:mm')
    const data_fim = dayjs(new Date(data_final), 'DD/MM/YYYY, HH:mm')

    const hora_calculada = data_fim.diff(data_inicio, 'hour')

    return hora_calculada
}