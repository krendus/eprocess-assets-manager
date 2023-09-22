import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
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
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AddAsset from './screens/dashboard/AddAsset';

function SubHome() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SubHome"
        component={Home}
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
    </Stack.Navigator>
  )
}
function Dashboard() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator
      shifting={true}
      // labeled={false}
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
        component={SubHome}
        options={{
          tabBarIcon: ({color}) => {
            return <AntDesign name="home" size={24} color={color} />
          },
          tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>
        }}
      />
       <Tab.Screen 
        name="Folder"
        component={Folder}
        options={{
          tabBarIcon: ({color}) => {
            return <FontAwesome name="folder-o" size={24} color={color} />
          },
          tabBarLabel: <Text style={styles.tabBarLabel}>Folder</Text>
        }}
      />
       <Tab.Screen 
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => {
            return <EvilIcon name="user" size={30} color={color} />
          },
          tabBarLabel: <Text style={styles.tabBarLabel}>Profile</Text>
        }}
      />
    </Tab.Navigator>
  )
}
export default function App() {
  let [fontsLoaded, fontError] = useFonts({
      Nunito_400Regular,
      Nunito_500Medium,
      Nunito_700Bold,
      Nunito_600SemiBold
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
              name='Login'
              component={Login}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen 
              name='Dashboard'
              component={Dashboard}
              options={{
                headerShown: false
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}

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
