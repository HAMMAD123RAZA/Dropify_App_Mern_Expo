import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const CardUi = ({ item }) => {
  const { _id, image, name, category, price } = item;

  const [isDeleted, setIsDeleted] = useState(false);

  const handleDel = async () => {
    try {
      const deletion = await axios.delete(`http://192.168.100.5:8080/delete/${_id}`);
      if (deletion.status === 200) {
        setIsDeleted(true)
      }
    } catch (error) {
      console.log('Error deleting product:', error);
    }
  };

  if (isDeleted) {
    return null
  }

  return (
    <View className="rounded-2xl p-4 m-3 bg-white shadow-2xl" style={{ width: 160 }}>
      <View>
        <Image
          source={{ uri: image }}
          className="rounded-xl mb-3"
          style={{ width: 110, height: 90 }}
        />
        <Text className="font-bold text-lg text-gray-800">{name}</Text>
        <Text className="text-sm text-gray-500">{category}</Text>
        <View className="flex-row items-end justify-between">
          <Text className="font-bold text-blue-600 text-lg pt-2">{price} PKR</Text>
          <TouchableOpacity onPress={handleDel}>
            <Ionicons name="trash-bin-sharp" size={28} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardUi;