/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Button, View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HMSMap, { MapTypes, HMSMarker } from "@hmscore/react-native-hms-map";

import { Colors } from "react-native/Libraries/NewAppScreen";

//Location Kit
import HMSLocation from "@hmscore/react-native-hms-location";

let myLatitude = 0;
let myLongitude = 0;

const locationRequest = {
  priority: HMSLocation.FusedLocation.Native.PriorityConstants.PRIORITY_HIGH_ACCURACY,
  interval: 10000,
  numUpdates: 2147483647,
  fastestInterval: 10000,
  expirationTime: 3372036854775807.0,
  smallestDisplacement: 0.0,
  maxWaitTime: 0,
  needAddress: false,
  language: '',
  countryCode: '',
};

const locationSettingsRequest = {
  locationRequests: [locationRequest],
  alwaysShow: false,
  needBle: false,
};

class Permissions extends React.Component {
  constructor() {
    super();
    this.state = { location: false, activity: false };
  }
  componentDidMount() {
    // Check location permissions
    HMSLocation.FusedLocation.Native.hasPermission()
      .then((res) => this.setState({ location: res.hasPermission }))
      .catch((err) => alert(err.message));

    // Check ActivityIdentification permissions
    HMSLocation.ActivityIdentification.Native.hasPermission()
      .then((res) => this.setState({ activity: res.hasPermission }))
      .catch((err) => alert(err.message));
  }

  requestLocationPermisson = () =>
    HMSLocation.FusedLocation.Native.requestPermission().then((res) => this.setState({ location: res.granted }));

  requestActivityIdentificationPermisson = () =>
    HMSLocation.ActivityIdentification.Native.requestPermission().then((res) =>
      this.setState({ activity: res.granted })
    );

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Location</Text>
            <Button title="Obtener Permiso" onPress={this.requestLocationPermisson} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.location, null, 2)}</Text>
          </View>
        </View>
      </>
    );
  }
}

class LocationAvailability extends React.Component {
  constructor() {
    super();
    this.state = { locationAvailable: false };
  }

  getLocationAvailability = () =>
    HMSLocation.FusedLocation.Native.getLocationAvailability()
      .then((res) => this.setState({ locationAvailable: res.isLocationAvailable }))
      .catch((err) => alert(err.message));

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Location Availability</Text>
            <Button title="Check" onPress={this.getLocationAvailability} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.locationAvailable, null, 2)}</Text>
          </View>
        </View>
      </>
    );
  }
}

class LocationSettings extends React.Component {
  constructor() {
    super();
    this.state = { locationSettings: {} };
  }

  checkLocationSettings = () =>
    HMSLocation.FusedLocation.Native.checkLocationSettings(locationSettingsRequest)
      .then((res) => this.setState({ locationSettings: res }))
      .catch((err) => alert(err.message));

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Location Settings</Text>
            <Button title="Check" onPress={this.checkLocationSettings} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionDescription}></Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.locationSettings, null, 2)}</Text>
          </View>
        </View>
      </>
    );
  }
}

class LocationEnhance extends React.Component {
  constructor() {
    super();
    this.state = { navigationState: {} };
  }

  getNavigationState = () =>
    HMSLocation.FusedLocation.Native.getNavigationContextState(
      HMSLocation.FusedLocation.Native.NavigationRequestConstants.IS_SUPPORT_EX
    )
      .then((res) => this.setState({ navigationState: res }))
      .catch((err) => alert(err.message));

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Location Enhance</Text>
            <Button title="Check" onPress={this.getNavigationState} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionDescription}></Text>
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.navigationState, null, 2)}</Text>
          </View>
        </View>
      </>
    );
  }
}

class LastLocation extends React.Component {
  constructor() {
    super();
    this.state = { location: {} };
  }

  getLocation = () =>
    HMSLocation.FusedLocation.Native.getLastLocation()
      .then((pos) => {
        this.setState({ location: pos });
        myLatitude = pos.latitude;
        myLongitude = pos.longitude;
      })
      .catch((err) => alert(err.message));

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Last Location</Text>
            <Button title="Get" onPress={this.getLocation} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.location, null, 2)}</Text>
          </View>
        </View>
      </>
    );
  }
}
class LocationAddress extends React.Component {
  constructor() {
    super();
    this.state = { locationAddress: {} };
  }

