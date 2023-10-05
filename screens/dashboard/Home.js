import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import AssetCard from '../../components/AssetCard';
import { observer } from 'mobx-react-lite';
import { useUserStore } from '../../store/user.store';
import * as SQLite from "expo-sqlite";
import { selectAllAsset } from '../../db/Asset.table';
import { ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Home = observer(({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [showList, setShowList] = useState(false);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore();

  const handleGetAssetsResponse = (data, err) => {
    setLoading(false);
    if(data) {
        console.log("Assets Fetched");
        console.log(data);
        setAssets(data);
    } else {
      if(Platform.OS === "android") {
        ToastAndroid.show("Error fetching assets", ToastAndroid.SHORT)
      } else {    
          Alert.alert("Error fetching assets", "Error fetching assets");
      }
        console.log(err);
    }
  }
  const handleGetAssets = () => {
    const db = SQLite.openDatabase("database.db");
    db.transaction((tx) => {
      selectAllAsset(tx, user.id, handleGetAssetsResponse)
    })
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleGetAssets();
    })
    getShadow();
    return unsubscribe;
  }, [])
  
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
          <View style={styles.profile}>
            <Image source={require("../../assets/images/profile.png")} style={{ borderRadius: 22, height: 44, width: 44 }}/>
            <View>
              <Text style={styles.welcome}>Hello {user?.username}!</Text>
              {/* <Text style={styles.sub}>Mobile Developer</Text> */}
            </View>
          </View>
          <Text style={styles.heading} onPress={() => setShowList(!showList)}>Assets</Text>
         {
          assets.length ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.assetContainer}>
                {
                  assets.map((asset, i) => (
                    <AssetCard 
                      key={i}
                      imgSrc={asset?.image ?? ""}
                      name={asset?.name}
                      serialNo={asset?.serial_number ?? ""}
                      id={asset?.id ?? ""}
                      navigation={navigation}
                    />
                  ))
                }
              </View>
            </ScrollView>
          ) : (
            <View style={styles.emptyView}>
              <Image source={require("../../assets/images/empty.webp")} style={{ borderRadius: 125, height: 250, width: 250, opacity: 0.5 }}/>
              <Text style={styles.emptyText}>No Assets</Text>
            </View>
          )
         }
        </View>
      <TouchableOpacity style={[styles.add, styles.shadow]} onPress={() => navigation.navigate("AddAsset")}>
        <Entypo name="plus" color={"#00435e"} size={25}/>
      </TouchableOpacity>
    </View>
  )
})
const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
  },
  welcome: {
    fontSize: 30,
    fontFamily: "Nunito_700Bold",
    color: "#00597D"
  },
  sub: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    color: "#777"
  },
  heading: {
    fontSize: 20,
    fontFamily: "Nunito_600SemiBold",
    color: "#555",
    marginVertical: 20,
    marginLeft: 5
  },
  emptyView: {
    height: 400,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyText: {
    fontSize: 20,
    fontFamily: "Nunito_600SemiBold",
    color: "#777",
    marginTop: 15
  },
  add: {
    position: 'absolute',
    bottom: 30,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    right: 20,
    backgroundColor: "#fff",
  },
  assetContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    rowGap: 15,
    columnGap: 15,
    paddingBottom: 120
  }
})
const getShadow = () => {
  if(Platform.OS === "android") {
    styles.shadow = {
      elevation: 10,
      shadowColor: "#00000088"
    }
  } else if (Platform.OS === "ios") {
    styles.shadow = {
      shadowColor: "#00000088",
      shadowOffset: {width: 0, height: 10},
      shadowRadius: 10
    }
  }
}

export default Home