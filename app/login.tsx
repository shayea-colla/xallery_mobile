import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { router } from 'expo-router';

import { View } from '@/components/Themed';
import { useSession } from '@/authentication/ctx';
import XalleryLogo from '@components/core/XalleryLogo';
import { AlertDialog } from '@components/login';

export default function Login() {
  const { Login } = useSession()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")


  async function handleLogin() {
    //  Dont't send empty form
    if (!EmptyInputs) {
      setIsSending(true)
      try {
        await Login(username, password)
        router.replace("/profile")
      } catch (error) {
        setErrorMessage("Username or Password is Incorrect")
      } finally {
        setIsSending(false)
      }
    }
  }

  const EmptyInputs = username.trim() === "" || password.trim() === ""


  return (

      <View style={styles.container}>
        <XalleryLogo />

        <KeyboardAvoidingView style={styles.inputGroup}>
          {errorMessage !== "" ? <Text style={{color: "red"}}>{errorMessage}</Text>: '' }
          <View>
            <TextInput disabled={isSending} mode='outlined' style={{marginBottom: 30}} label={"Username"} value={username} onChangeText={text => setUsername(text)} />
            <TextInput secureTextEntry disabled={isSending} mode='outlined' style={{marginBottom: 30}} label={"Password"} value={password} onChangeText={text => setPassword(text)} />
          </View>

          <Button style={styles.loginButton} disabled={isSending} loading={isSending} mode='contained' onPress={handleLogin}>Login</Button>
        </KeyboardAvoidingView>
        <AlertDialog hideDialog={() => setErrorMessage("")} visible={errorMessage !== ""}  message={errorMessage} />

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    justifyContent:'center',
  },
  loginButton: {
    alignSelf: "center",
    width: '40%'
  },
  inputGroup: {
    paddingStart: 50,
    paddingEnd: 50,
  }

});
