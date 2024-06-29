import { getByNews, create, update, remove } from "../models/comment.model.js";
import { getNewsById } from "../models/news.model.js";
import { getUserByEmail } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const getComment = async (newsId) => {
  return getByNews(newsId);
};

export const createComment = async (comment) => {
  if (!comment.content) throw new ApiError(400, "Content is required");
  const user = await getUserByEmail(comment.email);
  if (!user) throw new ApiError(404, "User not found");
  const news = await getNewsById(comment.newsId);
  if (!news) throw new ApiError(404, "News not found");
  comment.userId = user.id;
  comment.createAt = new Date();

  return create(comment);
};

export const removeComment = async (commentId) => {
  return remove(commentId);
};

export const updateComment = async (comment) => {
  comment.createAt = new Date();
  return update(comment);
};
