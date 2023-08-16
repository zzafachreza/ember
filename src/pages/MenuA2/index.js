import { ActivityIndicator, Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyInput, MyPicker } from '../../components'
import { useState } from 'react'
import moment from 'moment'
import { MYAPP, apiURL, getData } from '../../utils/localStorage'
import axios from 'axios'

export default function MenuA2({ navigation }) {

    const [data, setData] = useState([]);

    const sendServer = () => {
        setLoading(true);

        setTimeout(() => {
            console.log(kirim);
            axios.post(apiURL + 'berkas_filter', kirim).then(res => {
                setLoading(false);
                console.log(res.data);
                if (res.data.length > 0) {
                    setData(res.data);

                } else {
                    Alert.alert(MYAPP, 'Data berkas tidak ditemukan !')
                }

                // Alert.alert(MYAPP, 'Data berhasil di simpan !')
            })

        }, 1000)


    }

    const MYList = ({ label, value }) => {
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                <Text style={{
                    flex: 0.5,
                    fontFamily: fonts.secondary[800],
                    fontSize: 12
                }}>{label}</Text>
                <Text style={{
                    flex: 0.1,
                    fontFamily: fonts.secondary[600],
                    fontSize: 12
                }}>:</Text>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: 12
                }}>{value}</Text>
            </View>
        )
    }

    const __renderItem = ({ item }) => {
        return (
            <View style={{
                marginVertical: 10,
                // borderWidth: 1,
                borderRadius: 10,
                backgroundColor: colors.secondary,
                padding: 10
            }}>
                <MYList label="No. Berkas" value={item.nomor_berkas} />
                <MYList label="Tahun" value={item.tahun} />
                <MYList label="Tanggal" value={item.tanggal_masuk} />
                <MYList label="Nama Pemohon" value={item.nama} />
                <MYList label="Kelurahan" value={item.kelurahan} />
                <MYList label="Petugas Ukur" value={item.petugas_ukur} />
                <MYList label="Posisi Berkas" value={item.posisi} />
                <MYList label="Status Berkas" value={item.status_berkas} />
                <MYList label="Keterangan" value={item.kererangan} />

                <View style={{
                    padding: 10
                }}>
                    <MyButton title="Atur Posisi Berkas" warna={colors.black} onPress={() => {
                        Alert.alert(MYAPP, 'Mau dipindah ke posisi mana berkas ini ?', [
                            {
                                text: 'TIDAK',
                            }, {
                                text: 'PETUGAS UKUR',
                                onPress: () => {

                                    axios.post(apiURL + 'update_posisi', {
                                        id: item.id,
                                        posisi: 'PETUGAS UKUR'
                                    }).then(res => {
                                        sendServer();
                                    })

                                }
                            }, {
                                text: 'PETUGAS PEMETAAN',
                                onPress: () => {

                                    axios.post(apiURL + 'update_posisi', {
                                        id: item.id,
                                        posisi: 'PETUGAS PEMETAAN'
                                    }).then(res => {
                                        sendServer();
                                    })

                                }
                            }
                        ])
                    }} />
                </View>

            </View>
        )
    }

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getData('user').then(u => {
            setKirim({
                ...kirim,
                fid_user: u.id
            })
        })
    }, [])

    const [kirim, setKirim] = useState({
        nama: '',
        nomor_berkas: '',
        tahun: '',
        petugas_ukur: 'WAHID NUR KOLIS',
        kegiatan: 'PENGUKURAN DAN PEMETAAN KADASTRAL'
    })

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>


                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        paddingRight: 5,
                    }} >
                        <MyInput label="Nama" iconname="person" value={kirim.nama} onChangeText={x => setKirim({ ...kirim, nama: x })} />
                    </View>
                    <View style={{
                        flex: 1,
                        paddingRight: 5,
                    }}>
                        <MyInput label="NO. Berkas" value={kirim.nomor_berkas} onChangeText={x => setKirim({ ...kirim, nomor_berkas: x })} iconname="card" />
                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                    }}>
                        <MyInput label="Tahun" keyboardType='number-pad' iconname="analytics" value={kirim.tahun} onChangeText={x => setKirim({ ...kirim, tahun: x })} />
                    </View>
                </View>
                <MyGap jarak={10} />
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        paddingRight: 5,
                    }} >
                        <MyPicker label="Petugas Ukur" data={
                            [

                                {
                                    label: 'WAHID NUR KHOLIS',
                                    value: 'WAHID NUR KHOLIS'
                                },
                                {
                                    label: 'RANGGA ADITYA',
                                    value: 'RANGGA ADITYA'
                                },
                                {
                                    label: 'ERMAWANTO',
                                    value: 'ERMAWANTO'
                                },
                                {
                                    label: 'MERANDRA',
                                    value: 'MERANDRA'
                                },

                            ]
                        } iconname="people" value={kirim.petugas_ukur} onValueChange={x => setKirim({ ...kirim, petugas_ukur: x })} />
                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5,
                    }}>
                        <MyPicker label="Kegiatan" value={kirim.kegiatan} onValueChange={x => setKirim({ ...kirim, kegiatan: x })} data={
                            [


                                {
                                    label: 'PENGUKURAN DAN PEMETAAN KADASTRAL',
                                    value: 'PENGUKURAN DAN PEMETAAN KADASTRAL'
                                },
                                {
                                    label: 'PEMECAHAN, PEMISAHAN & PENGGABUNGAN',
                                    value: 'PEMECAHAN, PEMISAHAN & PENGGABUNGAN'
                                },
                                {
                                    label: 'PENGUKURAN ULANG & PENGEMBALIAN BATAS',
                                    value: 'PENGUKURAN ULANG & PENGEMBALIAN BATAS'
                                },
                                {
                                    label: 'KUTIPAN BLANKO',
                                    value: 'KUTIPAN BLANKO'
                                },
                                {
                                    label: 'SURAT BALASAN',
                                    value: 'SURAT BALASAN'
                                },

                            ]
                        } iconname="options" />

                    </View>
                </View>

                <MyGap jarak={10} />
                {!loading && <MyButton title="SEARCH" onPress={sendServer} />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}

                {!loading && <FlatList data={data} renderItem={__renderItem} />}

            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({})