/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import React, {FC} from 'react';
import tw from 'twrnc';
import {WordModel} from '../data/word';
import MyTheme from '../theme/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {REACT_APP_SERVER_BASE_URL, REACT_APP_PROD_SERVER_BASE_URL} from '@env';

interface WordFullInfoWidgetProps extends WordModel {
  handleSavePress: (definitionId: number) => void;
}

const WordFullInfoWidget: FC<WordFullInfoWidgetProps> = ({
  word,
  definitions,
  handleSavePress,
}) => {
  return (
    <View style={tw`mt-4 w-full`}>
      <ScrollView contentContainerStyle={[tw`w-full items-center pb-25`]}>
        <View style={{width: '94%'}}>
          <Text style={{fontSize: 20, marginBottom: 10, fontWeight: '700'}}>
            {word}
          </Text>

          <View style={styles.content}>
            {definitions.map(({definition, examples, definitionId}, i) => (
              <View
                key={i}
                style={[tw`pt-3 pb-3 pr-3 pl-3 rounded-2xl bg-purple-200`]}>
                <TouchableOpacity
                  onPress={() => handleSavePress(definitionId)}
                  style={[
                    tw`p-2 mb-2 border-2 border-purple-800 rounded-2xl flex-row items-center`,
                    {alignSelf: 'flex-start', marginLeft: 'auto'},
                  ]}>
                  <FontAwesome
                    name="plus"
                    size={16}
                    color={MyTheme.colors.PURPLE[900]}
                  />
                  <Text style={tw`text-purple-900 ml-1`}>Add to word list</Text>
                </TouchableOpacity>
                <Text
                  style={{fontWeight: '500', fontSize: 18, marginBottom: 10}}>
                  {definition}
                </Text>

                {examples.map(({example, images}, j) => {
                  return (
                    <View
                      key={j}
                      style={{
                        flexDirection: 'column',

                        marginBottom: 10,
                        marginLeft: 6,
                      }}>
                      <View style={tw`flex-row items-center mb-2`}>
                        <View style={styles.bullet} />
                        <Text
                          style={{
                            fontStyle: 'italic',
                            letterSpacing: 1.3,
                            fontSize: 14,
                          }}>
                          {example}
                        </Text>
                      </View>

                      {images.length >= 1 && (
                        <FastImage
                          source={{
                            uri: `${REACT_APP_SERVER_BASE_URL}/files/serve/${images[0].filename}`,
                            priority: FastImage.priority.high,
                          }}
                          style={{
                            width: 220,
                            height: 220,
                            margin: 'auto',
                            borderRadius: 15,
                          }}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WordFullInfoWidget;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 15,
    width: '100%',
  },
  wordBox: {
    marginBottom: 15,
  },
  content: {},
  bullet: {
    width: 6,
    height: 6,
    backgroundColor: MyTheme.colors.PURPLE[900],
    borderRadius: 3,
    marginRight: 5,
  },
  definition: {},
});
