import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';


import imgFactory from '../assets/img/factory-persona.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    fontFamily: 'sans-serif-condensed',
  },
  h1: {
    fontFamily: 'sans-serif-condensed',
    fontSize: 22,
    marginVertical: 20,
  },
  textIntro: {
    fontFamily: 'sans-serif-condensed',
    color: '#4B4C4C',
    marginVertical: 20,
    marginHorizontal: 10,
    textAlign: 'justify',
  },
  text2: {
    marginHorizontal: 10,
    fontFamily: 'sans-serif-condensed',
    color: '#4B4C4C',
    textAlign: 'justify',
  },
  hr: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
  },
  imgFactory: {
    width: 376,
    height: 198,
  },
  divImg: {
    width: 380,
    height: 200,
    padding: 3,
    //
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.75,
    shadowRadius: 2,
    elevation: 5,
  },
  txtClickme: {
    marginVertical: 15,
    fontFamily: 'sans-serif-condensed',
    color: '#4B4C4C',

  },
});

export default class Start extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.h1}>O melhor gerador de persona</Text>
          <View style={styles.divImg}>
            <Image style={styles.imgFactory} source={imgFactory} />
          </View>
          <Text style={styles.textIntro}> <Text style={{ color: '#ea6900' }}>Persona</Text> é o perfil detalhado de um cliente que representa um público-alvo de uma marca. Ele é um personagem fictício utilizado no marketing digital, sobretudo no marketing de conteúdos. A criação de um ou mais personas tem como objetivo conhecer melhor para quem são direcionadas as mensagens dentro da estratégia de comunicação digital de uma marca.</Text>

          <Text>Como utilizar?</Text>
          <Text style={styles.text2}> Preencha todos os campos do formulário e por fim clique no botão <Text style={{color: '#ea6900'}}>criar</Text>, conceder permissão ao aplicativo e por fim verificar na pasta Documentos/Docs o arquivo <Text style={{color: '#ea6900'}}>personaGenerator.pdf</Text>.</Text>

          <Text style={styles.txtClickme}>Clique abaixo e para criar.</Text>
          
          <View style={{marginVertical: 20}}>
            <Button title="Começar" onPress={() => this.props.navigation.navigate('Form')}/>
          </View>
          
        </View>
      </ScrollView>
    );
  }
}