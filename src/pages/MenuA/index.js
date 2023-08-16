import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { MyHeader } from '../../components';
import { colors, fonts, windowHeight } from '../../utils';
import { MYAPP } from '../../utils/localStorage';
import { FlatList } from 'react-native';

export default function MenuA({ navigation, route }) {

    const data = [
        {
            judul: 'INPUT BERKAS',
            image: require('../../assets/p1.png'),
            halaman: 'MenuA1',
        },
        {
            judul: 'SEARCH BERKAS/NAMA',
            image: require('../../assets/p2.png'),
            halaman: 'MenuA2',
        },
        {
            judul: 'PETUGAS UKUR',
            image: require('../../assets/p3.png'),
            halaman: 'MenuA3',
        },
        {
            judul: 'PETUGAS PEMETAAN',
            image: require('../../assets/p4.png'),
            halaman: 'MenuA4',
        },
        {
            judul: 'PETUGAS CETAK',
            image: require('../../assets/p5.png'),
            halaman: 'MenuA5',
        },
        {
            judul: 'KORSUB PEMETAAN',
            image: require('../../assets/p6.png'),
            halaman: 'MenuA6',
        },
        {
            judul: 'KORSUB PENGUKURAN',
            image: require('../../assets/p7.png'),
            halaman: 'MenuA7',
        },
        {
            judul: 'KASI SP',
            image: require('../../assets/p8.png'),
            halaman: 'MenuA8',
        },
        {
            judul: 'PETUGAS ADMINISTRASI',
            image: require('../../assets/p9.png'),
            halaman: 'MenuA9',
        },
        {
            judul: 'REWARD (POINT) & PUNISHMENT',
            image: require('../../assets/p10.png'),
            halaman: 'MenuA10',
        },

    ]

    const _renderItem = ({ item }) => {
        return (
            <TouchableNativeFeedback onPress={() => navigation.navigate(item.halaman, item)}>
                <View style={{
                    flex: 1,
                    margin: 10,
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: colors.primary,
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={item.image} style={{
                            width: 80,
                            height: 80,
                            resizeMode: 'center'
                        }} />
                    </View>
                    <View style={{
                        flex: 1,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            fontSize: 12,
                            textAlign: 'center'
                        }}>{item.judul}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }

    useEffect(() => {

    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 20,
            backgroundColor: colors.white
        }}>


            <FlatList showsVerticalScrollIndicator={false} data={data} renderItem={_renderItem} numColumns={2} />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})