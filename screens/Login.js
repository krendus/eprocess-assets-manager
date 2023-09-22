import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Input from '../components/Input'

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  return (
    <View 
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "#fff"
      }}
    >
      <View style={styles.container}>
        <View style={{ flex: 5 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Welcome Back!</Text>
            <Text style={styles.subHeader}>Sign in to eProcess Assets Manager</Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              value={username}
              setValue={setUsername}
              label={"Username"}
              placeholder="Enter your username"
            />
            <Input
              value={password}
              setValue={setPassword}
              label={"Password"}
              placeholder="Enter your password"
              isPassword={true}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.notify}>If you don't have sign in details contact your Supervisor</Text>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Dashboard", {
            screen: "Home"
          })}>
            <Text style={styles.btnText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  headerContainer: {
    marginTop: 70,
    marginBottom: 20
  },
  header: {
    fontSize: 40,
    fontFamily: "Nunito_700Bold",
    color: "#00597D"
  },
  subHeader: {
    fontSize: 16,
    color: "#00000088",
    fontFamily: "Nunito_500Medium",
  },
  inputContainer: {
    marginTop: 25,
  },
  btnContainer: {
    flex: 1,
    marginTop: 20
  },
  notify: {
    fontSize: 12,
    fontFamily: "Nunito_500Medium",
    textAlign: "center"
  },
  btn: {
    backgroundColor: "#00435e",
    borderRadius: 15,
    display: 'flex',
    alignSelf: "stretch",
    marginTop: 10,
    padding: 17,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Nunito_700Bold"
  }
})

export default Login