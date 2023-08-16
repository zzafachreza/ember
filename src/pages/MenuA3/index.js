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

export default function MenuA3({ navigation, route }) {

    const POSISI = route.params.judul;
    const dataUtama = [
        {
            label: 'PETUGAS UKUR',
            value: 'PETUGAS UKUR'
        },
        {
            label: 'PETUGAS PEMETAAN',
            value: 'PETUGAS PEMETAAN'
        },
        {
            label: 'PETUGAS CETAK',
            value: 'PETUGAS CETAK'
        },
        {
            label: 'KORSUB PEMETAAN',
            value: 'KORSUB PEMETAAN'
        },
        {
            label: 'KORSUB PENGUKURAN',
            value: 'KORSUB PENGUKURAN'
        },
        {
            label: 'KASI SP',
            value: 'KASI SP'
        },
        {
            label: 'PETUGAS SURAT',
            value: 'PETUGAS SURAT'
        },
        {
            label: 'PETUGAS ADMINISTRASI',
            value: 'PETUGAS ADMINISTRASI'
        },

    ];
    const filterdData = dataUtama.filter(i => i.label !== POSISI)
    const [data, setData] = useState([]);
    const [pilih, setPilih] = useState({});
    const [open, setOpen] = useState(false);
    const [cek, setCek] = useState({
        a: false,
        b: true
    })
    const [update, setUpdate] = useState({
        status_berkas: 'DI TERIMA DARI ' + POSISI,
        posisi: filterdData[0].label,
        keterangan: '',
    })

    const [modalVisible, setModalVisible] = useState(false);
    const sendServer = () => {
        setLoading(true);

        setTimeout(() => {
            // console.log(kirim);
            axios.post(apiURL + 'berkas_posisi_filter', kirim).then(res => {
                setLoading(false);
                console.log(res.data);
                if (res.data.length > 0) {
                    setData(res.data);

                } else {
                    setData(res.data);
                    showMessage({
                        type: 'danger',
                        message: 'Berkas tidak ditemukan !'
                    })
                }

                // Alert.alert(MYAPP, 'Data berhasil di simpan !')
            })

        }, 100)


    }

    const updateServer = () => {
        console.log(update)
        axios.post(apiURL + 'berkas_update', update).then(res => {
            setLoading(false);
            console.log(res.data);
            sendServer();
            setModalVisible(false);
            Alert.alert(MYAPP, 'Berkas berhasil di update !')
        })
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
                <MYList label="Status Berkas" value={item.status_berkas} />
                <MYList label="Keterangan" value={item.keterangan} />



                <View style={{
                    padding: 10
                }}>
                    <MyButton title="Tindak Lanjut Berkas" warna={colors.success} onPress={() => {
                        setModalVisible(true);
                        setPilih(item)
                        setUpdate({
                            ...update,
                            id_berkas: item.id
                        })
                    }} />
                </View>

            </View>
        )
    }

    const [keterangan, setKeterangan] = useState('');
    const [ID, setID] = useState(0);

    const inputRef = useRef()

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
        posisi: POSISI,
        tahun: '',
        petugas_ukur: 'SEMUA',
        kegiatan: 'PENGUKURAN DAN PEMETAAN KADASTRAL'
    })

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>

            <ScrollView showsVerticalScrollIndicator={false}>



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
                                    label: 'SEMUA',
                                    value: 'SEMUA'
                                },
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

            </ScrollView>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>

                <View style={{
                    // backgroundColor: '#00000086',
                    flex: 1,
                    justifyContent: 'flex-end',
                }}>
                    <View style={{
                        height: windowHeight / 1.5,
                        backgroundColor: colors.primary,
                        padding: 20,
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                fontFamily: fonts.secondary[800],
                                color: colors.white,
                                fontSize: 20,
                                padding: 5,
                                marginBottom: 10,
                                textAlign: 'center',
                                backgroundColor: 'red'
                            }}>No. Berkas / Tahun : {pilih.nomor_berkas}/{pilih.tahun}</Text>

                            <Text style={{
                                fontSize: 15,
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                            }}>Tujuan Posisi Berkas</Text>
                            <MyPicker nolabel backgroundInput={colors.white} data={filterdData} iconname="people" value={update.posisi} onValueChange={x => setUpdate({ ...update, posisi: x })} />

                            <Text style={{
                                marginVertical: 17,
                                fontSize: 15,
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                            }}>Status Berkas</Text>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 10,
                            }}>
                                <TouchableWithoutFeedback onPress={() => {

                                    setCek({
                                        a: true,
                                        b: false
                                    });
                                    setUpdate({
                                        ...update,
                                        status_berkas: 'DI TOLAK DARI ' + POSISI
                                    })
                                    setTimeout(() => {
                                        inputRef.current.focus()
                                    }, 200)
                                }}>
                                    <View style={{
                                        flex: 1,
                                        backgroundColor: cek.a ? colors.white : colors.primary,
                                        marginRight: 5,
                                        borderWidth: 1,
                                        borderColor: colors.white,
                                        borderRadius: 10,
                                        padding: 10,
                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: 15,
                                            color: cek.a ? colors.primary : colors.white,
                                            fontFamily: fonts.secondary[600],
                                        }}>TOLAK</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => {

                                    setCek({
                                        a: false,
                                        b: true
                                    });
                                    setUpdate({
                                        ...update,
                                        status_berkas: 'DI TERIMA DARI ' + POSISI
                                    })
                                }}>
                                    <View style={{
                                        flex: 1,
                                        marginLeft: 5,
                                        backgroundColor: cek.b ? colors.white : colors.primary,
                                        borderWidth: 1,
                                        borderColor: colors.white,
                                        borderRadius: 10,
                                        padding: 10,
                                    }}>
                                        <Text style={{
                                            textAlign: 'center',
                                            fontSize: 15,
                                            color: cek.b ? colors.primary : colors.white,
                                            fontFamily: fonts.secondary[600],
                                        }}>TERIMA</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            {/* keterangan */}

                            <Text style={{
                                marginVertical: 17,
                                fontSize: 15,
                                color: colors.white,
                                fontFamily: fonts.secondary[600],
                            }}>Keterangan Berkas</Text>
                            <TextInput multiline value={update.keterangan} placeholder='Masukan keterangan apabila di perlukan' ref={inputRef} onChangeText={x => {
                                setUpdate({
                                    ...update,
                                    keterangan: x
                                })
                            }} autoCapitalize='none' style={{
                                backgroundColor: colors.white,
                                borderRadius: 10,
                                fontFamily: fonts.secondary[600],
                                color: colors.black,
                                paddingLeft: 10,
                            }} />

                        </View>
                        <MyButton Icons='create-outline' warna={colors.success} title="UPDATE BERKAS" onPress={updateServer} />

                    </View>
                </View>
            </Modal>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({})