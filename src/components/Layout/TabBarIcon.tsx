import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyTheme from '../../theme/colors';

interface ITabBarIconProps {
  focused: boolean;
  text: string;
  icon: string;
  iconComponent: 'font-awesome' | 'material';
}

const getComponent = (type: ITabBarIconProps['iconComponent']) => {
  switch (type) {
    case 'font-awesome':
      return FontAwesome;
    case 'material':
      return MaterialIcons;
    default:
      return MaterialIcons;
  }
};

const TabBarIcon = ({focused, text, icon, iconComponent}: ITabBarIconProps) => {
  const IconComponent = getComponent(iconComponent);

  return (
    <View style={styles.root}>
      <IconComponent
        name={icon}
        size={24}
        color={focused ? MyTheme.colors.COMMON.white : MyTheme.colors.GREY[500]}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: MyTheme.colors.PRIMARY.contrastText,
  },
});

export default TabBarIcon;
