import React from 'react';
import {FlatList, SafeAreaView, Text, View, Modal, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Button} from 'react-native-elements';


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
      <View style={style.view}>
        <Text style={style.text}>Listagem de Produtos</Text>
        <SafeAreaView>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <View>
                <Text style={style.text}>Estado: {item.estado}</Text>
                <Text style={style.text}>Cidade: {item.cidade}</Text>
                <Text style={style.text}>Bairro: {item.bairro}</Text>
                <Text style={style.text}>
                  Logradouro: {item.logradouro} {item.numero} {item.complemento}{' '}
                </Text>
                <Button
                  buttonStyle={style.button}
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
                <Button buttonStyle={style.button} title="Deletar" onPress={() => this.deleta(item.id)} />

                <View>
                  <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.visible}
                    onRequestClose={() => {
                      this.setState({visible: false});
                    }}>
                    <View >
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
                        buttonStyle={style.button}
                        title="Atualizar"
                        onPress={() =>
                          this.updateEndereco(this.state.endereco_id)
                        }
                      />
                      <Button
                        buttonStyle={style.button}
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
const style = StyleSheet.create({
  view: {
    backgroundColor: '#E57C2F',
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    marginHorizontal: 30,
    marginTop: 10,
    color: '#FFFFFF'
  },
  areaView: {
    borderWidth: 2,
    borderColor: '#999999',
    borderRadius: 30,
    margin: 20,
  },
});
