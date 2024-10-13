import { View, Text } from 'react-native'
import React from 'react'
import UserInfo from '../components/UserInfo'
import Menu from '../components/Menu'
import Register from '../auth/Register'
import Login from '../auth/Login'

const index = () => {
  return (
    <View>
      <UserInfo/>
      <Menu/>
    </View>
  )
}

export default index