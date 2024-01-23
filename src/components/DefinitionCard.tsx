import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {WordDefinitionModel} from '../data/word-definition';
import {WordModel} from '../data/word';
import tw from 'twrnc';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {WordListModel} from '../data/word-list';

interface DefinitionCardProps extends WordDefinitionModel {
  word: WordModel['word'];
  wordId: WordModel['wordId'];
  handleDeletePress: (
    definitionId: WordDefinitionModel['definitionId'],
  ) => void;
}

const DefinitionCard: FC<DefinitionCardProps> = ({
  word,
  definition,
  definitionId,
  partOfSpeech,
  handleDeletePress,
}) => {
  return (
    <View style={tw`w-full bg-indigo-300 p-4 mb-2 rounded-xl`}>
      <Text style={tw`font-bold text-lg mb-1`}>{word}</Text>
      <Text style={tw`mb-1 text-gray-800`}>{partOfSpeech}</Text>
      <Text>{definition}</Text>
      <View style={tw`flex items-end`}>
        <FontAwesome
          onPress={() => handleDeletePress(definitionId)}
          name="trash-o"
          size={23}
        />
      </View>
    </View>
  );
};

export default DefinitionCard;

const styles = StyleSheet.create({});
