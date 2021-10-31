import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
import GraficoQuilos from './Views/Graficos/grafico_quilos';

function Home({navigation}) {
  return (
    <View>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}></Button>
      <Button
        title="Cadastro Usuário"
        onPress={() => navigation.navigate('CadastroUsuario')}></Button>
      <Button
        title="Cadastro Empresa"
        onPress={() => navigation.navigate('CadastroEmpresa')}></Button>
    </View>
  );
}

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen name="GraficoQuilos" component={GraficoQuilos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
