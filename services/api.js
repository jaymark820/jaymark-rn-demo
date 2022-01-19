export async function getData() {
  return fetch(
    'https://facebook.github.io/react-native/movies.json'
  ).then(resp => resp.json());
}

// 获取列表
export async function getList() {
  return Promise.resolve({
    code: 0,
    data: [
      { id: 1, name: 'majie' },
      { id: 2, name: 'test' },
      { id: 3, name: 'Todo3' },
      { id: 4, name: 'Todo4' },
      { id: 5, name: 'Todo5' },
      { id: 6, name: 'Todo6' },
      { id: 7, name: 'Todo7' },
      { id: 8, name: 'Todo8' },
      { id: 9, name: 'Todo9' },
    ]
  });
}
