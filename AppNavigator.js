
import React, { Component } from "react";
//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createMaterialTopTabNavigator , createStackNavigator} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import Feeds from './Feed';
import News from './News/News';
import Places from './Places/Places';
import Events from './Events/Events';
import NewsCard from './News/newsCard';

const NewsNavigator = createStackNavigator({
  News :  News,
  NewsCard : NewsCard
})

const AppTabNavigator = createMaterialTopTabNavigator({
    Feeds: {
      screen: Feeds,
      navigationOptions: {
        tabBarLabel: 'Feeds',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-list-box" color={tintColor} size={24} />
        )
      }
    },
    News: {
      screen: NewsNavigator,
      navigationOptions: {
        tabBarLabel: 'News',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-paper" color={tintColor} size={24} />
        )
      }
    },
    Places: {
      screen: Places,
      navigationOptions: {
        tabBarLabel: 'Places',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-camera" color={tintColor} size={24} />
        )
      }
    },
    Events: {
      screen: Events,
      navigationOptions: {
        tabBarLabel: 'Events',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="md-glasses" color={tintColor} size={24} />
        )
      }
    }
    }, 
    {
      initialRouteName: 'Feeds',
      tabBarPosition: 'bottom',
      swipeEnabled: true,
      animationEnabled: false,
      tabBarOptions: {
        activeTintColor: '#52e2ab',
        inactiveTintColor: '#696372',
        showLabel:false ,
        showIcon: true,
        style: {
          backgroundColor: '#181320',
          //borderTopWidth: 0.5,
          //borderTopColor: 'grey'
        },
        indicatorStyle: {
          height: 0
        }
    }
  })


export default AppTabNavigator;
  