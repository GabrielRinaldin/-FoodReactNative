import React, {Component} from 'react';
import {StyleSheet, View, SafeAreaView, Text, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: [],
      email: '',
      password: '',
      msg: '',
    };
    this.login = this.login.bind(this);
  }

  login() {
    var requestOptions = {
      method: 'POST',
      redirect: 'follow',
    };

    fetch(
      'http://192.168.1.74:8000/api/auth/login?email=' +
        this.state.email +
        '&password=' +
        this.state.password,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        this.setState({token: result.data.token});
      })
      .then(() => {
        this.props.navigation.navigate('ChecaUserTipo', {token: this.state.token});
      })
      .catch(error => alert('error', error));
  }

  render() {
    return (
      <View>
        <Text>{this.state.msg}</Text>
        <Text>Login</Text>
        <TextInput
          placeholder="Email"
          onChangeText={value => this.setState({email: value})}></TextInput>
        <TextInput
          placeholder="Senha"
          onChangeText={value => this.setState({password: value})}
          secureTextEntry={true}></TextInput>
        <Button title="Entrar" onPress={this.login}></Button>
      </View>
    );
  }
}
