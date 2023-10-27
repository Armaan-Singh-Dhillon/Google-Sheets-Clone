import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';


export default function App() {
  const [data, setData] = useState([
    {
      "A": "A",
      "B": "B",
      "C": "C",
      "D": 'D'
    },
    {
      "A": 4,
      "B": "Alice Brown",
      "C": "alicebrown@example.com",
      "D": 28
    },
    {
      "A": 4,
      "B": "Alice Brown",
      "C": "alicebrown@example.com",
      "D": 28
    },
    {
      "A": 4,
      "B": "Alice Brown",
      "C": "alicebrown@example.com",
      "D": 28
    },
    {
      "A": 4,
      "B": "Alice Brown",
      "C": "alicebrown@example.com",
      "D": 28
    },
    {
      "A": 4,
      "B": "Alice Brown",
      "C": "alicebrown@example.com",
      "D": 28
    },
  ]);
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


  const handleChange = (newValue, rowIndex, key) => {
    const updatedData = [...data];
    updatedData[rowIndex][key] = newValue;
    setData(updatedData);
  };
  const clickHandler = () => {
    generateExcel()
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Pressable onPress={clickHandler} style={{ backgroundColor: 'blue' }} >
          <Text>
            save File

          </Text>
        </Pressable>

        {data.map((el, rowIndex) => (

          <View key={rowIndex} style={{ flexDirection: 'row' }}>
            <View style={{
              width: 50,
              borderColor: 'grey',
              borderWidth: 2,
              color: 'black',
              alignItems: 'center'
            }}>
              <Text>
                {rowIndex}
              </Text>
            </View>
            {Object.entries(el).map(([key, val], index) => (


              <TextInput
                key={key}
                style={{
                  width: 50,
                  borderColor: 'grey',
                  borderWidth: 2,
                  color: 'black',
                  textAlign: "center"
                }}
                value={val + ''}
                onChangeText={(text) => handleChange(text, rowIndex, key)}
              />
            ))}
          </View>
        ))}
        <TextInput style={{ width: 100 }} />
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
});
