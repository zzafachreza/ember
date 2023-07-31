import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { MyHeader } from '../../components';
import { colors, fonts, windowHeight } from '../../utils';
import { MYAPP } from '../../utils/localStorage';

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
            judul: 'MONITORING PETUGAS UKUR',
            image: require('../../assets/p3.png'),
            halaman: 'MenuA3',
        },
        {
            judul: 'MONITORING PETUGAS PEMETAAN',
            image: require('../../assets/p4.png'),
            halaman: 'MenuA4',
        },
        {
            judul: 'REWARD (POINT) & PUNISHMENT',
            image: require('../../assets/p5.png'),
            halaman: 'MenuA5',
        },

    ]

    useEffect(() => {

    }, [])

    return (
        <SafeAreaView style={{
            flex: 1,
            padding: 20,
            backgroundColor: colors.white
        }}>


            <ScrollView showsVerticalScrollIndicator={false} style={{
                flex: 1
            }}>

                {data.map(i => {
                    return (
                        <TouchableNativeFeedback onPress={() => navigation.navigate(i.halaman)}>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 5,
                                borderRadius: 10,
                                padding: 10,
                                backgroundColor: colors.primary,
                            }}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Image source={i.image} style={{
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
                                        fontSize: 22,
                                        textAlign: 'center'
                                    }}>{i.judul}</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    )
                })}


            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({})