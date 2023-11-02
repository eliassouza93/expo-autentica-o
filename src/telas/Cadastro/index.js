import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import Botao from '../../componentes/Botao';
import { EntradaTexto } from '../../componentes/EntradaTexto';
import estilos from './estilos';
import { cadastrar } from '../../servicos/requisicoesFirebase';
import { Alerta } from '../../componentes/Alerta';


export default function Cadastro({ navigation }) {
  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');


  const [dados, setDados] = useState({
    email: '',
    senha: '',
    confirmaSenha: ''
  })
  const alteraDados = (variavel, valor) => {
    setDados({
      ...dados,
      [variavel]: valor
    })

  }


  async function realizarCadastro() {
    if (dados.email == '') {
      setMensagemError('Preencha com seu email');
      setStatusError('email');
    } else if (dados.senha == '') {
      setMensagemError('Digite sua senha');
      setStatusError('senha');
    } else if (dados.confirmaSenha == '') {
      setMensagemError('Confirme sua senha');
      setStatusError('confirmaSenha');
    } else if (dados.confirmaSenha != dados.senha) {
      setMensagemError('As senhas não conferem!');
      setStatusError('confirmaSenha');
    } else {
      const resultado = await cadastrar(dados.email, dados.senha);
      setStatusError('firebase')
      if (resultado == 'sucesso') {
        setMensagemError('Usuário criado com sucesso!')

      }
      else {
        setMensagemError(resultado)
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

      <EntradaTexto
        label="Confirmar Senha"
        value={dados.confirmaSenha}
        onChangeText={valor => alteraDados('confirmaSenha', valor)}
        secureTextEntry
        error={statusError == 'confirmaSenha'}
        messageError={mensagemError}
      />

      <Alerta
        mensagem={mensagemError}
        error={statusError == 'firebase'}
        setError={setStatusError}
      />

      <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
    </View>
  );
}