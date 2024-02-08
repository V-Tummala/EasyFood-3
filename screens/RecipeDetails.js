import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";

import * as SplashScreen from 'expo-splash-screen';

import firebase from 'firebase';

SplashScreen.preventAutoHideAsync();

export default class RecipeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else {
      SplashScreen.hideAsync();
      const recipe = this.props.route.params.recipe;

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>EasyFood</Text>
            </View>
          </View>
          <View style={styles.recipeContainer}>
            <ScrollView style={styles.recipeCard}>
              <Image
                source={{ uri: recipe.image }}  
                style={styles.image}
              ></Image>

              <View style={styles.dataContainer}>
                <View style={styles.titleTextContainer}>
                  <Text style={styles.recipeTitleText}>{recipe.name}</Text>
                  <Text style={styles.recipeDetailsText}>{recipe.category}</Text>
                  <Text style={styles.recipeDetailsText}>{recipe.prep_time}</Text>
                </View>
              </View>
              <View style={styles.recipeTextContainer}>
                <Text style={styles.recipeText}>
                  {recipe.instructions}
                </Text>
                <Text style={styles.recipeDetailsText}>
                  Difficulty - {recipe.difficulty}
                </Text>
                <Text style={styles.recipeDetailsText}>
                  Vegetarian - {recipe.vegetarian ? 'Yes' : 'No'}
                </Text>
                <Text style={styles.recipeDetailsText}>
                  Ingredients - {recipe.ingredients.join(', ')}
                </Text>
                <Text style={styles.recipeDetailsText}>
                  Keywords - {recipe.keywords.join(', ')}
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  recipeContainer: {
    flex: 1,
  },
  recipeCard: {
    margin: RFValue(20),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20),
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "cover",
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20),
  },
  titleTextContainer: {
    flex: 0.8,
  },
  recipeTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white",
  },
  recipeDetailsText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white",
  },
  recipeTextContainer: {
    padding: RFValue(20),
  },
  recipeText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(15),
    color: "white",
  },
});
