import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
export default function App() {
  const [data, setData] = useState([

    {
      "A": 'A',
      "B": 'B',
      "C": 'C',
      "D": 'D',
      "E": 'E',
    },
    {
      "A": 1,
      "B": 1,
      "C": 1,
      "D": 1,
      "E": 1,
    },
    {
      "A": 1,
      "B": 1,
      "C": 1,
      "D": 1,
      "E": 1,
    },
    {
      "A": 1,
      "B": 1,
      "C": 1,
      "D": 1,
      "E": 1,
    },
    {
      "A": 1,
      "B": 1,
      "C": 1,
      "D": 1,
      "E": 1,
    },

  ]);

  const handleChange = (newValue, rowIndex, key) => {
    const updatedData = [...data];
    updatedData[rowIndex][key] = newValue;
    setData(updatedData);
  };

  return (
    <ScrollView>
      <View style={styles.container}>

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
  },
});
