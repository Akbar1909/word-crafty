import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

interface ViewAllWidgetProps {
  title: string;
  to: string;
}

export default function ViewAllWidget({title, to}: ViewAllWidgetProps) {
  const navigate = useNavigation();

  return (
    <View style={styles.root}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.allBadge}>
        <Text style={{color: 'white'}}>All</Text>
      </View>
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
