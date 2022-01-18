// 获取列表
export async function getList() {
  return Promise.resolve({
    code: 0,
    data: [
      { id: 1, name: 'majie' },
      { id: 2, name: 'test' }
    ]
  });
}
