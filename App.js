import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react';
import Splash from './screens/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainExcel from './screens/MainExcel';
import MyContext from './Context/MyContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import data from './data/data';
const Stack = createNativeStackNavigator();
const importedData = data
export default function App() {
  // useEffect(() => {
  //   const retrieveObject = async () => {
  //     try {
  //       const jsonString = await AsyncStorage.getItem('data');
  //       if (jsonString !== null) {
  //         const dataSaved = JSON.parse(jsonString);
  //         setData(dataSaved)
  //       } else {
  //         console.log('Object not found in AsyncStorage');
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving object:', error);
  //     }
  //   };

  //   retrieveObject();
  // }, []);

  const [data, setData] = useState(importedData);
  const ContextProvider = ({ children }) => {

    return (
      <MyContext.Provider value={{ data, setData }} >
        {children}
      </MyContext.Provider>
    );
  }



  return (


    <NavigationContainer>
      <ContextProvider >
        <Stack.Navigator >
          {/* <Stack.Screen name='splash' options={{ title: 'Google Sheets' }} component={Splash} /> */}
          <Stack.Screen name='work' component={MainExcel} options={{ headerShown: false }} />


        </Stack.Navigator>


      </ContextProvider>
    </NavigationContainer>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,

  },
});
