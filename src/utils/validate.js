/**
 * 判断是否为外部资源
 * @param path
 * @return {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
