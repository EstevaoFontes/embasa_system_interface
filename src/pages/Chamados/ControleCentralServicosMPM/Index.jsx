import styles from './ControleCentralServicosMPM.module.css';
// COMPONENTS
import ComponentsItems from './ComponentsItems';
import InputMask from 'react-input-mask';
import Loading from '../../../components/Geral/Loading/Loading';
import ModalEditChamadosEletromecanicos from '../../../components/Chamados/Modals/ModalEditChamadosEletromecanicos/ModalEditChamadosEletromecanicos';
import ModalExcluirChamadoEletromecanico from '../../../components/Chamados/Modals/ModalExcluirChamadoEletromecanico/ModalExcluirChamadoEletromecanico';
import ModalFinalizarChamadoEletromecanico from '../../../components/Chamados/Modals/ModalFinalizarChamadoEletromecanico/ModalFinalizarChamadoEletromecanico';
// HOOKS
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useApi } from '../../../hooks/useApi';
import { useAuth } from '../../../context/AuthProvider'
// UTILS 
import { exportToExcel } from '../../../utils/exportExcel';

const Planilha = () => {

    const token = JSON.parse(localStorage.getItem('token'))

    const [openModalEditar, setOpenModalEditar] = useState(false)
    const [openModalExcluir, setOpenModalExcluir] = useState(false)
    const [openModalFinalizar, setOpenModalFinalizar] = useState(false)

    const { user } = useAuth()

    const { loading, data, fetchData } = useApi()

    const [dados, setDados] = useState(data || [])

    const tableRef = useRef(null);

    const [search, setSearch] = useState('')
    const [filterChosen, setFilterChosen] = useState('')

    const registrosFiltrados = search.length > 0 && data.filter(registro => {
        if (filterChosen.length > 0) {
            return registro[filterChosen].toLocaleLowerCase().includes(search.toLocaleLowerCase())
        } else {
            setSearch("")
            return
        }
    });

    const { register, handleSubmit, reset, setValue } = useForm()

    const exportFile = () => {
        exportToExcel(tableRef, 'Feedback dos chamados de serviços Eletromecânicos da RMS')
    };

    async function handleSubmitData(data) {

        try {
            await fetchData('chamadosEletromecanicos/newCalled', 'POST', data, null, token)
            await getCalleds()
            reset()
        } catch (error) {
            throw error
        }
    }

    async function getCalleds() {

        try {
            await fetchData('chamadosEletromecanicos/allCalled', 'GET', null, null, token)
        } catch (error) {
            throw error
        }
    }

    function filtrar_agua() {
        const palavrasChave = ['eta', 'central'];

        const filtro_esgoto_ete = data.filter(registro => {
            const instalacaoLower = registro.instalacao.toLowerCase();
            return palavrasChave.some(palavra => instalacaoLower.includes(palavra));
        });

        setDados(filtro_esgoto_ete);
    }

    function filtrar_esgoto() {
        const palavrasChave = ['e.e', 'ecp', 'ete'];

        const filtro_esgoto_ete = data.filter(registro => {
            const instalacaoLower = registro.instalacao.toLowerCase();
            return palavrasChave.some(palavra => instalacaoLower.includes(palavra));
        });

        setDados(filtro_esgoto_ete);
    }


    useEffect(() => {
        getCalleds()
    }, [])

    useEffect(() => {
        setDados(data)
        setValue('id_user_criacao', user.id)
    }, [data])

    return (
        <main className={styles.container}>

            <h3>Feedback dos chamados de serviços Eletromecânicos da RMS.</h3>

            {user.funcao !== 'Visitante' && (
                <div>

                    <form onSubmit={handleSubmit(handleSubmitData)}>

                        <div className={styles.botao_salvar}>
                            <button disabled={loading}>
                                <span>Salvar</span>
                            </button>
                        </div>

                        <div className={styles.inputs}>

                            <label>
                                <span>Data Início</span>
                                <InputMask
                                    mask={'99/99/9999'}
                                    {...register('data_inicio')}
                                    maskChar={null}
                                    placeholder='Ex: xx/xx/xxxx'
                                />
                            </label>

                            <label>
                                <span>Hora Início</span>
                                <InputMask
                                    mask={'99:99'}
                                    {...register('hora_inicio')}
                                    maskChar={null}
                                    placeholder='Ex: xx:xx'
                                />
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
                                <input type="text"  {...register('instalacao')} />
                            </label>

                            <label>
                                <span>Descrição do Serviço</span>
                                <input type="text"  {...register('descricao_servico')} />
                            </label>

                            <label>
                                <span>Nota MPM</span>
                                <input type="text"  {...register('nota_mpm')} />
                            </label>

                            <label>
                                <span>Ordem de Serviço</span>
                                <input type="text"  {...register('ordem_servico')} />
                            </label>

                            <label>
                                <span>Solicitante</span>
                                <input type="text"  {...register('solicitacao')} />
                            </label>

                        </div>
                        <label>
                            <span>Observação</span>
                            <textarea
                                type="text"
                                {...register('observacao')}
                                className={styles.observacao}
                                maxLength={255}
                            />
                        </label>
                    </form>
                </div>
            )}

            <div className={styles.container_botao_exportar_procurar}>


                <div className={styles.filtros_link}>
                    <span onClick={() => setDados(data)}>Todos</span>
                    <span onClick={() => filtrar_esgoto()}>Filtrar Esgoto</span>
                    <span onClick={() => filtrar_agua()}>Filtrar Àgua</span>
                </div>

                <div className={styles.search_input}>

                    <select onChange={(e) => setFilterChosen(e.target.value)}>
                        <option value=''>Sem filtro</option>
                        <option value="instalacao">Instalação</option>
                        <option value="ordem_servico">OS</option>
                        <option value="nota_mpm">Nota MPM</option>
                        <option value="supervisao">Supervisão</option>
                    </select>

                    <i
                        className='bi bi-arrow-left'
                        id={filterChosen.length > 0 ? styles.arrow_active : styles.arrow_inactive}
                    >
                    </i>

                    <input
                        type="search"
                        disabled={filterChosen.length === 0}
                        placeholder='Digite para filtrar.'
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <abbr title="Recarregar página">
                        <i
                            className="bi bi-arrow-clockwise"
                            id={styles.recarregar_pagina}
                            onClick={() => getCalleds()}
                        ></i>
                    </abbr>
                </div>

                {user.funcao !== 'Visitante' && (
                    <button type='button' onClick={() => exportFile()} disabled={loading}>
                        <span>Exportar</span>
                        <i className="bi bi-filetype-xlsx"></i>
                    </button>
                )}

            </div>

            <table className={styles.table} ref={tableRef}>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Data início</th>
                        <th>Hora início</th>
                        <th>Supervisão</th>
                        <th>Instalação</th>
                        <th>Descrição Serviço</th>
                        <th>Nota MPM</th>
                        <th>Nº OS</th>
                        <th>Solicitação</th>
                        <th>Data/Hora Fim</th>
                        <th>Observação</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {search.length > 0 ? (
                        registrosFiltrados.map(item => (
                            <ComponentsItems
                                key={item.id}
                                registro={item}
                                modalEditar={setOpenModalEditar}
                                modalExcluir={setOpenModalExcluir}
                                modalFinalzar={setOpenModalFinalizar}
                            />
                        ))
                    ) : (
                        dados?.map(item => (
                            <ComponentsItems
                                key={item.id}
                                registro={item}
                                modalEditar={setOpenModalEditar}
                                modalExcluir={setOpenModalExcluir}
                                modalFinalzar={setOpenModalFinalizar}
                            />
                        )))}
                </tbody>

            </table>

            {loading && <Loading />}
            {!loading && dados.length === 0 && <h3>Nenhum registro encontrado</h3>}

            {openModalEditar && (
                <ModalEditChamadosEletromecanicos
                    registro={data}
                    setOpenModalEditar={setOpenModalEditar}
                    getData={getCalleds}
                />
            )}

            {openModalExcluir && (
                <ModalExcluirChamadoEletromecanico
                    openModalExcluir={setOpenModalExcluir}
                    getData={getCalleds}
                />
            )}

            {openModalFinalizar && (
                <ModalFinalizarChamadoEletromecanico
                    openModalFinalizar={setOpenModalFinalizar}
                    getData={getCalleds}
                />
            )}

        </main >
    );
};

export default Planilha