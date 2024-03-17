import { StyleSheet } from "react-native";
import Constants from 'expo-constants'


export const margins = StyleSheet.create({
    startEndMargins: {
        marginStart: 16,
        marginEnd: 16
    },
    statusBarMargins: {
        marginTop: Constants.statusBarHeight
    }
})