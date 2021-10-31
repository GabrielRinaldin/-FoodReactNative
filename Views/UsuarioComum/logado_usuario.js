import React, { useState } from "react";
import {Button, FlatList, SafeAreaView, Text, View, Modal, TouchableHighlight } from 'react-native';

export default class LogadoUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user: [],
    };
    this.redirect = this.redirect.bind(this);
    this.exit = this.exit.bind(this);
    this.getUser = this.getUser.bind(this);
    this.listaDoacoes = this.listaDoacoes.bind(this);
  }

  componentDidMount() {
    this.redirect();
    this.getUser();
    this.listaDoacoes();
  }
  redirect() {
    if (this.state.token == null) {
      this.props.navigation.navigate('Login');
      this.exit();
    }
  }

  exit() {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + this.state.token);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://localhost/passportProjet/public/api/auth/logout',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .then(this.props.navigation.navigate('Login'))
      .catch(error => console.log('error', error));
  }

  getUser() {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + this.state.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://192.168.1.4:8000/api/me', requestOptions)
      .then(response => response.json())
      .then(response => {
        this.setState({user: response});
      })
      .catch(error => console.log('error', error));
  }

  listaDoacoes() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'http://192.168.1.4:8000/api/doacao/',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => this.setState({data: result}))
      .catch(error => console.log('error', error));
      
  }

  render() {
    return (
      <View>
        <Text>Nome: {this.state.user.nome}</Text>
        <Text>Email: {this.state.user.email}</Text>
        <Text>Tipo: {this.state.user.tipo_usuario}</Text>
        <Text>Celular: {this.state.user.celular}</Text>


        <Text>Listagem de Doações Disponivel</Text>
        <SafeAreaView>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <View>
                <Text>{item.doacao}  {item.quantidade} {item.unidade_medida}</Text>
                <Text>Data de Validade: {item.validade}</Text>
                <Text>Ponto de coleta: {item.cidade} {item.bairro} {item.logradouro}{' '}{item.numero} {item.complemento}
                </Text>
              </View>
            )}
          />
        </SafeAreaView>

      </View>
    );
  }
}
