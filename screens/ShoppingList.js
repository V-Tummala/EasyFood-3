import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Checkbox, IconButton } from 'react-native-paper';

const ChecklistShoppingListScreen = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1', completed: false },
  ]);

  const addItem = (text) => {
    const newItem = {
      id: items.length + 1,
      text,
      completed: false,
    };

    setItems([...items, newItem]);
  };

  const completeItem = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    setItems(updatedItems);
  };

  const clearCompletedItems = () => {
    const updatedItems = items.filter((item) => !item.completed);
    setItems(updatedItems);
  };

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Checkbox.Android
        status={item.completed ? 'checked' : 'unchecked'}
        onPress={() => completeItem(item.id)}
      />
      <Text style={item.completed ? styles.completedText : styles.text}>
        {item.text}
      </Text>
      <IconButton
        icon="delete"
        onPress={() => setItems(items.filter((i) => i.id !== item.id))}
        color="red"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add Item"
        onSubmitEditing={(e) => addItem(e.nativeEvent.text)}
      />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderListItem}
      />
      <Button title="Clear Completed" onPress={clearCompletedItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    flex: 1,
    marginLeft: 8,
  },
  completedText: {
    flex: 1,
    marginLeft: 8,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default ChecklistShoppingListScreen;