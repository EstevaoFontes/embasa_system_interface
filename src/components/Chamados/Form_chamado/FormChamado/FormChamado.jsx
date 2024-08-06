import styles from './FormChamado.module.css'

// MOCKUP DADOS
import motivos from '../../../../assets/Motivos';

// COMPONENTS
import MessageErrorForm from '../../../Geral/MessageErrorForm/MessageErrorForm';
import Loading from '../../../Geral/Loading/Loading'
import CalledFields from '../CampoAtualizacao/CampoAtualizacao';
import InputMask from 'react-input-mask';

// HOOKS
import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthProvider';
import { useApi } from '../../../../hooks/useApi'


const AtualizationForm = ({ title, date, createdBy }) => {
    return (
        <div className={styles.container_atualizacoes}>
            <span className={styles.title}>{title}</span>
            <span className={styles.atualizacao_user}>{`${createdBy} - ${date}`}</span>
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

    const obter_dados_estacoes = async () => {
        try {
            await fetchData('estacao/allEEE', 'GET', null, null, token)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (data?.estacao) {
            setUnidades(data.estacao?.nome_estacao)
        }
    }, [data])

    useEffect(() => {
        if (unidadeEscolhida) {
            setValue('id_estacao', unidadeEscolhida[0]?.id)
        }
    }, [unidadeEscolhida])


    useEffect(() => {
        obter_dados_estacoes()
    }, [])

    return (
        <div className={styles.container}>

            <div className={styles.nome_titulo}>
                <h2>{nome_titulo}</h2>
                <p>Campos que contém * são obrigatórios</p>
            </div>

            <form onSubmit={handleSubmit(handleSubmitData)}>

                <label>
                    <span>Nota PM</span>

                    {!data && (
                        <input
                            type="text"
                            placeholder='Digite a Nota Pm fornecida'
                            {...register('notaPM')}
                        />
                    )}

                    {data && (
                        <input
                            type="text"
                            value={data && data.notaPM}
                            disabled
                        />
                    )}

                    {errors?.notaPM && <MessageErrorForm message={errors.notaPM.message} />}
                </label>

                <label>
                    <span>*Ordem de Serviço:</span>

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

                        <select {...register('motivo')}>

                            <option value=""></option>

                            {motivos.map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}

                        </select>

                        {errors?.extravasando && <MessageErrorForm message={errors.extravasando.message} />}

                    </label>
                </section>

                {/* <section className={styles.inputs}>
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
                        
                        {errors?.pippe && <MessageErrorForm message={errors.pippe.message} />}
                        
                        </label>
                        </section> */}


                        <label>
                            <span>PIPPE</span>
                        <select
                            {...register('extravasando')}
                        >
                            <option value=""></option>
                            <option value={true}>ATINGIDO</option>
                            <option value={false}>NÃO ATINGIDO</option>
                        </select>
                        </label>

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

                {data && data.atualizacoes && (
                    data.atualizacoes.map((atualizacao, index) => (
                        <AtualizationForm key={index} title={atualizacao.title} date={atualizacao.data} createdBy={atualizacao.createBy} />
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
                    <span>*Operador (Sala de Controle)</span>
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
        </div>
    )
}

export default CalledForm