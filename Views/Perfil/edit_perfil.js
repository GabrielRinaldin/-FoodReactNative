import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Button} from 'react-native-elements';

export default class EditPerfil extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user_id: props.route.params.user_id,


      nome: '',
      email: '',
      celular: '',
      password: '',
      tipo_usuario: ''
    };

    this.update = this.update.bind(this);
    this.redirect = this.redirect.bind(this);
    this.exit = this.exit.bind(this);
    this.getUser = this.getUser.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    this.redirect();
    this.getUser();
  }
  redirect() {
    if (this.state.token == null) {
      this.props.navigation.navigate('Login');
      this.exit();
    }
  }

  async update() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "nome": this.state.nome,
      "email": this.state.email,
      "celular": this.state.celular,
      "password": this.state.password
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch('http://192.168.1.4:8000/api/user/update/'+this.state.user_id, requestOptions)
      .then(response => response.json())
      .then(result => alert(result.msg))
      .then(this.goBack())
      .catch(error => console.log('error', error));
  }

  goBack(){
    if (this.state.tipo_usuario == 'empresa') {
        this.props.navigation.navigate('Logado', {
          token: this.props.route.params.token,
          user_id: this.state.user_id,
        });
      }
      if (this.state.tipo_usuario == 'comum') {
        this.props.navigation.navigate('LogadoUsuario', {
          token: this.props.route.params.token,
          user_id: this.state.user_id,
        });
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
        this.setState({nome: response.nome, email: response.email, celular: response.celular, tipo_usuario: response.tipo_usuario});
      })
      .catch(error => console.log('error', error));
  }
  render() {
    return (
      <View>
        <View style={style.view}>
          <TextInput
            style={style.input1}
            placeholderTextColor="#FFFFFF"
            placeholder={"Nome"}
            value={this.state.nome}
            onChangeText={value => this.setState({nome: value})}></TextInput>
          <TextInput
            style={style.input1}
            placeholderTextColor="#FFFFFF"
            placeholder="Email"
            value={this.state.email}
            onChangeText={value => this.setState({email: value})}></TextInput>
          <TextInput
            style={style.input1}
            placeholderTextColor="#FFFFFF"
            placeholder="Celular"
            value={this.state.celular}
            onChangeText={value => this.setState({celular: value})}></TextInput>
          <TextInput
            secureTextEntry={true}
            style={style.input1}
            placeholderTextColor="#FFFFFF"
            placeholder="Senha"
            value={this.state.password}
            onChangeText={value =>
              this.setState({password: value})
            }></TextInput>
          <Button
            buttonStyle={style.button}
            title="Editar"
            onPress={this.update}></Button>
        </View>
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
    borderColor: '#FFFFFF',
    marginHorizontal: 50,
    marginVertical: 10,
  },
  input2: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    marginHorizontal: 50,
  },
  button: {
    backgroundColor: '#E57C2F',
    width: 250,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 7,
    marginHorizontal: 80,
    marginVertical: 20,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginHorizontal: 140,
    marginTop: 80,
    marginBottom: 20,
    color: '#FFFFFF',
  },
});
