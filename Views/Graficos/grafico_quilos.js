import React from 'react';
import {Button, Text, View} from 'react-native';
export default class GraficoQuilos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user: [],
    };
    this.redirect = this.redirect.bind(this);
    this.exit = this.exit.bind(this);
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

  render() {
    return (
      <View>
        <Text>Id#: {this.state.user.id}</Text>
        <Text>Nome: {this.state.user.nome}</Text>
        <Text>Email: {this.state.user.email}</Text>
        <Text>Tipo: {this.state.user.tipo_usuario}</Text>
        <Text>Celular: {this.state.user.celular}</Text>

        <View>
          <Button
            title="Analisar gráficos"
            onPress={() =>
              this.props.navigation.navigate('GraficoQuilos', {
                token: this.props.route.params.token,
                user_id: this.state.user.id,
              })
            }
          />
        </View>
      </View>
    );
  }
}