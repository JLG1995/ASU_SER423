import React, { Component } from 'react';
import {
          StyleSheet,
          Text,
          TextInput,
          ScrollView,
          Button,
          Alert,
          FlatList,
          Image,
          TouchableOpacity,
          View
        } from 'react-native';

export default class App extends Component {
              state = {
                chosenGrade: '', // Storing the selected grade
                namesOfStudents: [], // Storing the list of student names that are fetched from the API.
                statusMessage: '', // Storing the status message to display to the user.
              };


              // Update: Included a try-catch block for extre precaution of potential errors.
              onLoad = async (grade) => {
                this.setState({
                  chosenGrade: grade,
                  statusMessage: 'Loading, please wait...',
                  namesOfStudents: [],
                });
                try {
                  // Fetching data from the API with the selected grade as a query parameter.
                  const response = await fetch(`https://2s4b8wlhik.execute-api.us-east-1.amazonaws.com/studentData?grade=${grade}`);
                  const data = await response.json(); // Parsing the JSON response.
            
                  // Ensuring that the data is an array before updating the state accordingly.
                  if (Array.isArray(data)) {
                    this.setState({
                      namesOfStudents: data, // UPdating the list of state names based on which button is pressed.
                      statusMessage: '', // Clearing the status message.
                    });
                  } else {
                    // Handling the unexpected response format in case the API does not return an array.
                    this.setState({
                      statusMessage: 'Unexpected response format.',
                      namesOfStudents: [],
                    });
                  }
                } catch (error) {
                  // Handling any errors that occur during the API fetch operation.
                  this.setState({
                    statusMessage: 'Error loading data.', // Error message
                    namesOfStudents: [], // Clearing the list of student names.
                  });
                }
              }

              render() {
                const { chosenGrade, namesOfStudents, statusMessage } = this.state; // Destructuring the state variables for easier access.
                const grades = ['A', 'B', 'C', 'D', 'E']; // list of student grades.

                return (
                  <View style={styles.container}>
                    {/* Heading text that changes based on the selected grade butotn */}
                    <Text style={styles.heading}>
                      {chosenGrade
                        ? `Students who received a/an ${chosenGrade} grade:`
                        : 'Select a grade to load student names'}
                    </Text>
            
                    <View style={styles.preview}>
                      {statusMessage ? (
                        <Text>{statusMessage}</Text>
                      ) : (
                        // Displaying the list of student names in a scrollable view.
                        <ScrollView>
                          {namesOfStudents.map((name, index) => (
                            <Text key={index} style={styles.nameText}>
                              {name}
                            </Text>
                          ))}
                        </ScrollView>
                      )}
                    </View>
            
                    {/* All of the grade buttons */} 
                    {grades.map((grade) => (
                      <TouchableOpacity
                        key={grade} // Unique key for each button
                        onPress={() => this.onLoad(grade)} // Calling the onLoad function with the selected grade
                        style={styles.btn}
                      >
                        <Text style={styles.btnText}>Load {grade}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                );
              }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // full height of the screen
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  preview: {
    backgroundColor: '#bdc3c7',
    width: '90%',
    height: 200,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 14,
    marginVertical: 2,
    color: '#333',
  },
  btn: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
