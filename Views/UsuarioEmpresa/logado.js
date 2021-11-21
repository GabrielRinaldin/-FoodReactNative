import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';


export default class Logado extends React.Component {
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
      <View style={style.view}>
        <Text style={style.text}>ID: {this.state.user.id}</Text>
        <Text style={style.text2}>NOME: {this.state.user.nome}</Text>
        {/* <Text style={style.text}>EMAIL: {this.state.user.email}</Text>
        <Text style={style.text}>Tipo: {this.state.user.tipo_usuario}</Text>
        <Text style={style.text}>Celular: {this.state.user.celular}</Text> */}

        {this.state.user.tipo_usuario == 'empresa' && (
          <View style={style.view}>
            <Button
              buttonStyle={style.button}
              title="Cadastrar um ponto de coleta"
              onPress={() =>
                this.props.navigation.navigate('EnderecoCreate', {
                  token: this.props.route.params.token,
                  user_id: this.state.user.id,
                })
              }
            />
            <Button
              buttonStyle={style.button}
              title="Gerenciar meus pontos de coleta"
              onPress={() =>
                this.props.navigation.navigate('EnderecoList', {
                  token: this.props.route.params.token,
                  user_id: this.state.user.id,
                })
              }
            />

            <Button
            buttonStyle={style.button}
              title="Criar Doação"
              onPress={() =>
                this.props.navigation.navigate('DoacaoCreate', {
                  token: this.props.route.params.token,
                  user_id: this.state.user.id,
                })
              }
            />
             <Button
             buttonStyle={style.button}
              title="Gerenciar Doações"
              onPress={() =>
                this.props.navigation.navigate('DoacaoList', {
                  token: this.props.route.params.token,
                  user_id: this.state.user.id,
                })
              }
            />
              <Button
              buttonStyle={style.button}
              title="Gerenciar Doações Em espera"
              onPress={() =>
                this.props.navigation.navigate('DoacaoEdit', {
                  token: this.props.route.params.token,
                  user_id: this.state.user.id,
                })
              }
            />
             <Button
             buttonStyle={style.button}
              title="Analisar gráficos"
              onPress={() =>
                this.props.navigation.navigate('Grafico', {
                  token: this.props.route.params.token,
                  user_id: this.state.user.id,
                })
              }
            />
          </View>
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  view: {
    height: '100%',
    width: '100%',
    flex: 1,
    position: 'relative',
    backgroundColor: '#E57C2F'
  },
  text: {
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 16,
  marginHorizontal: 20,
  marginTop: 20,
  marginBottom: 20,
  color: '#FFFFFF'
  },
  text2: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    marginBottom: 20,
    color: '#FFFFFF'
    },
  button:{
    backgroundColor:'#E57C2F',
    borderRadius:30,
    borderWidth:2,
    borderColor:'#FFFFFF',
    textAlign:'center',
    marginBottom:7,
    marginHorizontal: 80,
    marginVertical: 20,
    height: 50,
    width: 260,
  },
});
