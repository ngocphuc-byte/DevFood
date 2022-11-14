import {
    StyleSheet,
} from 'react-native';
import { black, greenlight, white, yellow } from './colors';
export const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        backgroundColor : greenlight,
    },
    containerHeader : {
        width : '100%',
        height : '7%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        paddingLeft : 25,
        paddingRight : 25,
    },
    textHeader : {
        fontFamily : 'Righteous',
        fontSize : 24,
        color : yellow,
    },
    containerBody : {
        width : '100%',
        height : '93%',
        backgroundColor : white,
        borderTopRightRadius : 33,
        borderTopLeftRadius : 33,
        padding : 20,
    },
    containerItem : {
        width : '100%',
        height : '100%',
    },
    containerHistory : {
        width : '100%',
        height : 150,
        marginBottom : 10,
    },
    containerTitleHistory : {
        width : '100%',
        height : 50,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        padding : 10,
        borderBottomWidth : 2,
        borderColor : '#eee',
    },
    textTitleHistory : {
        fontFamily : 'Mukta-Regular',
        fontSize : 18,
        width : 180,
    },
    containerInfoHistory : {
        height : 100,
        width : '100%',
        flexDirection : 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    containerLogo : {
        height : 100,
        width : 100,
        borderRightWidth : 4,
        borderColor : '#eee',
        alignItems : 'center',
        justifyContent : 'center',
    },
    textLogo : {
        fontFamily : 'Righteous',
        fontSize : 28,
        color : greenlight,
    },
    containerInformation : {
        height : 100,
        width : '70%',
        padding : 10,
    },
    containerTextInfo : {
        flexDirection : 'row',
        alignItems : 'center',
    },
    textInfo : {
        fontFamily : 'Mukta-Regular',
        fontSize : 18,
        paddingLeft : 10
    },
    containerReOrder : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    buttonReOrder : {
        height : 25,
        width : 80,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : yellow,
        text : {
            color : white,
            fontSize : 16,
        }
    }
})