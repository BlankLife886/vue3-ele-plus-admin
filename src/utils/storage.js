/**
 * 存储数据
 */
export const setItem = (key, value) => {
  // 判断value的数据类型
  // 基本数据类型不需要处理, 把复杂数据类型转换为JSON字符串
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};

/**
 * 获取数据
 */
export const getItem = (key) => {
  const data = window.localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

/**
 * 删除指定数据
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};

/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  window.localStorage.clear();
};
