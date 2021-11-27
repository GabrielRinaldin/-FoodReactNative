import React from 'react';
import {
  View,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text as Texto,
} from 'react-native';
import {BarChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {Text} from 'react-native-svg';
export default class Grafico extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user: [],

      dataUnidadeAll: [],
      dataUnidadeLimit5: [],
      dataUnidadeMes: [],

      dataQuiloAll: [],
      dataQuiloLimit5: [],
      dataQuiloMes: [],
    };

    this.redirect = this.redirect.bind(this);
    this.exit = this.exit.bind(this);
    this.getUser = this.getUser.bind(this);

    this.getDoacoesQuantidadeUnidadeAll =
      this.getDoacoesQuantidadeUnidadeAll.bind(this);
    this.getDoacoesQuantidadeUnidadeLimit5 =
      this.getDoacoesQuantidadeUnidadeLimit5.bind(this);

    this.getDoacoesQuantidadeQuiloLimit5 =
      this.getDoacoesQuantidadeQuiloLimit5.bind(this);
    this.getDoacoesQuantidadeQuiloAll =
      this.getDoacoesQuantidadeQuiloAll.bind(this);

    
  }

  componentDidMount() {
    this.redirect();
    this.getUser();
    this.getDoacoesQuantidadeUnidadeLimit5();
    this.getDoacoesQuantidadeUnidadeAll();
    this.getDoacoesQuantidadeQuiloLimit5();
    this.getDoacoesQuantidadeQuiloAll();
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

  getDoacoesQuantidadeUnidadeLimit5() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://192.168.1.4:8000/api/doacoes-realizada/unidade/limit-5',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        this.setState({dataUnidadeLimit5: result});
      })
      .catch(error => console.log('error', error));
  }

  getDoacoesQuantidadeUnidadeAll() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://192.168.1.4:8000/api/doacoes-realizada/unidade/todos/',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        this.setState({dataUnidadeAll: result});
      })
      .catch(error => console.log('error', error));
  }

  getDoacoesQuantidadeQuiloLimit5() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://192.168.1.4:8000/api/doacoes-realizada/quilos/limit-5',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        this.setState({dataQuiloLimit5: result});
      })
      .catch(error => console.log('error', error));
  }

  getDoacoesQuantidadeQuiloAll() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://192.168.1.4:8000/api/doacoes-realizada/quilos/todos/',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        this.setState({dataQuiloAll: result});
      })
      .catch(error => console.log('error', error));
  }

  render() {
    const dataArrayUnidadeLimit5 = this.state.dataUnidadeLimit5.map(function (
      item,
    ) {
      return {
        value: item.quantidade_total,
        label: item.nome,
      };
    });

    const dataUnidadeLimit5 = [];
    dataArrayUnidadeLimit5.forEach(item => {
      dataUnidadeLimit5.push(item.value);
    });

    const CUT_OFF = 50;
    const LabelsUnidade = ({x, y, bandwidth, dataUnidadeLimit5}) =>
      dataArrayUnidadeLimit5.map((value, index) => (
        <Text
          key={index}
          x={value.value < CUT_OFF ? x(0) + 10 : x(value.value) + 15}
          y={y(index) + bandwidth / 2}
          fontSize={14}
          fill={value.value > CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}>
          {value.label + ' ' + value.value + ' Unidades'}
        </Text>
      ));

    const dataArrayQuiloLimit5 = this.state.dataQuiloLimit5.map(function (
      item,
    ) {
      return {
        value: item.quantidade_total,
        label: item.nome,
      };
    });

    const dataQuiloLimit5 = [];
    dataArrayQuiloLimit5.forEach(item => {
      dataQuiloLimit5.push(item.value);
    });

    const LabelsQuilo = ({x, y, bandwidth, dataQuiloLimit5}) =>
      dataArrayQuiloLimit5.map((value, index) => (
        <Text
          key={index}
          x={value.value < CUT_OFF ? x(0) + 10 : x(value.value) + 15}
          y={y(index) + bandwidth / 2}
          fontSize={14}
          fill={value.value > CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}>
          {value.label + ' ' + value.value + ' Quilos'}
        </Text>
      ));

    return (
      <View style={style.view}>
        <BarChart
          style={{flexDirection: 'row', flex: 0.99, marginLeft: 3}}
          data={dataUnidadeLimit5}
          horizontal={true}
          svg={{fill: 'rgba(19, 209, 70)'}}
          contentInset={{top: 10, bottom: 10}}
          gridMin={0}>
          <Grid direction={Grid.Direction.VERTICAL} />
          <LabelsUnidade />
        </BarChart>
        <BarChart
          style={{flex: 0.99, marginLeft: 3}}
          data={dataQuiloLimit5}
          horizontal={true}
          svg={{fill: 'rgba(19, 209, 70)'}}
          contentInset={{top: 10, bottom: 10}}
          gridMin={0}>
          <Grid direction={Grid.Direction.VERTICAL} />
          <LabelsQuilo />
        </BarChart>

        <FlatList
          data={this.state.dataUnidadeAll}
          renderItem={({item}) => (
            <View>
              <Texto>
                Empresa Doadora: {item.nome} {item.quantidade_total} Unidades
              </Texto>
            </View>
          )}
        />
        <FlatList
          data={this.state.dataQuiloAll}
          renderItem={({item}) => (
            <View>
              <Texto>
                Empresa Doadora: {item.nome} {item.quantidade_total} Quilos
              </Texto>
            </View>
          )}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  view: {
    backgroundColor: '#F4F4F4',
    width: '100%',
    height: '50%',
  },
});
