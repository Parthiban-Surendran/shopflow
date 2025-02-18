import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const CategorySidebar = ({ categories, onSelectCategory, selectedCategory }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryBox,
              selectedCategory === item.id && styles.selectedCategory,
            ]}
            onPress={() => onSelectCategory(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 90, // Fixed width for sidebar
    backgroundColor: '#EDEDED',
    paddingVertical: 10,
  },
  list: {
    paddingHorizontal: 5,
  },
  categoryBox: {
    width: 80,
    height: 90,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCategory: {
    borderColor: '#007bff',
    borderWidth: 2,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    color: '#333',
  },
});

export default CategorySidebar;
