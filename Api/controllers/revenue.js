const _ = require('lodash');
const Post = require('../models/post');

getRevenueByDays = async (req, res, next) => {
  let posts = [];
  let formattedPosts = [];
  let result = [];
  try {
    posts = await Post.find();

    const postsByDate = [
      ...new Set(posts.map(p => p.date.toISOString().substring(0, 10)))
    ];

    posts.map(p => {
      formattedPosts.push({
        revenue: p.revenue,
        date: p.date.toISOString().substring(0, 10)
      });
    });

    const grouped = _.groupBy(formattedPosts, 'date');

    postsByDate.map(postDate => {
      const revenue = _.sumBy(grouped[postDate], 'revenue');

      result.push({
        revenue,
        postDate
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

  res.json({ revenueByDay: result });
};

exports.getRevenueByDays = getRevenueByDays;
