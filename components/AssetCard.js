import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const AssetCard = ({ name, serialNo, imgSrc }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imgSrc} style={{ height: 150, width: 150 }} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name.length > 15 ? `${name.substring(0, 15)}...` : name}</Text>
        <Text style={styles.serialNo}>{serialNo}</Text>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  imageContainer: {
    height: 150,
    width: 150,
    overflow: 'hidden',
  },
  container: {
    height: 200,
    width: 150,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  infoContainer: {
    justifyContent: "center",
    height: 50,
    padding: 7
  },
  name: {
    fontSize: 17,
    fontFamily: "Nunito_600SemiBold"
  },
  serialNo: {
    color: "#777",
    fontSize: 12,
    fontFamily: "Nunito_500Medium"
  }
})

export default AssetCard