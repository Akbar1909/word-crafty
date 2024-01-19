/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import tw from 'twrnc';
import {WordModel} from '../data/word';
import MyTheme from '../theme/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface WordFullInfoWidgetProps extends WordModel {}

const WordFullInfoWidget: FC<WordFullInfoWidgetProps> = ({
  word,
  definitions,
}) => {
  return (
    <View style={tw`mt-3 w-full`}>
      <ScrollView contentContainerStyle={tw`w-full pb-8 items-center`}>
        <View style={{width: '94%'}}>
          <Text style={{fontSize: 20, marginBottom: 10, fontWeight: '700'}}>
            {word}
          </Text>

          <View style={styles.content}>
            {definitions.map(({definition, examples}, i) => (
              <View
                key={i}
                style={[tw`pt-3 pb-3 pr-3 pl-3 rounded-2xl bg-purple-200`]}>
                <TouchableOpacity
                  style={[
                    tw`p-2 mb-2 border-2 border-purple-800 rounded-2xl flex-row items-center w-min`,
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

                {examples.map(({example}, j) => (
                  <View
                    key={j}
                    style={{
                      flexDirection: 'column',

                      marginBottom: 10,
                      marginLeft: 6,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
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

                    <Image
                      source={{
                        uri: 'https://clipart-library.com/data_images/6103.png',
                      }}
                      style={{width: 200, height: 200}}
                    />
                  </View>
                ))}
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