/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Platform, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from './screens/HomeScreen';
import CreateWordListScreen from './screens/CreateWordListScreen';
import DictionaryScreen from './screens/DictionaryScreen';
import ProfileScreen from './screens/ProfileScreen';
import StoryListScreen from './screens/StoryListScreen';
import TabBarIcon from './components/Layout/TabBarIcon';
import MyTheme from './theme/colors';
import {useAuth} from './providers/AuthProvider';
import WordListDetailsScreen from './screens/WordListDetailsScreen';
import GameListScreen from './screens/GameListScreen';
import WordScrambleScreen from './screens/WordScrambleScreen';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: false,
};

const Screens = () => {
  const isIos = Platform.OS === 'ios';
  const {hasValidToken} = useAuth();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          ...screenOptions,

          tabBarStyle: {backgroundColor: MyTheme.colors.PRIMARY.main},
        }}
        initialRouteName="Home">
        <Tab.Screen
          name={'Home'}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarIcon
                focused={focused}
                text="Home"
                icon="home"
                iconComponent="font-awesome"
              />
            ),
          }}>
          {() => (
            <HomeStack.Navigator screenOptions={{headerShown: false}}>
              <HomeStack.Screen
                name="HomeScreen"
                component={WordScrambleScreen}
              />
              <HomeStack.Screen
                name="WordListDetailsScreen"
                component={WordListDetailsScreen}
              />
              <HomeStack.Screen
                name="GameListScreen"
                component={GameListScreen}
              />
              <HomeStack.Screen
                name="WordScrambleGame"
                component={WordScrambleScreen}
              />
            </HomeStack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Stories"
          component={StoryListScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarIcon
                focused={focused}
                text="Stories"
                icon="auto-stories"
                iconComponent="material"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          children={CreateWordListScreen}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <View
                  style={{
                    top: isIos ? -10 : -20,
                    width: isIos ? 50 : 60,
                    height: isIos ? 50 : 60,
                    borderRadius: isIos ? 25 : 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: MyTheme.colors.PRIMARY.main,
                  }}>
                  <AntDesign
                    name="plus"
                    size={30}
                    color={
                      focused
                        ? MyTheme.colors.COMMON.white
                        : MyTheme.colors.GREY[500]
                    }
                  />
                </View>
              );
            },
          }}
        />

        <Tab.Screen
          name="Dictionary"
          component={DictionaryScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarIcon
                focused={focused}
                text="Dictionary"
                icon="search"
                iconComponent="font-awesome"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarIcon
                focused={focused}
                text="Profile"
                icon="user"
                iconComponent="font-awesome"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default Screens;
