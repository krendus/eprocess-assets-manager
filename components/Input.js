import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const Input = ({ label, isPassword, placeholder, value, setValue }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
       secureTextEntry={!!isPassword}
       selectionColor={"#0077a799"}
       placeholder={placeholder}
       placeholderTextColor={"#999"}
       value={value}
       onChangeText={setValue}
       style={styles.input}
      />
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    label: {
        color: "#00597D",
        fontSize: 14,
        marginLeft: 7,
        fontFamily: "Nunito_600SemiBold"
    },
    input: {
        fontSize: 16,
        fontFamily: "Nunito_500Medium",
        alignSelf: "stretch",
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 15,
        backgroundColor: "#ffffff99",
        marginTop: 5,
        borderColor: "#ccc",
        borderWidth: 1,
        color: "black"
    }
})
export default Input