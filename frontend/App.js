import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
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

const TabRecruiterNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "RecruiterHome") {
            iconName = "home";
          } else if (route.name === "RecruiterSwipe") {
            iconName = "heart";
          } else if (route.name === "ProfileScreen") {
            iconName = "user";
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
        tabBarActiveTintColor: "#C988A4",
        tabBarInactiveTintColor: "#fff",
        headerShown: false,
      })}
    >
      <Tab.Screen name="RecruiterHome" component={RecruiterHomeScreen} />
      <Tab.Screen name="RecruiterSwipe" component={RecruiterSwipeScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
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
            iconName = "home";
          } else if (route.name === "CandidateSwipe") {
            iconName = "heart";
          } else if (route.name === "ProfileScreen") {
            iconName = "user";
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
        tabBarActiveTintColor: "#C988A4",
        tabBarInactiveTintColor: "#fff",
        headerShown: false,
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
