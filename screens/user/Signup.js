import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [perfilInstagram, setPerfilInstagram] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    // URL da API - lembre-se de trocar conforme seu ambiente
    const apiUrl = 'http://10.0.2.2:8080/api/influencers';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        perfilInstagram,
        email,
        senha,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao cadastrar influencer');
        }
        return response.json();
      })
      .then(data => {
        Alert.alert('Sucesso', `Influencer ${data.nome} cadastrado!`);
        // Limpar campos
        setNome('');
        setPerfilInstagram('');
        setEmail('');
        setSenha('');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível cadastrar o influencer.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Influencer</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Perfil Instagram"
        value={perfilInstagram}
        onChangeText={setPerfilInstagram}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <Button title="Cadastrar" onPress={handleCadastro} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
