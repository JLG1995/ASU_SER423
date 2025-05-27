import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { Provider } from 'react-redux'; // Added here for the redux directory
import store from './redux'; //
import Album from './components/Album';

const App = () => (
  <Provider store={store}>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Album</Text>
      </View>
      <View style={styles.container}>
        <Album />
      </View>
    </SafeAreaView>
  </Provider>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#2196F3', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});

export default App;