import React from 'react';
import {Button, Text, View} from 'react-native';

export default class ChecaUserTipo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user: [],
    };
    this.redirect = this.redirect.bind(this);
    this.getUser = this.getUser.bind(this);
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

  getUser() {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer ' + this.state.token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch('http://192.168.1.74:8000/api/me', requestOptions)
      .then(response => response.json())
      .then(response => {
        this.setState({user: response});
      })
      .catch(error => console.log('error', error));
  }

  render() {
    setTimeout(
      function () {
        console.log();
        if (this.state.user.tipo_usuario == 'empresa') {
          this.props.navigation.navigate('Logado', {
            token: this.props.route.params.token,
            user_id: this.state.user.id,
          });
        }
        if (this.state.user.tipo_usuario == 'comun') {
          this.props.navigation.navigate('LogadoUsuario', {
            token: this.props.route.params.token,
            user_id: this.state.user.id,
          });
        }
      }.bind(this),
      2000,
    );

    return (
      <View>
        <Text>Bem vindo {this.state.user.nome}!</Text>
        <Text>Tipo: {this.state.user.tipo_usuario}</Text>
      </View>
    );
  }
}
