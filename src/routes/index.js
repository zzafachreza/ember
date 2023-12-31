import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  Account,
  AccountEdit,
  Pengaturan,
  InfoPdf,
  RumahSakit,
  Janji,
  WebInfo,
  Materi,
  Pencarian,
  Detail,
  MenuA,
  MenuA1,
  MenuA2,
  MenuA3,
  MenuA4,
  MenuA5,
  MenuA10,
  MenuA6,
  MenuA7,
  MenuA8,
  MenuA9,
  MenuA11,





} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Materi"
        component={Materi}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="Pencarian"
        component={Pencarian}
        options={{
          headerShown: false,

        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="MenuA"
        component={MenuA}
        options={{
          headerShown: true,
          title: 'PENGUKURAN',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colors.secondary,
            elevation: 0,
          }

        }}
      />

      <Stack.Screen
        name="MenuA1"
        component={MenuA1}
        options={{
          headerShown: true,
          title: 'INPUT BERKAS',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colors.secondary,
            elevation: 0,
          }

        }}
      />
      <Stack.Screen
        name="MenuA2"
        component={MenuA2}
        options={{
          headerShown: true,
          title: 'SEARCH BERKAS',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colors.secondary,
            elevation: 0,
          }

        }}
      />

      <Stack.Screen
        name="MenuA3"
        component={MenuA3}
        options={{
          headerShown: true,
          title: 'PETUGAS UKUR',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colors.secondary,
            elevation: 0,
          }

        }}
      />

      <Stack.Screen
        name="MenuA4"
        component={MenuA4}
        options={{
          headerShown: true,
          title: 'PETUGAS PEMETAAN',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colors.secondary,
            elevation: 0,
          }

        }}
      />
      <Stack.Screen
        name="MenuA5"
        component={MenuA5}
        options={{
          headerShown: true,
          title: 'PETUGAS CETAK',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colors.secondary,
            elevation: 0,
          }

        }}
      />
      <Stack.Screen
        name="MenuA6"
        component={MenuA6}
        options={{
          headerShown: true,
          title: 'KORSUB PEMETAAN',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colors.secondary,
            elevation: 0,
          }

        }}
      />
      <Stack.Screen
        name="MenuA7"
        component={MenuA7}
        options={{
          headerShown: true,
          title: 'KORSUB PENGUKURAN',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colors.secondary,
            elevation: 0,
          }

        }}
      />
      <Stack.Screen
        name="MenuA8"
        component={MenuA8}
        options={{
          headerShown: true,
          title: 'KASI SP',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colors.secondary,
            elevation: 0,
          }

        }}
      />
      <Stack.Screen
        name="MenuA9"
        component={MenuA9}
        options={{
          headerShown: true,
          title: 'PETUGAS ADMINISTRASI',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colors.secondary,
            elevation: 0,
          }

        }}
      />
      <Stack.Screen
        name="MenuA10"
        component={MenuA10}
        options={{
          headerShown: true,
          title: 'PETUGAS SURAT',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colors.secondary,
            elevation: 0,
          }

        }}
      />
      <Stack.Screen
        name="MenuA11"
        component={MenuA11}
        options={{
          headerShown: true,
          title: 'REWARD (POINT) & PUNISHMEMT',
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: colors.secondary,
            elevation: 0,
          }

        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,

        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: false,

        }}
      />
    </Stack.Navigator>
  );
}
