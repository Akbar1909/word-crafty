/* eslint-disable react-native/no-inline-styles */
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import React from 'react';
import {useMutation} from '@tanstack/react-query';
import {useForm, Controller} from 'react-hook-form';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyTextInput from '../../components/MyTextInput';
import SPACING from '../../theme/spacing';
import MyTheme from '../../theme/colors';
import {login} from '../../data/auth';
import {useNavigation} from '@react-navigation/native';
import {REACT_APP_SERVER_BASE_URL, REACT_APP_PROD_SERVER_BASE_URL} from '@env';
import {useAuth} from '../../providers/AuthProvider';

export default function LoginScreen() {
  const {navigate} = useNavigation();
  const {saveTokenToStorage} = useAuth();
  const {isPending, ...rest} = useMutation({
    mutationFn: login,
    mutationKey: ['login'],
    onSuccess: async response => {
      await saveTokenToStorage({accessToken: response.data?.access_token});
      // @ts-ignore
      navigate('HomeScreen');
    },
    onError: error => console.log(error?.message),
  });
  const {
    handleSubmit,
    control,
    // formState: {errors},
  } = useForm();

  const onSubmit = handleSubmit((data: any) => {
    rest.mutate(data);
    console.log(
      data,
      REACT_APP_SERVER_BASE_URL,
      REACT_APP_PROD_SERVER_BASE_URL,
    );
  });

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView style={{flex: 1}}>
        <View
          style={{paddingHorizontal: 20, justifyContent: 'center', flex: 1}}>
          <View style={styles.textViewBox}>
            <Controller
              name="email"
              control={control}
              render={({field: {onChange, value, onBlur}}) => (
                <MyTextInput
                  onChangeText={v => onChange(v)}
                  placeholder="Username or email"
                  value={value}
                  onBlur={onBlur}
                  disableFullscreenUI={isPending}
                  autoCapitalize="none"
                />
              )}
            />
          </View>

          <View style={styles.textViewBox}>
            <Controller
              name="password"
              control={control}
              render={({field: {onChange, value, onBlur}}) => (
                <MyTextInput
                  onChangeText={v => onChange(v)}
                  value={value}
                  onBlur={onBlur}
                  placeholder="Password"
                  icon="eye"
                  disableFullscreenUI={isPending}
                  autoCapitalize="none"
                />
              )}
            />
          </View>
          <TouchableOpacity onPress={onSubmit} style={styles.buttonView}>
            <Text style={{fontSize: 24, color: MyTheme.colors.COMMON.white}}>
              {isPending ? (
                <Progress.Circle size={20} indeterminate />
              ) : (
                'Login'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: SPACING.SCREEN_HORIZONTAL_PADDING,
  },
  textViewBox: {
    marginBottom: 10,
  },
  buttonView: {
    height: 50,
    backgroundColor: MyTheme.colors.SECONDARY.dark,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: MyTheme.colors.COMMON.white,
  },
});
