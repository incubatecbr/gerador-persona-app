import React, { Component, Fragment } from 'react';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, Button, Picker, Alert, TouchableOpacity, Platform, PermissionsAndroid, FlatList } from 'react-native';
import logo from '../assets/img/logo.png';
import arrImages from './img64';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import Spinner from 'react-native-loading-spinner-overlay';
// import * as yup from 'yup';
// import { Formik } from 'formik';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filePath: '',
            spinner: false,
            avatar: [
                { id: 0, name: "homem1",  image: require("../assets/img/homem1.png") },
                { id: 1, name: "homem2",  image: require("../assets/img/homem2.png") },
                { id: 2, name: "homem3",  image: require("../assets/img/homem3.png") },
                { id: 3, name: "mulher1", image: require("../assets/img/mulher1.png")},
                { id: 4, name: "mulher2", image: require("../assets/img/mulher2.png")},
                { id: 5, name: "mulher3", image: require("../assets/img/mulher3.png")}
            ],
            selectedItem: null
        };
    }

    //modifica navigationOptions somente nessa pagina.
    static navigationOptions = {
        headerTitle: (<Image source={logo} style={{ marginHorizontal: 50 }} />)
    };

    submitForm(data){
        console.log(arrImages);
        const img64 = arrImages.filter( ({name}) => name == data.avatar);
        console.log(img64);
    }


    //função responsavel por solicitar a permissão de escrita do usuario
    askPermissionUser(data) {
        var that = this;
        async function requestExternalWritePermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Gerador de persona request External Storage Write Permission',
                        message: 'Gerador de persona needs access to Storage data in your SD Card ',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //caso permita, chama função criar o pdf

                    that.createPDF(data);
                    //alert('Arquivo criado, por favor verifique na Documentos/Docs presente em seu cartão de memoria!');
                } else {
                    alert('Permissão negada!');
                    return false;
                }
            } catch (err) {
                alert('Problema com permissão para escrita.', err);
                //console.warn(err);
            }
        }
        //Chamando a função
        if (Platform.OS === 'android') {
            requestExternalWritePermission();
        } else {
            //this.createPDF(data);
        }
    }

    //Função responsavel por criar o PDF.
    async createPDF(data) {
        const imgSelected = arrImages.filter( ({name}) => name == data.avatar);
        const imgRD = arrImages.filter( ({name}) => name == 'logoReferencia');

        this.setState({ spinner: true });//show spinner
        let htmlPDF = `<div style="margin: 0; padding: 50px; text-align: center;">
                    <img src="${imgSelected[0].base64}" style="width: 260px; height: 260px;">
                    <h1 style="color:#00db5e;">${data.nome}</h1>
                    <h2 style="color:grey;">${data.cargo}</h2>
                        <div style="text-align: left;">
                            <p style="font-size: 1.2em; font-weight: 700;  line-height: .4;">Empresa: <span style="font-weight: 400;">${data.empresa}</span> </p>
                            <p style="font-size: 1.2em; font-weight: 700;  line-height: .4;">Idade: <span style="font-weight: 400;">${data.idade}</span> </p>
                            <p style="font-size: 1.2em; font-weight: 700;  line-height: .4;">Genêro: <span style="font-weight: 400;">${data.sexo}</span> </p>
                            <p style="font-size: 1.2em; font-weight: 700;  line-height: .4;">Educação: <span style="font-weight: 400;">${data.escolaridade}</span> </p>
                            <p style="font-size: 1.2em; font-weight: 700;  line-height: .4;">Mídias: <span style="font-weight: 400;">${data.comunicacao}</span> </p>
                            <p style="font-size: 1.2em; font-weight: 700;  line-height: .4;">Objetivos: <span style="font-weight: 400;">${data.objetivo}</span> </p>
                            <p style="font-size: 1.2em; font-weight: 700;  line-height: .4;">Desafios: <span style="font-weight: 400;">${data.desafio}</span> </p>
                            <p style="font-size: 1.2em; font-weight: 700;  line-height: .4;">Como minha empresa pode ajudá-lá: <span style="font-weight: 400">${data.desafio}</span> </p>
                        </div>
                        <img src='${imgRD[0].base64}' style="width: 210px; height: auto; margin-top: 20px;">
                    </div>`;

        let options = {
            //Conteudo html
            html: htmlPDF,
            //Nome pdf
            fileName: 'pdfNew5',
            //Onde salvará
            directory: 'Documents',
        };
        let file = await RNHTMLtoPDF.convert(options);
        this.setState({ filePath: file.filePath });
        this.setState({ spinner: false });
        alert('Arquivo criado, por favor verifique na Documentos/Docs presente em seu cartão de memoria!');
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.textWar}>Preencha todos os campos abaixo e selecione um avatar para gerar sua peronsa!</Text>
                    <Formik initialValues={{ nome: '', sexo: '', idade: '', cargo: '', empresa: '', escolaridade: '', comunicacao: '', objetivo: '', desafio: '', helper: '', avatar: '' }} onSubmit={values => this.askPermissionUser(values)}
                        validationSchema={yup.object().shape({
                            nome: yup
                                .string()
                                .required("Por favor informe o nome"),
                            sexo: yup
                                .string()
                                .required("Informe o sexo"),
                            idade: yup
                                .number()
                                .integer()
                                .typeError('Por favor informe apenas o numeros.')
                                .required("Por favor informe a idade"),
                            cargo: yup
                                .string()
                                .required("Por favor informe o cargo"),
                            empresa: yup
                                .string()
                                .required("Por favor informe onde a persona trabalha"),
                            escolaridade: yup
                                .string()
                                .required("Por selecione uma opção."),
                            comunicacao: yup
                                .string()
                                .required("Informe-nos algo"),
                            objetivo: yup
                                .string()
                                .required("Informe algum objetivo para a persona"),
                            desafio: yup
                                .string()
                                .required("Informe-nos quais os principais desafios dessa persona"),
                            helper: yup
                                .string()
                                .required("Informe como sua empresa pode auxilar a persona"),
                            avatar: yup
                                .string()
                                .required("Escolha o avatar"),
                        })}>
                        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                            <Fragment>
                                <Text style={styles.text}>Nome da <Text style={styles.txtPersona}>persona</Text></Text>
                                <TextInput style={[styles.input, (touched.nome && errors.nome) ? styles.borderError : null]} placeholder="Exemplo: João, o grande empresário" onChangeText={handleChange('nome')} value={values.nome} onBlur={() => setFieldTouched('nome')} />
                                {touched.nome && errors.nome &&
                                    <Text style={styles.errorMsg}>{errors.nome}</Text>
                                }

                                <Text style={styles.text}>Sexo da <Text style={styles.txtPersona}>persona</Text></Text>
                                <Picker mode='dropdown'
                                    selectedValue={String(values.sexo)}
                                    style={styles.select}
                                    onValueChange={(itemValue, itemIndex) => {
                                        handleChange('sexo')(String(itemValue));
                                        setFieldTouched('sexo', itemValue);
                                    }}>

                                    <Picker.Item label="Escolha o sexo" value={null} key={0} />
                                    <Picker.Item label="Masculino" value="Masculino" key={1} />
                                    <Picker.Item label="Feminino" value="Feminino" key={2} />
                                </Picker>
                                {touched.sexo && errors.sexo &&
                                    <Text style={styles.errorMsg}>{errors.sexo}</Text>
                                }

                                <Text style={styles.text} >Idade da <Text style={styles.txtPersona}>persona</Text></Text>
                                <TextInput style={[styles.input, (touched.idade && errors.idade) ? styles.borderError : null]} keyboardType={'numeric'} maxLength={2} onChangeText={handleChange('idade')} value={values.idade} onBlur={() => setFieldTouched('idade')} />
                                {touched.idade && errors.idade &&
                                    <Text style={styles.errorMsg}>{errors.idade}</Text>
                                }

                                <Text style={styles.text}>Cargo/Ocupação - O que sua <Text style={styles.txtPersona}>persona</Text> faz?</Text>
                                <TextInput style={[styles.input, (touched.cargo && errors.cargo) ? styles.borderError : null]} placeholder="Exemplo: Sócio e Diretor Executivo" maxLength={35} onChangeText={handleChange('cargo')} value={values.cargo} onBlur={() => setFieldTouched('cargo')} />
                                {touched.cargo && errors.cargo &&
                                    <Text style={styles.errorMsg}>{errors.cargo}</Text>
                                }

                                <Text style={styles.text}>Onde sua <Text style={styles.txtPersona}>persona</Text> trabalha?</Text>
                                <TextInput style={[styles.input, (touched.empresa && errors.empresa) ? styles.borderError : null]} placeholder="Exemplo: Empresa de marketing digital" maxLength={35} onChangeText={handleChange('empresa')} value={values.empresa} onBlur={() => setFieldTouched('empresa')} />
                                {touched.empresa && errors.empresa &&
                                    <Text style={styles.errorMsg}>{errors.empresa}</Text>
                                }

                                <Text style={styles.text}>Nivel de escolaridade da <Text style={styles.txtPersona}>Persona</Text></Text>
                                <Picker mode='dropdown'
                                    selectedValue={values.escolaridade}
                                    style={styles.select}
                                    onValueChange={(itemValue, itemIndex) => {
                                        handleChange('escolaridade')(String(itemValue));
                                        setFieldTouched('escolaridade', itemValue)
                                    }}>
                                    <Picker.Item label="Selecione uma opção" value={null} key={0} />
                                    <Picker.Item label="Ensino médio" value="Ensino médio" key={1} />
                                    <Picker.Item label="Ensino técnico" value="Ensino técnico" key={2} />
                                    <Picker.Item label="Ensino superior" value="Ensino superior" key={3} />
                                    <Picker.Item label="Mestrado" value="Mestrado" key={4} />
                                    <Picker.Item label="Doutorado" value="Doutorado" key={5} />
                                    <Picker.Item label="Pós-doutorado" value="Pós-doutorado" key={6} />
                                </Picker>
                                {touched.escolaridade && errors.escolaridade &&
                                    <Text style={styles.errorMsg}>{errors.escolaridade}</Text>
                                }

                                <Text style={styles.text}>Quais os meios de comunicação usados pela <Text style={styles.txtPersona}>Persona</Text>? </Text>
                                <TextInput style={[styles.input, (touched.comunicacao && errors.comunicacao) ? styles.borderError : null]} placeholder="Exemplo: Leitor de revista cientificas e utiliza o Twitter" onChangeText={handleChange('comunicacao')} value={values.comunicacao} />
                                {touched.comunicacao && errors.comunicacao &&
                                    <Text style={styles.errorMsg}>{errors.comunicacao}</Text>
                                }

                                <Text style={styles.text}>Quais os principais objetivos desta <Text style={styles.txtPersona}>Persona</Text>? </Text>
                                <TextInput style={[styles.input, (touched.objetivo && errors.objetivo) ? styles.borderError : null]} onChangeText={handleChange('objetivo')} value={values.objetivo} />
                                {touched.objetivo && errors.objetivo &&
                                    <Text style={styles.errorMsg}>{errors.objetivo}</Text>
                                }

                                <Text style={styles.text}>Quais os principais problemas/desafios desta <Text style={styles.txtPersona}>Persona</Text>? </Text>
                                <TextInput style={[styles.input, (touched.desafio && errors.desafio) ? styles.borderError : null]} onChangeText={handleChange('desafio')} value={values.desafio} />
                                {touched.desafio && errors.desafio &&
                                    <Text style={styles.errorMsg}>{errors.desafio}</Text>
                                }

                                <Text style={styles.text}>Como minha empresa pode ajudar esta <Text style={styles.txtPersona}>Persona</Text>? </Text>
                                <TextInput style={[styles.input, (touched.helper && errors.helper) ? styles.borderError : null]} onChangeText={handleChange('helper')} value={values.helper} />
                                {touched.helper && errors.helper &&
                                    <Text style={styles.errorMsg}>{errors.helper}</Text>
                                }

                                <FlatList 
                                    extraData={this.state.selectedItem}
                                    data={this.state.avatar} 
                                    numColumns={3} 
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity style={styles.touch}
                                            onPress={() => {
                                                this.setState({selectedItem: item.id});
                                                handleChange('avatar')(String(item.name));
                                                setFieldTouched('avatar', item.name);
                                            }}>
                                            <View style={styles.divAvatar} onPress={() => Alert.alert(item.id)}>
                                                <Image source={item.image} style={[styles.imgAvatar, (this.state.selectedItem === item.id) ? styles.activeAvatar : null]}></Image>
                                                <Text>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    }
                                />
                                {touched.avatar && errors.avatar &&
                                    <Text style={styles.errorMsg}>{errors.avatar}</Text>
                                }

                                <View style={styles.btn}>
                                    <Button
                                        title='CRIAR PERSONA'
                                        onPress={handleSubmit}
                                    />
                                </View>
                                {/* SPINNER LOADING BEFORE CLICK BUTTOM */}
                                <Spinner visible={this.state.spinner} textContent={'Aguarde...'} textStyle={{ color: "#FFF" }} overlayColor={"rgba(96, 96, 96, 0.85)"} />

                            </Fragment>
                        )}
                    </Formik>

                </View>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    borderError: {
        borderColor: "red",
    },
    select: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 12,
        backgroundColor: 'rgba(49,118,184, 0.3)',
        width: '95%',
        height: 35,
        marginVertical: 10,
    },
    input: {
        fontFamily: 'sans-serif-condensed',
        borderColor: "#3176B8",
        borderWidth: 1,
        width: '95%',
        height: 40,
        marginVertical: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgBox: {
        marginTop: 5,
        marginBottom: 10,
        width: 90,
        height: 90,
    },

    textWar: {
        marginTop: 7,
        textAlign: 'center',
        fontFamily: 'sans-serif-condensed',
        fontSize: 15,
        marginBottom: 10,
    },
    space: {
        margin: 20,
    },
    text: {
        fontFamily: 'sans-serif-condensed',
        fontSize: 14,
    },
    txtPersona: {
        color: '#3176B8',
        fontWeight: 'bold',
    },
    errorMsg: {
        marginTop: -10,
        marginBottom: 20,
        fontSize: 10,
        color: 'red',
    },
    imgAvatar: {
        borderColor: '#3176B8',
        borderRadius: 39,
        margin: 10,
        width: 80,
        height: 80,
    },
    divAvatar: {
        alignItems: 'center',
    },
    activeAvatar: {
        borderWidth: 3,
        borderColor: '#3176B8',
        borderRadius: 39,
    },
    teste: {
        borderWidth: 3,
        borderColor: '#3176B8',
    },
    btn: {
        marginVertical: 20,
    },
    spinnerTextStyle: {
        color: '#3176B8',
        fontWeight: 'bold',
    },
    touch: {
        margin: 5,
    },
});