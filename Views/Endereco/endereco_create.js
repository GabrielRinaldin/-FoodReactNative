import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';

export default class EnderecoCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user_id: props.route.params.user_id,

      estado: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      numero: '',
      cidade: '',
    };
    this.redirect = this.redirect.bind(this);
    this.exit = this.exit.bind(this);
    this.cadastrarEndereco = this.cadastrarEndereco.bind(this);
  }

  componentDidMount() {
    this.redirect();
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

  cadastrarEndereco() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      estado: this.state.estado,
      cidade: this.state.cidade,
      bairro: this.state.bairro,
      logradouro: this.state.logradouro,
      numero: this.state.numero,
      complemento: this.state.complemento,
      user_id: this.state.user_id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://192.168.1.4:8000/api/user/endereco', requestOptions)
      .then(response => response.json())
      .then(result => alert(result.msg))
      // .then(() =>
      //   this.props.navigation.navigate('Logado', {
      //     token: this.props.route.params.token,
      //     user_id: this.state.user.id,
      //   }),
      // )
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <View style={style.view}>
        <TextInput
          style={style.input2}
          placeholder="Estado"
          placeholderTextColor='#FFFFFF'
          onChangeText={value => this.setState({estado: value})}
          value={this.state.estado}></TextInput>
        <TextInput
          style={style.input2}
          placeholder="Cidade"
          placeholderTextColor='#FFFFFF'
          onChangeText={value => this.setState({cidade: value})}
          value={this.state.cidade}></TextInput>
        <TextInput
          style={style.input2}
          placeholder="Bairro"
          placeholderTextColor='#FFFFFF'
          onChangeText={value => this.setState({bairro: value})}
          value={this.state.bairro}></TextInput>
        <TextInput
          style={style.input2}
          placeholder="Logradouro"
          placeholderTextColor='#FFFFFF'
          onChangeText={value => this.setState({logradouro: value})}
          value={this.state.logradouro}></TextInput>
        <TextInput
          style={style.input2}
          placeholder="Número"
          placeholderTextColor='#FFFFFF'
          onChangeText={value => this.setState({numero: value})}
          value={this.state.numero}></TextInput>
        <TextInput
          style={style.input2}
          placeholder="Complemento"
          placeholderTextColor='#FFFFFF'
          onChangeText={value => this.setState({complemento: value})}
          value={this.state.complemento}></TextInput>

        <Button buttonStyle={style.button} title="Cadastrar" onPress={this.cadastrarEndereco}></Button>
      </View>
    );
  }
}

const style = StyleSheet.create({

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
  view: {
    backgroundColor: '#E57C2F',
    width: '100%',
    height: '100%',
  },
  input2: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderColor:'#FFFFFF',
    marginHorizontal: 30,
    
  },

});
