import produce from 'immer';
import { getList } from '../services/api';

export default {
  namespace: 'main',
  state: {
    type: 1,
    list: [],
  },
  // processor合并了reducers和effects
  processor: {
    // 获取list
    getList: async (
      { payload = {}, callback },
      { setState, select, dispatch }
    ) => {
      // 获取当前model的数据
      const type = select((state) => state.type);
      // 获取其他model的数据
      const { foo } = select((state, globalState) => globalState.demo);
      const response = await getList({ type, ...payload });
      const list = response.code === 0 && response.data ? response.data : [];

      setState({ list });
      if (callback) {
        callback(list);
      }
    },
    deleteOne: async (
      { payload: { id }, callback },
      { setState, select, dispatch }
    ) => {
      const list = select((state) => state.list);
      setState({ list: list.filter(item => item.id !== id) });
    },
    addOne: async (
      { payload: { name }, callback },
      { setState, select, dispatch }
    ) => {
      const list = select((state) => state.list);
      const maxId = Math.max(...list.map(item => item.id));
      setState({ list: [...list, { id: maxId + 1, name }] });
    },
    removeAll: ({ payload }, { setState }) => setState({ list: [] }),
    updateSomeItem: ({ payload = {} }, { select, setState }) => {
      const list = select((state) => state.list);
      // 使用immer更新深层次的数据，简化操作
      const newState = produce({ list }, (draft) => {
        draft.list[payload.idx].name = payload.name || '';
      });
      setState(newState);
    },
  },
};
