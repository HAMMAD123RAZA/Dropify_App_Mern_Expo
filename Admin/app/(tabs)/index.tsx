import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useCallback, useState } from 'react'
import UserInfo from '../components/UserInfo'
import Menu from '../components/Menu'
import Register from '../auth/Register'
import Login from '../auth/Login'

const index = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000); 
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