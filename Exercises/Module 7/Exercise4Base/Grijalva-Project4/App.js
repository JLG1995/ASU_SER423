// Initially, a functional component (with just a function) was utilized instead of a class component.
// Due to that, we utilize React features called "hooks" to handle things like state and side effects:
// - useState lets us store and update values (like the picker selections).
// - useEffect allows us to run code when the app starts (like loading saved data).
// Importing "Component" is not necessary anymore with my approach due to not 
// using a class in this project.

import React, { useState, useEffect } from 'react';
import {Picker} from '@react-native-picker/picker'; // You'll need this for the exercise
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Audio } from 'expo-av'; // Needed for the audio.

import AsyncStorage from '@react-native-async-storage/async-storage';

const key = '@MyApp:musicPlaylistRatings';

const trackList = [
  {
    title: 'Ukulele',
    author: 'Bensound',
    uri: 'https://www.bensound.com/bensound-music/bensound-ukulele.mp3',
  },
  {
    title: 'SoundHelisx Song 1',
    author: 'SoundHelix',
    uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    title: 'Sample 3s',
    author: 'Samplelib',
    uri: 'https://samplelib.com/lib/preview/mp3/sample-3s.mp3',
  },
];

export default function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ratings, setRatings] = useState(['', '', '']);
  const [loadedDataPreview, setLoadedDataPreview] = useState('');

  const options = ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'];

  async function playSound(uri) {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      );

      // Set the volume to 1.0 (100%) just to ensure it's at max volume.
      await newSound.setVolumeAsync(1.0);
      setSound(newSound);
      setIsPlaying(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to play the sound.');
    }
  }

  // This function is called when the user presses the Play/Pause button.
  // It checks if the sound is currently playing.
  // If it is, it pauses the sound and updates the state.
  // If it is not, it plays the sound and updates the state.
  const togglePlayPause = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  // For saving the ratings data to AsyncStorage.
  const onSave = async () => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(ratings));
      Alert.alert('Saved', 'Ratings saved successfully');

      const preview = trackList
        .map((sound, index) => `${sound.title}: ${ratings[index]}`)
        .join('\n');
      setLoadedDataPreview(preview);
    } catch {
      Alert.alert('Error', 'Failed to save ratings');
    }
  };

  // Load the saved ratings data from AsyncStorage
  // and display it in the preview box.
  // This function is called when the user presses the "Load Ratings" button.
  // It retrieves the saved data, parses it, and updates the state.
  // If the data is invalid or not found, it shows an alert.
  // It also updates the preview box with the loaded data.
  const onLoad = async () => {
    try {
      const stored = await AsyncStorage.getItem(key);
      if (stored) {
        const loadingRatings = JSON.parse(stored);
        if (Array.isArray(loadingRatings) && loadingRatings.length === 3) {
          setRatings(loadingRatings);

          const preview = trackList
            .map((sound, index) => `${sound.title}: ${loadingRatings[index]}`)
            .join('\n');
          setLoadedDataPreview(preview);

          Alert.alert('Loaded', 'Ratings loaded successfully');
        } else {
          Alert.alert('Warning', 'Saved data is invalid.');
        }
      } else {
        Alert.alert('Info', 'No saved ratings found.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load ratings.');
    }
  };

  // This function updates the rating for the current track.
  // It takes the new rating value as an argument and updates the ratings state.
  // It creates a new array of ratings, updates the rating for the current track,
  // and sets the new ratings array in the state.
  const updateRating = (value) => {
    const newRatings = [...ratings];
    newRatings[currentTrackIndex] = value;
    setRatings(newRatings);
  };

  useEffect(() => {
    playSound(trackList[currentTrackIndex].uri);

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    // onLoad();
  }, []);

  // Proceed to the next track in the list.
  const goToNext = () => {
    if (currentTrackIndex < trackList.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  // Go back to the previous track in the list.
  const goToPrevious = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.nowPlaying}>
        Now Playing: {trackList[currentTrackIndex].title}
      </Text>

      {/* The button for Play/Pause */}
      <TouchableOpacity onPress={togglePlayPause} style={styles.playPauseButton}>
        <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>

      {/* The section for Rating */}
      <Text style={styles.sectionTitle}>Rating</Text>

      {/* Displaying only the Picker for the current track */}
      {ratings && options.length > 0 && (
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={ratings[currentTrackIndex]}
          onValueChange={(value) => updateRating(value)}
          style={styles.input}
          mode="dropdown"
          dropdownIconColor="#000"
        >
          <Picker.Item label="Select a rating..." value="" color="#888" />
          {options.map((option) => (
            <Picker.Item
              key={option}
              value={option}
              label={option}
              color="#000" 
            />
          ))}
        </Picker>
      </View>
    )}

      {/* Navigation */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={goToPrevious} style={styles.navButton} disabled={currentTrackIndex === 0}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNext} style={styles.navButton} disabled={currentTrackIndex === trackList.length - 1}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* The Save and Load Buttons */}
      <TouchableOpacity onPress={onSave} style={styles.saveButton}>
        <Text style={styles.buttonText}>Save Ratings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLoad} style={styles.saveButton}>
        <Text style={styles.buttonText}>Load Ratings</Text>
      </TouchableOpacity>

      {/* The preview for the Ratings */}
      <Text style={styles.sectionTitle}>Saved Ratings Preview:</Text>
      <Text style={styles.previewBox}>
        {loadedDataPreview || 'No ratings loaded yet.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#ff0000',
  },
  nowPlaying: {
    fontSize: 18,
    marginBottom: 20,
  },
  playPauseButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    width: 150,
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    width: 300,
    height: 40,
    padding: 5,
    marginTop: 10,
  },
  pickerWrapper: {
    width: 300,
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  navButton: {
    backgroundColor: '#2980b9',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#6495ed',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    marginTop: 30,
    fontWeight: 'bold',
  },
  previewBox: {
    width: 300,
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 5,
    color: '#333',
    marginTop: 10,
    textAlign: 'left',
    lineHeight: 22,
  },
});