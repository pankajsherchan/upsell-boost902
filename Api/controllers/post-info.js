const PostInfo = require('../models/post-info');

const addPostInfo = async (req, res, next) => {
  if (!req.body) {
    const error = new Error('Data is missing');
    return next(error);
  }

  const { arrival, target, achieve } = req.body;
  const postInfoInDatabase = await PostInfo.find();

  if (postInfoInDatabase != null) {
    postInfoInDatabase[0].arrival = arrival;
    postInfoInDatabase[0].target = target;
    postInfoInDatabase[0].achieve = achieve;

    try {
      await postInfoInDatabase[0].save();
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
      achieve
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

  try {
    postInfo = await PostInfo.find();
  } catch (err) {
    const error = new Error(
      'Something went wrong, post info could not be found'
    );
    error.code = 500;
    return next(error);
  }

  res.json({ postInfo: postInfo.toObject({ getters: true }) });
};

exports.addPostInfo = addPostInfo;
exports.getPostInfo = getPostInfo;
