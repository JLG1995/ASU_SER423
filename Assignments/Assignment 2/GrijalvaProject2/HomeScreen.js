import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';

const continents = [
  { id: '1', title: 'Africa', url: 'https://en.wikipedia.org/wiki/Africa' },
  { id: '2', title: 'Asia', url: 'https://en.wikipedia.org/wiki/Asia' },
  { id: '3', title: 'Europe', url: 'https://en.wikipedia.org/wiki/Europe' },
  { id: '4', title: 'North America', url: 'https://en.wikipedia.org/wiki/North_America' },
  { id: '5', title: 'South America', url: 'https://en.wikipedia.org/wiki/South_America' },
  { id: '6', title: 'Antarctica', url: 'https://en.wikipedia.org/wiki/Antarctica' },
  { id: '7', title: 'Australia', url: 'https://en.wikipedia.org/wiki/Australia_(continent)' },
];

const HomeScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <CustomButton
      style={styles.button}
      onPress={() => navigation.navigate('WebView', { url: item.url })}
      title={item.title}
      size="sm"
      backgroundColor="#ff0000"
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={continents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginVertical: 10,
    width: 250,
  },
});

export default HomeScreen;