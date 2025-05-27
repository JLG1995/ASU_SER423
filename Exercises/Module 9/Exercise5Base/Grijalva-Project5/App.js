import React, { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
} from "react-native-reanimated";

export default function App() {
  const [location, setLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [notificationText, setNotificationText] = useState("");
  const poi1 = {
    coords: { latitude: 33.307146, longitude: -111.681177 },
  };
  const poi2 = {
    coords: { latitude: 33.423204, longitude: -111.939612 },
  };

  const translateY = useSharedValue(-60);

  const notificationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    (async () => {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.granted) {
        const loc = await Location.getCurrentPositionAsync();
        setLocation(loc);
        setCurrentLocation(loc);
      }
    })();
  }, []);

  // The function for displaying the notification with the smooth animation.
  const showNotification = (text) => {
    setNotificationText(text);
    translateY.value = withTiming(0, { duration: 500 });
    translateY.value = withDelay(
      2500,
      withTiming(-60, { duration: 500 }, () => {
        runOnJS(setNotificationText)("");
      })
    );
  };

  const setMarkerLocation = (loc, label) => {
    setLocation(loc);
    showNotification(`Changed to ${label}`);
  };

  return location ? (
    <>
      {/* Animated notification banner */}
      <Animated.View style={[styles.notification, notificationStyle]}>
        <Text style={styles.notificationText}>{notificationText}</Text>
      </Animated.View>

      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04,
          }}
        >
          <Marker
            coordinate={location.coords}
            title={"Marker"}
            description={"Selected location"}
            image={require("./assets/you-are-here.png")}
          />
        </MapView>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setMarkerLocation(currentLocation, "You")}
          >
            <Text>You</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setMarkerLocation(poi1, "POI 1")}
          >
            <Text>POI 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setMarkerLocation(poi2, "POI 2")}
          >
            <Text>POI 2</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  ) : null;
}

const styles = StyleSheet.create({
  map: {
    flex: 7,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.85,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#eee",
  },
  button: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  notification: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#ff3366",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    elevation: 10,
  },
  notificationText: {
    color: "white",
    fontWeight: "bold",
  },
});