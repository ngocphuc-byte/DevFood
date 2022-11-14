import {
    StyleSheet
} from 'react-native';
import {greendark, greenlight, white, yellow} from '../Style/colors'
export const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
        backgroundColor : greenlight,
    },
    containerHeader : {
        width : '100%',
        height : '10%',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingLeft : 25,
        paddingRight : 25,
        flexDirection : 'row',
    
    },
    textTitle : {
        fontFamily : 'Righteous',
        color : yellow,
        fontSize : 22
    },
    containerBody : {
        width : '100%',
        height : '90%',
        backgroundColor : '#eee',
        borderTopLeftRadius : 33,
        borderTopRightRadius : 33,
        padding : 10
    },
    containerProgressBar : {
        width :'100%',
        height : '20%',
        justifyContent : 'center',
        // borderWidth : 1
    },
    progressBar : {
        height : 30,
        borderRadius : 30,
        shadowColor: greenlight,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    textPoint : {
        position : 'absolute',
        fontSize : 18,
        fontFamily: 'NunitoSans-Regular',
        color : white,
        top : 47,
        left : 150
    },
    containerVoucher : {
        width : '100%',
        height : 220,
        
    },
    voucher : {
        flexDirection : 'row',
        width : '100%',
        height : '80%',
        borderWidth : 1,
        borderColor : greenlight,
    },
    containerTextVoucher : {
        height : '100%',
        width : '20%',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : greendark
    },
    textVoucher : {
        fontSize : 20,
        fontFamily : 'Righteous',
        transform: [{ rotate: '-90deg'}],
        color : yellow
    },
    containerLogo : {
        width : '30%',
        height : '100%',
        justifyContent : 'center',
        paddingLeft : 7,
        borderRightWidth : 2,
        borderColor : '#ddd'
    },
    containerInfoVoucher : {
        justifyContent : 'center',
        paddingLeft : 7,
        paddingRight : 7,
        height : '100%',
        width : '50%'
    },
    textInfoVoucher : {
        fontSize : 22,
        fontFamily: 'NunitoSans-Regular',
    },
    containerButton : {
        width : '100%',
        height : '40%',
        alignItems:'center',
        justifyContent : 'center',
        backgroundColor : greenlight,
        borderRadius : 50,
        marginTop : 8,
    }
})