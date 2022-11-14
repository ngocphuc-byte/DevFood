import {
    StyleSheet,
} from 'react-native';
import { greenlight, white, yellow } from './colors';
export const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        backgroundColor : '#fff'
    },
    containerVoucher : {
        width : '100%',
        flexDirection : 'row',
        height : 140,
        borderWidth : 2,
        borderColor : greenlight,
    },
    containerLogo : {
        width : '30%',
        alignItems : 'center',
        justifyContent : 'center',
        borderRightWidth : 2,
        borderColor : greenlight,
    },
    textLogo : {
        fontFamily : 'Righteous',
        fontSize : 30,
        color : greenlight,
    },
    containerTextVoucher :{
        width : '50%',
        justifyContent : 'center',
        paddingLeft : 10,
    },
    textTitleVoucher :{
        fontWeight : 'bold',
        fontSize : 24,
        width : '100%'
    },
    textVoucher : {
        fontFamily:'NunitoSans-Regular',
        fontSize : 15.5,
    },
    containerButton : {
        width : '20%',
        justifyContent : 'center',
    },
    button : {
        width : '80%',
        height : '50%',
        alignItems : 'center',
        justifyContent : 'center',
        borderWidth : 1,
        borderColor : yellow,
    },
    containerList : {
        width : '100%',
        height : '85%',
        backgroundColor : '#fff'
    },
    header : {
        width : '100%',
        height : '7%',
        alignItems : 'center',
        justifyContent :'center',
        backgroundColor : greenlight
    },
    textHeader : {
        fontSize : 22,
        color : yellow,
        fontFamily : 'Righteous'
    }
})