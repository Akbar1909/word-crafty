import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import tw from 'twrnc';
import {WordListModel} from '../data/word-list';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface WordListCardProps extends WordListModel {
  size?: number;
  index?: number;
  handlePress?: (wordListId: number, wordListTitle?: string) => void;
  isSaving?: boolean;
}

const WordListCard: FC<WordListCardProps> = ({
  size = 120,
  wordListId,
  index,
  name,
  handlePress,
  isSaving = false,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!handlePress) {
          return;
        }

        handlePress(wordListId, name);
      }}
      style={[
        styles.root,
        {width: size, height: size},
        tw`bg-purple-300 border border-purple-900 relative`,
      ]}>
      <View style={tw`absolute top-2 right-2`}>
        <Text>{isSaving ? 'saving..' : wordListId}</Text>
      </View>
      <Text style={tw`text-purple-900 font-medium`}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: 10,
  },
});

export default WordListCard;
