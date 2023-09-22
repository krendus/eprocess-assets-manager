import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Profile = () => {
    const insets = useSafeAreaInsets();
    return (
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor: "#f3f3f3"
        }}
      >
      <Text>Profile</Text>
    </View>
  )
}

export default Profile