import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import AreaChoiceScreen from './screens/AreaChoiceScreen';
import RecruiterHomeScreen from './screens/RecruiterHomeScreen';
import RecruiterSwipeScreen from './screens/RecruiterSwipeScreen';
import CandidateHomeScreen from './screens/CandidateHomeScreen';
import CandidateSwipeScreen from './screens/CandidateSwipeScreen';
import ProfileScreen from './screens/ProfileScreen';
import CandidatePostApplyFormScreen from './screens/CandidatePostApplyFormScreen';
import RecruiterPostAnnounceScreen from './screens/RecruiterPostAnnounceScreen';
import AnnounceArchivedScreen from './screens/AnnounceArchivedScreen';
import MyAnnounceScreen from './screens/MyAnnounceScreen';
import DisplayAnnounceScreen from "./screens/DisplayAnnounceScreen";
import DisplayCandidateApplyingScreen from "./screens/DisplayCandidateApplyingScreen";




import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import users from './reducers/users';
import ScreenModel from './components/ScreenModel';

// AsyncStorage.clear()

const reducers = combineReducers({ users });
const persistConfig = { key: 'faceUpP3', storage: AsyncStorage };
const Tab = createBottomTabNavigator();

const HomeIcon = ({ source, size, color }) => (
  <Image
    source={require("./assets/tente.png")}
    style={[{ width: 40, height: 40, tintColor: color, marginTop: 20 }]}
  />
);
const SearchIcon = ({ source, size, color }) => (
  <Image
    source={require("./assets/search.png")}
    style={{ width: 40, height: 40, tintColor: color, marginTop: 20 }}
  />
);
const ProfileIcon = ({ source, size, color }) => (
  <Image
    source={require("./assets/utilisateur.png")}
    style={[{ width: 40, height: 40, tintColor: color, marginTop: 20 }]}
  />
);

const TabRecruiterNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "RecruiterHome") {
            iconName = HomeIcon;
          } else if (route.name === "RecruiterSwipe") {
            iconName = HeartIcon;
          } else if (route.name === "ProfileScreen") {
            iconName = ProfileIcon;
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "#53496B",
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "rgba(255,255,255)",
        tabBarInactiveTintColor: "rgba(255,255,255, 0.4)",
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="RecruiterHome"
        component={RecruiterHomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <HomeIcon
              source={require("./assets/tente.png")}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="RecruiterSwipe"
        component={RecruiterSwipeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <SearchIcon
              source={require("./assets/search.png")}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon
              source={require("./assets/utilisateur.png")}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware({serializableCheck: false}),
});

const TabCandidateNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "CandidateHome") {
            iconName = HomeIcon;
          } else if (route.name === "CandidateSwipe") {
            iconName = HeartIcon;
          } else if (route.name === "ProfileScreen") {
            iconName = ProfileIcon;
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          height: 90,
          paddingHorizontal: 5,
          paddingTop: 0,
          backgroundColor: "#53496B",
          position: "absolute",
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "rgba(255,255,255)",
        tabBarInactiveTintColor: "rgba(255,255,255, 0.4)",
        headerShown: false,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="CandidateHome" component={CandidateHomeScreen} initialParams={{ test: null }} />
      <Tab.Screen name="CandidateSwipe" component={CandidateSwipeScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
};



const persistor = persistStore(store);

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>

              <Stack.Screen name="RecruiterSwipeScreen" component={RecruiterSwipeScreen} />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="AreaChoiceScreen" component={AreaChoiceScreen} />
              <Stack.Screen name="DisplayAnnounceScreen" component={DisplayAnnounceScreen} />
              <Stack.Screen name="DisplayCandidateApplyingScreen" component={DisplayCandidateApplyingScreen} />
              <Stack.Screen name="CandidatePostApplyFormScreen" component={CandidatePostApplyFormScreen} />
              <Stack.Screen name="RecruiterPostAnnounceScreen" component={RecruiterPostAnnounceScreen} />
              <Stack.Screen name="TabCandidateNavigator" component={TabCandidateNavigator} />
              <Stack.Screen name="TabRecruiterNavigator" component={TabRecruiterNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  iconShadow: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
});
