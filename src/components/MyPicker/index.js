import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export default function MyPicker({
  label,
  nolabel = false,
  iconname,
  onValueChange,
  onChangeText,
  value,
  keyboardType,
  labelColor = colors.primary,
  secureTextEntry,
  styleInput,
  placeholder,
  label2,
  styleLabel,
  backgroundInput = colors.zavalabs,
  colorIcon = colors.primary,
  data = [],
}) {
  return (
    <>

      {!nolabel && <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 0,
        }}>
        <Icon type="ionicon" name={iconname} color={colorIcon} size={16} />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: labelColor,
            left: 10,
            fontSize: 12,
            ...styleLabel,
          }}>
          {label}
        </Text>
      </View>}

      <View style={{
        backgroundColor: backgroundInput,
        borderRadius: 10,
        marginTop: !nolabel ? 5 : 15,
        fontFamily: fonts.secondary[600],
        borderColor: colors.primary,
      }}>
        <Picker style={{ height: 48, transform: [{ scale: 0.9 }] }}
          selectedValue={value} onValueChange={onValueChange}>
          {data.map(item => {
            return <Picker.Item textStyle={{ fontSize: 12 }} value={item.value} label={item.label} />;
          })}
        </Picker>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
