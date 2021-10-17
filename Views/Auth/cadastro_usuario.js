import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

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
      'http://192.168.1.74:8000/api/auth/register?nome=' +
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
      <View>
        <Text>Cadastro</Text>
        <TextInput
          placeholder="Nome"
          value={this.state.name}
          onChangeText={value => this.setState({name: value})}></TextInput>
        <TextInput
          placeholder="Email"
          value={this.state.email}
          onChangeText={value => this.setState({email: value})}></TextInput>
        <TextInput
          placeholder="Celular"
          value={this.state.celular}
          onChangeText={value => this.setState({celular: value})}></TextInput>
        <TextInput
          placeholder="Senha"
          value={this.state.password}
          onChangeText={value => this.setState({password: value})}></TextInput>
        <TextInput
          placeholder="Confirme a senha"
          value={this.state.password_confirmation}
          onChangeText={value =>
            this.setState({password_confirmation: value})
          }></TextInput>
        <Button title="Cadastrar" onPress={this.insert}></Button>
      </View>
    );
  }
}
