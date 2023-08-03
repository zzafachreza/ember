import { ActivityIndicator, Alert, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors, fonts } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyInput, MyPicker } from '../../components'
import { useState } from 'react'
import moment from 'moment'
import { MYAPP, apiURL, getData } from '../../utils/localStorage'
import axios from 'axios'

export default function MenuA4({ navigation }) {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const sendServer = () => {
        setLoading(true);

        setTimeout(() => {
            console.log(kirim);
            axios.post(apiURL + 'berkas_filter_petugas_pemetaan', kirim).then(res => {
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
                <MYList label="Nama Pemohon" value={item.nama} />
                <MYList label="Kelurahan" value={item.kelurahan} />
                <MYList label="Petugas Ukur" value={item.petugas_ukur} />
                <MYList label="Posisi Berkas" value={item.posisi} />

                <MYList label="Keterangan" value={item.keterangan} />
                <MYList label="Status" value={item.status} />



                <View style={{
                    padding: 10
                }}>
                    <MyButton title="Tindak Lanjut Berkas" warna={colors.success} onPress={() => {
                        Alert.alert(MYAPP, 'Tindak lanjut berkas ?', [
                            {
                                text: 'TUTUP',
                                onPress: () => {



                                }
                            },
                            {
                                text: 'TOLAK',
                                onPress: () => {

                                    setOpen(true);
                                    setID(item.id)

                                }
                            }, {
                                text: 'TERIMA',
                                onPress: () => {

                                    axios.post(apiURL + 'update_status', {
                                        id: item.id,
                                        status: 'TERIMA'
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

    const [keterangan, setKeterangan] = useState('');
    const [ID, setID] = useState(0)

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
            {open && <View style={{
                flex: 1,
                padding: 20,
            }}>
                <MyInput onChangeText={x => setKeterangan(x)} label="Alasan berkas di tolak" iconname='create' placeholder="Masukan alasan kenapa berkas di tolak" />
                <MyGap jarak={10} />
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                        paddingRight: 5
                    }}>
                        <MyButton onPress={() => {
                            setOpen(false)

                        }} title="KEMBALI" warna={colors.danger} />
                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 5
                    }}>
                        <MyButton title="SIMPAN" onPress={() => {
                            axios.post(apiURL + 'update_status', {
                                id: ID,
                                status: 'TOLAK',
                                keterangan: keterangan
                            }).then(res => {
                                console.log(res.data)
                                sendServer();
                                setOpen(false)
                            })
                        }} warna={colors.success} />
                    </View>
                </View>
            </View>}
            {!open && <ScrollView showsVerticalScrollIndicator={false}>



                <MyGap jarak={10} />
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
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

                </View>

                <MyGap jarak={10} />
                {!loading && <MyButton title="FILTER" onPress={sendServer} />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}

                <FlatList data={data} renderItem={__renderItem} />

            </ScrollView>}
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({})