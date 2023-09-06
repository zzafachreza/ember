import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../../utils'
import { MyButton, MyCalendar, MyGap, MyInput, MyPicker } from '../../components'
import { useState } from 'react'
import moment from 'moment'
import { MYAPP, apiURL, getData } from '../../utils/localStorage'
import axios from 'axios'

export default function MenuA1({ navigation }) {


    const sendServer = () => {
        setLoading(true);

        setTimeout(() => {
            console.log(kirim);
            axios.post(apiURL + 'berkas_add', kirim).then(res => {
                setLoading(false);
                console.log(res.data);
                Alert.alert(MYAPP, `No. Berkas ${kirim.nomor_berkas}/${kirim.tahun} berhasil di input !`)
            })

        }, 1000)


    }

    const [loading, setLoading] = useState(false);


    const [petugas, setPetugas] = useState([])
    useEffect(() => {



        getData('user').then(u => {

            axios.post(apiURL + 'petugas').then(res => {
                console.log(res.data);
                setPetugas(res.data);
                setKirim({
                    ...kirim,
                    fid_user: u.id,
                    petugas_ukur: res.data[0].value
                })
            })

        })
    }, [])

    const [kirim, setKirim] = useState({
        nama: '',
        nomor_berkas: '',
        tahun: '',
        tanggal_masuk: moment().format('YYYY-MM-DD'),
        kelurahan: '',
        kecamatan: '',
        petugas_ukur: 'WAHID NUR KOLIS',
        kegiatan: 'PENGUKURAN DAN PEMETAAN KADASTRAL'
    })

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 20,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <MyInput label="Nama" iconname="person" value={kirim.nama} onChangeText={x => setKirim({ ...kirim, nama: x })} />
                <MyGap jarak={5} />
                <View style={{
                    flexDirection: 'row'
                }}>
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
                <MyCalendar label="Tanggal Masuk Berkas" iconname="calendar" value={kirim.tanggal_masuk} onDateChange={x => setKirim({ ...kirim, tanggal_masuk: x })} />
                <MyGap jarak={5} />
                <MyInput label="Kelurahan" iconname="navigate" value={kirim.kelurahan} onChangeText={x => setKirim({ ...kirim, kelurahan: x })} />
                <MyGap jarak={5} />
                <MyInput label="Kecamatan" iconname="location" value={kirim.kecamatan} onChangeText={x => setKirim({ ...kirim, kecamatan: x })} />
                <MyGap jarak={5} />
                <MyPicker label="Petugas Ukur" data={petugas} iconname="people" value={kirim.petugas_ukur} onValueChange={x => setKirim({ ...kirim, petugas_ukur: x })} />
                <MyGap jarak={5} />
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
                <MyGap jarak={20} />
                {!loading && <MyButton title="SAVE" onPress={sendServer} />}
                {loading && <ActivityIndicator size="large" color={colors.primary} />}
                <MyGap jarak={20} />

            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({})