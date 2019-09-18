import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import logo from '../assets/img/logo.png';

export default class ShareFile extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        console.log('PRONTO!');
    }

    static navigationOptions = {
        headerTitle: (<Image source={logo} style={{ marginHorizontal: 50 }} />)
    };


    render() {

        const { params } = this.props.navigation.state;
        const b = params.teste;

        return (
            <View>
                <Text> ShareFile </Text>
                <Text> {JSON.stringify(params)} </Text>
            </View>
        )
    }
}
