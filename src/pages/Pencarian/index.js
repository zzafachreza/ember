import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, TextInput } from 'react-native'
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
import { MyInput } from '../../components';

export default function Materi({ navigation, route }) {


    const item = route.params;

    const [data, setData] = useState([]);
    const isFocus = useIsFocused();
    const [user, setUser] = useState({});

    const _getTransaction = (key = '') => {


        axios.post(apiURL + 'materi_cari', {
            key: key
        }).then(res => {
            console.log(res.data);
            setData(res.data);
        });
    }


    useEffect(() => {
        if (isFocus) {
            _getTransaction();
        }
    }, [isFocus]);

    const __renderItem = ({ item }) => {
        return (

            <TouchableNativeFeedback onPress={() => navigation.navigate('Detail', item)}>
                <View style={{
                    marginVertical: 5,
                    marginHorizontal: 20,
                    backgroundColor: colors.primary,
                    flex: 1,
                    padding: 10,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: colors.primary,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                    }}>
                        <Image source={{
                            uri: item.image
                        }} style={{
                            width: 80,
                            height: 80,
                            resizeMode: 'contain',
                            marginBottom: 10,
                        }} />
                    </View>
                    <View style={{
                        padding: 10,
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 25,
                            color: colors.white
                        }}>{item.nama}</Text>


                    </View>
                    <Icon type='ionicon' name='chevron-forward-outline' size={30} color={colors.white} />
                </View>
            </TouchableNativeFeedback>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>


            <View style={{
                flexDirection: 'row',
                paddingHorizontal: 10
            }}>
                <View style={{
                    flex: 1,
                }}>

                    <MyInput onSubmitEditing={x => {
                        _getTransaction(x.nativeEvent.text)
                    }} placeholder="masukan kata kunci" label="Masukan Kata Kunci" icon="search" />
                </View>
            </View>
            <View style={{
                flex: 1,
            }}>
                <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})