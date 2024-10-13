import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import UserInfo from '../components/UserInfo'
import Menu from '../components/Menu'
import Register from '../auth/Register'
import Login from '../auth/Login'

const index = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle the refresh event
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    
    // Simulate fetching new data (or real logic for data fetching)
    setTimeout(() => {
      // You can fetch new data here and update your state
      setRefreshing(false);
    }, 2000); // Simulating a delay of 2 seconds
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >

    <ScrollView>
      <UserInfo/>
      <Menu/>
    </ScrollView>
    </ScrollView>

  )
}

export default index