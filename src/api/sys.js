import request from "@/utils/request";

/**
 * 登陆
 * @param data
 * @return {Promise<axios.AxiosResponse<any>>}
 */
export const login = (data) => {
  return request({
    url: "/sys/login",
    method: "POST",
    data,
  });
};

export const getUserInfo = () => {
  return request({
    url: "/sys/profile",
    method: "GET",
  });
};
