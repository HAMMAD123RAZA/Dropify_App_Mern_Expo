import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import CardUi from '../components/CardUi'

const ViewProduct = () => {
  const [data, setdata] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  const fetchData=async()=>{
    try {
      const api=await axios.get('http://192.168.100.9:8080/get')
      setdata(api.data)
    } catch (error) {
      console.log(error)
    }
  }

  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    try {
        await fetchData()
    } catch (error) {
        console.error('failed to refresh data',err)
    }finally{
        setRefreshing(false)
    }
  }, [fetchData]);

  useEffect(()=>{
    fetchData()
  },[])

  const renderItem=({item})=>{
    return (
      <View key={item._id}  >
<CardUi item={item}  />
      </View>
    )
  }

  return (
    <View>
<FlatList
refreshControl={
  <RefreshControl refreshing={refreshing} onrefresh={onRefresh}/>
}
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