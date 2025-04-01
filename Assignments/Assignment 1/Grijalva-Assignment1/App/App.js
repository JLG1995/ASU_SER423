import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // Importing Navigation Container
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Importing Bottom Tab Navigator
import React from 'react';

const Tab = createBottomTabNavigator(); // Creating a Bottom Tab Navigator to be able to create a 2nd View

function FirstScreen()  {
  return (
    <View style={styles.container}>
    <Text>Hello, SER 423! My name is Jose Grijalva.</Text>
    <StatusBar style="auto" />
  </View>
  );
}

function SecondScreen() {
  return (
    <View style={styles.secondScreenContainer}>
      <Text>Thanks for using my app!</Text>
    </View>
  );
}

/*
 * Restructured the App function to be able to use the Navigation Container and the Bottom Tab Navigator and display two views
*/
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="1st View" component={FirstScreen} />
        <Tab.Screen name="2nd View" component={SecondScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#228b22', // Forest Green color
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondScreenContainer: {
    flex: 1,
    backgroundColor: '#fafad2', // Providing a different background color for the 2nd View, which will be in light golden rod yellow color instead of forest green color.
    alignItems: 'center',
    justifyContent: 'center',
  },
});
