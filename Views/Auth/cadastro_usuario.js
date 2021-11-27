import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';

export default class CadastroUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      celular: '',
      password: '',
      password_confirmation: '',
    };
    this.insert = this.insert.bind(this);
  }

  insert() {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    var raw = '';

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'http://192.168.1.4:8000/api/auth/register?nome=' +
        this.state.name +
        '&password=' +
        this.state.password +
        '&password_confirmation=' +
        this.state.password_confirmation +
        '&email=' +
        this.state.email +
        '&celular=' +
        this.state.celular +
        '&tipo_usuario=comun',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => alert(result))
      .catch(error => alert('error', error));
  }
  render() {
    return (
      <View style={style.view}>
        <Text style={style.text}>Cadastrar-se</Text>
        <TextInput
        style={style.input1} placeholderTextColor='#FFFFFF'
          placeholder="Nome"
          value={this.state.name}
          onChangeText={value => this.setState({name: value})}></TextInput>
        <TextInput
        style={style.input1} placeholderTextColor='#FFFFFF'
          placeholder="Email"
          value={this.state.email}
          onChangeText={value => this.setState({email: value})}></TextInput>
        <TextInput
        style={style.input1} placeholderTextColor='#FFFFFF'
          placeholder="Celular"
          value={this.state.celular}
          onChangeText={value => this.setState({celular: value})}></TextInput>
        <TextInput
         secureTextEntry={true}
        style={style.input1} placeholderTextColor='#FFFFFF'
          placeholder="Senha"
          value={this.state.password}
          onChangeText={value => this.setState({password: value})}></TextInput>
        <TextInput
         secureTextEntry={true}
        style={style.input1} placeholderTextColor='#FFFFFF'
          placeholder="Confirme a senha"
          value={this.state.password_confirmation}
          onChangeText={value =>
            this.setState({password_confirmation: value})
          }></TextInput>
        <Button buttonStyle={style.button} title="Cadastrar" onPress={this.insert}></Button>
      </View>
    );
  }
}

const style = StyleSheet.create({
  view: {
    backgroundColor: '#E57C2F',
    width: '100%',
    height: '100%',
  },
    input1: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderColor:'#FFFFFF',
    marginHorizontal: 50,
    marginVertical: 10,
  },
  input2: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderColor:'#FFFFFF',
    marginHorizontal: 50,
    
  },
  button:{
    backgroundColor:'#E57C2F',
    width:250,
    borderRadius:30,
    borderWidth:2,
    borderColor:'#FFFFFF',
    textAlign:'center',
    marginBottom:7,
    marginHorizontal: 80,
    marginVertical: 20,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginHorizontal: 140,
    marginTop: 80,
    marginBottom:20,
    color: '#FFFFFF'
  },
});
