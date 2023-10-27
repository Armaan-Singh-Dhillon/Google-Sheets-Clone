import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import MyContext from '../Context/MyContext'
import { useContext } from 'react'
const TextComponent = ({ rowIndex, col }) => {
    const { data } = useContext(MyContext)
    const handleChange = () => {
        data[rowIndex][col] = input
    };

    const [input, setInput] = useState("" || data[rowIndex][col])
    return (
        <View>
            <TextInput
                style={cellStyle}
                value={input}
                onChangeText={(data) => setInput(data)}
                onEndEditing={handleChange}
            />
        </View>
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

export default TextComponent