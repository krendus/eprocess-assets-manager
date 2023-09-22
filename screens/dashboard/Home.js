import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AssetCard from '../../components/AssetCard';

const Home = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [showList, setShowList] = useState(false);
  useEffect(() => {
    getShadow();
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
              <Text style={styles.welcome}>Hello Krendus!</Text>
              <Text style={styles.sub}>Mobile Developer</Text>
            </View>
          </View>
          <Text style={styles.heading} onPress={() => setShowList(!showList)}>Assets</Text>
         {
          showList ? (
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.assetContainer}>
              <AssetCard 
                imgSrc={require("../../assets/images/preview-img-2.jpg")}
                name={"Laptop"}
                serialNo={"ENG0143421"}
              />
               <AssetCard 
                imgSrc={require("../../assets/images/preview-img-1.jpg")}
                name={"IPhone"}
                serialNo={"ENG0143451"}
              />
              <AssetCard 
                imgSrc={require("../../assets/images/preview-img-2.jpg")}
                name={"Laptop"}
                serialNo={"ENG0143421"}
              />
               <AssetCard 
                imgSrc={require("../../assets/images/preview-img-1.jpg")}
                name={"Very long namenamenamename"}
                serialNo={"ENG0143451"}
              />
              <AssetCard 
                imgSrc={require("../../assets/images/preview-img-2.jpg")}
                name={"Laptop"}
                serialNo={"ENG0143421"}
              />
               <AssetCard 
                imgSrc={require("../../assets/images/preview-img-1.jpg")}
                name={"IPhone"}
                serialNo={"ENG0143451"}
              />
              <AssetCard 
                imgSrc={require("../../assets/images/preview-img-2.jpg")}
                name={"Laptop"}
                serialNo={"ENG0143421"}
              />
               <AssetCard 
                imgSrc={require("../../assets/images/preview-img-1.jpg")}
                name={"IPhone"}
                serialNo={"ENG0143451"}
              />
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
      <TouchableOpacity style={[styles.add, styles.shadow]} onPress={() => navigation.navigate("Dashboard", {
            screen: "Home",
            params: {
              screen: "AddAsset"
            }
          })}>
        <AntDesign name="plus" color={"#00435e"} size={25}/>
      </TouchableOpacity>
    </View>
  )
}
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
    fontSize: 25,
    fontFamily: "Nunito_600SemiBold",
    color: "#555",
    marginVertical: 20
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