  locationRequest = {
    priority: HMSLocation.FusedLocation.Native.PriorityConstants.PRIORITY_HIGH_ACCURACY,
    interval: 10000,
    numUpdates: 2147483647,
    fastestInterval: 10000,
    expirationTime: 3372036854775807.0,
    smallestDisplacement: 0.0,
    maxWaitTime: 0,
    needAddress: true,
    language: '',
    countryCode: '',
  };

  getLocation = () =>
    HMSLocation.FusedLocation.Native.getLastLocationWithAddress(this.locationRequest)
      .then((pos) => this.setState({ locationAddress: pos }))
      .catch((err) => alert(err.message));

  render() {
    return (
      <>
        <View style={styles.sectionContainer}>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.sectionTitle}>Last Location With Address</Text>
            <Button title="Get" onPress={this.getLocation} />
          </View>
          <View style={styles.spaceBetweenRow}>
            <Text style={styles.monospaced}>{JSON.stringify(this.state.locationAddress, null, 2)}</Text>
          </View>
        </View>
      </>
    );
  }
}

function MapsScreen ({ navigation }) {
  return (
    <View>
        <Text>
          Huawei Map Kit
        </Text>
        <HMSMap
          // mapType={MapTypes.NONE}
          mapType={MapTypes.NORMAL}
          style={{ height: 600 }}
          camera={{ target: { latitude: -33.4175102, longitude: -70.6129946 }, zoom: 15 }}
          myLocationEnabled={false}
          myLocationButtonEnabled={false}
          useAnimation={true}
          animationDuration={2000}
          compassEnabled={true}
          rotateGesturesEnabled={true}
          scrollGesturesEnabled={true}
          tiltGesturesEnabled={true}
          zoomControlsEnabled={true}
          zoomGesturesEnabled={true}
          onMapReady={(e) => {
            console.log('MapView onMapReady', e.nativeEvent)
          }}
          onMapClick={(e) => {
            console.log('MapView was clicked', e.nativeEvent);
          }}
        >

          {/* Multiple markers */}
          <HMSMarker
            coordinate={{ latitude: -33.4175102, longitude: -70.6129946 }}
            title="Mall Costanera Center"
            snippet="Av. Andrés Bello 2425, Providencia"
            onClick={(e) => console.log("HMSMarker onClick", e.nativeEvent)}
            onDragStart={(e) => console.log("HMSMarker onDragStart", e.nativeEvent)}
            onDrag={(e) => console.log("HMSMarker onDrag ", e.nativeEvent)}
            onDragEnd={(e) => console.log("HMSMarker onDragEnd", e.nativeEvent)}
            onInfoWindowClick={(e) => console.log("HMSMarker onInfoWindowClick", e.nativeEvent)}
            onInfoWindowClose={(e) => console.log("HMSMarker onInfoWindowClose", e.nativeEvent)}
          />
          <HMSMarker coordinate={{ latitude: -33.4176547, longitude: -70.6055639  }} clusterable />
          <HMSMarker coordinate={{ latitude: -33.416633775623936, longitude: -70.60225944125015 }} clusterable />
          <HMSMarker coordinate={{ latitude: -33.415380034218316, longitude: -70.60850362362068 }} clusterable />
        </HMSMap>
        <Button
          title="Ejemplo con location"
          onPress={() => navigation.navigate('Location')}
        />
      </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View>
      <Text>Maps Kit con Location</Text>
      <Permissions />
      {/* <LocationAvailability /> */}
      {/* <LocationSettings /> */}
      {/* <LocationEnhance /> */}
      {/* <LastLocation /> */}
      {/* <LocationAddress /> */}
      <View style={styles.divider} />
      <Button
        title="Location Ejemplo"
        onPress={() => navigation.push('Maps')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Maps">
        <Stack.Screen name="Maps" component={MapsScreen} />
        <Stack.Screen name="Location" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 30,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "400",
    color: Colors.dark,
  },
  activityData: {
    marginTop: 8,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
  header: {
    height: 180,
    width: "100%",
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "gray" },
  headerLogo: { height: 160, width: 160 },
  spaceBetweenRow: { flexDirection: "row", justifyContent: "space-between" },
  divider: {
    width: "90%",
    alignSelf: "center",
    height: 1,
    backgroundColor: "grey",
    marginTop: 20,
  },
  boldText: { fontWeight: "bold" },
  centralizeSelf: { alignSelf: "center" },
  centralizeContent: { flexDirection: "row", justifyContent: "space-around", alignItems: 'center' },
  monospaced: { fontFamily: "monospace" },
});

export default App;