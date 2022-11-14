import {
    StyleSheet,
} from 'react-native';
import { black, greendark, greenlight, orange, white, yellow } from './colors';
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
        alignItems : 'center',
        justifyContent : 'center'
    },
    textHeader : {
        color : yellow,
        fontFamily : 'Righteous',
        fontSize : 22
    },
    icon : {
        position : 'absolute',
        left :15,
    },
    containerBody : {
        width : '100%',
        backgroundColor : '#eee',
        height : '83%',
        paddingTop : 10,
        paddingBottom : 10,
    },
    containerFooter : {
        width : '100%',
        height : '10%',
        backgroundColor : greenlight,
        flexDirection : 'row',
        justifyContent : 'space-between',
    },
    containerButton : {
        width : '30%',
        height : '100%',
        backgroundColor : yellow,
        justifyContent : 'center',
        alignItems : 'center',
    },
    containerTotal : {
        width : '70%',
        height : '100%',
        justifyContent : 'center',
        paddingLeft : 10,
        paddingRight : 10,
    },
    textTotal : {
        fontFamily : 'NunitoSans-Regular',
        fontSize : 17,
        color : white,
        textAlign : 'right',
    },
    containerAccount : {
        backgroundColor : white,
        width : '100%',
        flexDirection : 'row',
        paddingTop : 10,
        marginBottom : 10,
        borderWidth : 3,
        borderColor : yellow,
    },
    containerIcon : {
        width : '20%',
        alignItems : 'center',
    },
    containerInfo : {
        width : '80%',
        height : 110
    },
    textInfo : {
        fontSize : 20,
        color : black,
        fontFamily : 'NunitoSans-Regular',
        
    },
    containerFood : {
        width : '100%',
        height :  130,
        marginBottom : 10,
    },
    containerItem : {
        height : '100%',
        width : 410,
        backgroundColor : white,
        padding : 10,
        borderRadius : 12,
        marginRight : 10,
        flexDirection : 'row',
        alignItems : 'center',
        borderWidth : 3,
        borderColor : greenlight
    },
    containerImage : {
        width : 100,
        height : '100%',
        alignItems : 'center',
        justifyContent : 'center',
    },
    image : {
        width : 100,
        height : 100,
    },
    containerDetailFood : {
        width : '70%',
        height : '100%',
        marginLeft : 10,
        padding : 10
    },
    textDetailFood : {
        fontSize : 18,
        fontWeight : 'bold',
        color : black
    },
    containerQuantity : {
        height : 70,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    textVoucher : {
        fontSize : 18,
        color : '#f12'
    },
    containerPayment : {
        width : '100%',
        // backgroundColor : white,
        padding : 10,
    },
    containerRadioButton : {
        justifyContent : 'space-between',
        flexDirection : 'row',
        alignItems : 'center',
        padding : 5,
    },
    containerButtonPayment: {
        backgroundColor : white,
        borderRadius : 10,
        marginBottom : 10
    },
    containerDetailPayment : {
        height : 200,
        backgroundColor : white,
        padding : 10,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
    },
    containerDetail : {
        flexDirection : 'row',
         alignItems : 'center',
         marginBottom : 5
    },
    Modal : {
        width : '100%',
        height : '100%',
        flexDirection : 'row'
    },
    containerWaiting : {
        width : 100,
        height : 100,
        backgroundColor : greenlight,
        bottom : 200,
        left : 125,
        justifyContent : 'center',
        alignItems : 'center',
        padding : 5
    }
})
export default styles;