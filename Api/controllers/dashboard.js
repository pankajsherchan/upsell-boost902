const _ = require('lodash');
const Post = require('../models/post');

getUpsellSummary = async (req, res, next) => {
  let posts;
  let colleagueList;
  let result = [];
  try {
    posts = await Post.find();
    colleagueList = [...new Set(posts.map(p => p.colleague))];

    const grouped = _.groupBy(posts, 'colleague');

    colleagueList.map(colleague => {
      const revenue = _.sumBy(grouped[colleague], 'revenue');
      const night = _.sumBy(grouped[colleague], 'numNights');
      const commission = _.sumBy(grouped[colleague], 'commission');

      result.push({
        revenue,
        night,
        commission,
        colleague
      });
    });
  } catch (err) {
    const error = new Error(
      'Something went wrong, post info could not be found'
    );
    error.code = 500;
    return next(error);
  }

  res.json({ result });
};

exports.getUpsellSummary = getUpsellSummary;
