import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    ScrollView,
    ImageBackground,
    Dimensions,
    Switch,
    SafeAreaView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Icon } from 'react-native-elements';

export default function Register({ navigation }) {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [cek, setCek] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const validate = text => {
        // console.log(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            // console.log('spinner_petugas is Not Correct');
            setData({ ...data, spinner_petugas: text });
            setValid(false);
            return false;
        } else {
            setData({ ...data, spinner_petugas: text });
            setValid(true);
            // console.log('spinner_petugas is Correct');
        }
    };

    const [sama, setSama] = useState(true)

    const [data, setData] = useState({
        api_token: api_token,
        username: '',
        password: '',
        repassword: '',
        email: '',
        spinner_petugas: '',
    });

    const simpan = () => {
        if (
            data.spinner_petugas.length === 0 &&
            data.username.length === 0 &&
            data.email.length === 0 &&
            data.password.length === 0

        ) {
            showMessage({
                message: 'Formulir pendaftaran tidak boleh kosong !',
            });
        } else if (data.spinner_petugas.length === 0) {
            showMessage({
                message: 'Masukan nama kamu',
            });
        }

        else if (data.email.length === 0) {
            showMessage({
                message: 'Masukan nomor email',
            });
        } else if (data.username.length === 0) {
            showMessage({
                message: 'Masukan username',
            });
        } else if (data.password.length === 0) {
            showMessage({
                message: 'Masukan kata sandi kamu',
            });
        } else {

            console.log(data);

            setLoading(true);
            axios
                .post(apiURL + 'register', data)
                .then(res => {
                    console.warn(res.data);
                    setLoading(false);
                    if (res.data.status == 404) {
                        showMessage({
                            type: 'danger',
                            message: res.data.message
                        })
                    } else {
                        console.log(res.data.data);
                        storeData('user', res.data.data);
                        navigation.replace('Home')
                        // Alert.alert(MYAPP, res.data.message);
                        // navigation.goBack();
                    }


                });
        }
    };

    const [desa, setDesa] = useState([]);



    return (
        <ImageBackground
            style={{
                flex: 1,
                backgroundColor: colors.white,
                padding: 10,
                position: 'relative'
            }}>

            {/* <Switch onValueChange={toggleSwitch} value={isEnabled} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: windowWidth / 12,
                        fontFamily: fonts.primary[800],
                        color: colors.black,

                    }}>Sign Up</Text>
                </View>


                <MyInput
                    placeholder="Masukan username"
                    label="Username"
                    iconname="at"
                    value={data.username}
                    onChangeText={value =>
                        setData({
                            ...data,
                            username: value,
                        })
                    }
                />
                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan spinner petugas"
                    label="Spinner Petugas"
                    iconname="person"
                    value={data.spinner_petugas}
                    onChangeText={value =>
                        setData({
                            ...data,
                            spinner_petugas: value,
                        })
                    }
                />


                <MyGap jarak={10} />
                <MyInput
                    placeholder="Masukan email"
                    label="email"
                    iconname="mail"
                    value={data.email}
                    onChangeText={value =>
                        setData({
                            ...data,
                            email: value,
                        })
                    }
                />

                <MyGap jarak={10} />

                <MyInput
                    placeholder="Masukan buat sandi"
                    label="Buat Sandi"
                    iconname="lock-closed"
                    secureTextEntry
                    value={data.password}
                    onChangeText={value =>
                        setData({
                            ...data,
                            password: value,
                        })
                    }
                />
                <MyGap jarak={10} />
                <MyInput
                    borderColor={sama ? colors.border : colors.danger}
                    borderWidth={sama ? 0 : 1}
                    placeholder="Masukan ulang kata sandi"
                    label="Tulis Ulang Kata Sandi"
                    iconname="lock-closed"
                    secureTextEntry
                    value={data.repassword}
                    onChangeText={value => {

                        if (value !== data.password) {
                            setSama(false)
                        } else {
                            setSama(true)
                        }

                        setData({
                            ...data,
                            repassword: value,
                        })
                    }

                    }
                />
                <MyGap jarak={20} />




                {!loading &&
                    <MyButton

                        warna={colors.primary}
                        title="Buat Akun"
                        Icons="log-in"
                        onPress={simpan}
                    />
                }

                <MyGap jarak={10} />
                {loading && <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator color={colors.primary} size="large" />
                </View>}
            </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        padding: 10,
    },
    image: {
        width: 620 / 4,
        height: 160 / 4,
    },
});
