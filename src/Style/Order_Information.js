import {
    StyleSheet,
} from 'react-native';
import { black, greendark, greenlight, white, yellow } from './colors';
export const styles =StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        backgroundColor : white,
    },
    containerHeader : {
        width : '100%',
        height : '7%',
        backgroundColor : greenlight,
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
    },
    textHeader : {
        fontSize : 24,
        fontFamily : 'Righteous',
        color : yellow,
    },
    buttonHeader : {
        position : 'absolute',
        left : 15,
        transform : [
            {
                rotate : '270deg',
            }
        ]
    },
    containerBody : {
        width : '100%',
        height : '93%',
    },
    containerState:{
        width : '100%',
        height : '10%',
        paddingLeft : 15,
        paddingRight : 15,
        alignItems : 'center',
        justifyContent : 'center',
        borderBottomWidth : 1,
        borderColor : '#eee'
    },
    containerDot : {
        width : '100%',
        height : '50%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        
    },
    dot : {
        fontSize : 28,
    },
    textState : {
        fontStyle :'italic'
    },
    containerInformation : {
        width : '100%',
        height : '15%',
        padding : 15,
    },
    containerContact : {
        width : '100%',
        height : '10%',
        padding : 15,
        justifyContent : 'space-between',
        alignItems : 'center',
        flexDirection : 'row',
        borderBottomWidth : 1,
        borderColor : '#eee',
    },
    containerFood : {
        width : '100%',
        height : '20%',
        
        // borderWidth : 1,
    },
    containerItem : {
        height : '100%',
        width : 411,
        flexDirection : 'row'
    },
    image : {
        height : '100%',
        width : 100,
    },
    containerTextFood : {
        width : 160,
        justifyContent : 'center',
        paddingLeft : 10,
    },
    textFood : {
        width : 140,
        fontSize : 15,
        fontWeight : 'bold',
    },
    containerTotal : {
        width : 140,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    containerSumary :{
        height : '27%',
        width : '100%',
        padding : 15,
        // borderWidth : 1,
    },
    containerTextSumary : {
        // borderWidth : 1,
        width : '100%',
        height : '20%',
        alignItems : 'center',
        flexDirection : 'row',
        justifyContent : 'space-between',
        borderBottomWidth : 1,
        borderColor : '#eee',
    },
    textTotal : {
        fontSize : 19,
        fontWeight : 'bold'
    },
    containerDetailTotal : {
        height : '70%',
        paddingTop : 10,
    },
    containerDetail : {
        width : '100%',
        height : '20%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    textDetail : {
        fontSize : 15,
    },
    textTotalSumary : {
        textAlign : 'right',
        paddingTop : 10,
        fontSize : 24,
        fontWeight : 'bold',
        color : black,
    },
    containerButtonReOrder : {
        height : '28%',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : yellow,
        borderRadius : 15,
    },
    textReOrder : {
        color : white,
        fontSize : 21,
        fontFamily : 'NunitoSans-Regular',
    }
})
