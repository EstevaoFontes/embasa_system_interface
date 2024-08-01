import styles from './DataStation.module.css';

import { useForm } from 'react-hook-form';

 import { useAuth } from '../../../../context/AuthProvider'

const DataStation = ({register}) => {

  const { user, permissions } = useAuth();

  const userPermission = permissions.edit_called.includes(user.funcao);

  return (
    <div>
      <h1>DADOS DA ESTAÇÃO</h1>
      <label>
        <span>Nome Estação:</span>
        <input
          type="text"
          placeholder="Insira o nome da Estação"
          {...register('nome_estacao[[')}
          disabled={!userPermission}
        />
      </label>
      <label>
        <span>Endereço:</span>
        <input
          type="text"
          placeholder="Insira o Endereço"
          {...register('endereco')}
          disabled={!userPermission}
        />
      </label>
      <label>
        <span>Sistema de Disposição Oceânica:</span>
        <input
          type="text"
          placeholder="Insira o Sistema de Disposição Oceânica"
          {...register('sistema_disposicao_oceanica')}
          disabled={!userPermission}
        />
      </label>
      <label>
        <span>Bacia:</span>
        <input
          type="text"
          placeholder="Insira a Bacia"
          {...register('bacia')}
          disabled={!userPermission}
        />
      </label>
      <label>
        <span>Vazão de Projeto:</span>
        <input
          type="text"
          placeholder="Insira a Vazão"
          {...register('vazao')}
        />
      </label>
      <label>
        <span>Média PIPPE:</span>
        <input
          type="text"
          placeholder="Insira a média de extravasamento indicado no programa pippe"
          {...register('pippe')}
          disabled={!userPermission}
        />
      </label>
      <label>
        <span>Técnico da Área:</span>
        <input
          type="text"
          placeholder="Insira o Técnico Responsável"
          {...register('reponsavel')}
        />
      </label>

      <label>

        <span> Área de vulnerabilidade Social ?</span>
        <div className={styles.check}>
          <input type="radio"  id="sim" value={"SIM"} name='area_vulnerabilidade_social' {...register('area_vulnerabilidade_social')} />
          <span>SIM</span>
        </div>

        <div className={styles.check}>
          <input type="radio" value={"NÃO"} name='area_vulnerabilidade_social' {...register('area_vulnerabilidade_social')}/>
          <span>NÃO</span>
        </div>
      </label>

      <label>
        <span>Coordenadas:</span>
        <input
          type="text"
          placeholder="Insira as Coordenadas da Estação"
          {...register('coordenadas')}
        />
      </label>

      <label>
        <span>Supervisão de Manutenção:</span>
        <input
          type="text"
          placeholder="Insira o Responsável pela Manutenção"
          {...register('area_manutencao')}
        />
      </label>
      <label>
        <span>Início da Operação:</span>
        <input
          type="text"
          placeholder="Insira a data de Início da Operação"
          {...register('data_inicio_operacao')}
        />
      </label>
      <label>
        <span>Monitor da Área:</span>
        <input
          type="text"
          placeholder="Insira o nome do Monitor"
          {...register('nome_monitor')}
        />
      </label>
      <label>
        <span>UR de Abrangência:</span>
        <input
          type="text"
          placeholder="Insira as Siglas da Unidade"
          {...register('unidade_regional')}
        />
      </label>

      <label>
        <span>Conta Contrato Coelba:</span>
        <input
          type="text"
          placeholder="Insira a Conta Contrato Coelba"
          {...register('conta_contrato_coelba')}
        />
      </label>
    </div>
  )
}

export default DataStation
