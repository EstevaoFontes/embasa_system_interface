import styles from './ModalEditChamadosEletromecanicos.module.css'
import classe_de_sintomas from '../../../../assets/sintomas';

// COMPONENT
import InputMask from 'react-input-mask';
import Loading from '../../../Geral/Loading/Loading';
// HOOK
import { useEffect } from 'react';
import { useApi } from '../../../../hooks/useApi';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';


const ModalEditChamadosEletromecanicos = ({ setOpenModalEditar, getData }) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const { fetchData, loading, data } = useApi()

    const { handleSubmit, setValue, register, unre } = useForm()

    const [searchParams] = useSearchParams()

    const id = searchParams.get('id')

    const [sintomas, setSintomas] = useState('')
    const [descricao, setDescricao] = useState('')

    async function handleSubmitData(data) {
        if (data.data_hora_fim.trim().replace(/_/g, '') === '') {
            setValue('data_hora_fim', '')
        }

        try {
            await fetchData('chamadosEletromecanicos/editCalled', 'PATCH', data, null, token)
            await getData()
            setOpenModalEditar(state => !state)
        } catch (error) {
            throw error
        }
    }

    async function buscarUnicoChamado() {
        try {
            await fetchData(`chamadosEletromecanicos/searchCalled/${id}`, 'GET', null, null, token)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        buscarUnicoChamado()
        return
    }, [])


    useEffect(() => {
        Object.keys(data).forEach(item => {
            setValue(item, data[item])

            if (item === 'sintomas') {
                setSintomas(data[item])
            }

            if (item === 'descricao_sintomas') {
                setDescricao(data[item])
            }
        })
    }, [data])

    return (
        <div className={styles.background} >

            <div className={styles.modalEditChamadoManutencao}>

                <h2>Editar Registro</h2>

                {loading && <Loading />}

                {!loading && (
                    <form onSubmit={handleSubmit(handleSubmitData)}>

                        <label>
                            <span>Data início</span>
                            <input type="text" {...register('data_inicio')} />
                        </label>

                        <label>
                            <span>Hora início</span>
                            <input type="text" {...register('hora_inicio')} />
                        </label>

                        <label>
                            <span>Supervisão</span>
                            <select {...register('supervisao')} className={styles.supervisao}>
                                <option value=''></option>
                                <option value="MPMA-1">MPMA-1</option>
                                <option value="MPMA-2">MPMA-2</option>
                                <option value="MPMA-3">MPMA-3</option>
                                <option value="MPME-1">MPME-1</option>
                                <option value="MPME-2">MPME-2</option>
                                <option value="MPME-3">MPME-3</option>
                                <option value="MPME-4">MPME-4</option>
                                <option value="MPMM-A">MPMM-A</option>
                            </select>
                        </label>

                        <label>
                            <span>Instalação</span>
                            <input
                                type="text"
                                {...register('instalacao')}
                            />
                        </label>

                        <label>
                            <span>Descrição do Serviço</span>
                            <input
                                type="text"
                                {...register('descricao_servico')}
                            />
                        </label>

                        <label>
                            <span>Nota MPM</span>
                            <input
                                type="text"
                                {...register('nota_mpm')}
                                disabled
                            />
                        </label>

                        <label>
                            <span>Ordem de Serviço</span>

                            {data.ordem_servico == null && (
                                <input
                                    type="text"
                                    {...register('ordem_servico')}
                                />
                            )}

                            {data.ordem_servico && (
                                <input
                                    type="text"
                                    value={data.ordem_servico}
                                    disabled
                                />
                            )}

                        </label>

                        <label>
                            <span>Solicitante</span>
                            <input
                                type="text"
                                {...register('solicitacao')}
                            />
                        </label>

                        <label>
                            <span>Observação</span>
                            <textarea
                                type="text"
                                {...register('observacao')}
                                className={styles.observacao}
                                maxLength={255}
                            />
                        </label>

                        <label>
                            <span>Classe de Equipamentos:</span>
                            <select onChange={(e) => setSintomas(e.target.value)} {...register('sintomas')} value={sintomas}>
                                <option value=""></option>
                                {Object.keys(classe_de_sintomas).map((sintoma, index) => (
                                    <option
                                        key={index}
                                        value={sintoma}
                                    >
                                        {sintoma}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            <span>Sintoma:</span>
                            <select {...register('descricao_sintomas')} onChange={(e) => setDescricao(e.target.value)} value={descricao}>
                                <option value=""></option>
                                {sintomas && classe_de_sintomas[sintomas].map((descricao, index) => (
                                    <option
                                        key={index}
                                        value={descricao}
                                    >
                                        {descricao}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            <span>O Nível de Extravasamento foi Atingido ?</span>

                            <select {...register('extravasamento')}>

                                <option value=""></option>
                                <option value={false}>Não se Aplica</option>
                                <option value={true}>Atingiu</option>
                                <option value={false}>Não Atingiu</option>

                            </select>
                        </label>


                        {loading ? (
                            <div
                                style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}
                            >
                                <Loading />
                            </div>
                        ) : (
                            <div className={styles.button}>

                                <button className='btn_custom2' type='submit'>
                                    <span>Atualizar</span>
                                </button>

                                <button
                                    className='btn_custom3'
                                    type='button'
                                    onClick={() => setOpenModalEditar(state => !state)}
                                >
                                    <span>Fechar</span>
                                </button>

                            </div>
                        )}

                    </form>
                )}
            </div>
        </div>
    )
}

export default ModalEditChamadosEletromecanicos
