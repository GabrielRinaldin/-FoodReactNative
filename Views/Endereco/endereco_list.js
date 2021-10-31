import React from 'react';
import {Button, FlatList, SafeAreaView, Text, View, Modal} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

export default class EnderecoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user_id: props.route.params.user_id,

      data: [],
      visible: false,
      endereco_id: '',
      estado: '',
      cidade: '',
      bairro: '',
      logradouro: '',
      numero: '',
      complemento: '',
    };
    this.listaEnderecos = this.listaEnderecos.bind(this);
    this.updateEndereco = this.updateEndereco.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  componentDidMount() {
    this.listaEnderecos();
    this.redirect();
  }
  redirect() {
    if (this.state.token == null) {
      this.props.navigation.navigate('Login');
    }
  }
  listaEnderecos() {
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

  async updateEndereco(key) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      estado: this.state.estado,
      cidade: this.state.cidade,
      bairro: this.state.bairro,
      logradouro: this.state.logradouro,
      numero: this.state.numero,
      complemento: this.state.complemento,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://192.168.1.4:8000/api/user/endereco/' + key, requestOptions)
      .then(response => response.json())
      .then(this.listaEnderecos)
      .then(this.setState({visible: false}))
      .then(response => alert(response.msg))
      .catch(error => console.log('error', error));
  }

  async deleta(key) {
    var requestOptions = {
      method: 'DELETE',
      redirect: 'follow',
    };

    fetch('http://192.168.1.4:8000/api/user/endereco/' + key, requestOptions)
      .then(response => response.json())
      .then(this.listaEnderecos)
      .then(alert('Deletado com sucesso'))
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <View>
        <Text>Listagem de Produtos</Text>
        <SafeAreaView>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <View>
                <Text>Estado: {item.estado}</Text>
                <Text>Cidade: {item.cidade}</Text>
                <Text>Bairro: {item.bairro}</Text>
                <Text>
                  Logradouro: {item.logradouro} {item.numero} {item.complemento}{' '}
                </Text>
                <Button
                  title="Atualizar"
                  onPress={() =>
                    this.setState({
                      endereco_id: item.id,
                      estado: item.estado,
                      cidade: item.cidade,
                      bairro: item.bairro,
                      logradouro: item.logradouro,
                      numero: item.numero,
                      complemento: item.complemento,
                      visible: true,
                    })
                  }
                />
                <Button title="Deletar" onPress={() => this.deleta(item.id)} />

                <View>
                  <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.visible}
                    onRequestClose={() => {
                      this.setState({visible: false});
                    }}>
                    <View>
                      <Text>Atualizar Item</Text>
                      <Text>Estado</Text>
                      <TextInput
                        placeholder="Estado"
                        onChangeText={value => this.setState({estado: value})}
                        value={this.state.estado}></TextInput>

                      <Text>Cidade</Text>
                      <TextInput
                        placeholder="Cidade"
                        onChangeText={value => this.setState({cidade: value})}
                        value={this.state.cidade}></TextInput>

                      <Text>Bairro</Text>
                      <TextInput
                        placeholder="Bairro"
                        onChangeText={value => this.setState({bairro: value})}
                        value={this.state.bairro}></TextInput>

                      <Text>Logradouro</Text>
                      <TextInput
                        placeholder="Logradouro"
                        onChangeText={value =>
                          this.setState({logradouro: value})
                        }
                        value={this.state.logradouro}></TextInput>

                      <Text>Número</Text>
                      <TextInput
                        placeholder="Número"
                        onChangeText={value => this.setState({numero: value})}
                        value={this.state.numero}></TextInput>

                      <Text>Complemento</Text>
                      <TextInput
                        placeholder="Complemento"
                        onChangeText={value =>
                          this.setState({complemento: value})
                        }
                        value={this.state.complemento}></TextInput>
                      <Button
                        title="Atualizar"
                        onPress={() =>
                          this.updateEndereco(this.state.endereco_id)
                        }
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
      </View>
    );
  }
}
