import create from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import * as models from '../models';

// model列表
const MODEL_LIST = Object.keys(models)
  .map((m) => models[m])
  .filter((m) => m.namespace);

export const useSelector = create(
  devtools(
    // 该开发插件使zustand的store数据支持在chrome的redux插件里查看
    subscribeWithSelector((set, get) => {
      // 合并models里的state和processor，state以namespace为key，processor格式为namespace/processorName
      const { state, processor } = MODEL_LIST.reduce(
        (pre, cur) => {
          const newProcessor = {};

          Object.keys(cur.processor).forEach((processorName) => {
            newProcessor[`${cur.namespace}/${processorName}`] =
              cur.processor[processorName];
          });

          return {
            ...pre,
            state: {
              ...pre.state,
              [cur.namespace]: { ...cur.state }
            },
            processor: {
              ...pre.processor,
              ...newProcessor
            }
          };
        },
        { state: {}, processor: {} }
      );

      const dispatchFunc = async ({ type, payload, callback }) => {
        if (processor[type]) {
          const namespace = type.split('/')[0];

          await processor[type](
            { payload, callback },
            {
              setState: (newState = {}) => {
                const curState = get();

                set({
                  [namespace]: {
                    ...curState[namespace],
                    ...newState
                  }
                });
              },
              select: (selectFunc) => {
                const curState = get();

                if (typeof selectFunc !== 'function') {
                  return curState[namespace];
                }

                return selectFunc(curState[namespace], curState);
              },
              dispatch: dispatchFunc
            }
          );
        }
      };

      // 构建dispatch方法，分发action到processor
      return {
        ...state,
        dispatch: dispatchFunc
      };
    }),
    'BlindBoxStore'
  )
);

// 获取dispatch
export const useDispatch = () => {
  const dispatch = useSelector((store) => store.dispatch);

  return dispatch;
};

// 监听数据改变
export const useSubscribe = (...args) => {
  const unsubscribe = useSelector.subscribe(...args);

  // 返回解除监听方法
  return unsubscribe;
};
