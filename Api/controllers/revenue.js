const _ = require('lodash');
const Post = require('../models/post');
const moment = require('moment');

getRevenueByDays = async (req, res, next) => {
  let posts = [];
  let formattedPosts = [];
  let result = [];
  try {
    posts = await Post.find();

    let postsByDate = [
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
    const error = new Error(
      'Something went wrong, post info could not be found'
    );
    error.code = 500;
    return next(error);
  }

  result = _.sortBy(result, 'postDate');
  const days = getAllDaysUptoToday();

  const finalResult = days.map(d => {
    const r = result.find(r => r.postDate === d);
    return {
      revenue: r === undefined ? 0 : r.revenue,
      postDate: d
    };
  });

  res.json({ revenueByDay: finalResult });
};

getAllDaysUptoToday = () => {
  let days = [];
  let i;

  let currentDate = moment(moment().parseZone(), 'YYYY/MM/DD');

  let month = currentDate.format('MM');
  let day = currentDate.format('DD');
  let year = currentDate.format('YYYY');

  for (i = 1; i <= day; i++) {
    days.push(year + '-' + month + '-' + (i >= 10 ? i : '0' + i));
  }

  return days;
};

exports.getRevenueByDays = getRevenueByDays;
