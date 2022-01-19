import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, SafeAreaView,
  FlatList, TouchableWithoutFeedback, TouchableOpacity,
  TextInput, Alert
} from 'react-native';
import { AntDesign } from 'react-native-vector-icons';
import { useSelector, useDispatch } from '../../store/index';

const Home = () => {
  const list = useSelector(({ main }) => main.list);
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch({
      type: 'main/getList',
      payload: {},
    });
  }, [dispatch]);

  const onDelete = item => () => {
    Alert.alert('提示', '确定删除该ToDo吗？', [
      {
        text: '取消'
      },
      {
        text: '确定',
        onPress: () => {
          dispatch({
            type: 'main/deleteOne',
            payload: {
              id: item.id
            },
          });
        }
      },
    ]);
    
  };

  const onClickAdd = () => {
    if (!name) {
      Alert.alert('提示', '请输入ToDo名称');
      return;
    }
    dispatch({
      type: 'main/addOne',
      payload: {
        name,
      }
    });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{index + 1}: {item.name}</Text>
        <TouchableOpacity onPress={onDelete(item)} style={styles.deleteBtn}>
          <AntDesign name="delete" color="#ff0000" size={24} />
        </TouchableOpacity>
      </View>
    )
  };

  console.log('list', list);

  return (
    <SafeAreaView style={styles.scrollView}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.listView}
      />
      <View style={styles.bottom}>
        <TextInput
          style={styles.input}
          onChangeText={val => setName(val)}
          value={name}
          placeholder='请输入ToDo'
        />
        <TouchableOpacity style={styles.addBtn} onPress={onClickAdd}>
          <Text>添加</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
  },
  listView: {
    height: '80%'
  },
  bottom: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row"
  },
  item: {
    backgroundColor: '#f5f5d5',
    padding: 10,
    marginBottom: 2
  },
  title: {
    fontSize: 20,
    color: '#333333'
  },
  deleteBtn: {
    position: 'absolute',
    right: 20,
    top: 10
  },
  input: {
    width: '85%',
    paddingHorizontal: 10,
    borderColor: '#aaa',
    borderWidth: 1,
    height: 30,
  },
  addBtn: {
    height: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default Home;
