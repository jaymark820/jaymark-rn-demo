import { getData } from '../services/api';

export default {
  namespace: 'demo',
  state: {
    loading: false,
    data: null,
  },
  processor: {
    getData: async ({ payload = {} }, { setState }) => {
      setState({ loading: true });
      const data = await getData();
      setState({ data: data || null, loading: false });
    },
    resetData: ({}, { setState }) => {
      setState({ data: null });
    },
  },
};
