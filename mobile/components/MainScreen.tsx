import React, { FC, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Dimensions, Image } from "react-native";
import { Text, Layout, TopNavigation, Divider, Icon, Button } from "@ui-kitten/components";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../type";
import { useDatabase } from "../context/DatabaseContext";
import { MAP_BOX_DEFAULT_TOKEN } from "@env";
import MapView, { Coordinate, LatLng, Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { default as mapStyle } from "../googleMapStyle.json";
import ettan from "../assets/images/ettan-lossnus.png";

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;

type Props = {
  navigation: MainScreenNavigationProp;
};

const MainScreen: FC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<Region | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [markers, setMarkers] = useState<LatLng[]>([]);

  const db = useDatabase();

  // LAT: 63.83862752985396,20.27814227229764

  useEffect(() => {
    //db.getUser(1).then((res) => console.log(res));
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to acces location was denied");
        return;
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});

      // centers map
      setLocation({ latitude, longitude, longitudeDelta: 0.003, latitudeDelta: 0.003 });
      // markers are of type LatLng
      const arvid: LatLng = { latitude: 63.83862752985396, longitude: 20.27814227229764 };
      setMarkers([arvid]);
    })();
  }, []);

  return (
    <View style={styles.page}>
      {location && (
        <MapView region={location} showsUserLocation style={styles.map} customMapStyle={mapStyle}>
          {markers.map((marker: LatLng, i) => (
            <Marker key={i} coordinate={marker}>
              <Image source={ettan} style={{ height: 40, width: 40 }} />
              <Text style={{ backgroundColor: "#1a1a1a", padding: 10, borderRadius: 10 }}>JAG BEHÖVER SNUS</Text>
            </Marker>
          ))}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
