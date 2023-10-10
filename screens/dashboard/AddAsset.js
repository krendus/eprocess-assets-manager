import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, BackHandler, Image, Platform, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Camera } from 'expo-camera';
import DatePicker from '../../components/DatePicker';
import { ToastAndroid } from 'react-native';
import ImgToBase64 from 'react-native-image-base64';
import { ActivityIndicator } from 'react-native-paper';
import * as SQLite from "expo-sqlite";
import * as FileSystem from 'expo-file-system';
import { insertAsset } from '../../db/Asset.table';
import { useUserStore } from '../../store/user.store';

const AddAsset = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [accessories, setAccessories] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [asset, setAsset] = useState("");
  const [startCamera, setStartCamera] = useState(false);
  const [capturedImg, setCapturedImg] = useState(null);
  const [previewAvailable, setPreviewAvailable] = useState(false);
  const [date, setDate] = useState(new Date());
  const [stage, setStage] = useState(1);
  const [unit, setUnit] = useState("");
  const [teamLead, setTeamLead] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useUserStore();
  const [ratio, setRatio] = useState("4:3");
  const { height, width } = Dimensions.get("window");
  const screenRatio = height / width;
  const [ratioSet, setRatioSet] = useState(false);
  const [cameraPadding, setCameraPadding] = useState(0);
  const permanentDirectory = FileSystem.documentDirectory;
  const filePath = `${permanentDirectory}images`
  let camera;

  const initCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access Denied")
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
  const handleCreateAssetResponse = (data, err) => {
    setLoading(false);
    if(data) {
        console.log("Assets created");
        if(Platform.OS === "android") {
          ToastAndroid.show("Asset Created", ToastAndroid.SHORT)
        }
        navigation.navigate("Dashboard", {
          screen: "Home"
        })
    } else {
      if(Platform.OS === "android") {
        ToastAndroid.show("Error creating asset", ToastAndroid.SHORT)
      } else {    
          Alert.alert("Error creating asset", "Error creating asset");
      }
        console.log(err);
    }
  }
  const setCameraReady = async () => {
    console.log("Asfabs")
    if(!ratioSet) {
      let desiredRatio = "4:3";
      if (Platform.OS === "android") {
        let distances = {};
        let realRatios = {};
        let minRatio = null;
        const ratios = await camera?.getSupportedRatiosAsync();
        for (const ratio of ratios) {
          const parts = ratio.split(":");
          const realRatio = Number(parts[0])/Number(parts[1]);
          realRatios[ratio] = realRatio;
          const distance = screenRatio - realRatio;
          distances[ratio] = realRatio;
          if(minRatio == null) {
            minRatio = ratio;
          } else {
            if(distance >= 0 && distance < distances[minRatio]) {
              minRatio = ratio;
            }
          }
        }
        desiredRatio = minRatio;
        const remainder = Math.floor((height - realRatios[desiredRatio] * width) / 2);
        setCameraPadding(remainder);
        setRatio(desiredRatio);
        setRatioSet(true);
      }
    }
  }
  const handleCreateAsset = async () => {
    if(loading) return;
    setLoading(true);
    const db = SQLite.openDatabase("database.db");
    if ( accessories && serialNumber && asset && capturedImg && date && unit && teamLead ) {
        const directoryInfo = await FileSystem.getInfoAsync(filePath);
        if(!directoryInfo.exists) {
          await FileSystem.makeDirectoryAsync(filePath);
        }
        const toURI = `${filePath}/assets-${Date.now()}.jpg`;
        FileSystem.moveAsync({ from: capturedImg.uri, to: toURI }).then(() => {
          db.transaction((tx) => {
                const item = {
                  name: asset.trim(),
                  team: unit.trim(),
                  team_lead: teamLead.trim(),
                  received_date: date.toDateString(),
                  serial_number: serialNumber.trim(),
                  image: toURI,
                  accessories: accessories.trim(),
                  status: "In possession",
                  user_id: user?.id,
                  created_at: Date.now()
                }
                insertAsset(tx, item, handleCreateAssetResponse)
          })
        });
    } else {
        setLoading(false);
        if(Platform.OS === "android") {
            ToastAndroid.show("Please enter required fields", ToastAndroid.SHORT)
        } else {    
            Alert.alert("Required fields", "Please enter required fields");
        }
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
        backgroundColor: startCamera ? "#00435e" : "#f3f3f3",
      }}
    >
      {
        startCamera ? (
          <Camera 
            style={{
              flex: 1,
              width:"100%",
              alignItems: "center",
              marginVertical: cameraPadding,
            }}
            ref={(r) => {
              camera = r
            }}
            onCameraReady={setCameraReady}
            ratio={ratio}
          >
            <TouchableOpacity style={styles.captureBtn} onPress={captureImg}>
              <EvilIcons name="camera" size={35} color={"#fff"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setStartCamera(false)}>
              <AntDesign name="close" size={35} color={"#fff"} />
            </TouchableOpacity>
          </Camera>
        ) :
          <View style={{ padding: 15 }}>
            {stage === 1 ? (
            <>
            <View style={{ flexDirection: "row", alignItems: "center", columnGap: 20 }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign size={25} color={"#00435e"}name="arrowleft"/>
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
                  },
                  {
                    key: 2,
                    value: "Monitor"
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
              <DatePicker 
                label={"Received date"}
                date={date}
                setDate={setDate}
              />
              <View style={[styles.imageContainer, {height: capturedImg ? 200 : 95}]}>
                {
                  previewAvailable ? (
                    <Image source={{ uri:  capturedImg.uri }} style={{ height: 200, width: 200 }} />
                  ):( 
                    <Text style={styles.placeholder}>No image captured</Text>
                  )
                }
                <TouchableOpacity style={styles.uploadBtn} onPress={initCamera}>
                  <EvilIcons name="camera" size={28} color={"#fff"} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.btn} onPress={() => setStage(2)}>
                <Text style={styles.btnText}>Next</Text>
              </TouchableOpacity>
            </ScrollView>
            </>
          ) : (
            <>
              <View style={{ flexDirection: "row", alignItems: "center", columnGap: 20 }}>
                <TouchableOpacity onPress={() => setStage(1)}>
                  <AntDesign size={25} color={"#00435e"}name="arrowleft"/>
                </TouchableOpacity>
                <Text style={styles.heading}>Add Asset</Text>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 70 }}
              >
                <Input
                  value={unit}
                  setValue={setUnit}
                  label={"Team"}
                  placeholder="Enter your team's name"
                />
                <Input
                  value={teamLead}
                  setValue={setTeamLead}
                  label={"Team Lead"}
                  placeholder="Enter your team lead's name"
                />
                <TouchableOpacity style={[styles.btn, {marginTop: 20}]} onPress={handleCreateAsset}>
                  {loading ? <ActivityIndicator animating={true} color="#fff" /> : <Text style={styles.btnText}>Submit</Text>}
                </TouchableOpacity>
              </ScrollView>
            </>
          )
          }
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontFamily: "Nunito_600SemiBold",
    color: "#00435e",
    marginVertical: 20
  },
  imageContainer: {
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
    paddingBottom: 15,
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
    paddingBottom: 10,
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