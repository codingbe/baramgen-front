export type UserInfo = {
  id: number;
  email: string;
  img: string;
  nickname: string;
  authority: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ArticleInfo = {
  comments: [];
  category: string;
  content: string;
  createdAt: Date;
  id: number;
  likes: ArticleLikeInfo[];
  updatedAt: Date;
  userId: number;
  user: UserInfo;
};

export type ArticleLikeInfo = {
  id: number;
  userId: number;
  articleId: number;
};

export type CommentInfo = {
  id: number;
  userId: number;
  user: UserInfo;
  articleId: number;
  article: ArticleInfo;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
