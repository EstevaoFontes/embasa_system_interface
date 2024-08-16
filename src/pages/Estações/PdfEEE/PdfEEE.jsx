import styles from './PdfEEE.module.css';
import embasaLogo from '../../../assets/embasaLogo.png';

// HOOKS
import { useApi } from '../../../hooks/useApi';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// COMPONENTS
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, } from '@react-pdf/renderer';
import Loading from '../../../components/Geral/Loading/Loading';
import BackButton from '../../../components/Geral/BackButton/BackButton';

const PdfEEE = () => {

  const style = StyleSheet.create({
    page: {
      flexDirection: 'column',
      padding: '20px',
    },
    text: {
      border: '1px solid black',
      padding: '2px',
      width: '277.5px',
      minHeight: '21.5px',
      maxHeight: 'auto',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '8px'
    },
    text2: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2px',
      width: '287px',
      fontWeight: 'bold'
    },
    section_header: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '5px',
      border: '1px solid blue',
      fontSize: '8px'
    },
    image_logo: {
      width: '65px',
      minHeight: 'auto'
    },
    nome_estacao: {
      marginLeft: '5px',
      padding: '3px',
      fontSize: '20px',
      textAlign: 'center',
    },
    header_section: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#040481',
      color: 'white',
      fontSize: '8px',
      padding: '2px'
    },
    header_section2: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#040481',
      color: 'white',
      fontSize: '8px',
      padding: '2px'
    },
    conteudo1: {
      flexDirection: 'row',
      fontSize: '10px'
    },
    conteudo2: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '6px'
    },
    center_observations: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid black',
      padding: '2px',
      minHeight: '16px',
      width: '288px'
    }
  })

  const token = JSON.parse(localStorage.getItem('token'))

  const api_url = import.meta.env.VITE_API_URL

  const { data, fetchData, loading } = useApi()

  const { id } = useParams()

  async function getUniqueEstacao() {
    try{
      await fetchData(`estacao/uniqueEEE/${id}`, 'GET', null, null, token)
    }catch(error){
      console.log(error)
    }
  }

  const dataFormatada = new Date(data.updatedAt).toLocaleDateString()

  useEffect(() => {
    getUniqueEstacao()
  }, [])

  if (loading) {
    return (
      <div className={styles.loading}>
        <Loading />
      </div>
    )
  }


  return (
    <>
      <BackButton to={`eee?query=${data.nome_estacao}`} />
      
      <div className={styles.container_pdf}>

        <PDFViewer style={{ width: '60%', minHeight: '80vh', marginTop: '10px' }}>
          <Document language='pt-br' title={data.nome_estacao}>
            <Page size="A4" orientation='portrait' style={style.page}>

              {/* HEADER DA PAGINA COM A LOGO */}
              <View fixed={true} style={style.section_header}>
                <Image src={embasaLogo} style={style.image_logo} />
                <Text>Diagnóstico das Estações Elevatórias de Esgoto Operadas nos Municípios de Salvador, Lauro de
                  Freitas e Simões Filho - BA.
                </Text>
              </View>

              {/* NOME DA ESTAÇÃO */}
              <View style={[style.nome_estacao, { marginTop: '5px' }]}>
                <Text style={{ fontWeight: 'bold' }}>{data.nome_estacao}</Text>
              </View>

              {/* HEADER SEÇÃO DE DADOS DA ESTAÇÃO */}
              <View style={[style.header_section, { marginTop: '5px' }]}>
                <Text>DADOS DA ESTAÇÃO</Text>
              </View>

              {/* CORPO DE DADOS DA ESTAÇÃO */}
              <View style={style.conteudo1}>
                <View style={style.dados1}>
                  
                  <View style={style.text}>
                    <Text>{`Endereço: ${data.endereco}`}</Text>
                  </View>
                  <View style={style.text}>
                    <Text>{`Bacia: ${data.bacia}`}</Text>
                  </View>
                  <View style={style.text}>
                    <Text>{`Vazão de Projeto: ${data.vazao}`}</Text>
                  </View>
                  <View style={style.text}>
                    <Text>{`Técnico da área: ${data.reponsavel}`}</Text>
                  </View>
                  <View style={style.text}>
                    <Text>{`Àrea de Vulnerabilidade Social: ${data.area_vulnerabilidade_social}`}</Text>
                  </View>
                </View>
                <View style={style.dados2}>
                  <View style={style.text}>
                    <Text>{`Coordenadas: ${data.coordenadas}`}</Text>
                  </View>
                  <View style={style.text}>
                    <Text>{`Àrea de Manutenção: ${data.area_manutencao}`}</Text>
                  </View>
                  <View style={style.text}>
                    <Text>{`Início da Operação: ${data.data_inicio_operacao}`}</Text>
                  </View>
                  <View style={style.text}>
                    <Text>{`Monitor da área: ${data.nome_monitor}`}</Text>
                  </View>
                  <View style={style.text}>
                    <Text>{`Unidade Regional: ${data.unidade_regional}`}</Text>
                  </View>
                </View>
              </View>

              {/* HEADER DA SEÇÃO DE ELETROMECANICA */}
              <View style={style.header_section}>
                <Text>ELETROMECÂNICA</Text>
              </View>
              <View style={style.header_section}>
                <Text>EQUIPAMENTOS</Text>
              </View>

              {/* CORPO DA SEÇÃO DE ELETROMECANICA */}
              <View style={style.conteudo2}>
                <View style={style.text}>
                  <Text style={{ fontSize: '7px', textAlign: 'center' }}>ITEM</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '7px', textAlign: 'center' }}>Nº DE POSIÇÕES</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '7px', textAlign: 'center' }}>POSIÇÕES INSTALADAS</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '7px', textAlign: 'center' }}>REGIME OPERACIONAL</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '7px', textAlign: 'center' }}>EM MANUTENÇÃO</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '7px', textAlign: 'center' }}>BOMAS RESERVAS</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={style.text}>
                  <Text style={{ fontSize: '8px', textAlign: 'center' }}>Bombas (CMB)</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '8px', textAlign: 'center' }}>{data.numero_posicoes}</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '8px', textAlign: 'center' }}>{data.posicoes_instaladas}</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '8px', textAlign: 'center' }}>{data.regime_operacional}</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '8px', textAlign: 'center' }}>{data.em_manutencao}</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '8px', textAlign: 'center' }}>{data.bombas_reservas}</Text>
                </View>
              </View>

              {/* HEADER GERADOR */}
              <View style={style.header_section2}>
                <View style={style.text2}>
                  <Text>ITEM</Text>
                </View>
                <View style={style.text2}>
                  <Text>POSSUI</Text>
                </View>
                <View style={style.text2}>
                  <Text>NÃO POSSUI</Text>
                </View>
              </View>

              {/* CORPO GERADOR */}
              <View style={style.conteudo2}>
                <View style={style.text}>
                  <Text style={{ fontSize: '8px', textAlign: 'center' }}>GERADOR</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '8px', textAlign: 'center' }}>{data.gerador === 'Possui' && 'X'}</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '8px', textAlign: 'center' }}>{data.gerador === 'Não Possui' && 'X'}</Text>
                </View>
              </View>

              {/* HEADER MONITORAMENTO REMOTO */}
              <View style={style.header_section2}>
                <View style={style.text2}>
                  <Text>ITEM</Text>
                </View>
                <View style={style.text2}>
                  <Text>POSSUI</Text>
                </View>
                <View style={style.text2}>
                  <Text>NÃO POSSUI</Text>
                </View>
              </View>
              {/* CORPO MONITORAMENTO REMOTO */}
              <View style={style.conteudo2}>
                <View style={style.text}>
                  <Text style={{ fontSize: '8px', textAlign: 'center' }}>MONITORAMENTO REMOTO</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '8px', textAlign: 'center' }}>{data.monitoramento_remoto === 'Possui' && 'X'}</Text>
                </View>
                <View style={style.text}>
                  <Text style={{ fontSize: '8px', textAlign: 'center' }}>{data.monitoramento_remoto === 'Não Possui' && 'X'}</Text>
                </View>
              </View>

              {/* HEADER DISGNOSTICO */}
              <View style={[style.header_section, { marginTop: '5px' }]}>
                <Text>DIAGNÓSTICO</Text>
              </View>
              <View style={style.header_section}>
                <Text>ESTRUTURAL/ SEGURANÇA SST/ PATRIMONIAL</Text>
              </View>

              {/* CORPO HEADER DIAGNOSTICO */}
              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px' }]}>
                  <Text>ITEM</Text>
                </View>

                <View style={[style.text, { width: '40px' }]}>
                  <Text>NA</Text>
                </View>

                <View style={[style.text, { width: '40px' }]}>
                  <Text>C</Text>
                </View>

                <View style={[style.text, { width: '40px' }]}>
                  <Text>NC</Text>
                </View>

                <View style={[style.center_observations, { minHeight: '19px', fontWeight: 'bold' }]}>
                  <Text>OBSERVAÇÕES</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]} >
                  <Text>ABRIGO DO QD DE COMANDO</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.abrigo_quadro_comando === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.abrigo_quadro_comando === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.abrigo_quadro_comando === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.abrigo_quadro_comando_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>GUARDA CORPOS</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.guarda_corpo === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.guarda_corpo === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.guarda_corpo === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.guarda_corpo_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>CORRIMÕES</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.corrimoes === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.corrimoes === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.corrimoes === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.corrimoes_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>ESCADAS</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.escadas === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.escadas === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.escadas === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.escadas_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>TAMPAS</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.tampas === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.tampas === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.tampas === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.tampas_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>DELIMITAÇÕES</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.delimitacoes === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.delimitacoes === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.delimitacoes === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.delimitacoes_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>LAJES</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.lajes === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.lajes === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.lajes === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.lajes_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>PINTURA</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.pintura === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.pintura === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.pintura === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.pintura_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>ACESSO/ PAVIMENTO</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.acesso === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.acesso === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.acesso === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.acesso_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>PORTÕES</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.portoes === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.portoes === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.portoes === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.portoes_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>PLACA DE IDENTIFICAÇÃO</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.placa_identificacao === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.placa_identificacao === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.placa_identificacao === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.placa_identificacao_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>PLACA DE SINALIZAÇÃO</Text>
                </View>

                <View>
                  <Text style={[style.text, { width: '40px', minHeight: '16px' }]}>{data.placa_sinalizacao === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.placa_sinalizacao === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.placa_sinalizacao === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.placa_sinalizacao_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>EXTINTOR</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.extintor === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.extintor === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.extintor === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.extintor_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>

                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>CADEADOS</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.cadeados === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.cadeados === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.cadeados === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.cadeados_observacao}</Text>
                </View>
              </View>


              <View style={style.header_section}>
                <Text>OPERACIONAL</Text>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>ITEM</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>NA</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>C</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>NC</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>OBSERVAÇÕES</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>GRADE VERTICAL</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.grade_vertical === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.grade_vertical === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.grade_vertical === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.grade_vertical_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>GRADE HORIZONTAL</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.grade_horizontal === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.grade_horizontal === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.grade_horizontal === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.grade_horizontal_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>STOPLOGS</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.stoplogs === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.stoplogs === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.stoplogs === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.stoplogs_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>INSTALAÇÃO ELÉTRICA</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.instalacao_eletrica === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.instalacao_eletrica === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.instalacao_eletrica === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.instalacao_eletrica_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>INSTALAÇÃO HIDRÁULICA</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.instalacao_hidraulica === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.instalacao_hidraulica === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.instalacao_hidraulica === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.instalacao_hidraulica_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>QUADRO DE COMANDO</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.quadro_comando === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.quadro_comando === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.quadro_comando === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.quadro_comando_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>SENSOR DE NÍVEL</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.sensor_nivel === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.sensor_nivel === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.sensor_nivel === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.sensor_nivel_observacao}</Text>
                </View>
              </View>

              <View style={style.conteudo2}>
                <View style={[style.text, { width: '168px', minHeight: '16px' }]}>
                  <Text>REGISTRO/ COMPORTA</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.registro_comporta === 'NA' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.registro_comporta === 'C' && 'X'}</Text>
                </View>

                <View style={[style.text, { width: '40px', minHeight: '16px' }]}>
                  <Text>{data.registro_comporta === 'NC' && 'X'}</Text>
                </View>

                <View style={style.center_observations}>
                  <Text>{data.registro_comporta_observacao}</Text>
                </View>
              </View>

              <Text
                fixed={true}
                style={[{ fontSize: '8px', textAlign: 'center', color: '#040481', marginTop: '50px' }]}
              >
                4ª Avenida nº 420 - Centro Administrativo da Bahia (CAB) - CEP 41.745-300 - Salvador, Bahia
              </Text>
              <Text
                fixed={true}
                style={[{ fontSize: '8px', textAlign: 'center', color: '#040481' }]}
              >
                Tel.: 71 3372.4844 - Fax: 3372.4600
              </Text>
            </Page>

            <Page size="A4" orientation='portrait' style={style.page}>

              <View fixed={true} style={style.section_header}>
                <Image src={embasaLogo} style={style.image_logo} />
                <Text>Diagnóstico das Estações Elevatórias de Esgoto Operadas nos Municípios de Salvador, Lauro de
                  Freitas e Simões Filho - BA.
                </Text>
              </View>

              <View style={{ border: '1px solid black', padding: '2px' }}>
                <View style={[style.header_section, { marginTop: '10px' }]}>
                  <Text>REGISTROS FOTOGRÁFICOS</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row', justifyContent: 'center', alignContent: 'center',
                    flexWrap: 'wrap', gap: '15px', marginTop: '5px'
                  }}>

                  {data.imagens && data.imagens.map(img => (
                    <View key={img.id} style={{
                      flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                      border: '1px solid black', padding: '5px'
                    }}>
                      <Image
                        src={`${api_url}/estacoes/${img.filename}`}
                        alt={img.legenda}
                        style={{ width: '255px', minHeight: '180px' }}
                      />
                      <Text style={{ fontSize: '10px', textAlign: 'center', marginTop: '5px' }}>{img.legenda}</Text>
                    </View>
                  ))}

                </View>
                <Text style={{ fontSize: '10px' }}>Atualizado em:{dataFormatada}</Text>
              </View>

              <View
                style={{ marginTop: '250px' }}
              >
                <Text
                  fixed={true}
                  style={[{ fontSize: '8px', textAlign: 'center', color: '#040481', marginTop: '5px' }]}
                >
                  4ª Avenida nº 420 - Centro Administrativo da Bahia (CAB) - CEP 41.745-300 - Salvador, Bahia
                </Text>
                <Text
                  fixed={true}
                  style={[{ fontSize: '8px', textAlign: 'center', color: '#040481' }]}
                >
                  Tel.: 71 3372.4844 - Fax: 3372.4600
                </Text>
              </View>

            </Page>
          </Document>
        </PDFViewer >
        
      </div>

    </>
  )
}

export default PdfEEE

