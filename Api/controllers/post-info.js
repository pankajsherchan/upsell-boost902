const PostInfo = require('../models/post-info');
const moment = require('moment');

const addPostInfo = async (req, res, next) => {
  if (!req.body) {
    const error = new Error('Data is missing');
    return next(error);
  }
  console.log('req: ', req);

  const {
    arrival,
    target,
    achieve,
    month,
    totalRoom,
    totalSoldRoom
  } = req.body;
  const postInfoList = await PostInfo.find();
  let postInfoInDatabase;

  if (postInfoList) {
    postInfoInDatabase = postInfoList.find(p => p.month === month);
  }

  if (postInfoInDatabase) {
    postInfoInDatabase.arrival = arrival;
    postInfoInDatabase.target = target;
    postInfoInDatabase.achieve = achieve;
    postInfoInDatabase.month = month;
    postInfoInDatabase.totalRoom = totalRoom;
    postInfoInDatabase.totalSoldRoom = totalSoldRoom;

    try {
      await postInfoInDatabase.save();
    } catch (err) {
      const error = new Error(
        'Something went wrong, postinfo could not be updated!'
      );
      error.code = 500;
      return next(error);
    }

    res.json({ postInfo: postInfoInDatabase });
  } else {
    const postInfo = new PostInfo({
      arrival,
      target,
      achieve,
      month,
      totalRoom,
      totalSoldRoom
    });

    try {
      await postInfo.save();
    } catch (err) {
      const error = new Error(
        'Something went wrong, postinfo could not be added!'
      );
      error.code = 500;
      return next(error);
    }
    res.json({ postInfo: postInfo });
  }
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

exports.addPostInfo = addPostInfo;
exports.getPostInfo = getPostInfo;
