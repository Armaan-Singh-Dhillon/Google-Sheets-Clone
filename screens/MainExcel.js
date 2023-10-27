import { Pressable, ScrollView, StyleSheet, Text, TextInput, View, Keyboard } from 'react-native';
import { useContext } from 'react';
import MyContext from '../Context/MyContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextComponent from '../Component/textComponent';
import * as XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
const MainExcel = () => {

    const { data, setData } = useContext(MyContext)
    const temp = [...data]
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
    const clickHandler = () => {
        setData(data)
        generateExcel()
    }
    return (
        <SafeAreaView>
            <ScrollView horizontal style={{ backgroundColor: '#fff', height: '100%' }} >
                <View>
                    <Pressable onPress={clickHandler} style={{ backgroundColor: 'green' }} >
                        <Text style={{ color: '#fff' }}>
                            Share File

                        </Text>
                    </Pressable>
                    <Pressable onPress={saveHandler} style={{ backgroundColor: 'green' }} >
                        <Text style={{ color: '#fff' }}>
                            save File

                        </Text>
                    </Pressable>

                    {temp.map((el, rowIndex) => (

                        <View key={rowIndex} style={{ flexDirection: 'row' }}>
                            <View style={{
                                width: 40,
                                borderColor: 'grey',
                                borderWidth: 1,
                                color: 'black',
                                alignItems: 'center',
                                padding: 2.5,
                                backgroundColor: '#f0f0f0'
                            }}>
                                <Text>
                                    {rowIndex < 1 ? "S.no" : rowIndex}
                                </Text>
                            </View>
                            {Object.entries(el).map(([key, val], index) => (

                                <TextComponent rowIndex={rowIndex} col={key} />
                            ))}
                        </View>
                    ))}
                    <TextInput style={{ width: 100 }} />
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}
const cellStyle = StyleSheet.create({
    width: 120,
    borderColor: 'grey',
    borderWidth: 1,
    color: 'black',
    textAlign: "center",
    padding: 2.5

})

export default MainExcel