import {
    StyleSheet
} from 'react-native';
import { greendark, greenlight, orange, white, yellow} from '../Style/colors';
export const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        backgroundColor : '#eee'
    },
    containerHeader :{
        width : '100%',
        height : '7%',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : greenlight,
    },
    textHeader : {
        color : yellow,
        fontFamily : 'Righteous',
        fontSize : 22

    },
    containerBody : {
        width : '100%',
        height : '93%',
        backgroundColor : white
    },
    containerNews : {
        width : '100%',
        height : '45%',
        // alignItems : 'center',
        padding : 10,
    },
    News : {
        width : '80%',
        borderRadius : 25
    },
    containerTitleNews : {
        width : '100%',
        height : 50,
        backgroundColor : greenlight,
        borderTopLeftRadius : 25,
        borderTopRightRadius : 25,
        alignItems : 'center',
        justifyContent : 'center',
    },
    textTitle : {
        color : white,
        fontSize : 20,
        fontFamily : 'Righteous'
    },
    containerInfoNews : {
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center',
        padding : 5
    },
    containerStateDelivery : {
        width : '100%',
        height : '55%',
        // borderWidth : 1
    },
    containerTitleState : {
        width : '100%',
        height : '11%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        padding : 5,
        backgroundColor : '#eee'
    },
    textState : {
        fontFamily : 'Mukta-Regular',
        fontSize : 16,
        color : '#000'
    },
    containerNotification : {
        width : '100%',
        height : '76%',
    },
    notification : {
        width : '100%',
        height : 100,
        flexDirection : 'row',
    },
    image : {
        width : '15%',
        height : '100%',
    },
    containerInfoNotification : {
        width : '80%',
        height : '50%',
        paddingLeft : 7,
        paddingRight : 7
    },
    textNotification : {
        fontSize : 16,
        fontFamily : 'NunitoSans-Regular',
    },
    coverItem : {
        width : '100%',
        height : '90%',
        position : 'absolute',
        backgroundColor : greendark,
        opacity : 0.2,
        borderRadius : 10,
    }
    
    
    
})