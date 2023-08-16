import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking, BackHandler } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export default function Home({ navigation, route }) {

  const [user, setUser] = useState({});
  const isFocus = useIsFocused();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [comp, setComp] = useState({});

  const _getTransaction = async () => {
    axios.post(apiURL + 'company').then(res => {
      setComp(res.data.data);
    });

    getData('token').then(tt => {
      getData('user').then(uu => {
        setUser(uu);

        if (tt.token !== uu.token) {
          // console.log
          console.log('Harus update token', tt);
          axios.post(apiURL + 'update_token', {
            id: uu.id,
            token: tt.token
          }).then(res => {
            if (res.data.status == 200) {
              storeData('user', res.data.data);

            }
          })
        } else {
          console.log('token sudah sama')
        }

      })
    })


  }


  useEffect(() => {
    if (isFocus) {
      _getTransaction();


      const unsubscribe = messaging().onMessage(async remoteMessage => {



        console.log(remoteMessage.data);

        // alert(obj.notification.title)

        PushNotification.localNotification({
          /* Android Only Properties */
          channelId: 'ember', // (required) channelId, if the channel doesn't exist, notification will not trigger.
          title: remoteMessage.data.title, // (optional)
          message: remoteMessage.data.message, // (required)
        });
      });

      return unsubscribe;
    }


  }, [isFocus]);

  const __renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => navigation.navigate('InfoPdf', item)}>
        <View style={{
          flex: 1,
          width: 170,
          height: 120,
          padding: 10,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: colors.primary,
          margin: 5,
        }}>
          <Image source={{
            uri: item.image
          }} style={{
            width: '100%',
            height: 60,
            resizeMode: 'contain',
            marginBottom: 10,
          }} />
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 12,
            textAlign: 'center'
          }}>{item.nama_rs}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }


  return (

    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <View style={{
        padding: 20,
        backgroundColor: colors.secondary,
        flexDirection: 'row'
      }}>
        <View style={{
          flex: 1,
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 16,
            color: colors.black
          }}>Selamat datang di E-MBER</Text>
          <Text style={{
            fontFamily: fonts.secondary[800],
            fontSize: 16,
            color: colors.black
          }}>{user.spinner_petugas}</Text>
        </View>
        <TouchableNativeFeedback onPress={() => Alert.alert(MYAPP, 'Kamy yakin akan keluar aplikasi ?', [
          { text: 'TIDAK' },
          {
            text: 'KELUAR',
            onPress: () => {
              storeData('user', null);

              navigation.reset({
                index: 0,
                routes: [{ name: 'Splash' }],
              });
              // BackHandler.exitApp();
            }
          }
        ])}>
          <Image source={require('../../assets/exit.png')} style={{
            width: 30,
            height: 30
          }} />
        </TouchableNativeFeedback>
      </View>
      <View style={{
        padding: 20,
        backgroundColor: colors.secondary,

      }}>
        <Image source={require('../../assets/logo2.png')} style={{
          width: '100%',
          height: 80,
          resizeMode: 'contain'
        }} />
        <Text style={{
          fontFamily: fonts.secondary[800],
          fontSize: 25,
          textAlign: 'center'
        }}>E - Monitoring Berkas</Text>
      </View>


      <View style={{
        flex: 1,
        justifyContent: 'center',
      }}>
        <View style={{
          flexDirection: 'row'
        }}>
          <TouchableNativeFeedback onPress={() => navigation.navigate('MenuA')}>
            <View style={{
              margin: 10,
              backgroundColor: colors.primary,
              borderRadius: 10,
              flex: 1,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}>

              <Image source={require('../../assets/not.png')} style={{
                width: 40,
                height: 40,
                position: 'absolute',
                zIndex: 99,
                top: -20,
                right: 0,
              }} />

              <Image source={require('../../assets/A1.png')} style={{
                width: 100,
                height: 100
              }} />
              <Text style={{
                marginTop: 10,
                fontFamily: fonts.secondary[600],
                fontSize: 15,
                color: colors.white
              }}>PENGUKURAN</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback >
            <View style={{
              margin: 10,
              backgroundColor: colors.secondary,
              borderRadius: 10,
              flex: 1,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/A2.png')} style={{
                width: 100,
                height: 100
              }} />
              <Text style={{
                marginTop: 10,
                fontFamily: fonts.secondary[600],
                fontSize: 15,
                color: colors.white
              }}>PANITIA "A"</Text>
            </View>
          </TouchableNativeFeedback>

        </View>
        <View style={{
          flexDirection: 'row'
        }}>
          <TouchableNativeFeedback>
            <View style={{
              margin: 10,
              backgroundColor: colors.secondary,
              borderRadius: 10,
              flex: 1,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/A3.png')} style={{
                width: 100,
                height: 100
              }} />
              <Text style={{
                marginTop: 10,
                fontFamily: fonts.secondary[600],
                fontSize: 15,
                color: colors.white
              }}>CETAK SU DAN BT SK</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <View style={{
              margin: 10,
              backgroundColor: colors.primary,
              borderRadius: 10,
              flex: 1,
              padding: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/A4.png')} style={{
                width: 100,
                height: 100
              }} />
              <Text style={{
                marginTop: 10,
                fontFamily: fonts.secondary[600],
                fontSize: 15,
                color: colors.white
              }}>PENYERAHAN</Text>
            </View>
          </TouchableNativeFeedback>

        </View>
      </View>





    </SafeAreaView >
  )
}

const styles = StyleSheet.create({})