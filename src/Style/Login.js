import React from "react";
import {
    StyleSheet,
} from 'react-native';
export default styles = StyleSheet.create({
    container : {
        height : '100%',
        width : '100%',
        
    },
    imagebackground : {
        width : '100%',
        height : '100%',
        
    },
    image : {
        width : '100%',
        height : '40%',
        position : 'absolute',
    },
    text:{
        fontFamily : 'Mukta-Regular',
        color : '#fff',
        fontSize : 28
    },
    button:{
        width : '75%',
        alignItems : 'center',
        borderRadius: 1,
        borderWidth : 1,
        marginVertical : 5,
        marginHorizontal : 5,
        borderRadius : 30,
        borderColor : '#fff',
        marginTop : 5
    },
    containerButton : {
        alignItems : 'center',
        width  :'100%',
        position : 'absolute',
        bottom : 10,
        height : '40%',
        justifyContent : 'center',
    },
    containerInput : {
        width : '100%',
        padding : 7,
    },
    containerClose : {
        width : '100%',
        alignItems : 'center',
        position : 'absolute',
        top : -29
    },
    containerGoogle : {
        width : '100%',
        alignItems : 'center',
        marginTop : 40
    },
    imageGoogle :{
        width : 150,
        height : 50,
    }
})