import React, { useState } from "react";
import {FlatList, SafeAreaView, Text, View, Modal, TouchableHighlight, StyleSheet } from 'react-native';
import {Button} from 'react-native-elements';

export default class DoacaoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user_id: props.route.params.user_id,

      data: [],
      arrayStatus: [
        ['Todos', ''],
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
      'http://192.168.1.4:8000/api/user/doacao/' +
        this.state.user_id +
        '?status=' +
        this.state.status,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => this.setState({data: result}))
      .catch(error => console.log('error', error));
      
  }

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
      <View style={style.view}>
        <Button buttonStyle={style.button} onPress={() => this.togglePicker()} title={ "BUSCAR POR STATUS" } />

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

        <Text style={style.textDoacao}>DOAÇÔOES CADASTRADAS</Text>
        <SafeAreaView style={style.areaView}>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <View>
                <Text style={style.text}>NOME: {item.nome}</Text>
                <Text style={style.text}>
                  QUANTIDADE: {item.quantidade} {item.unidade_medida}
                </Text>
                <Text style={style.text}>STATUS: {item.status}</Text>
                <Text style={style.text}>VALIDADE: {item.validade}</Text>
                <Text style={style.text}> 
                  ENDEREÇO: {item.cidade} {item.bairro} {item.logradouro}{' '}
                  {item.numero} {item.complemento}
                </Text>
                <Text style={style.textDoacao}>__________________________________________________</Text>
              </View>
            )}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const style = StyleSheet.create({
  view: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    height: '100%',
  },
  areaView: {
    borderWidth: 2,
    borderColor: '#999999',
    borderRadius: 30,
    margin: 20,
  },
  button:{
    backgroundColor:'#E57C2F',
    width:250,
    borderRadius:30,
    borderWidth:2,
    borderColor:'#FFFFFF',
    textAlign:'center',
    marginBottom:20,
    marginHorizontal: 80,
    marginVertical: 20,
  },

  text: {
    marginVertical: 10,
    marginHorizontal: 20,
    marginTop: 10,
    color: '#757575',
  },
  textDoacao: {
    marginHorizontal: 20,
    marginTop: 10,
    color: '#757575',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
