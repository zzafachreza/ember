import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import { colors, fonts, windowWidth } from '../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import RenderHtml from 'react-native-render-html';
export default function Detail({ navigation, route }) {

    const item = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                padding: 5,
                height: 80,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    padding: 5,
                }}>
                    <Icon type='ionicon' name='arrow-back-outline' size={windowWidth / 13} color={colors.black} />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.black
                }}>{route.params.nama}</Text>


            </View>

            <Image source={{
                uri: item.image
            }} style={{
                width: windowWidth / 1.8,
                height: windowWidth / 1.8,
                alignSelf: 'center',

            }} />
            <View style={{
                padding: 10,
            }}>
                <RenderHtml
                    contentWidth={'100%'}
                    source={{
                        html: item.informasi
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})