export default {
  namespace: 'demo',
  state: {
    foo: 'bar',
  },
  processor: {
    // update foo
    updateFoo: async ({ payload = {} }, { setState }) => {
      setState({ foo: payload.foo });
    },
  },
};
