const classe_de_sintomas = {
    'Motores': [
        "Leitura anormal do instrumento",
        "Avaria",
        "Saída Errática",
        "Vazamento externo - combustível",
        "Vazamento externo - fluido de processo",
        "Vazamento externo - fluido de utilidades",
        "Falha p/ partir sob demanda",
        "Saída Alta",
        "Vazamento interno",
        "Saída Baixa",
        "Ruído",
        "Sobreaquecimento",
        "Desvio de parâmetro",
        "Entupimento",
        "Pequenos problemas em serviço",
        "Deficiência estrutural",
        "Falha p/ parar sob demanda",
        "Outros",
        "Desconhecido",
        "Parada espúria",
        "Vibração"
    ],

    'Bombas': [
        "Leitura anormal do instrumento",
        "Avaria",
        "Saída Errática",
        "Vazamento externo - combustível",
        "Vazamento externo - fluido de processo",
        "Vazamento externo - fluido de utilidades",
        "Falha p/ partir sob demanda",
        "Saída Alta",
        "Vazamento interno",
        "Saída Baixa",
        "Ruído",
        "Sobreaquecimento",
        "Desvio de parâmetro",
        "Entupimento",
        "Pequenos problemas em serviço",
        "Operação Espúria",
        "Deficiência estrutural",
        "Desconhecido",
        "Parada espúria",
        "Vibração"
    ],

    'Transformador': [
        "Leitura anormal do instrumento",
        "Vazamento externo - fluido de utilidades",
        "Tensão de saída defeituosa",
        "Falha ao funcionar sob demanda",
        "Vazamento interno",
        "Sobreaquecimento",
        "Outros",
        "Desvio de parâmetro",
        "Entupimento",
        "Pequenos problemas em serviço",
        "Deficiência estrutural",
        "Desconhecido"
    ],

    'Equipamentos Elétricos Genéricos': [
        "Leitura anormal do instrumento",
        "Avaria",
        "Operação retardada",
        "Vazamento externo - fluido de utilidades",
        "Saída errática",
        "Frequência de saída defeituosa",
        "Tensão de saída defeituosa",
        "Falha para fechar por solicitação",
        "Falha ao funcionar sob demanda",
        "Falha em funcionar como esperado",
        "Falha para abrir por solicitação",
        "Falha para modular",
        "Saída Alta",
        "Vazamento interno",
        "Saída Baixa",
        "Ruído",
        "Sobreaquecimento",
        "Outros",
        "Desvio de parâmetros",
        "Entupimento",
        "Pequenos problemas em serviço",
        "Operação Espúria",
        "Falha de transmissão / comunicação",
        "Desconhecido",
        "Parada espúria",
        "Vibração"
    ],

    'Tubulações': [
        "Leitura anormal do instrumento",
        "Avaria",
        "Vazamento externo - fluido de processo",
        "Vazamento externo - fluido de utilidades",
        "Vazamento interno",
        "Ruído",
        "Sobreaquecimento",
        "Outros",
        "Desvio de parâmetro",
        "Entupimento",
        "Falha de transmissão de sinal / potência",
        "Pequenos problemas em serviço",
        "Deficiência estrutural",
        "Desconhecido",
        "Vibração"
    ],

    'Geradores Elétricos': [
        "Leitura anormal do instrumento",
        "Avaria",
        "Vazamento externo - fluido de utilidades",
        "Falha p/ partir sob demanda",
        "Saída Baixa",
        "Ruído",
        "Sobreaquecimento",
        "Desvio de parâmetro",
        "Pequenos problemas em serviço",
        "Deficiência estrutural",
        "Falha p/ parar sob demanda",
        "Outros",
        "Desconhecido",
        "Parada espúria",
        "Vibração"
    ],

    'Sistema de Controle': [
        "Leitura anormal do instrumento",
        "Vazamento externo - fluido de utilidades",
        "Saída Errática",
        "Falha ao funcionar sob demanda",
        "Falha durante operação",
        "Vazamento interno - fluido de utilidades",
        "Perda de redundância",
        "Sem efeito imediato",
        "Outros",
        "Curto-circuito",
        "Operação Espúria",
        "Falha de transmissão",
        "Desconhecido"
    ],

    'Válvulas Atuadores': [
        "Leitura anormal do instrumento",
        "Operação retardada",
        "Vazamento externo - fluido de processo",
        "Vazamento externo - fluido de utilidades",
        "Falha para fechar por solicitação",
        "Falha para abrir por solicitação",
        "Falha para modular",
        "Saída Alta",
        "Vazamento interno",
        "Saída Baixa",
        "Outros",
        "Pequenos problemas em serviço",
        "Operação Espúria",
        "Deficiência estrutural",
        "Desconhecido",
        "Vazamento pela válvula na posição fechada"
    ],

    'Equipamentos Mecânicos Genéricos': [
        "Leitura anormal do instrumento",
        "Avaria",
        "Vazamento externo - fluido de processo",
        "Vazamento externo - fluido de utilidades",
        "Falha ao conectar",
        "Transferência insuficiente de calor",
        "Vazamento interno",
        "Falha no SPDA",
        "Falha ao girar",
        "Falha ao desconectar",
        "Falha em funcionar como esperado",
        "Falha p/ partir sob demanda",
        "Baixa pressão de suprimento de óleo",
        "Queda de carga",
        "Perda de flutuabilidade",
        "Saída Baixa",
        "Falha de amarração",
        "Ruído",
        "Sobreaquecimento",
        "Outros",
        "Desvio de parâmetro",
        "Entupimento",
        "Falha de transmissão de sinal / potência",
        "Acúmulo de lodo",
        "Pequenos problemas em serviço",
        "Derrapagem",
        "Operação Espúria",
        "Deficiência estrutural",
        "Falha p/ parar sob demanda",
        "Desconhecido",
        "Vibração"
    ],

    'UPS': [
        "Saída errática",
        "Frequência de saída defeituosa",
        "Tensão de saída defeituosa",
        "Falha ao funcionar sob demanda",
        "Sobreaquecimento",
        "Outros",
        "Desvio de parâmetro",
        "Pequenos problemas em serviço",
        "Operação Espúria",
        "Desconhecido"
    ],
    'Chaves (Disjuntor, Seccionada)': [
        "Vazamento externo - fluido de utilidades",
        "Falha para fechar por solicitação",
        "Falha ao funcionar sob demanda",
        "Falha em funcionar como esperado",
        "Falha para abrir por solicitação",
        "Ruído",
        "Sobreaquecimento",
        "Outros",
        "Operação Espúria",
        "Desconhecido",
        "Parada espúria",
        "Vibração"
    ],

    'Acionamentos Eletrônica de Potência': [
        "Leitura anormal do instrumento",
        "Avaria",
        "Operação retardada",
        "Vazamento externo - fluido de utilidades",
        "Saída Errática",
        "Falha ao parar",
        "Falha ao partir",
        "Falha ao funcionar sob demanda",
        "Falha em funcionar como esperado",
        "Falha para modular",
        "Falha durante operação",
        "Saída alta",
        "Vazamento interno",
        "Saída baixa",
        "Sobreaquecimento",
        "Outros",
        "Desvio de parâmetros",
        "Entupimento",
        "Pequenos problemas em serviço",
        "Operação Espúria",
        "Falha de transmissão / comunicação",
        "Desconhecido",
        "Parada espúria"
    ]
};

export default classe_de_sintomas