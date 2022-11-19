import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    PermissionsAndroid,
    TouchableOpacity,
    Linking,
    Platform,
} from 'react-native';
import MapView from 'react-native-maps';
import GetLocation from 'react-native-get-location'
const map = () => {
    const [currentLatitude, setCurrenLatitude] =useState();
    const [currentLongtitude, setCurrentLongtitude] =useState();
    state = {
        latitude : null,
        longitude : null,
    }
    let  componentDidMount= async () => {
        const {status} = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              'title': 'Example App',
              'message': 'Example App access to your location '
            }
          )
        if(status!=='granted'){

        }
    }
    useEffect(()=>{
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            // timeout: 15000,
        })
        .then(location => {
            console.log(location);
            setCurrenLatitude(location.latitude);
            setCurrentLongtitude(location.longitude);
        })
        .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
        })
    },[])
    openGps = () => {
        var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:'
        var url = scheme + `${currentLatitude}, ${currentLongtitude}`
        this.openExternalApp(url)
      }
    
    openExternalApp = (url) => {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(
            'ERROR',
            'Unable to open: ' + url,
            [
              {text: 'OK'},
            ]
          );
        }
      });
    }
    return(
        // <MapView initialRegion={…}>
        //     <MapViewDirections
        //         origin={origin}
        //         destination={destination}
        //         apikey={AIzaSyCwcPVwbcWlSiUm2lpCqKQO8Cw-fbsZNDY}
        //     />
        // </MapView>
        // <View style={styles.container}>
        //     <MapView
        //     // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        //     style={styles.map}
        //     region={{
        //         latitude: 37.78825,
        //         longitude: -122.4324,
        //         latitudeDelta: 0.015,
        //         longitudeDelta: 0.0121,
        //     }}
        //     >
        //     </MapView>
        // </View>
        <View style={styles.container}>
            <TouchableOpacity
            onPress={this.openGps}
            >
            <Text>Click to open Map</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        width : '100%',
        height : '100%',
    },
    map : {
        width  : '100%',
        height : '100%',
    }
})
export default map;