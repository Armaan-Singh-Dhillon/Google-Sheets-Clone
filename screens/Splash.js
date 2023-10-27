import { View, Text, Image } from 'react-native'
import React from 'react'
import Loader from '../assets/spreadsheet_loader.gif'
import progress from '../assets/loadin_gif.gif'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
  const navigation = useNavigation()
  setTimeout(() => {
    navigation.navigate('work')
  }, 3000)
  return (
    <View style={{
      width: '100%', height: '100%',
      backgroundColor: 'white',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }}>


      <Image source={Loader} style={{ width: 150, height: 150 }} />
      <View style={{ alignItems: 'center' }}>

        <Text>
          Loading Workspace
        </Text>
        <Image source={progress} style={{ width: 100, height: 50 }} />

      </View>
    </View>
  )
}

export default Splash