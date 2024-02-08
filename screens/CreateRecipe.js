import React from 'react';
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import db from '../config';

export default class CreateRecipe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            recipe_name: '',
            instructions: '',
            prep_time: '',
            difficulty: '',
            vegetarian: '',
            ingredients: '',
            keywords: ''
        }
    }

    addRecipe = async () => {
        const { category, difficulty, instructions, recipe_name, prep_time, vegetarian, ingredients, keywords } = this.state;

        const ingredientsArray = ingredients.split(",").map(item => item.trim());
        const keywordsArray = keywords.split(",").map(item => item.trim());
        
        try {
          const docRef = await addDoc(collection(db, 'Recipe'), {
            Name: recipe_name,
            Category: category,
            Instructions: instructions,
            Preparation_time: prep_time,
            Vegetarian: vegetarian, 
            Ingredients: ingredientsArray,
            Keywords: keywordsArray,
            Difficulty: difficulty
          });

          console.log("Recipe added successfully with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding recipe: ", error);
        }
    }

    render() {
      return (
        <SafeAreaView style={styles.safeArea}>
          <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Create Recipe</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.textInput}
            placeholder={'Category'}
            placeholderTextColor={'#B8B8B8'}
            onChangeText={(text) => this.setState({ category: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Recipe Name'}
            placeholderTextColor={'#B8B8B8'}
            onChangeText={(text) => this.setState({ recipe_name: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Instructions'}
            placeholderTextColor={'#B8B8B8'}
            multiline
            numberOfLines={4}
            onChangeText={(text) => this.setState({ instructions: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Preparation Time'}
            placeholderTextColor={'#B8B8B8'}
            onChangeText={(text) => this.setState({ prep_time: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Difficulty'}
            placeholderTextColor={'#B8B8B8'}
            onChangeText={(text) => this.setState({ difficulty: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Ingredients'}
            placeholderTextColor={'#B8B8B8'}
            onChangeText={(text) => this.setState({ ingredients: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Keywords'}
            placeholderTextColor={'#B8B8B8'}
            onChangeText={(text) => this.setState({ keywords: text })}
          />
          <TextInput
            style={styles.textInput}
            placeholder={'Vegetarian?'}
            placeholderTextColor={'#B8B8B8'}
            onChangeText={(text) => this.setState({ vegetarian: text })}
          />
</View>
        <TouchableOpacity style={styles.submitButton} 
              onPress={this.addRecipe}>
              <Text>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  titleContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  formContainer: {
    marginTop: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 8,
  },
  submitButton: {
    borderRadius: 2,
    borderWidth: 2,
    borderColor: 'black',
    width: 70,
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  }
});