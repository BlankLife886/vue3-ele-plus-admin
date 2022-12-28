export const validatePassword = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error("密码不能少于 6 位"));
    } else {
      callback();
    }
  };
};
