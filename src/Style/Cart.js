import {
    StyleSheet,
} from 'react-native';
import { black, greendark, greenlight, orange, white, yellow } from '../Style/colors'
const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        backgroundColor : white
    },
    containerHeader : {
        width : '100%',
        height : '7%',
        backgroundColor : greenlight,
        justifyContent : 'center',
        alignItems : 'center'
    },
    textHeader : {
        color : yellow,
        fontFamily : 'Righteous',
        fontSize : 22
    },
    icon : {
        position : 'absolute',
        left : 15
    },
    containerBody : {
        width : '100%',
        height : '93%',
    },
    containerCart : {
        width : '100%',
        height : '50%',
        padding : 15,
    },
    containerFood : {
        width : '100%',
        height : 100,
        // borderWidth : 1,
        flexDirection : 'row',

    },
    image : {
        width : 70,
        height : '100%',
        backgroundColor : white,
        borderRadius : 15
    },
    containerTextFood:{
        width : '45%',
        height : '100%',
        // borderWidth : 1,
        justifyContent : 'center'
    },
    textFood : {
        paddingLeft : 10,
        color : black,
        fontFamily : 'NunitoSans-Regular',
        fontSize : 18,
        // borderWidth : 1,
    },
    containerCount : {
        // borderWidth : 1,
        height : '100%',
        width : '10%',
        alignItems : 'center',
        justifyContent : 'center'
    },
    textCount : {
        fontFamily : 'NunitoSans-Regular',
        color : black,
        fontSize : 16
    },
    containerPrice : {
        height : '100%',
        width : '31.6%',
        justifyContent : 'center',
        alignItems : 'center',
        paddingRight : 17.5,
    },
    containerVoucher : {
        width : '100%',
        height : '10%',
        padding : 20
    },
    voucher : {
        width : '100%',
        borderBottomWidth : 1,
        height : 30,
        borderColor : '#f12'
    },
    containerTotal : {
        height : '15%',
        width : '100%',
        justifyContent : 'space-between',
        flexDirection : 'row',
        padding : 20
    },
    modal : {
        width : '100%',
        height : '75%',
        padding : 10,
    },
    containerVoucherModal : {
        width : '100%',
        height : 130,
        // borderWidth : 2,
        borderColor : greendark,
        borderRadius : 30,
        flexDirection : 'row',
        marginBottom : 5
    },
    containerLogo : {
        height : '100%',
        width : '30%',
        borderRightWidth : 2,
        borderColor : greendark,
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : '#ccc',
        borderTopLeftRadius : 30,
        borderBottomLeftRadius : 30,
        opacity : 0.9
    },
    textLogo : {
        fontFamily : 'Righteous',
        fontSize : 26,
        color : greenlight
    },
    containerInfoVoucher : {
        height : '100%',
        width : '40%',
        justifyContent : 'center',
        padding : 10,
        backgroundColor : '#ccc',
        opacity : 0.9
    },
    titleVoucher : {
        fontSize : 20,
        fontWeight : 'bold',
        color : black,
    },
    textInfo : {
        fontSize : 16,
        fontFamily : 'NunitoSans-Regular',
    },
    containerButton : {
        height : '100%',
        width : '30%',
        justifyContent : 'center',
        alignItems : 'center',
        borderTopRightRadius : 30,
        borderBottomRightRadius : 30,
        backgroundColor : '#ccc',
        opacity : 0.9
    },
    button : {
        borderWidth : 2,
        borderColor : yellow,
        padding : 5,
        borderRadius : 8
    },
    textButton : {
        fontFamily : 'Mukta-Regular',
        fontSize : 20,
        color : yellow,
        fontWeight : 'bold'
    },
    containerCheckOut : {
        alignItems : 'center',
        borderWidth : 1,
        position : 'absolute',
        height : '7%',
        width : '100%',
        bottom : 0,
        justifyContent : 'center',
        alignItems:'center',
        backgroundColor : greenlight
    },
    containerDelete : {
        justifyContent : 'center',
        alignItems : 'center',
        width : '20%',
        height : '100%',
        padding : 5
    },
    buttonDelete : {
        backgroundColor : '#f12',
        width : '100%',
        height : '60%',
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : 5
    }
    
})
export default styles;