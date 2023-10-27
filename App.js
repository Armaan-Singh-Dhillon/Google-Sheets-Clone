import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import Splash from './screens/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainExcel from './screens/MainExcel';
import MyContext from './Context/MyContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
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
  const generateExcel = () => {
    let wb = XLSX.utils.book_new();
    const newWorksheet = XLSX.utils.json_to_sheet(data, { skipHeader: true })


    XLSX.utils.book_append_sheet(wb, newWorksheet, "MyFirstSheet", 'Sheet1');


    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "MyExcel.xlsx";
    FileSystem.writeAsStringAsync(filename, base64, {
      encoding: FileSystem.EncodingType.Base64
    }).then(() => {
      Sharing.shareAsync(filename);
    });
  };


  const saveHandler = () => {
    setData(data)
    const dataStore = JSON.stringify(data)

    AsyncStorage.setItem('data', dataStore)
      .then(() => {
        console.log('Data stored successfully');
      })
      .catch(error => {
        console.error('Error storing data: ', error);
      });
  }
  const SaveAndShare = () => {
    saveHandler()
    generateExcel()
  }
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
          <Stack.Screen name='splash' options={{ title: 'Google Sheets' }} component={Splash} />
          <Stack.Screen name='work' component={MainExcel} options={{
            title: 'Spreadsheet',
            headerRight: () => (
              <Button
                onPress={() => SaveAndShare()}
                title="Save and Send"
                color="green"
              />
            ),

          }} />


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
