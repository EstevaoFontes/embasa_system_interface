import styles from './PdfCall.module.css';
import embasaLogo from '../../../assets/embasaLogo.png';
import { calcula_hora_com_data_final_string } from '../../../utils/calculateHour'
import { exportToExcel } from '../../../utils/exportExcel';

// HOOKS
import { useApi } from '../../../hooks/useApi';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

// COMPONENTS
import Loading from '../../../components/Geral/Loading/Loading';
import BackButton from '../../../components/Geral/BackButton/BackButton'
import ItemsTable from './ItemsTable';
import PdfRender from './PdfRender'


function tempoExtravasamento_calculo_formatacao(data_inicial, data_final) {
        const hora_calculo = calcula_hora_com_data_final_string(data_inicial, data_final)
        return hora_calculo
}

const PdfCall = () => {

    const token = JSON.parse(localStorage.getItem('token'))

    const refTable = useRef(null)

    const { data, fetchData, loading } = useApi()

    const [dados, setDados] = useState([])

    const { register, handleSubmit } = useForm()

    function exportExcel() {
        exportToExcel(refTable, 'Relatório AGERSA')
    }

    function excluir_linha(id) {
        const nova_lista = dados.filter(chamado => chamado.id != id)
        setDados(nova_lista)
    }

    async function getData(dados) {
        try {
            await fetchData('called/pdfCalled', 'POST', dados, null, token)
        } catch (error) {
            console.log(error)
        }
    }

    const ordenarPorDataCriacao = (a, b) => {
        const dataA = new Date(a.createdAt);
        const dataB = new Date(b.createdAt);
        return dataB - dataA;
    };

    data?.sort(ordenarPorDataCriacao);

    const data_object = data && data.map(item => {
        const chamado_obj = {
            id: item.id,
            unidade: item.estacao?.nome_estacao,
            endereco: item.estacao?.endereco,
            createdAt: new Date(item.createdAt).toLocaleString('pt-BR'),
            dataEncerramento: item.chamado_eletromecanico?.data_hora_fim ? item.chamado_eletromecanico?.data_hora_fim : '-',
            
            tempoTotalExtravasamento: item.chamado_eletromecanico && item.chamado_eletromecanico?.data_hora_fim ?
                tempoExtravasamento_calculo_formatacao(item.createdAt, item.chamado_eletromecanico?.data_hora_fim) :
                '-',
                
            motivo: item.motivo,
        }
        return chamado_obj
    })

    useEffect(() => {
        setDados(data_object)
        return
    }, [data])

    return (
        <div className={styles.container}>
            <BackButton />
            <form onSubmit={handleSubmit(getData)}>
                <div className={styles.input_container}>
                    <input
                        type='date'
                        placeholder='Insira o mês e ano'
                        {...register('data_inicio')}

                    />
                    <span>à</span>
                    <input
                        type='date'
                        placeholder='Insira o mês e ano'
                        {...register('data_final')}

                    />
                    <button disabled={loading}>
                        <span>Gerar</span>
                    </button>
                </div>
            </form>

            {data.length > 0 && (
                <div className={styles.container_button}>
                    <PDFDownloadLink
                        document={<PdfRender data={dados} />}
                        fileName="Relatório AGERSA.pdf"
                        className={styles.pdf}
                    >
                        {({ blob, url, loading, error }) =>
                            loading ? 'Carregando...' : 'Baixar PDF'
                        }
                    </PDFDownloadLink>

                    <button
                        className={styles.excel}
                        onClick={() => exportExcel()}
                    >
                        <span>Baixar XLSX</span>
                    </button>
                </div>
            )}

            {loading && (
                <div className={styles.loading}>
                    <Loading />
                </div>
            )}


            {!loading && data.length > 0 && (
                <div>
                    <section className={styles.container_pdf}>
                        <table ref={refTable}>
                            <thead>
                                <tr>
                                    <th>INSTALAÇÃO</th>
                                    <th>LOCALIZAÇÃO</th>
                                    <th>DATA/HORA INÍCIO</th>
                                    <th>DATA/HORA FINAL</th>
                                    <th>TEMPO DE EXTRAVASAMENTO (h)</th>
                                    <th>MOTIVO</th>
                                </tr>
                            </thead>

                            <tbody>
                                {dados.map(chamado => (
                                    <ItemsTable
                                        key={chamado.id}
                                        chamado={chamado}
                                        excluirLinha={excluir_linha}
                                    />
                                ))}
                            </tbody>

                        </table>
                    </section>
                </div>
            )}

        </div>
    )
}

export default PdfCall