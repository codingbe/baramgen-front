import { UserInfo, ArticleInfo, CommentInfo } from "../typeDefs";

// action types
export const SET_TOKEN = "SET_TOKEN";
export const SET_CHANGE = "SET_CHANGE";
export const SET_ARTICLE = "SET_ARTICLE";
export const SET_PAGE = "SET_PAGE";
export const SET_LIKE = "SET_LIKE";
export const SET_COMMENTS = "SET_COMMENTS";

// actions creator functions
export const setToken = (token: string, userInfo?: UserInfo | {}) => {
  return {
    type: SET_TOKEN,
    token,
    userInfo,
  };
};

export const setChange = () => {
  return {
    type: SET_CHANGE,
  };
};

export const setArticle = (article: ArticleInfo | {}) => {
  return {
    type: SET_ARTICLE,
    article,
  };
};

export const setPage = (page?: boolean) => {
  return {
    type: SET_PAGE,
    page,
  };
};

export const setLike = () => {
  return {
    type: SET_LIKE,
  };
};

export const setComments = (comments: CommentInfo[]) => {
  return {
    type: SET_COMMENTS,
    comments,
  };
};
