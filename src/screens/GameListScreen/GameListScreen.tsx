import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const GameListScreen = () => {
  const {navigate} = useNavigation();

  const games = [
    {
      id: 1,
      title: 'Word Scramble',
      subtitle: 'See the hints. Can you beat the clock and spell the word?',
    },
  ];

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1 p-2`}>
      <View style={tw`flex-1 items-center justify-center`}>
        {games.map(({title, subtitle, id}, i) => (
          <TouchableOpacity
            onPress={() => {
              // @ts-ignore
              navigate('WordScrambleGame');
            }}
            style={tw`h-30 bg-yellow-400 w-full flex-row p-2 rounded-xl`}
            key={id}>
            <View
              style={tw`w-30 bg-yellow-400 flex items-center justify-center`}>
              <FontAwesome
                name="puzzle-piece"
                style={tw`text-white`}
                size={80}
              />
            </View>
            <View style={tw`flex-1 justify-center`}>
              <Text style={tw`mb-1 text-white font-extrabold text-2xl`}>
                {title}
              </Text>
              <Text
                style={tw`text-lg text-gray-800 font-medium tracking-wider`}>
                {subtitle}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default GameListScreen;

const styles = StyleSheet.create({});
