/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {useMutation} from '@tanstack/react-query';
import React, {useState} from 'react';
import tw from 'twrnc';
import {SafeAreaView} from 'react-native-safe-area-context';
import MyTextInput from '../../components/MyTextInput';
import {useForm, Controller} from 'react-hook-form';
import {createWordList} from '../../data/word-list';

export default function CreateWordListScreen() {
  const [name, setName] = useState('');

  const {mutate, isPending} = useMutation({
    mutationFn: createWordList,
    mutationKey: ['create-word-list'],
    onSuccess: ({data}) => {},
  });

  const {
    handleSubmit,
    control,

    // formState: {errors},
  } = useForm({});

  const onSubmit = handleSubmit((data: any) => {
    mutate(data);
  });

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <KeyboardAvoidingView
        behavior="padding"
        style={tw`flex justify-end flex-1`}>
        <View style={[styles.contentBox, tw`pt-5 bg-blue-200`]}>
          <View style={tw`mb-1`}>
            <Controller
              name="name"
              control={control}
              render={({field: {onChange, value, onBlur}}) => (
                <MyTextInput
                  onChangeText={v => onChange(v)}
                  placeholder="Word list name"
                  value={value}
                  onBlur={onBlur}
                  disableFullscreenUI={false}
                  autoCapitalize="none"
                />
              )}
            />
          </View>
          <TouchableOpacity
            onPress={onSubmit}
            style={tw`w-full h-10 bg-yellow-400 mt-5 rounded-lg mb-5 flex items-center justify-center`}>
            {isPending ? (
              <Progress.Circle size={20} indeterminate />
            ) : (
              <Text style={tw`font-semibold text-xl`}>Create word list</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentBox: {
    height: 200,
    width: '100%',
    paddingHorizontal: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
