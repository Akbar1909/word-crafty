import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ViewAllWidgetProps {
  title: string;
  type: string;
}

export default function ViewAllWidget({title, type}: ViewAllWidgetProps) {
  const {navigate} = useNavigation();

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      {/* <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          navigate('WordListsScreen', {
            type,
          });
        }}
        style={styles.allBadge}>
        <Text style={tw`text-white`}>All</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  allBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'grey',
    borderRadius: 5,
  },
});
