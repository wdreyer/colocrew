import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

import AreaChoiceScreen from './screens/AreaChoiceScreen';
import RecruiterHomeScreen from './screens/RecruiterHomeScreen';
import RecruiterSwipeScreen from './screens/RecruiterSwipeScreen';
import RecruiterProfileScreen from './screens/RecruiterProfileScreen';
import CandidateHomeScreen from './screens/CandidateHomeScreen';
import CandidateSwipeScreen from './screens/CandidateSwipeScreen';
import CandidateProfileScreen from './screens/CandidateProfileScreen';
import CandidatePostApplyFormScreen from './screens/CandidatePostApplyFormScreen';

const Tab = createBottomTabNavigator();

const TabRecruiterNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'RecruiterHome') {
          iconName = 'home';
        } else if (route.name === 'RecruiterSwipe') {
          iconName = 'heart';
        } else if (route.name === 'RecruiterProfile') {
          iconName = 'user';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarStyle: {
        height: 90,
        paddingHorizontal: 5,
        paddingTop: 0,
        backgroundColor: '#53496B',
        position: 'absolute',
        borderTopWidth: 0,
    },
      tabBarActiveTintColor: '#C988A4',
      tabBarInactiveTintColor: '#fff',
      headerShown: false,
    })}>
      <Tab.Screen name="RecruiterHome" component={RecruiterHomeScreen} />
      <Tab.Screen name="RecruiterSwipe" component={RecruiterSwipeScreen} />
      <Tab.Screen name="RecruiterProfile" component={RecruiterProfileScreen} />
    </Tab.Navigator>
  );
};

const TabCandidateNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'CandidateHome') {
          iconName = 'home';
        } else if (route.name === 'CandidateSwipe') {
          iconName = 'heart';
        } else if (route.name === 'CandidateProfile') {
          iconName = 'user';
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarStyle: {
        height: 90,
        paddingHorizontal: 5,
        paddingTop: 0,
        backgroundColor: '#53496B',
        position: 'absolute',
        borderTopWidth: 0,
      },
      tabBarActiveTintColor: '#C988A4',
      tabBarInactiveTintColor: '#fff',
      headerShown: false,
    })}>
      <Tab.Screen name="CandidateHome" component={CandidateHomeScreen} />
      <Tab.Screen name="CandidateSwipe" component={CandidateSwipeScreen} />
      <Tab.Screen name="CandidateProfile" component={CandidateProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {

  const Stack = createNativeStackNavigator();


  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AreaChoiceScreen" component={AreaChoiceScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            
            <Stack.Screen name="CandidatePost" component={CandidatePostApplyFormScreen} />
            <Stack.Screen name="TabRecruiterNavigator" component={TabRecruiterNavigator} />
            <Stack.Screen name="TabCandidateNavigator" component={TabCandidateNavigator} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
