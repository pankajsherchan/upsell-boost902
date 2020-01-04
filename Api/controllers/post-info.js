const PostInfo = require('../models/post-info');
const moment = require('moment');

const addPostInfo = async (req, res, next) => {
  if (!req.body) {
    const error = new Error('Data is missing');
    return next(error);
  }

  const { arrival, target, month, totalRoom, totalSoldRoom, date } = req.body;

  const postInfo = new PostInfo({
    arrival,
    target,
    totalRoom,
    date
  });

  try {
    await postInfo.save();
  } catch (err) {
    const error = new Error(
      'Something went wrong, postinfo could not be added!'
    );
    error.code = 500;
    return next(err);
  }
  res.json({ postInfo: postInfo.toObject({ getters: true }) });
};

getPostInfo = async (req, res, next) => {
  let postInfo;

  const currentMonth = moment(new Date(), 'YYYY/MM/DD').format('MMMM');
  console.log('currentMonth: ', currentMonth);

  try {
    postInfo = await PostInfo.find();
    console.log('postInfo: ', postInfo);
    postInfo = postInfo.find(p => p.month === currentMonth);
  } catch (err) {
    const error = new Error(
      'Something went wrong, post info could not be found'
    );
    error.code = 500;
    return next(error);
  }

  res.json({ postInfo: postInfo });
};

getPostInfoList = async (req, res, next) => {
  let postInfoList;

  try {
    postInfoList = await PostInfo.find();
  } catch (err) {
    const error = new Error(
      'Something went wrong. PostInfo List could not be found.'
    );
    error.code = 500;
    return next(error);
  }
  res.json({
    postInfoList: postInfoList.map(postInfo =>
      postInfo.toObject({ getters: true })
    )
  });
};

updatePostInfo = async (req, res, next) => {
  if (!req.body) {
    const error = new Error('Data is missing');
    return next(error);
  }

  const {
    arrival,
    target,
    achieve,
    month,
    totalRoom,
    totalSoldRoom
  } = req.body;

  let postInfo;

  try {
    postInfo = await PostInfo.findById(req.body.id);
  } catch (err) {
    const error = new Error(
      'Something went wrong, postInfo could not be found!'
    );
    error.code = 500;
    return next(error);
  }

  if (!postInfo) {
    const error = new Error('postInfo not found.');
    error.code = 404;
    return next(error);
  } else {
    postInfo.arrival = arrival;
    postInfo.target = target;
    postInfo.achieve = achieve;
    postInfo.month = month;
    postInfo.totalRoom = totalRoom;
    postInfo.totalSoldRoom = totalSoldRoom;
  }

  try {
    await postInfo.save();
  } catch (err) {
    const error = new Error(
      'Something went wrong, postInfo could not be updated!'
    );
    error.code = 500;
    return next(error);
  }

  res.json({ postInfo: postInfo.toObject({ getters: true }) });
};

const deletePostInfo = async (req, res, next) => {
  const postInfoId = req.params.pid;

  let postInfo;

  try {
    postInfo = await PostInfo.findById(postInfoId);
  } catch (err) {
    const error = new Error(
      'Something went wrong, PostInfo could not be found!'
    );
    error.code = 500;
    return next(error);
  }

  if (!postInfo) {
    const error = new Error('PostInfo does not exist');
    error.code = 404;
    return next(error);
  } else {
    try {
      await postInfo.remove();
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

exports.addPostInfo = addPostInfo;
exports.getPostInfo = getPostInfo;
exports.getPostInfoList = getPostInfoList;
exports.updatePostInfo = updatePostInfo;
exports.deletePostInfo = deletePostInfo;
