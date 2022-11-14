import {
    StyleSheet,
} from 'react-native';
import { greendark, greenlight, white, yellow } from './colors';
export const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        backgroundColor : greenlight,
    },
    containerHeader : {
        width : '100%',
        height : '10%',
        backgroundColor : greenlight,
        paddingLeft : 25,
        paddingRight : 25,
        alignItems : 'center',
        justifyContent : 'center',
    
    },
    buttonHeader : {
        position : 'absolute',
        left : 15
    },
    containerBody : {
        width : '100%',
        height : '100%',
        backgroundColor :white,
        borderTopLeftRadius : 33,
        borderTopRightRadius : 33,
    },
    body : {
        width : '100%',
        height : '100%',
        backgroundColor : white,
        borderTopLeftRadius : 33,
        borderTopRightRadius : 33,
        backgroundColor : '#eee'
    },
    text :{
        fontFamily : 'NunitoSans-Regular',
        fontSize : 24,
        color : white
    },
    containerAvatar : {
        width : '100%',
        alignItems : 'center',
        marginTop : 10,
    },
    avatar : {
        width : 130,
        height : 130,
        borderRadius : 100,
        marginBottom : 5,
    },
    containerPoint : {
        width : '100%',
        height : '18%',
        flexDirection : 'row',
        padding : 20,
    },
    point : {
        width : '50%',
        height : '100%',
        backgroundColor : greenlight,
        marginRight : 5,
        paddingLeft : 8,
        borderRadius : 15,
        shadowColor: greendark,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    favorite : {
        width : '50%',
        height : '100%',
        backgroundColor : yellow,
        marginLeft : 5,
        paddingLeft : 8,
        borderRadius : 15,
        shadowColor: yellow,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    textPoint : {
        color : white,
        fontFamily : 'Mukta-Regular',
        fontSize : 20
    },
    containerComponent : {
        width : '100%',
        height : '100%',
        padding : 10
    },
    containerInfor : {
        width : '100%',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    containerInput : {
        width : '100%',
        marginTop : 15,
        borderRadius : 10
    },
    containerEdit : {
        position :'absolute',
        backgroundColor : '#ddd',
        height : 130,
        width : 130,
        borderRadius : 100,
        alignItems : 'center',
        justifyContent: 'center',
        opacity : 0.7
    }
    
})