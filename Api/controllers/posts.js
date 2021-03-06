const Post = require('../models/post');
const moment = require('moment');

const getPostById = async (req, res, next) => {
  const postId = req.params.pid;

  let post;

  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new Error('Something went wrong. Post could not be found.');
    error.code = 500;
    return next(error);
  }

  if (!post) {
    const error = new Error('Post not found.');
    error.code = 404;
    return next(error);
  }

  res.json({ post: post.toObject({ getters: true }) });
};

const getAllPosts = async (req, res, next) => {
  let posts;

  try {
    posts = await Post.find();
  } catch (err) {
    const error = new Error('Something went wrong. Posts could not be found.');
    error.code = 500;
    return next(error);
  }
  res.json({ posts: posts.map(post => post.toObject({ getters: true })) });
};

const createPost = async (req, res, next) => {
  console.log('req: ', req);
  if (!req.body) {
    const error = new Error('Data is missing');
    return next(error);
  }

  const {
    date,
    confNum,
    rtc,
    unitPrice,
    numNights,
    upgradedTo,
    colleague,
    remark
  } = req.body;

  const createdPost = new Post({
    date,
    confNum,
    rtc,
    unitPrice,
    numNights,
    upgradedTo,
    revenue: unitPrice * numNights,
    commission: (0.05 * unitPrice * numNights).toFixed(2),
    colleague,
    remark
  });

  try {
    await createdPost.save();
  } catch (err) {
    const error = new Error('Something went wrong, post could not be added!');
    error.code = 500;
    return next(err);
  }

  res.json({ createdPost: createdPost.toObject({ getters: true }) });
};

const editPost = async (req, res, next) => {
  const postId = req.body.id;

  const {
    confNum,
    RTC,
    upgradedTo,
    unitPrice,
    numNights,
    revenue,
    commission,
    colleague,
    remark
  } = req.body;

  let post;

  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new Error('Something went wrong, post could not be found!');
    error.code = 500;
    return next(error);
  }

  if (!post) {
    const error = new Error('Post not found.');
    error.code = 404;
    return next(error);
  } else {
    (post.confNum = confNum),
      (post.RTC = RTC),
      (post.upgradedTo = upgradedTo),
      (post.unitPrice = unitPrice),
      (post.numNights = numNights),
      (post.revenue = revenue),
      (post.commission = commission),
      (post.colleague = colleague),
      (post.remark = remark);
  }

  try {
    await post.save();
  } catch (err) {
    const error = new Error('Something went wrong, post could not be updated!');
    error.code = 500;
    return next(error);
  }

  res.json({ post: post.toObject({ getters: true }) });
};

const deletePost = async (req, res, next) => {
  const postId = req.params.pid;

  let post;

  try {
    post = await Post.findById(postId);
  } catch (err) {
    const error = new Error('Something went wrong, post could not be found!');
    error.code = 500;
    return next(error);
  }

  if (!post) {
    const error = new Error('Post does not exist');
    error.code = 404;
    return next(error);
  } else {
    try {
      await post.remove();
    } catch (err) {
      const error = new Error(
        'Something went wrong, user could not be deleted!'
      );
      error.code = 500;
      return next(error);
    }
  }

  res.json({ message: 'Successfully deleted!' });
};

const getAllColleagues = async (req, res, next) => {
  posts = await Post.find();

  const colleagueList = [...new Set(posts.map(p => p.colleague))];
  res.json({
    colleagueList: colleagueList.map(colleague =>
      colleague.toObject({ getters: true })
    )
  });
};

exports.getPostById = getPostById;
exports.getAllPosts = getAllPosts;
exports.createPost = createPost;
exports.editPost = editPost;
exports.deletePost = deletePost;
exports.getAllColleagues = getAllColleagues;
