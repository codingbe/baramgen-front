// action types
export const SET_TOKEN = "SET_TOKEN";

// actions creator functions
export const setToken = (token: string) => {
  return {
    type: SET_TOKEN,
    token,
  };
};
