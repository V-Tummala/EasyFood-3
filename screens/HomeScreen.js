import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { getDocs, collection, query, where, contains } from 'firebase/firestore';
import db from '../config';
import Icon from 'react-native-vector-icons/Ionicons';

import StackNavigator from '../components/StackNavigator';

const image = { uri: 'https://wallpaperaccess.com/full/271708.jpg' };

const recommendedMeals = [
  { id: '1', name: 'Pizza', image: 'https://wallpapercave.com/wp/wp4289092.jpg' },
  { id: '2', name: 'Burger', image: 'https://th.bing.com/th/id/R.4beee4c27e643f91d1e6074eec19a6b6?rik=mMycT42TJQfwGw&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f1130209%2fimages%2fo-BURGERS-facebook.jpg&ehk=p%2bnZ4%2bibvpUHcB6Y0zIufOTikVfXg8gu%2fOPxv6A86Ks%3d&risl=&pid=ImgRaw&r=0' },
  { id: '3', name: 'Sushi', image: 'https://th.bing.com/th/id/R.70e894a9ef389bdd04250d7e552cbdb3?rik=pUvKGMV38lryEQ&pid=ImgRaw&r=0' },
  { id: '4', name: 'Salad', image: 'https://www.recipetineats.com/wp-content/uploads/2021/08/Garden-Salad_47-SQ.jpg?resize=183' },
  { id: '5', name: 'Chicken', image: 'https://www.happyfoodstube.com/wp-content/uploads/2019/10/slow-cooker-whole-chicken-image.jpg' },
  { id: '6', name: 'Curry', image: 'https://th.bing.com/th/id/OIP.vK06Tsdio_RzfO4uJ7kPzgHaFE?rs=1&pid=ImgDetMain' },
  { id: '7', name: 'Fish', image: 'https://th.bing.com/th/id/OIP.XquCEyVExTqoI_YVGG8jIgHaHa?w=500&h=500&rs=1&pid=ImgDetMain' },
];

const recommendedSides = [
    { id: '1', name: 'Chips', image: 'https://th.bing.com/th/id/OIP.z7y74y9sb33P-REteyXwtgHaE8?rs=1&pid=ImgDetMain' },
    { id: '3', name: 'Greens', image: 'https://th.bing.com/th/id/OIP.Bo5wqcb9TvtSnWDNVdgjLgHaFj?rs=1&pid=ImgDetMain' },
    { id: '4', name: 'Rice', image: 'https://th.bing.com/th/id/R.3e63f24ce0b68952b5ec2b4860872e21?rik=rO4KdKSGHZ4oEg&pid=ImgRaw&r=0' },
    { id: '5', name: 'Corn', image: 'https://th.bing.com/th/id/R.701e3e151b160107db7b48dfa83674da?rik=5FGAZIS%2f4lnQTA&riu=http%3a%2f%2fwww.kansascitysteaks.com%2fdyn-images%2fpdp_hero%2fCorn_-_creamed_-_SP1-95c91312b373a4f307236708d2957959.jpg&ehk=yeIXzG7DuP3Iu5qo2pQTVfEX%2f66fS8%2fu1j2kwJZQqRs%3d&risl=&pid=ImgRaw&r=0' },
    { id: '6', name: 'Garlic Bread', image: 'https://th.bing.com/th/id/OIP.hvQpFwbd1cU-CmLuws4gCAHaLH?rs=1&pid=ImgDetMain' },
    { id: '7', name: 'Salad', image: 'https://www.killingthyme.net/wp-content/uploads/2020/04/dinner-side-salad-2.jpg' },
];

const recommendedDesserts = [
  { id: '1', name: 'Cake', image: 'https://sugargeekshow.com/wp-content/uploads/2021/03/easy_chocolate_cake_featured.jpg' },
  { id: '2', name: 'Ice Cream', image: 'https://th.bing.com/th/id/OIP.gxAyBb3pwIBJoEJWvVJ07gHaId?rs=1&pid=ImgDetMain' },
  { id: '3', name: 'Brownies', image: 'https://cafedelites.com/wp-content/uploads/2016/08/Fudgy-Cocoa-Brownies-13.jpg' },
  { id: '4', name: 'Tiramisu', image: 'https://th.bing.com/th/id/OIP.FslUYAtTAGXbUizV0O0cNgHaJq?rs=1&pid=ImgDetMain' },
  { id: '5', name: 'Pudding', image: 'https://th.bing.com/th/id/R.5ea42a25f1fe7c5612df0be7b3c42288?rik=PnJa4%2bGvEi6sDA&riu=http%3a%2f%2fimg.taste.com.au%2f9CE8WA7P%2ftaste%2f2016%2f11%2fgolden-syrup-steamed-pudding-76100-1.jpeg&ehk=TnQTB8zog0uaUfHoPt7g%2b%2bvTKZGwfWm9YHK8cIHf8lE%3d&risl=&pid=ImgRaw&r=0' },
  { id: '6', name: 'Biscuits', image: 'https://coin-a-drink.co.uk/wp-content/uploads/2019/08/iStock-670432816.jpg' },
  { id: '7', name: 'Pie', image: 'https://th.bing.com/th/id/OIP.CH1qvu_80QH34Eu_4ktqlAHaE7?rs=1&pid=ImgDetMain' },
];

