import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SelectList } from 'react-native-dropdown-select-list';

const Dropdown = ({ data, placeholder, setValue, label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <SelectList 
        save="value"
        setSelected={setValue}
        data={data}
        placeholder={placeholder}
        fontFamily="Nunito_500Medium"
        boxStyles={{
          borderRadius: 15,
          backgroundColor: "#ffffff99",
          borderColor: "#ccc",
          marginTop: 5,
        }}
        dropdownStyles={{
          backgroundColor: "#ffffff99",
          borderColor: "#ccc",
        }}
        dropdownItemStyles={{
          height: 40
        }}
        inputStyles={{
          padding: 4,
          color: "#000"
        }}
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

export default Dropdown