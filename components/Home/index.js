import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { useSelector, useDispatch, useSubscribe } from '../../store/index';

const Home = () => {
  const list = useSelector(({ main }) => main.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'main/getList',
      payload: {
        id: 123
      },
      callback: (res) => {
        console.log('===>res', res);
      }
    });
  }, [dispatch]);

  const renderItem = item => (
    <View>
      <Text key={item.id}>{item.name}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#f5f5d5',
    padding: 20,
  }
});

export default Home;
