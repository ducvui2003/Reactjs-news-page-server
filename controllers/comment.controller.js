import { getByNews, getByUser } from "../models/comment.model.js";
import {
  createComment,
  removeComment,
  updateComment,
} from "../services/comment.service.js";
import ApiError from "../utils/ApiError.js";
export const getByNewsId = async (req, res) => {
  try {
    const { newsId } = req.query;
    const comments = await getByNews(newsId);
    res.status(200).json({
      statusCode: 200,
      message: "Get comments success",
      data: comments,
    });
  } catch (err) {
    next(err);
  }
};

export const getCommentByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const comments = await getByUser(email);
    res.status(200).json({
      statusCode: 200,
      message: "Get comments success",
      data: comments,
    });
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const { email, newsId, content } = req.body;
    const createSuccess = await createComment({ email, newsId, content });
    if (!createSuccess) {
      throw new ApiError(400, "Create comment failed");
    }
    res.status(200).json({
      statusCode: 200,
      message: "Create comment success",
    });
  } catch (err) {
    next(err);
  }
};
export const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { content } = req.body;
    const updateSuccess = await updateComment({ id, content });
    if (!updateSuccess) {
      throw new ApiError(400, "Update comment failed");
    }
    res.status(200).json({
      statusCode: 200,
      message: "Update comment success",
    });
  } catch (err) {
    next(err);
  }
};
export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSuccess = await removeComment(id);
    if (!deleteSuccess) {
      throw new ApiError(400, "Delete comment failed");
    }
    res.status(200).json({
      statusCode: 200,
      message: "Delete comment success",
    });
  } catch (err) {
    next(err);
  }
};
