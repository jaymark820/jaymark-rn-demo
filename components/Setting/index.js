import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const Setting = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const getData = async () => {
    try {
      let response = await fetch(
        'https://facebook.github.io/react-native/movies.json'
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true);
      const data = await getData();
      setTimeout(() => {
        setData(data || null);
        setLoading(false);
      }, 250);
    });

    const unsubscribe2 = navigation.addListener('blur', async () => {
      setData(null);
    });
    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, [navigation]);

  const renderContent = () => {
    if (loading) {
      return <Text>获取数据中...</Text>;
    }
    if (!data) {
      return <Text>暂无数据</Text>;
    }
    return (
      <View>
        <Text>下面数据从接口返回：https://facebook.github.io/react-native/movies.json</Text>
        <Text>标题： {data.title}</Text>
        <Text>描述： {data.description}</Text>
        <Text>电影个数： {(data.movies || []).length}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {renderContent()}
    </View>
  );
};

export default Setting;
