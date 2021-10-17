import React, { useState } from "react";
import {Button, FlatList, SafeAreaView, Text, View, Modal, TouchableHighlight } from 'react-native';

export default class DoacaoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user_id: props.route.params.user_id,

      data: [],
      arrayStatus: [
        ['Disponivel', 'disponivel'],
        ['Retirado', 'retirado'],
        ['Expirado', 'expirado'],
      ],

      visible: false,
      status: '',

      pickerSelection: 'Default value!',
      pickerDisplayed: false

    };
    this.listaDoacoes = this.listaDoacoes.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  componentDidMount() {
    this.listaDoacoes();
    this.redirect();
  }
  redirect() {
    if (this.state.token == null) {
      this.props.navigation.navigate('Login');
    }
  }
  listaDoacoes() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'http://192.168.1.74:8000/api/user/doacao/' +
        this.state.user_id +
        '?status=' +
        this.state.status,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => this.setState({data: result}))
      .catch(error => console.log('error', error));
      
  }

//   async updateDoacao(key) {
//     var myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');

//     var raw = JSON.stringify({
//       estado: this.state.estado,
//       cidade: this.state.cidade,
//       bairro: this.state.bairro,
//       logradouro: this.state.logradouro,
//       numero: this.state.numero,
//       complemento: this.state.complemento,
//     });

//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     };

//     fetch('http://192.168.1.74:8000/api/user/endereco/' + key, requestOptions)
//       .then(response => response.json())
//       .then(this.listaEnderecos)
//       .then(this.setState({visible: false}))
//       .then(response => alert(response.msg))
//       .catch(error => console.log('error', error));
//   }

  setPickerValue(newValue) {
    this.setState({
      status: newValue
    })

    this.listaDoacoes();
    this.togglePicker();
  }

  togglePicker() {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed
    })
  }

  render() {
    return (
      <View>
        <Button onPress={() => this.togglePicker()} title={ "Busque pelo status!" } />

        <Modal visible={this.state.pickerDisplayed} animationType={"slide"} transparent={true}>
          <View style={{ margin: 20, padding: 20,
            backgroundColor: '#efefef',
            bottom: 20,
            left: 20,
            right: 20,
            alignItems: 'center',
            position: 'absolute' }}>
            { this.state.arrayStatus.map((value, index) => {
              return <TouchableHighlight key={index} onPress={() => this.setPickerValue(value[1])}>
                  <Text>{ value[0] }</Text>
                </TouchableHighlight>
            })}
            <TouchableHighlight onPress={() => this.togglePicker()} style={{ paddingTop: 4, paddingBottom: 4 }}>
              <Text style={{ color: '#999' }}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </Modal>

        <Text>Listagem de Produtos</Text>
        <SafeAreaView>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <View>
                <Text>nome: {item.nome}</Text>
                <Text>
                  quantidade: {item.quantidade} {item.unidade_medida}
                </Text>
                <Text>status: {item.status}</Text>
                <Text>validade: {item.validade}</Text>
                <Text>
                  endereco: {item.cidade} {item.bairro} {item.logradouro}{' '}
                  {item.numero} {item.complemento}
                </Text>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    );
  }
}
