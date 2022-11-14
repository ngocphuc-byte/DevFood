import {
    StyleSheet,
} from 'react-native';
import { greenlight, yellow } from './colors';
export const styles = StyleSheet.create({
        container : {
            width : '100%',
            height : '100%',
            backgroundColor : '#fff'
        },
        image : {
            width : 140,
            height : '100%',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,
            elevation: 24,
        },
        containerFood : {
            backgroundColor : '#fff',
            height : '100%',
            marginRight : 12,
            borderWidth : 1,
            borderColor : greenlight,
            borderRadius : 10,
            justifyContent : 'center'
        },
        containerDetail : {
            width : '100%',
            height : '98%',
            alignItems : 'center',
            marginTop : 50,
        },
        containerDetail2 : {
            width : '70%',
            height : '50%',
            backgroundColor : '#eee',
            borderRadius : 30,
            alignItems : 'center',
            padding : 5
        },
        imageDetail : {
            width : 220,
            height : 220,
            position : 'absolute',
            top : -100,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,

            elevation: 24,
        },
        text : {
            fontSize : 26,
            top : 75,
            fontFamily : 'Righteous'
        },
        textDetail : {
            fontFamily : 'NunitoSans-Regular',
            top : 75,
            fontSize : 17,
            width : '100%',
            textAlign : 'center',
        },
        button : {
            width : '100%',
            height : '20%',
            backgroundColor : yellow,
            position : 'absolute',
            bottom : 0,
            borderBottomLeftRadius : 30,
            borderBottomRightRadius : 30,
            flexDirection : 'row',
            justifyContent : 'center',
            alignItems : 'center',
        },
        textButton : {
            fontFamily : 'Mukta-Regular',
            color : yellow,
            fontSize : 19,
            paddingLeft : 5
        },
        imageDrink : {
            width : 130,
            height : 130,
            position : 'absolute',
            top : -51,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.00,

            elevation: 24,
        }

})