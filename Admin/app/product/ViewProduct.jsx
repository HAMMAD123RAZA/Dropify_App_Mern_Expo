import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardUi from '../components/CardUi'

const ViewProduct = () => {
  const [data, setdata] = useState('')
  
  const fetchData=async()=>{
    try {
      const api=await axios.get('http://192.168.100.10:8080/get')
      setdata(api.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  const renderItem=({item})=>{
    return (
      <View key={item._id} >
<CardUi item={item}  />
      </View>
    )
  }

  return (
    <View>
<FlatList
ListHeaderComponent={()=>{
  return (
    <View  >
   <Text className='text-blue-500 text-center font-bold text-4xl pb-3
    pt-10'>View Product</Text>     
    </View>
  )
}}
data={data} renderItem={renderItem}  numColumns={2}  />
    </View>
  )
}

export default ViewProduct