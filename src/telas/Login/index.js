import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import { logar } from '../../servicos/requisicoesFirebase';
import estilos from './estilos';
import { Alerta } from '../../componentes/Alerta';
import { auth } from '../../config/firebase';

export default function Login({ navigation }) {
  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');

  const [dados, setDados] = useState({
    email: '',
    senha: ''
  })
  const alteraDados = (variavel, valor) => {
    setDados({
      ...dados,
      [variavel]: valor
    })

  }

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged(usuario => {
      if (usuario) {
        navigation.replace('Principal')
      }
    })
    return () => estadoUsuario();
  }, [])

  async function realizarLogin() {
    if (dados.email == '') {
      setMensagemError('O email é obrigatório!');
      setStatusError('email');
    } else if (dados.senha == '') {
      setMensagemError('A senha é obrigatória!');
      setStatusError('senha');
    } else {
      const resultado = await logar(dados.email, dados.senha);
      if (resultado == 'erro') {
        setStatusError('firebase')
        setMensagemError('Email ou senha não conferem')
      }
      else {
        navigation.replace('Principal')
      }
    }
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="E-mail"
        value={dados.email}
        onChangeText={valor => alteraDados('email', valor)}
        error={statusError == 'email'}
        messageError={mensagemError}
      />
      <EntradaTexto
        label="Senha"
        value={dados.senha}
        onChangeText={valor => alteraDados('senha', valor)}
        secureTextEntry
        error={statusError == 'senha'}
        messageError={mensagemError}
      />

      <Alerta
        mensagem={mensagemError}
        error={statusError == 'firebase'}
        setError={setStatusError}
      />

      <Botao onPress={() => realizarLogin()}>LOGAR</Botao>
      <Botao
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}