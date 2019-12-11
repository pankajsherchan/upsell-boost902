const _ = require('lodash');
const Post = require('../models/post');
const PostInfo = require('../models/post-info');
const moment = require('moment');

getComparisonData = async (req, res, next) => {
  let posts = await Post.find();
  let postInfo = await PostInfo.find();

  const formattedPosts = posts.map(p => {
    const result = { ...p._doc, month: getMonth(p.date) };
    return result;
  });

  const monthList = [...new Set(posts.map(p => getMonth(p.date)))];

  const grouped = _.groupBy(formattedPosts, 'month');

  const totalRevenueByMonth = monthList.map(month => {
    const revenue = _.sumBy(grouped[month], 'revenue');
    return {
      month,
      revenue
    };
  });

  const result = totalRevenueByMonth.map(({ month, revenue }) => {
    const postOfMonth = postInfo.find(p => p.month === month);

    if (postOfMonth) {
      return {
        month,
        scored: postOfMonth.achieve,
        expected: postOfMonth.target,
        adr: (revenue / postOfMonth.totalSoldRoom).toFixed(2),
        revpar: (revenue / postOfMonth.totalRoom).toFixed(2)
      };
    }
  });

  res.json({
    result
  });
};

getMonth = date => {
  return moment(date, 'YYYY/MM/DD').format('MMMM');
};

exports.getComparisonData = getComparisonData;
