import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';

const AddAsset = () => {
  const insets = useSafeAreaInsets();
  const [accessories, setAccessories] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [asset, setAsset] = useState("");
  return (
    <View 
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        backgroundColor: "#f3f3f3",
      }}
    >
      <View style={{ padding: 15 }}>
        <Text style={styles.heading} onPress={() => setShowList(!showList)}>Add Asset</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <Dropdown
            setValue={setAsset}
            label={"Asset"}
            placeholder="Select Asset"
            data={[
              {
                key: 1,
                value: "Laptop"
              },
              {
                key: 2,
                value: "Iphone"
              }
            ]}
          />
          <Input
            value={accessories}
            setValue={setAccessories}
            label={"Accessories"}
            placeholder="Enter your accessories..."
          />
          <Input
            value={serialNumber}
            setValue={setSerialNumber}
            label={"Serial Number"}
            placeholder="Enter Asset Serial Number"
          />
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontFamily: "Nunito_600SemiBold",
    color: "#555",
    marginVertical: 20
  }
})

export default AddAsset