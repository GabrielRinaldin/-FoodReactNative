import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Modal,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import {Button} from 'react-native-elements';

export default class LogadoUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user: [],

      doador_id: '',
      doacao_id: '',
      doacao_nome: '',
      doacao_unidade_medida: '',
      doacao_quantidade: '',
      visible: false,
      quantidade_disponivel: '',
    };
    this.redirect = this.redirect.bind(this);
    this.exit = this.exit.bind(this);
    this.getUser = this.getUser.bind(this);
    this.listaDoacoes = this.listaDoacoes.bind(this);
    this.cadastraDoacao = this.cadastraDoacao.bind(this);
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

    fetch('http://192.168.1.4:8000/api/doacao/', requestOptions)
      .then(response => response.json())
      .then(result => this.setState({data: result}))
      .catch(error => console.log('error', error));
  }

  cadastraDoacao() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      doador_id: this.state.doador_id,
      user_id: this.state.user.id,
      doacao_id: this.state.doacao_id,
      nome: this.state.doacao_nome,
      unidade_medida: this.state.doacao_unidade_medida,
      quantidade: this.state.doacao_quantidade,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://192.168.1.4:8000/api/user/doacoes-realizada', requestOptions)
      .then(response => response.json())
      .then(result => alert(result.msg))
      .then(this.listaDoacoes())
      .then(this.setState({visible: false}))
      .catch(error => alert(error.msg));

    console.log(this.state.quantidade);
  }

  render() {
    return (
      <View>
        <Text>Nome: {this.state.user.nome}</Text>
        <Button
          title="Editar Perfil"
          onPress={() =>
            this.props.navigation.navigate('EditPerfil', {
              token: this.props.route.params.token,
              user_id: this.state.user.id,
            })
          }
        />
        
        <Text>Listagem de Doações Disponivel</Text>
        <SafeAreaView>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <View
                onPress={() =>
                  this.setState({
                    visible: true,
                  })
                }>
                <Text>
                  {item.doacao} {item.quantidade} {item.unidade_medida}
                </Text>
                <Text>Data de Validade: {item.validade}</Text>
                <Text>
                  Ponto de coleta: {item.cidade} {item.bairro} {item.logradouro}{' '}
                  {item.numero} {item.complemento}
                </Text>

                <Button
                  title={'Confirmar doação ' + item.doacao}
                  onPress={() =>
                    this.setState({
                      doador_id: item.user_id,
                      doacao_id: item.id,
                      doacao_nome: item.doacao,
                      doacao_unidade_medida: item.unidade_medida,
                      quantidade_disponivel: item.quantidade,
                      visible: true,
                    })
                  }
                />

                <View>
                  <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.visible}
                    onRequestClose={() => {
                      this.setState({visible: false});
                    }}>
                    <View>
                      <Text>{this.state.doacao_nome}</Text>
                      <Text>
                        limite de retirada {this.state.quantidade_disponivel}{' '}
                        {this.state.doacao_unidade_medida}
                      </Text>

                      <TextInput
                        placeholder="Diga quantas unidades ou quilos foram retirados"
                        onChangeText={value =>
                          this.setState({doacao_quantidade: value})
                        }></TextInput>

                      <Button
                        title="Confirmar Retirada"
                        onPress={() => this.cadastraDoacao(item)}
                      />
                      <Button
                        title="Fechar"
                        onPress={() => {
                          this.setState({visible: false});
                        }}
                      />
                    </View>
                  </Modal>
                </View>
              </View>
            )}
          />
        </SafeAreaView>
        <Button
          title="Analisar Empresas Doadoras"
          onPress={() =>
            this.props.navigation.navigate('Grafico', {
              token: this.props.route.params.token,
              user_id: this.state.user.id,
            })
          }
        />
         <Button
          title="Quem Somos nós"
          onPress={() =>
            this.props.navigation.navigate('QuemSomos', {
              token: this.props.route.params.token,
              user_id: this.state.user.id,
            })
          }
        />
      </View>
    );
  }
}
