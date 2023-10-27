import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useContext } from 'react';
import MyContext from '../Context/MyContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextComponent from '../Component/textComponent';

const MainExcel = () => {

    const { data } = useContext(MyContext)
    const temp = [...data]

    return (
        <SafeAreaView>
            <ScrollView>

                <ScrollView horizontal={true} style={{ backgroundColor: '#fff', padding: 8, marginTop: 6 }} >
                    <View>


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

                                    <TextComponent rowIndex={rowIndex} col={key} key={index} />
                                ))}
                            </View>
                        ))}
                        <TextInput style={{ width: 100 }} />
                    </View>
                </ScrollView>
            </ScrollView>


        </SafeAreaView>

    )
}

export default MainExcel