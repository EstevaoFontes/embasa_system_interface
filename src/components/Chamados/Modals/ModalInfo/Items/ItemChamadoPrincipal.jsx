import styles from '../ModalInfo.module.css'

import { useState } from 'react'

const ItemChamadoPrincipal = ({ data }) => {

  const [informationCall, setInformationCall] = useState(false)

  const data_formatada = new Date(data.createdAt).toLocaleString('pt-BR')

  return (
    <>
      <div className={styles.sections} onClick={() => setInformationCall(state => !state)}>
        <h3 className={styles.textRender}>Informações sobre o Chamado</h3>
        <i className={informationCall ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'}></i>
      </div>

      {informationCall && (
        <section>
          <fieldset>
            <legend>Nota PM</legend>
            <p>{data.notaPM}</p>
          </fieldset>
          <fieldset>
            <legend>Ordem de Serviço</legend>
            <p>{data.ordemServico}</p>
          </fieldset>

          <fieldset>
            <legend>Unidade</legend>
            <p>{data.estacao?.nome_estacao}</p>
          </fieldset>

          <fieldset>
            <legend>Data da Criação Chamado</legend>
            <p>{data_formatada}</p>
          </fieldset>

          <fieldset>
            <legend>Informado por</legend>
            <p>{data.informadoPor}</p>
          </fieldset>

          <fieldset>
            <legend>Motivo</legend>
            <p>{data.motivo}</p>
          </fieldset>

          <fieldset>
            <legend>Nível de Extravasamento</legend>
            <p>{data.extravasando ? 'Atingido' : 'Não Atingido/ Não se aplica'}</p>
          </fieldset>

          <fieldset>
            <legend>Hora início PIPPE</legend>
            <p>{data.horaInicioPippe}</p>
          </fieldset>

          <fieldset>
            <legend>Protocolo Coelba</legend>
            <p>{data.protocoloCoelba}</p>
          </fieldset>

          <fieldset>
            <legend>Observação</legend>
            <abbr title={data.observacao}>
              <p>{data.observacaoAbertura}</p>
            </abbr>
          </fieldset>

          <fieldset>
            <legend>Operador (Sala de controle)</legend>
            <p>{data?.criado_por?.name}</p>
          </fieldset>

          <fieldset>
            <legend>Endereço</legend>
            <abbr title={data.estacao?.endereco}>
              <p>{data.estacao?.endereco}</p>
            </abbr>
          </fieldset>

          <fieldset>
            <legend>Conta contrato</legend>
            <p>{data.estacao?.conta_contrato_coelba}</p>
          </fieldset>

          <fieldset>
            <legend>Supervisão MPME</legend>
            <abbr title={data.manutencao}>
              <p>{data.estacao?.area_manutencao}</p>
            </abbr>
          </fieldset>

          <fieldset>
            <legend>Sistema de Disposição Oceânica</legend>
            <p>{data.estacao?.sistema_disposicao_oceanica}</p>
          </fieldset>

          <fieldset>
            <legend>Unidade de Negócios</legend>
            <p>{data.estacao?.unidade_regional}</p>
          </fieldset>

        </section>
      )}

    </>
  )
}

export default ItemChamadoPrincipal
