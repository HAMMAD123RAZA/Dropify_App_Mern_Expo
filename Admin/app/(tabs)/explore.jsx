import { View, FlatList, Text, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import CardUi from '../components/CardUi';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import RBSheet from 'react-native-raw-bottom-sheet';


const Explore = () => {
    const [data, setData] = useState([]);  // Displayed data (filtered or full)
    const [allData, setAllData] = useState([]);  // Full data fetched from backend
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState(null);
    const refRBSheet = useRef();
    
    
    const [selectedFilters, setSelectedFilters] = useState({
        price: null,
        category: null,
        litre: null,
    });

    const [refreshing, setRefreshing] = useState(false);

    const filterOptions = [
        {
            title: 'Price',
            values: [100-500, 500-3000, 3000-10000],
        },
        {
            title: 'Category',
            values: ['Bottle', 'Tanker', 'Gallon','Mini Bottle'],
        },
        {
            title: 'Litre',
            values: [1-10, 10-50],
        },
    ];

    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.100.9:8080/filter', {
                params: {
                    price: selectedFilters.price || '',
                    category: selectedFilters.category || '', 
                    litre: selectedFilters.litre || '',
                },
                headers:{
                    'Cache-Control':"no-cache"
                }
            });
            setAllData(response.data);  // Set full data once fetched
            setData(response.data);  // Initially set data to full data
        } catch (err) {
            setError(err.message);
            console.error("API fetch error: ", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedFilters]);  // Fetch new data when filters change

    // Apply search filter whenever searchQuery changes
    useEffect(() => {
        if (searchQuery) {
            const query=searchQuery.toLowerCase()
            const filteredData = allData.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.price.toString().includes(query)
            );
            setData(filteredData);  // Update data state with search results
        } else {
            setData(allData);  // Reset data to full list when search query is cleared
        }
    }, [searchQuery, allData]);  

    const handleFilterSelect = (type, value) => {
        setSelectedFilters(prevFilters => ({
            ...prevFilters,
            [type]: value, 
        }));
        refRBSheet.current.close();  
    };

    const renderItem = ({ item }) => (
        <View key={item._id}>
            <CardUi item={item} />
        </View>
    );

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
    
    return (
        <View>
            {error ? (
                <Text>Error: {error}</Text>
            ) : (
                <FlatList 
                refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
                    keyboardShouldPersistTaps='handled'
                    data={data} 
                    renderItem={renderItem}
                    ListHeaderComponent={() => (
                        <View className='flex-row gap-4 mt-8 mx-6 mb-5 p-3 rounded-2xl bg-white'>
                            <Ionicons name='search' size={28} />
                            <TextInput 
                                placeholder='Search for products...' 
                                style={{ flex: 1 }}
                                value={searchQuery}
                                onChangeText={text => setSearchQuery(text)}  // Update search query on text input
                            />
                            <View>
                                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                                    <Ionicons name='options' size={32} color='blue' />
                                </TouchableOpacity>
                                <View style={{ flex: 1 }}>
                                    {/* Filter bottom sheet */}
                                    <RBSheet
                                        ref={refRBSheet}
                                        useNativeDriver={false}
                                        customStyles={{
                                            wrapper: {
                                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                            },
                                            draggableIcon: {
                                                backgroundColor: '#000',
                                            },
                                        }}
                                    >
                                        <View style={{ padding: 20 }}>
                                            <Text className='bg-gray-400 h-1 self-center w-32 mb-6 mt-1'></Text>
                                            <View className='flex-row justify-between'>
                                                {filterOptions.map((option, index) => (
                                                    <View key={index}>
                                                        <Text className='font-bold text-xl text-blue-500'>{option.title}</Text>
                                                        {option.values.map((value, idx) => (
                                                            <TouchableOpacity 
                                                                className='my-2' 
                                                                key={idx} 
                                                                onPress={() => handleFilterSelect(option.title.toLowerCase(), value)}  
                                                            >
                                                                <Text>{value}</Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    </RBSheet>
                                </View>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                />
            )}
        </View>
    );
};

export default Explore;
