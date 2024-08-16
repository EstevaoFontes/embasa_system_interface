import styles from './FormChamado.module.css'

// MOCKUP DADOS
import motivos from '../../../../assets/Motivos';

// COMPONENTS
import MessageErrorForm from '../../../Geral/MessageErrorForm/MessageErrorForm';
import Loading from '../../../Geral/Loading/Loading'
import CalledFields from '../CampoAtualizacao/CampoAtualizacao';
import InputMask from 'react-input-mask';
import ModalVerificacaoRedundancia from '../../Modals/ModalVerificacaoRedundancia/ModalVerificacaoRedundancia';

// HOOKS
import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthProvider';
import { useApi } from '../../../../hooks/useApi'


const AtualizationForm = ({ title, date, createdBy }) => {
    const date_formated = new Date(date).toLocaleDateString()
    return (
        <div className={styles.container_atualizacoes}>
            <span className={styles.title}>{title}</span>
            <span className={styles.atualizacao_user}>{`${createdBy} - ${date_formated}`}</span>
        </div>
    )
}

const CalledForm = ({ nome_titulo, nome_botao, formAtributes, showField = false }) => {

    const token = JSON.parse(localStorage.getItem('token'))

    const { data: listaUnidades, fetchData, loading } = useApi()

    const { user } = useAuth()

    const {
        register,
        handleSubmit,
        handleSubmitData,
        errors,
        isSubmitting,
        setValue,
        data,
        fields,
        remove,
        addAtualization,
    } = formAtributes

    const [unidades, setUnidades] = useState('')
    const unidadeEscolhida = unidades && listaUnidades.filter(unid => unid.nome_estacao.includes(unidades))
    const [motivo, setMotivo] = useState('')

    const [openModalVerificacaoRedundancia, setOpenModalVerificacaoRedundancia] = useState(false)

    const [chamadoNoturno, setChamadoNoturno] = useState(false)

    const obter_dados_estacoes = async () => {
        try {
            await fetchData('estacao/allEEE', 'GET', null, null, token)
        } catch (error) {
            console.log(error)
        }
    }

    const verifica_obrigatoriedade_input_protocolo_coelba = () => {
        if(motivo.includes('Energia')){
            return true
        }else{
            return false
        }
    }

    const verifica_horario_para_mostrar_input_chamado_noturno = () => {
        const data_atual = new Date();

        // Define as horas de início e fim do intervalo
        const hora_inicio = 17;
        const minuto_inicio = 30;

        const hora_fim = 5;
        const minuto_fim = 30;

        // Cria os objetos Date para as 17:30 e 05:30 de hoje
        const contagem_inicio = new Date();
        contagem_inicio.setHours(hora_inicio, minuto_inicio, 0, 0);

        const contagem_fim = new Date();
        contagem_fim.setHours(hora_fim, minuto_fim, 0, 0);

        if (data_atual >= contagem_inicio || data_atual <= contagem_fim) {
            return true
        } else {
            return false
        }

    }

    useEffect(() => {
        if (data?.estacao) {
            setUnidades(data.estacao?.nome_estacao)
        }
        return
    }, [data])
    

    useEffect(() => {
        if (unidadeEscolhida) {
            setValue('id_estacao', unidadeEscolhida[0]?.id)
        }
        return
    }, [unidadeEscolhida])

    const estacoes_com_chamados_abertos = JSON.parse(localStorage.getItem('nome_estacao'))

    useEffect(() => {
        setValue('chamado_noturno', chamadoNoturno)
        return
    }, [chamadoNoturno])

    useEffect(() => {
        if (!data) {
            if (estacoes_com_chamados_abertos.includes(unidades)) {
                setOpenModalVerificacaoRedundancia(state => !state)
            }
        }
        return
    }, [unidades])

    useEffect(() => {
        obter_dados_estacoes()
        return
    }, [])

    return (
        <div className={styles.container}>

            <div className={styles.nome_titulo}>
                <h2>{nome_titulo}</h2>
                <p>Campos que contém * são obrigatórios</p>
            </div>

            <form onSubmit={handleSubmit(handleSubmitData)}>

                {verifica_horario_para_mostrar_input_chamado_noturno() && (
                    <div className={styles.chamado_noturno}>
                        <span>Chamado Noturno?</span>

                        <input
                            type="checkbox"
                            {...register('chamado_noturno')}
                            onChange={() => setChamadoNoturno(state => !state)}
                        />
                    </div>
                )}

                <label>
                    <span>*Nota PM</span>

                    {!data?.notaPM && (
                        <input
                            type="text"
                            placeholder='Digite a Nota Pm fornecida'
                            {...register('notaPM')}
                            required={!chamadoNoturno}
                        />
                    )}

                    {data?.notaPM && (
                        <input
                            type="text"
                            value={data && data.notaPM}
                            disabled
                        />
                    )}

                    {errors?.notaPM && <MessageErrorForm message={errors.notaPM.message} />}
                </label>

                <label>
                    <span>Ordem de Serviço:</span>

                    <input
                        type="text"
                        placeholder='Digite a Ordem de Serviço fornecida'
                        {...register('ordemServico')}
                    />

                </label>

                <label>
                    <span>*Selecione a unidade:</span>
                    <select
                        onChange={(e) => setUnidades(e.target.value)}
                        value={unidades}
                        disabled={loading}
                        required
                    >
                        {loading && (
                            <option>
                                Carregando Estações...
                            </option>
                        )}

                        {!loading && (
                            <>
                                <option value={''}></option>

                                {listaUnidades?.map((unidade) => (
                                    <option
                                        value={unidade.nome_estacao}
                                        key={unidade.id}
                                    >
                                        {unidade.nome_estacao}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>


                </label>


                <label>
                    <span>*Informado por:</span>
                    <input
                        type="text"
                        placeholder='Nome do informante'
                        {...register('informadoPor')}
                    />

                    {errors?.informadoPor && <MessageErrorForm message={errors.informadoPor.message} />}
                </label>

                <section>
                    <label>

                        <span>*Motivo</span>

                        <select {...register('motivo')} onChange={(e) => setMotivo(e.target.value)}>

                            <option value=""></option>

                            {motivos.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}

                        </select>



                    </label>
                </section>

                <section className={styles.inputs}>
                    <label>
                        <span>Média PIPPE de Extravasamento</span>
                        <input
                            type="text"
                            disabled={true}
                            value={unidadeEscolhida && unidadeEscolhida[0]?.pippe}
                        />
                    </label>

                    <label>
                        <span>*PIPPE</span>

                        <select
                            {...register('extravasando')}
                        >
                            <option value=""></option>
                            <option value={true}>ATINGIDO</option>
                            <option value={false}>NÃO ATINGIDO</option>
                            <option value={false}>NÃO SE APLICA</option>
                        </select>

                        {errors?.extravasando && <MessageErrorForm message={errors.extravasando.message} />}

                    </label>
                </section>


                <section className={styles.inputs}>
                    <label>
                        <span>Hora início PIPPE</span>
                        <InputMask
                            mask={'99/99/9999 - 99:99'}
                            {...register('horaInicioPippe')}
                            alwaysShowMask
                        />
                    </label>

                    <label>
                        <span>Protocolo Coelba</span>
                        <input
                            type="text"
                            {...register('protocoloCoelba')}
                            placeholder='Digite o protocolo informado'
                            required={verifica_obrigatoriedade_input_protocolo_coelba()}
                        />
                    </label>
                </section>

                <label>
                    <span>Observações de Abertura</span>
                    <textarea
                        {...register('observacaoAbertura')}
                        placeholder='Digite uma observação para o chamado'
                        rows={3}
                        maxLength={201}
                    ></textarea>
                </label>

                {data?.atualizacoes && (
                    data.atualizacoes.map((atualizacao, index) => (
                        <AtualizationForm
                            key={index}
                            title={atualizacao.title}
                            date={atualizacao.createdAt}
                            createdBy={atualizacao.criado_por}
                        />
                    ))
                )}

                {showField && (
                    <div>
                        <button className={styles.atualization} type='button' onClick={addAtualization}>
                            <span>Adicionar Atualização</span>
                        </button>
                        {
                            fields && fields.map((field, index) => (
                                <CalledFields
                                    key={index}
                                    register={register}
                                    index={index}
                                    fieldsId={field.id}
                                    remove={remove}
                                />
                            ))
                        }

                    </div>
                )}

                <label>
                    <span>Operador (Sala de Controle)</span>
                    <input
                        type="text"
                        disabled={true}
                        value={data ? data.criado_por?.name : user.name}
                    />
                </label>

                <label>
                    <span>Endereço</span>
                    <input
                        type="text"
                        disabled={true}
                        id={styles.formatedInformations}
                        value={unidadeEscolhida && unidadeEscolhida[0]?.endereco}
                    />
                </label>

                <label>
                    <span>Conta Contrato Coelba</span>
                    <input
                        type="text"
                        id={styles.formatedInformations}
                        disabled={true}
                        value={unidadeEscolhida && unidadeEscolhida[0]?.conta_contrato_coelba}
                    />
                </label>

                <label>
                    <span>Manutenção MPME</span>
                    <input
                        id={styles.formatedInformations}
                        disabled={true}
                        type="text"
                        value={unidadeEscolhida && unidadeEscolhida[0]?.area_manutencao}
                    />
                </label>

                <label>
                    <span>Sistema de Disposição Oceânica</span>
                    <input
                        id={styles.formatedInformations}
                        disabled={true}
                        type="text"
                        value={unidadeEscolhida && unidadeEscolhida[0]?.sistema_disposicao_oceanica}
                    />
                </label>

                <label>
                    <span>UR de abrangência</span>
                    <input
                        id={styles.formatedInformations}
                        disabled={true}
                        type="text"
                        value={unidadeEscolhida && unidadeEscolhida[0]?.unidade_regional}
                    />
                </label>

                <button id={styles.buttonCalled}
                    disabled={isSubmitting}
                    className='btn_custom2'
                >
                    <span>{isSubmitting ? <Loading /> : nome_botao}</span>
                </button>
            </form>

            {openModalVerificacaoRedundancia && (
                <ModalVerificacaoRedundancia
                    setOpenModalVerificacaoRedundancia={setOpenModalVerificacaoRedundancia}
                />
            )}
        </div>
    )
}

export default CalledForm