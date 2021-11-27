import React, {Component} from 'react';
import {StyleSheet, View, SafeAreaView, Text,} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';


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
      'http://192.168.1.4:8000/api/auth/login?email=' +
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
      <View style={style.view}>
        <Text>{this.state.msg}</Text>
        <Text style={style.text}>Email</Text>
        <TextInput
        onChangeText={value => this.setState({email: value})}
        style={style.input1} placeholderTextColor='#FFFFFF'
      />
        <Text style={style.text2}>Senha</Text>
        <TextInput
        secureTextEntry={true}
        onChangeText={value => this.setState({password: value})}
        style={style.input2}
        placeholderTextColor='#FFFFFF'
      />
        <Button buttonStyle={style.button} title="Entrar" onPress={this.login}></Button>
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
  }
});
