import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Input from '../components/Input'
import { selectAuthenticatedUser } from '../db/User.table'
import * as SQLite from "expo-sqlite";
import { ToastAndroid } from 'react-native'
import { observer } from 'mobx-react-lite'
import { useUserStore } from '../store/user.store'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useStatusStore } from '../store/status.store'
import { ActivityIndicator } from 'react-native-paper'

const Login = observer(({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { addUser } = useUserStore();
  const { setStatus } = useStatusStore()
  const handleSignInResponse = (data, err) => {
    setLoading(false);
    if(data) {
        console.log("Status updated");
        if(Platform.OS === "android") {
          ToastAndroid.show("Sign in successful", ToastAndroid.SHORT)
        }
        addUser(data);
        setStatus(true);
        navigation.navigate("Dashboard", {
          screen: "Home"
        })
    } else {
      if(Platform.OS === "android") {
        ToastAndroid.show("Invalid Credentials", ToastAndroid.SHORT)
      } else {    
          Alert.alert("Invalid Credentials", "Invalid Credentials");
      }
        console.log(err);
    }
  }
  const handleSignIn = () => {
    if(loading) return;
    setLoading(true);
    if (username && password) {
        const db = SQLite.openDatabase("database.db");
        db.transaction((tx) => {
            const item = {
                username,
                password,
            }
            selectAuthenticatedUser(tx, item, handleSignInResponse)
        })
    } else {
        setLoading(false);
        if(Platform.OS === "android") {
            ToastAndroid.show("Please enter required fields", ToastAndroid.SHORT)
        } else {    
            Alert.alert("Required fields", "Please enter required fields");
        }
    }
    // navigation.navigate("Dashboard", {
    //     screen: "Home"
    //   })
  }
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
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", columnGap: 5, marginBottom: 5 }}>  
            <Text style={styles.notify} on>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.notifyLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
            {loading ? <ActivityIndicator animating={true} color="#fff" /> : <Text style={styles.btnText}>Sign In</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
})
const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 10
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
    marginTop: 20,
    marginBottom: 20,
  },
  notify: {
    fontSize: 16,
    fontFamily: "Nunito_500Medium",
    textAlign: "center"
  },
  notifyLink: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold",
    color: "#00435e"
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