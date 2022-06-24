import { ArticleInfo, UserInfo } from "../typeDefs";

export const initialState: {
  token: string;
  change: boolean;
  userInfo: UserInfo | {};
  article: ArticleInfo | {};
  page: number;
} = {
  token: "",
  change: false,
  userInfo: {},
  article: {},
  page: 0,
};
