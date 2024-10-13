import { View, Text, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {  useRouter } from 'expo-router';


const Add = () => {
  const [image, setImage] = useState(null);
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [litre, setlitre] = useState('');
  const [selectedCat, setselectedCat] = useState('');
  const [data, setdata] = useState('');

  const router=useRouter()

  // Cloudinary Upload
  const uploadToCloudinary = async (imageUri) => {
    let formData = new FormData();
    formData.append('file', { uri: imageUri, type: 'image/jpeg', name: 'upload.jpg' });
    formData.append('upload_preset', 'Drop_App_preset');
    formData.append('cloud_name', 'diblqbuco'); 

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/diblqbuco/image/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.secure_url; 
    } catch (error) {
      console.log('Error uploading to Cloudinary', error);
      ToastAndroid.show('Error uploading image', ToastAndroid.LONG);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (image) {
      const cloudinaryUrl = await uploadToCloudinary(image);
      if (cloudinaryUrl) {
        try {
          const api = await axios.post('http://192.168.100.5:8080/create', {
            name,
            price,
            litre,
            image: cloudinaryUrl, 
            selectedCat,
          });
          setdata(api.data);
          console.log(api.data);
          ToastAndroid.show('Product Added', ToastAndroid.LONG);
          router.push('/product/ViewProduct')

        } catch (error) {
          console.log('Error in posting data', error);
          ToastAndroid.show('Error adding product', ToastAndroid.LONG);
        }
      }
    } else {
      ToastAndroid.show('Please select an image', ToastAndroid.LONG);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className='m-5'>
      <TouchableOpacity onPress={pickImage}>
        {!image ? (
          <Image source={{ uri: 'https://cdn-icons-png.freepik.com/512/9061/9061169.png' }} width={120} height={100} />
        ) : (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder='Product Name'
          value={name}
          onChangeText={setname}
          className='p-4 rounded-lg my-3 bg-gray-200'
        />
        <TextInput
          placeholder='Price'
          value={price}
          onChangeText={setprice}
          keyboardType='number-pad'
          className='p-4 rounded-lg my-3 bg-gray-200'
        />
        <TextInput
          placeholder='Litre?'
          value={litre}
          onChangeText={setlitre}
          keyboardType='numeric'
          className='p-4 rounded-lg my-3 bg-gray-200'
        />

        <RNPickerSelect
          onValueChange={(value) => setselectedCat(value)}
          items={[
            { label: 'Bottle', value: 'Bottle' },
            { label: 'Gallon', value: 'Gallon' },
            { label: 'Tanker', value: 'Tanker' },
          ]}
        />
        <TouchableOpacity>
          <Text className='px-3 py-2 text-xl my-2 bg-blue-500 rounded-3xl font-bold text-white text-center' onPress={handleSubmit}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Add;