const recommendedBeverages = [
    { id: '1', name: 'Juices', image: 'https://th.bing.com/th/id/OIP.MTkxBfdHroZKCsRxfNBSgQHaEo?rs=1&pid=ImgDetMain' },
    { id: '2', name: 'Milkshakes', image: 'https://www.orchidsandsweettea.com/wp-content/uploads/2020/01/Peanut-Butter-Milkshake-4-of-4.jpg' },
    { id: '3', name: 'Cocktails', image: 'https://th.bing.com/th/id/OIP.MSjcSAEDBoCXbGlBY3xYyQHaD3?rs=1&pid=ImgDetMain' },
    { id: '4', name: 'Wines', image: 'https://th.bing.com/th/id/OIP.5kLLogLhL9UFCZzwKI4n6gHaFL?rs=1&pid=ImgDetMain' },
    { id: '5', name: 'Tea', image: 'https://homespunseasonalliving.com/wp-content/uploads/2021/03/dandelion-tea-square-image.jpg' },
    { id: '6', name: 'Coconut Water', image: 'https://th.bing.com/th/id/R.eec6e7f4791dde96ff96578a43b4a681?rik=YFNNCWwfjB%2f%2fag&riu=http%3a%2f%2fwww.saonaisland.org%2fwp-content%2fuploads%2f2017%2f03%2fcoconut-water.jpg&ehk=5le1hNfczhGyn7hiLQ9bGrEVvGg5t%2f7pt%2fh8biY391w%3d&risl=&pid=ImgRaw&r=0' },
    { id: '7', name: 'Coffee', image: 'https://boutiquejapan.com/wp-content/uploads/2020/08/Bear-Pond-Espresso-Shimokitazawa-Tokyo-Japan-scaled.jpg' },
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchResults: [],
    };
  }

  handleSearch = async (text) => {
    this.setState({ searchText: text });

    if (text) {
      try {
        const recipesRef = collection(db, 'Recipe');
        const q = query(recipesRef, where('Keywords', 'array-contains', text));
        const querySnapshot = await getDocs(q);

        const results = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ searchResults: results });
      } catch (error) {
        console.error('Error searching recipes:', error);
      }
    } else {
      this.setState({ searchResults: [] });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView vertical>
          <View style={styles.container}>
            <View style={styles.backgroundContainer}>
              <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.searchContainer}>
                  <Icon name="search-outline" size={20} color="#B8B8B8" style={styles.searchIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder={'Search for recipes...'}
                    placeholderTextColor={'#B8B8B8'}
                    value={this.state.searchText}
                    onChangeText={(text) => this.handleSearch(text)}
                  />
                </View>
              </ImageBackground>
            </View>
            {this.state.searchResults.length > 0 && (
              <View>
                <Text style={styles.recommendedText}>Search Results</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.scrollView}
                  data={this.state.searchResults}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                      <Image source={{ uri: item.image }} style={styles.cardImage} />
                      <Text style={styles.cardText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
            {this.state.searchResults.length === 0 && (
              <>
                <Text style={styles.recommendedText}>Recommended Meals</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                  {recommendedMeals.map((food) => (
                    <TouchableOpacity key={food.id} style={styles.card}>
                      <Image source={{ uri: food.image }} style={styles.cardImage} />
                      <Text style={styles.cardText}>{food.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={styles.recommendedText}>Recommended Sides</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                  {recommendedSides.map((food) => (
                    <TouchableOpacity key={food.id} style={styles.card}
                    onPress = {() => navigation.navigate('RecipeDetails', {id:id})}>
                      <Image source={{ uri: food.image }} style={styles.cardImage} />
                      <Text style={styles.cardText}>{food.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={styles.recommendedText}>Recommended Desserts</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                  {recommendedDesserts.map((food) => (
                    <TouchableOpacity key={food.id} style={styles.card}>
                      <Image source={{ uri: food.image }} style={styles.cardImage} />
                      <Text style={styles.cardText}>{food.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={styles.recommendedText}>Recommended Beverages</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
                  {recommendedBeverages.map((food) => (
                    <TouchableOpacity key={food.id} style={styles.card}>
                      <Image source={{ uri: food.image }} style={styles.cardImage} />
                      <Text style={styles.cardText}>{food.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <Text style={styles.recommendedText}>Search Results</Text>
                <FlatList
                  data={this.state.searchResults}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                      <Image source={{ uri: item.image }} style={styles.cardImage} />
                      <Text style={styles.cardText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.scrollView}
                />
              </>
            )}
          </View>
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
  },
  backgroundContainer: {
    height: '25%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    opacity: 0.8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: 25,
    paddingVertical: 5, 
  },
  searchIcon: {
    marginLeft: 15,
    marginRight: 15,
  },
  textInput: {
    flex: 1,
    height: 35, 
    fontSize: 15,
    color: '#000000',
  },
  recommendedText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  scrollView: {
    paddingVertical: 20,
    paddingLeft: 20,
  },
  card: {
    width: 200,
    height: 300,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardText: {
    padding: 10,
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },
});
