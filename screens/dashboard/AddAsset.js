import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, BackHandler, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Camera } from 'expo-camera';

const AddAsset = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [accessories, setAccessories] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [asset, setAsset] = useState("");
  const [startCamera, setStartCamera] = useState(false);
  const [capturedImg, setCapturedImg] = useState(null);
  const [previewAvailable, setPreviewAvailable] = useState(false);
  let camera;

  const initCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert("Access Denied")
    }
  }
  const captureImg = async () => {
    if(!camera) return;
    try { 
      const picture = await camera.takePictureAsync();
      setCapturedImg(picture);
      setStartCamera(false);
      setPreviewAvailable(true);
    } catch(e) {
      console.log(e)
    }
  }
 
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
      {
        startCamera ? (
          <Camera 
            style={{
              flex: 1,
              width:"100%",
              alignItems: "center"
            }}
            ref={(r) => {
              camera = r
            }}
          >
            <TouchableOpacity style={styles.captureBtn} onPress={captureImg}>
              <EvilIcons name="camera" size={35} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setStartCamera(false)}>
              <AntDesign name="close" size={35} color={"#fff"} />
            </TouchableOpacity>
          </Camera>
        ) : (
          <View style={{ padding: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 20 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign size={25} color={"#555"}name="arrowleft"/>
              </TouchableOpacity>
              <Text style={styles.heading}>Add Asset</Text>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: 70 }}
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
              <View style={styles.imageContainer}>
                {
                  previewAvailable ? (
                    <Image source={{ uri:  capturedImg.uri }} height={200} width={200} />
                  ):( 
                    <Text style={styles.placeholder}>No image selected</Text>
                  )
                }
                <TouchableOpacity style={styles.uploadBtn} onPress={initCamera}>
                  <EvilIcons name="camera" size={28} color={"#fff"} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Submit</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontFamily: "Nunito_600SemiBold",
    color: "#555",
    marginVertical: 20
  },
  imageContainer: {
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00435e",
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 10,
    borderRadius: 25,
    justifyContent: "center",
    columnGap: 5,
  },
  placeholder: {
    fontFamily: "Nunito_500Medium",
    fontSize: 16
  },
  btn: {
    backgroundColor: "#00435e",
    borderRadius: 15,
    display: 'flex',
    alignSelf: "stretch",
    marginTop: 20,
    padding: 17,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Nunito_700Bold"
  },
  captureBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00435e",
    width: 80,
    height: 80,
    position: "absolute",
    borderRadius: 40,
    bottom: 20,
  },
  closeBtn: {
    position: "absolute",
    right: 20,
    top: 20
  }
})

export default AddAsset