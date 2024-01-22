import React, {FC, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  Text,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyTheme from '../theme/colors';

interface IMyTextInputProps extends TextInputProps {
  icon?: string;
  placeholder?: string;
  helperText?: string;
  iconPosition?: 'right' | 'left';
  height?: number;
  onFocus?: (e: any) => void;
}

const MyTextInput: FC<IMyTextInputProps> = ({
  icon,
  placeholder,
  helperText,
  iconPosition = 'right',
  height = 50,
  onFocus,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.searchSection, {height}]}>
      {icon && (
        <View
          style={[
            styles.searchIcon,
            {width: height, height},
            focused && styles.focusedSearchIcon,
          ]}>
          <Icon
            name={icon}
            size={20}
            color={
              focused ? MyTheme.colors.PRIMARY.main : MyTheme.colors.GREY[500]
            }
          />
        </View>
      )}
      <RNTextInput
        style={[styles.input, {height}, focused && styles.focusedInput]}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
        onFocus={e => {
          setFocused(true);
          onFocus && onFocus(e);
        }}
        onBlur={e => setFocused(false)}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    zIndex: 10,
    borderColor: MyTheme.colors.GREY[500],
    borderLeftWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    position: 'absolute',
    bottom: 0,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: MyTheme.colors.GREY[500],
    borderRadius: 10,
  },
  focusedInput: {
    borderColor: MyTheme.colors.PRIMARY.main,
  },
  focusedSearchIcon: {
    borderColor: MyTheme.colors.PRIMARY.main,
  },
});

export default MyTextInput;
