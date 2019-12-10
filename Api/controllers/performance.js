const _ = require('lodash');
const Post = require('../models/post');
const PostInfo = require('../models/post-info');
const moment = require('moment');

getComparisonByColleague = async (req, res, next) => {
  let posts = [];
  let result = [];
  try {
    posts = await Post.find();

    const colleagueList = [...new Set(posts.map(p => p.colleague))];

    const grouped = _.groupBy(posts, 'colleague');

    colleagueList.map(colleague => {
      const revenue = _.sumBy(grouped[colleague], 'revenue');

      result.push({
        score: revenue,
        name: colleague
      });
    });
  } catch (err) {
    console.log('err: ', err);

    const error = new Error(
      'Something went wrong, post info could not be found'
    );
    error.code = 500;
    return next(error);
  }

  res.json({ comparisonByColleague: result });
};

exports.getComparisonByColleague = getComparisonByColleague;
