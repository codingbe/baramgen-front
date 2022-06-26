import { ArticleInfo, CommentInfo, UserInfo } from "../typeDefs";
import { SET_ARTICLE, SET_CHANGE, SET_COMMENTS, SET_PAGE, SET_TOKEN } from "./action";
import { initialState } from "./initialState";

const reducer = (
  state = initialState,
  action: {
    type: string;
    token: string;
    userInfo: UserInfo;
    article: ArticleInfo;
    page?: boolean;
    comments: CommentInfo[];
  }
) => {
  const clone = Object.assign({}, state);
  switch (action.type) {
    case SET_TOKEN:
      clone.token = action.token;
      clone.userInfo = action.userInfo;
      return clone;
    case SET_CHANGE:
      clone.change = !clone.change;
      return clone;
    case SET_ARTICLE:
      clone.article = action.article;
      return clone;
    case SET_PAGE:
      if (action.page) clone.page = 0;
      else clone.page++;
      return clone;
    case SET_COMMENTS:
      clone.comments = action.comments;
      return clone;
    default:
      return state;
  }
};

export default reducer;
