import { ActivityIndicator, Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, Modal } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts, windowHeight } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyInput, MyPicker } from '../../components'
import { useState } from 'react'
import moment from 'moment'
import { MYAPP, apiURL, getData } from '../../utils/localStorage'
import axios from 'axios'
import { showMessage } from 'react-native-flash-message';
import { TouchableOpacity } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { TextInput } from 'react-native'
import { useRef } from 'react'
import { useIsFocused } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export default function MenuA10({ navigation, route }) {
    const [data, setData] = useState([]);

    const isFocus = useIsFocused();

    useEffect(() => {
        if (isFocus) {
            __getTransaction();

            const unsubscribe = messaging().onMessage(async remoteMessage => {

                __getTransaction()

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

    const [totalPoint, setTotalPoint] = useState(0)
    const __getTransaction = () => {
        getData('user').then(u => {
            axios.post(apiURL + 'berkas_point', {
                fid_user: u.id
            }).then(res => {
                console.log(res.data);
                if (res.data.length > 0) {
                    let ppt = 0;
                    res.data.map(i => {
                        ppt += parseFloat(i.point)
                    })
                    setTotalPoint(ppt);
                    setData(res.data);
                }
            })
        })
    }

    const __renderItem = ({ item }) => {

        return (
            <View style={{
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.black
                    }}>No. Berkas / Tahun</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                        color: colors.black
                    }}>{item.nomor_berkas} {item.tahun}</Text>
                    <Text style={{
                        marginTop: 5,
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.black
                    }}>Tanggal Masuk Berkas</Text>
                    <Text style={{

                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.primary
                    }}>{moment(item.tanggal_masuk).format('dddd, DD MMMM YYYY')} ( {moment(item.tanggal_masuk).fromNow()} )</Text>
                    <Text style={{
                        marginTop: 5,
                        fontFamily: fonts.secondary[600],
                        fontSize: 12,
                        color: colors.black
                    }}>Posisi Berkas</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 12,
                        color: colors.black
                    }}>{item.posisi}</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[800],
                        fontSize: 25,
                        color: colors.black
                    }}>{item.point}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 8,
                        backgroundColor: item.status == 'OPEN' ? colors.danger : colors.success,
                        color: colors.white,
                        padding: 2,
                        borderRadius: 2,
                    }}>{item.status == 'OPEN' ? 'BELUM SELESAI' : 'SELESAI'}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,

        }}>
            <View style={{
                flex: 1,
                padding: 20,
            }}>
                <FlatList data={data} renderItem={__renderItem} />
            </View>
            <View style={{
                padding: 20,
                flexDirection: 'row',
                backgroundColor: colors.secondary
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.black
                }}>Total Point </Text>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: 25,
                    color: colors.black
                }}>{totalPoint}</Text>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})