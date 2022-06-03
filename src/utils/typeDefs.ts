export type TokenState = string | null;

export type UserState = UserInfo | null;

export type Comment = {
  id: number;
  userId: number;
  user: UserInfo;
  articleId: number;
  article: Article;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type Like = {
  id: number;
  userId: number;
  user: UserInfo;
  articleId: number;
  article: Article;
};

export type Article = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: UserInfo;
  comments: Comment;
  likes: Like;
};

export type UserInfo = {
  id: number;
  email: string;
  img: string;
  createdAt: string;
  updatedAt: string;
  comments?: Comment;
  articles?: Article;
  likes?: Like;
};
