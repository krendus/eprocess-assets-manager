import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_500Medium, Nunito_600SemiBold } from "@expo-google-fonts/nunito";
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Home from './screens/dashboard/Home';
import Folder from './screens/dashboard/Folder';
import Profile from './screens/dashboard/Profile';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import AddAsset from './screens/dashboard/AddAsset';
import ViewAsset from './screens/dashboard/ViewAsset';
import Register from './screens/Register';
import * as SQLite from "expo-sqlite";
import { createAssetTable, createUserTable } from './db';
import { observer } from 'mobx-react-lite';
import { useStatusStore } from './store/status.store';
import ReturnAsset from './screens/dashboard/ReturnAsset';

const openDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase('database.db');

    db.transaction(
      (tx) => {
        tx.executeSql(
          'SELECT 1 FROM sqlite_master LIMIT 1',
          [],
          () => {
            resolve(db);
          },
          (tx, error) => {
            reject(error);
          }
        );
      },
      (error) => {
        reject(error);
      }
    );
  });
};
const init = async () => {
  try {
    const db = await openDatabaseAsync();
    console.log('Database is ready...');
    db.transaction((tx) => {
      createUserTable(tx);
    });
    db.transaction((tx) => {
      createAssetTable(tx);
    });
  } catch (error) {
    console.error('Error opening database:', error);
  }
};
function Dashboard() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      // shifting={true}
      backBehavior="history"
      activeColor="#00435e"
      inactiveColor="#aaa"
      sceneAnimationEnabled={true}
      theme={{
        colors: {secondaryContainer: "transparent"},
      }}
      barStyle={{
        backgroundColor: "#fff",
        height: 70,
      }}
    >
      <Tab.Screen 
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => {
            return  <View style={{ justifyContent: "center", height: 30 }}><AntDesign name="home" size={24} color={color} /></View>
          },
          tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>
        }}
      />
       <Tab.Screen 
        name="Folder"
        component={Folder}
        options={{
          tabBarIcon: ({color}) => {
            return  <View style={{ justifyContent: "center", height: 30 }}><FontAwesome name="folder-o" size={24} color={color} /></View>
          },
          tabBarLabel: <Text style={styles.tabBarLabel}>Folder</Text>
        }}
      />
       <Tab.Screen 
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => {
            return <View style={{ justifyContent: "center", height: 30 }}><Feather name="user" size={25} color={color} /></View>
          },
          tabBarLabel: <Text style={styles.tabBarLabel}>Profile</Text>
        }}
      />
    </Tab.Navigator>
  )
}
const App = observer(() => {
  const { authenticated } = useStatusStore();
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold
  });
  useEffect(() => {
    init();
  }, []);
  
  if (!fontsLoaded) {
    return null;
  } 
  
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {
              authenticated ? (
                <>
                  <Stack.Screen 
                    name='Dashboard'
                    component={Dashboard}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name="AddAsset"
                    component={AddAsset}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name="ViewAsset"
                    component={ViewAsset}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name="ReturnAsset"
                    component={ReturnAsset}
                    options={{
                      headerShown: false
                    }}
                  />
                </>
              ) : (
                <>
                  <Stack.Screen 
                    name='Login'
                    component={Login}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen 
                    name='Register'
                    component={Register}
                    options={{
                      headerShown: false
                    }}
                  />
                </>
              )
            }
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar backgroundColor="#00435e" style="light"/>
    </SafeAreaProvider>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarLabel: {
    fontSize: 12,
    fontFamily: "Nunito_700Bold"
  }
});

export default App;
