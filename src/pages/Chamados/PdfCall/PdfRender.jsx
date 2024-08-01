import embasaLogo from '../../../assets/embasaLogo.png';
import { Document, Page, StyleSheet, View, Text, Image } from '@react-pdf/renderer';

const PdfRender = ({ data }) => {

    const style = StyleSheet.create({
        page: {
            flexDirection: 'column',
            padding: '15px',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        header_section: {
            border: '1px solid black',
            padding: '3px',
            height: '25px',
            flexDirection: 'row ',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
            textAlign: 'center',
            backgroundColor: '#ccc',
            fontSize: '6px'
        },
        body_container: {
            flexDirection: 'row',
            justifyContent: 'center',
            // alignItems: 'center'
        },
        body: {
            border: '1px solid black',
            padding: '3px',
            height: 'auto',
            flexDirection: 'row ',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexWrap: 'wrap',
            textAlign: 'center',
            fontSize: '8px',
        }
    })

    return (
        <Document language='pt-br'>
            <Page size="A4" orientation='landscape' style={style.page}>

                <View style={{
                    flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center',
                    alignItems: 'center', textAlign: 'center', gap: '20px'
                }}>
                    <Image src={embasaLogo} style={{ width: '90px' }} />
                    <Text style={{ fontSize: '10px' }}>EMBASA - Empresa Baiana de Água e Saneamento</Text>
                </View>

                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignContent: 'center',
                    alignItems: 'center', textAlign: 'center', marginTop: '25px', marginBottom: '10px'
                }}>
                    <Text>Relatório de Extravasamento - AGERSA</Text>
                </View>

                <View style={style.header}>

                    <View style={[style.header_section, { width: '130px', fontSize: '9px' }]}>
                        <Text>INSTALAÇÃO</Text>
                    </View>

                    <View style={[style.header_section, { width: '180px', fontSize: '9px' }]}>
                        <Text>LOCALIZAÇÃO</Text>
                    </View>

                    <View style={[style.header_section, { width: '90px', fontSize: '7px' }]}>
                        <Text>DATA/HORA INÍCIO</Text>
                    </View>

                    <View style={[style.header_section, { width: '90px', fontSize: '7px' }]}>
                        <Text>DATA/HORA FINAL</Text>
                    </View>

                    <View style={[style.header_section, { width: '85px' }]}>
                        <Text>TEMPO DE EXTRAVASAMENTO (h)</Text>
                    </View>

                    <View style={[style.header_section, { width: '160px', fontSize: '9px' }]}>
                        <Text>MOTIVO</Text>
                    </View>

                </View>

                {data.map(called => (
                    <View key={called.id} style={style.body_container}>

                        <View style={[style.body, { width: '130px' }]}>
                            <Text>{called.unidade}</Text>
                        </View>

                        <View style={[style.body, { width: '180px' }]}>
                            <Text>{called.endereco}</Text>
                        </View>

                        <View style={[style.body, { width: '90px' }]}>
                            <Text>{called.createdAt}</Text>
                        </View>

                        <View style={[style.body, { width: '90px' }]}>
                            <Text>{called.dataEncerramento ? called.dataEncerramento : '-'}</Text>
                        </View>

                        <View style={[style.body, { width: '85px' }]}>
                            <Text>{called.tempoTotalExtravasamento}</Text>
                        </View>

                        <View style={[style.body, { width: '160px' }]}>
                            <Text>{called.motivo}</Text>
                        </View>

                    </View>
                ))}
            </Page>
        </Document>
    )
}

export default PdfRender