import React from 'react';
import {View} from 'react-native';
import {BarChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';
import {Text} from 'react-native-svg';
export default class GraficoQuilos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: props.route.params.token,
      user: [],
      data: [],
    };
    this.redirect = this.redirect.bind(this);
    this.exit = this.exit.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getDoacoesQuantidadeUnidade =
      this.getDoacoesQuantidadeUnidade.bind(this);
  }

  componentDidMount() {
    this.redirect();
    this.getUser();
    this.getDoacoesQuantidadeUnidade();
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

  getDoacoesQuantidadeUnidade() {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'http://192.168.1.4:8000/api/doacoes-realizada/unidade/',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        this.setState({data: result});
      })
      .catch(error => console.log('error', error));
  }

  render() {
    const dataArray = this.state.data.map(function (item) {
      return {
        value: item.quantidade_total,
        label: item.nome,
      };
    });

    const data = [];
    dataArray.forEach(item => {
      data.push(item.value);
    });

    const labels = [];
    dataArray.forEach(item => {
      labels.push(item.label);
    });

    const CUT_OFF = 20;
    const Labels = ({x, y, bandwidth, data}) =>
      data.map((value, index) => (
        <Text
          key={index}
          x={x(index) + bandwidth / 2}
          y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
          fontSize={14}
          fill={value >= CUT_OFF ? 'white' : 'black'}
          alignmentBaseline={'middle'}
          textAnchor={'middle'}>
          {value + " Unidades"} 
        </Text>
      ));

    return (
      <View style={{height: 200}}>
        <BarChart
          style={{flex: 1}}
          data={data}
          svg={{fill: 'rgba(134, 65, 244, 0.8)'}}
          contentInset={{top: 40, bottom: 10}}
          spacing={0.2}
          gridMin={0}>
          <Grid direction={Grid.Direction.HORIZONTAL} />
          <Labels />
          <XAxis
            style={{marginHorizontal: -10, height: 30}}
            data={data}
            formatLabel={(value, index) => index}
            contentInset={{left: 10, right: 10}}
            svg={{fontSize: 10, fill: 'grey'}}
          />
        </BarChart>
      </View>
    );
  }
}
