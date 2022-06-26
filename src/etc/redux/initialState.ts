import { ArticleInfo, CommentInfo, UserInfo } from "../typeDefs";

export const initialState: {
  token: string;
  change: boolean;
  userInfo: UserInfo | {};
  article: ArticleInfo | {};
  page: number;
  comments: CommentInfo[] | [];
} = {
  token: "",
  change: false,
  userInfo: {},
  article: {},
  page: 0,
  comments: [],
};
