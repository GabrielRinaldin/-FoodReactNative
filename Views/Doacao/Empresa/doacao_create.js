import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-datepicker';
import {Button} from 'react-native-elements';


export default class DoacaoCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user_id: props.route.params.user_id,
      data: [],
      arrayMedida: [
        ['Unidade', 'unidade'],
        ['Quilos', 'quilos'],
      ],

      nome: '',
      unidade_medida: '',
      quantidade: '',
      status: 'disponivel',
      validade: '',
      cidade: '',
      endereco_id: '',

      date: new Date(),
      minDate: new Date(),
    };
    this.redirect = this.redirect.bind(this);
    this.listEndereco = this.listEndereco.bind(this);
    this.cadastrarDoacao = this.cadastrarDoacao.bind(this);
  }

  componentDidMount() {
    this.redirect();
    this.listEndereco();
  }
  redirect() {
    if (this.state.token == null) {
      this.props.navigation.navigate('Login');
    }
  }

  cadastrarDoacao() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      nome: this.state.nome,
      unidade_medida: this.state.unidade_medida,
      quantidade: this.state.quantidade,
      status: this.state.status,
      validade: this.state.validade,
      user_id: this.state.user_id,
      endereco_id: this.state.endereco_id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://192.168.1.4:8000/api/user/doacao', requestOptions)
      .then(response => response.json())
      .then(result => alert(result.msg))
      .catch(error => console.log('error', error));
  }

  listEndereco() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'http://192.168.1.4:8000/api/user/endereco/' + this.state.user_id,
      requestOptions,
    )
      .then(response => response.json())
      .then(response => {
        this.setState({data: response});
      })
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <View style={style.view}>
        <TextInput
          placeholder="Nome"
          onChangeText={value => this.setState({nome: value})}
          value={this.state.nome}></TextInput>

        <Picker  style={style.selecione} onValueChange={value => this.setState({unidade_medida: value})}>
          <Picker.Item  label="Selecione" value="" />
          {this.state.arrayMedida.map((item, key) => (
            <Picker.Item label={item[0]} value={item[1]} key={key} />
          ))}
        </Picker>

        <TextInput
          placeholder="Quantidade"
          onChangeText={value => this.setState({quantidade: value})}
          value={this.state.quantidade}></TextInput>

        <DatePicker
        style={style.date}
          mode="date"
          placeholder="selecione o prazo"
          format="YYYY-MM-DD"
          minDate={this.state.minDate}
          maxDate="2025-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={date => {
            this.setState({validade: date});
          }}
        />

        <Picker  style={style.selecione} onValueChange={value => this.setState({endereco_id: value})}>
          {this.state.data.map((item, key) => (
            <Picker.Item
              label={item.cidade + ' ' + item.logradouro + ' - ' + item.numero} 
              value={item.id}
              key={key}
            />
          ))}
        </Picker>

        <Button buttonStyle={style.button} title="Cadastrar" onPress={this.cadastrarDoacao}></Button>
      </View>
    );
  }
}

const style = StyleSheet.create({
  view: {
    width: '100%',
    height: '100%',
    marginHorizontal: 20,
  },
    input1: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderColor:'#FFFFFF',
    marginHorizontal: 50,
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
    marginHorizontal: 50,
    marginTop: 160,
    color: '#FFFFFF'
  },
  text2: {
    marginHorizontal: 50,
    marginTop: 10,
    color: '#FFFFFF'
  },
  date:{
    width: 300,
    marginHorizontal: 45,
  },
  selecione:{
    marginHorizontal: 30,
    width: 300,
  }
});
