import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'

const UserInfo = () => {
  return (
    <View className='justify-center flex-row my-20' >
<View  >
<Image source={{uri:"https://cdn-icons-png.freepik.com/512/3682/3682323.png"}} width={100} height={110} />
<Text className='my-4'>UserName</Text>
<Text>Userxyz@gmail.com</Text>
</View> 
</View>
  )
}

export default UserInfo