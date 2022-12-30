const getters = {
  token: (state) => state.user.token,
  /**
   * true: 用户信息已存在
   * @param state
   * @return {boolean}
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== "{}";
  },
  userInfo: (state) => state.user.userInfo,
};

export default getters;
