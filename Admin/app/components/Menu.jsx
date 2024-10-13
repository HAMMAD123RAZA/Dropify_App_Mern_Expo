import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {useRouter} from 'expo-router'

const data=[
    {
        id:1,
        name:"Add Product",
        img:"https://cdn-icons-png.flaticon.com/512/8922/8922789.png",
        path:"product/Add"
    },
    {
        id:2,
        name:"View Products",
        img:"https://cdn-icons-png.freepik.com/512/3859/3859342.png",
        path:"product/ViewProduct"
    }
]

const Menu = () => {
    const router = useRouter()
    return (
    <View className='flex-row justify-evenly ' >
        {data.map((item,id)=>{
            return (            
            <View key={id} >
                <TouchableOpacity onPress={()=>{router.push(item.path)}} >
                    <Image source={{uri:item.img}} width={80} height={90} />
                    <Text className='font-bold ' >{item.name}</Text>
                </TouchableOpacity>
            </View>
            )
        })}
    </View>
  )
}

export default Menu