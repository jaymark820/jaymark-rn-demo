import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector, useDispatch } from '../../store/index';

const Setting = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = useSelector(({ demo }) => demo.data);
  const loading = useSelector(({ demo }) => demo.loading);
  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', async () => {
      dispatch({
        type: 'demo/getData'
      });
    });

    const unsubscribeBlur = navigation.addListener('blur', async () => {
      dispatch({
        type: 'demo/resetData'
      });
    });
    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
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
        <Text>以下数据从接口返回：https://facebook.github.io/react-native/movies.json</Text>
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
