import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Button} from 'react-native-elements';
import Login from './Views/Auth/login';
import CadastroUsuario from './Views/Auth/cadastro_usuario';
import CadastroEmpresa from './Views/Auth/cadastro_empresa';
import EnderecoCreate from './Views/Endereco/endereco_create';
import EnderecoList from './Views/Endereco/endereco_list';
import DoacaoCreate from './Views/Doacao/Empresa/doacao_create';
import DoacaoList from './Views/Doacao/Empresa/doacao_list';
import DoacaoEdit from './Views/Doacao/Empresa/doacao_edit';
import Logado from './Views/UsuarioEmpresa/logado';
import LogadoUsuario from './Views/UsuarioComum/logado_usuario';
import ChecaUserTipo from './Views/Auth/checa_user_tipo';
import Grafico from './Views/Graficos/grafico';

function Home({navigation}) {
  return (
    <View >
      <ImageBackground
        style={style.image}
        source={require('./img/food.png')}>
     <Button
      buttonStyle={style.button1}
        color="#E57C2F"
        title="Entrar"
        onPress={() => navigation.navigate('Login')}></Button>
      <Button
        color="#E57C2F"
        buttonStyle={style.button2}
        title="Cadastrar Usuário"
        onPress={() => navigation.navigate('CadastroUsuario')}></Button>
      <Button
        color="#E57C2F"
        buttonStyle={style.button3}
        title="Cadastrar Empresa"
        onPress={() => navigation.navigate('CadastroEmpresa')}></Button>
      </ImageBackground>
    </View>
  );
}

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
        <Stack.Screen name="CadastroEmpresa" component={CadastroEmpresa} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Logado" component={Logado} />
        <Stack.Screen name="LogadoUsuario" component={LogadoUsuario} />
        <Stack.Screen name="EnderecoCreate" component={EnderecoCreate} />
        <Stack.Screen name="EnderecoList" component={EnderecoList} />
        <Stack.Screen name="DoacaoCreate" component={DoacaoCreate} />
        <Stack.Screen name="DoacaoList" component={DoacaoList} />
        <Stack.Screen name="ChecaUserTipo" component={ChecaUserTipo} />
        <Stack.Screen name="DoacaoEdit" component={DoacaoEdit} />
        <Stack.Screen name="Grafico" component={Grafico} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  // view: {
  //   flex: 1,
  //   alignItems: 'center',
  //   paddingVertical: 12,
  //   paddingHorizontal: 32,
  //   borderRadius: 8,
  // },
  button1:{
    marginTop: 400,
    marginHorizontal: 80,
    backgroundColor:'#E57C2F',
    width:250,
    borderRadius:30,
    borderWidth:1,
    borderColor:'#FFFFFF',
    textAlign:'center',
    marginBottom:7,
    zIndex: 2
},
button2:{
  marginTop: 10,
  marginHorizontal: 80,
  backgroundColor:'#E57C2F',
  width:250,
  borderRadius:30,
  borderWidth:1,
  borderColor:'#FFFFFF',
  textAlign:'center',
  marginBottom:7,
  zIndex: 2
},
button3:{
  marginTop: 10,
  marginHorizontal: 80,
  backgroundColor:'#E57C2F',
  width:250,
  borderRadius:30,
  borderWidth:1,
  borderColor:'#FFFFFF',
  textAlign:'center',
  marginBottom:7,
  zIndex: 2
},
image: {
  width: '100%',
  height: '100%',
  resizeMode: 'contain',
  zIndex: 3
},

});

export default App;
