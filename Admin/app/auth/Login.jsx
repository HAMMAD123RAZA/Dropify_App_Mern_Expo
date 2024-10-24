import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const api = await axios.post('http://192.168.100.6:8080/login', {
        email,
        password,
      });
      console.log(api.data);
      if (api.data.token) {
        await AsyncStorage.setItem('token', api.data.token);
        navigation.navigate('/');
      }
      setEmail('');
      setPassword('');
      Alert.alert(api.data.message);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      Alert.alert(errorMessage);
      console.log('Error during login:', err);
    }
  };

  return (
    <View className='h-[1000vh] bg-blue-500'>
      <View className='mx-20 pt-6'>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaOZMkQV4Mb6VMHqIknnZdvriMOBetKD-a_w&s' }}
          borderRadius={100}
          width={200}
          height={190}
        />
      </View>

      <Text className='pt-4 text-center text-3xl font-bold' style={{ color: 'white' }}>
        Explore Recipes
      </Text>

      <View className='mx-10 my-4'>
        <TextInput
          placeholderTextColor='white'
          className='p-3 m-4 border-4 border-white rounded-lg'
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholderTextColor='white'
          className='p-3 m-4 border-4 border-white rounded-lg'
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View className='flex-row gap-2 px-4 py-2'>
          <Text className='text-white font-bold px-2'>Don't have an account?</Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text className='text-white font-bold'>Register</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin}>
          <Text
            style={{
              backgroundColor: 'white',
              padding: 14,
              marginHorizontal: 8,
              borderRadius: 45,
              alignItems: 'center',
              marginTop: 12,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        {error ? <Text className='text-red-600'>{error}</Text> : null}
      </View>
    </View>
  );
};

export default Login;
