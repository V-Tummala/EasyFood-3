import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/HomeScreen";
import RecipeDetails from "../screens/RecipeDetails";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetails} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
