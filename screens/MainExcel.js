import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useContext } from 'react';
import MyContext from '../Context/MyCOntext';
import { SafeAreaView } from 'react-native-safe-area-context';
const MainExcel = () => {
    const { data } = useContext(MyContext)
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
        const dataStore = JSON.stringify(data)
        AsyncStorage.setItem('data', dataStore)
            .then(() => {
                console.log('Data stored successfully');
            })
            .catch(error => {
                console.error('Error storing data: ', error);
            });
    };
    const clickHandler = () => {
        generateExcel()
    }
    return (
        <SafeAreaView>
            <ScrollView horizontal style={{ backgroundColor: '#fff', height: '100%' }}>
                <View>
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
                                    style={cellStyle}
                                    value={val + ''}
                                    onChangeText={(text) => handleChange(text, rowIndex, key)}
                                />
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
    width: 100,
    borderColor: 'grey',
    borderWidth: 1,
    color: 'black',
    textAlign: "center"
})

export default MainExcel