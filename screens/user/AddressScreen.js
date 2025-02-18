import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ScrollView
} from 'react-native';
import axios from "axios";
import EncryptedStorage from 'react-native-encrypted-storage';
import { network } from "../../constants";
import { Ionicons } from '@expo/vector-icons';
import {MaterialIcons} from '@expo/vector-icons';
import PhoneInput from "react-native-phone-number-input";


const AddressScreen = ({ navigation, route }) => {
  const { orders, fromCart } = route.params;

  const [addresses, setAddresses] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
    const [formattedValue, setFormattedValue] = useState("");


  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await EncryptedStorage.getItem('userid');
        const storedToken = await EncryptedStorage.getItem('authToken');
        if (storedUserId && storedToken) {
          setUserId(storedUserId);
          setToken(storedToken);
          fetchUserAddresses(storedUserId, storedToken);
        } else {
          Alert.alert("User not logged in!");
        }
      } catch (error) {
        console.error("Error fetching user data from EncryptedStorage:", error);
      }
    };

    fetchUserData();
  }, []);

  const fetchUserAddresses = async (userId, token) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${network.serverip}/user/getAllAddress?userId=${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("lll",response.data)

      const fetchedAddresses = response.data.data || [];
      const sortedAddresses = fetchedAddresses.sort((a, b) => b.isPrimary - a.isPrimary);

      setAddresses(sortedAddresses);
      setSelectedAddressId(sortedAddresses[0]?.id || null);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
    setLoading(false);
  };

  const handleAddAddress = async () => {
  console.log(newAddress)
    if (!newAddress.street || !newAddress.city || !newAddress.state || !newAddress.country || !newAddress.zip) {
      Alert.alert("All fields are required!");
      return;
    }

    const streetRegex = /^[A-Za-z0-9.,:_-\s]+$/;
    if (!streetRegex.test(newAddress.street)) {
      Alert.alert("Error", "Street should only contain letters and spaces.");
      return;
    }

    // Validate City (only letters and spaces)
    const cityRegex = /^[A-Za-z\s]+$/;
    if (!cityRegex.test(newAddress.city)) {
      Alert.alert("Error", "City should only contain letters and spaces.");
      return;
    }

    // Validate State (only letters and spaces)
    const stateRegex = /^[A-Za-z\s]+$/;
    if (!stateRegex.test(newAddress.state)) {
      Alert.alert("Error", "State should only contain letters and spaces.");
      return;
    }

    // Validate Country (only letters and spaces)
    const countryRegex = /^[A-Za-z\s]+$/;
    if (!countryRegex.test(newAddress.country)) {
      Alert.alert("Error", "Country should only contain letters and spaces.");
      return;
    }

    // Validate Zip Code (should be numeric)
    const zipRegex = /^[0-9]\d{5}$/;
    if (!zipRegex.test(newAddress.zip)) {
      Alert.alert("Error", "Zip code should only contain numbers.");
      return;
    }

    // If all fields are valid, proceed to save the address
    try {
      await axios.post(
        `${network.serverip}/user/addAddress`,{},{
        params:{ userId, ...newAddress },
         headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert("Address added successfully!");
      fetchUserAddresses(userId, token);
      setIsAddingAddress(false);
    } catch (error) {
      console.error("Error adding address:", error);
      Alert.alert("Error", "There was an issue adding the address.");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(
        `${network.serverip}/user/deleteAddress`,
        {
          params: { userId, addressId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert("Address removed successfully!");
      fetchUserAddresses(userId, token);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };
  const proceedToBuy = () => {
  const phonePattern = /^[6-9]\d{9}$/;
   if (!phoneNumber.trim()) {
      Alert.alert("Error", "Phone number is required.");
      return;
    }
    if (!phonePattern.test(phoneNumber)) {
     Alert.alert("Error","Please Enter Valid Phone Number");
     return;
    }
    if (!selectedAddressId) {
      Alert.alert("Error","Please select an address before proceeding.");
      return;
    }

    navigation.replace('checkout', fromCart ? { cartProduct: orders } : { orders });
  };

  const handleSelectAddress = async (addressId) => {
    setSelectedAddressId(addressId);

    try {
      await axios.put(
        `${network.serverip}/user/makePrimaryAddress`,
        {},
        {
          params: { userId, addressId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error updating primary address:", error);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back-circle-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.heading}>Address</Text>
      </View>
        <View style={styles.inside}>

     <Text style={styles.label}>Phone Number:</Text>
           {phoneNumber !== undefined && (
             <PhoneInput
               defaultValue={phoneNumber}
               defaultCode="US"
               layout="first"
               onChangeText={(text) => setPhoneNumber(text)}
               onChangeFormattedText={(text) => setFormattedValue(text)}
               containerStyle={styles.phoneContainer}
               textContainerStyle={styles.textInput}
               withShadow
               autoFocus
             />
           )}




      <Text style={styles.subHeading}>Saved Addresses:</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={[styles.addressContainer, item.id === selectedAddressId && styles.selectedAddress]}>
              <TouchableOpacity
                style={styles.radioButton}
                onPress={() => handleSelectAddress(item.id)}
              >
                <View style={[styles.radioCircle, item.id === selectedAddressId && styles.selectedRadio]} />
              </TouchableOpacity>

              <View style={styles.addressLeft}>
                <Text>{item.street}, {item.city}, {item.state}, {item.country} - {item.zip}</Text>
              </View>

              <TouchableOpacity onPress={() => handleDeleteAddress(item.id)} style={styles.removeBtn}>
                <Ionicons name="close-outline" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {!isAddingAddress && (
        <TouchableOpacity onPress={() => setIsAddingAddress(true)} style={styles.addNewButton}>
          <Text style={styles.btnText}>+ Add New Address</Text>
        </TouchableOpacity>
      )}

      {isAddingAddress && (
        <View style={styles.newAddressContainer}>
          <TouchableOpacity onPress={() => setIsAddingAddress(false)} style={styles.closeButton}>
            <MaterialIcons name="close" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.subHeading}>Add New Address:</Text>
          {["Street", "City", "State", "Country", "ZIP"].map((placeholder, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={placeholder}
              onChangeText={(text) => setNewAddress({ ...newAddress, [placeholder.toLowerCase().replace(" ", "")]: text })}
              keyboardType={placeholder === "ZIP" ? "numeric" : "default"}
            />
          ))}
          <TouchableOpacity onPress={handleAddAddress} style={styles.addButton}>
            <Text style={styles.btnText}>Save Address</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={proceedToBuy} style={styles.checkoutButton}>
        <Text style={styles.btnText}>Proceed to Buy</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Styles remain unchanged

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",  // Ensures Back Button and Checkout are spaced
    paddingHorizontal: 10, // Add some padding for spacing
    paddingVertical: 10,
    backgroundColor:"#111827",
    width:"100%",
    height:70
  },
  inside:{padding:20,},
  backButton: {

    color:colors.primary,
  },
  heading: {
    flex: 1, // Ensures heading takes up space
    marginLeft:20,
    fontSize: 26,
            fontWeight: "800",
            color: colors.primary,
  },
  subHeading: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 5 },
  label: { fontSize: 16, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  addressContainer: { padding: 15, backgroundColor: '#f9f9f9', marginBottom: 10, borderRadius: 5, flexDirection: 'row', alignItems: 'center' },
  selectedAddress: { borderColor: '#007bff', borderWidth: 2 },
  radioButton: { marginRight: 15 },
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#ccc' },
  selectedRadio: { backgroundColor: '#007bff' },
  addressLeft: { flex: 1 },
  primaryText: { color: 'green', fontWeight: 'bold', marginTop: 5 },
  removeBtn: { backgroundColor: '#333', borderRadius: 20, padding: 5, alignItems: 'center', justifyContent: 'center' },
  addNewButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  closeButton: { position: 'absolute', top: 10, right: 10, backgroundColor: '#ff6347', borderRadius: 20, padding: 5 },
  closeBtnText: { fontSize: 20, color: '#fff' },
  addButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  checkoutButton: { backgroundColor: '#28a745', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 5, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontWeight: 'bold' },

  label: {
      fontSize: 16,
      marginBottom: 10,
      fontWeight: "bold",
    },
    phoneContainer: {
      width: "100%",
      height: 50,
    },
    textInput: {
      paddingVertical: 0,
    },


});

export default AddressScreen;
