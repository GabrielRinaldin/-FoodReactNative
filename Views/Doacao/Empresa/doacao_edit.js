import React, {useState} from 'react';
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

export default class DoacaoEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user_id: props.route.params.user_id,

      data: [],
      arrayStatus: [
        ['Confirmar', true],
        ['Retirado', 'retirado'],
        ['Expirado', 'expirado'],
      ],

      visible: false,
      doacao_id: '',
      doacao_nome: '',
      status: '',
    };
    this.listaDoacoes = this.listaDoacoes.bind(this);
    this.redirect = this.redirect.bind(this);
  }
  componentDidMount() {
    this.listaDoacoes();
    this.redirect();
  }
  redirect() {
    if (this.state.token == null) {
      this.props.navigation.navigate('Login');
    }
  }
  listaDoacoes() {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'http://192.168.1.4:8000/api/user/doacoes-realizada?id=' +
        this.state.user_id,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => this.setState({data: result}))
      .catch(error => console.log('error', error));
  }

  async updateDoacao() {
    if (this.state.status == '') {
      return alert(
        'Marque a caixa de seleção para confirmar ou volte para cancelar a operação',
      );
    }
    console.log(this.state.doacao_id);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      status: this.state.status,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'http://192.168.1.4:8000/api/user/doacoes-realizada/edit?id=' +
        this.state.doacao_id,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => alert(result.msg))
      .then(this.setState({status: false}))
      .then(this.setState({visible: false}))
      .then(this.listaDoacoes())
      .catch(error => console.log('error', error));
  }

  render() {
    return (
      <View>
        <Text>Listagem de Doações</Text>
        <SafeAreaView>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <View>
                <Text>
                  recebedor: {item.id} {item.recebedor_nome}
                </Text>
                <Text>alimento doando: {item.nome}</Text>
                <Text>
                  quantidade: {item.quantidade} {item.unidade_medida}
                </Text>

                <Button
                  title={'Confirmar doação ' + item.nome}
                  onPress={() =>
                    this.setState({
                      doacao_id: item.id,
                      doacao_nome: item.nome,
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
                      this.setState({
                        visible: false,
                      });
                    }}>
                    <View>
                      <BouncyCheckbox
                        size={25}
                        fillColor="green"
                        unfillColor="#FFFFFF"
                        text={
                          'Confirmar que o alimento ' +
                          this.state.doacao_nome +
                          ' foi entregue?'
                        }
                        iconStyle={{borderColor: 'green'}}
                        textStyle={{fontFamily: 'JosefinSans-Regular'}}
                        onPress={() => {
                          this.setState({status: true});
                        }}
                      />

                      <Button
                        title="Confirmar"
                        onPress={() => this.updateDoacao()}
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
