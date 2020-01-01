const _ = require('lodash');
const Post = require('../models/post');
const PostInfo = require('../models/post-info');
const moment = require('moment');

getComparisonData = async (req, res, next) => {
  let posts = await Post.find();
  let postInfo = await PostInfo.find();

  console.log('postInfo: ', postInfo);

  const comparisonDataByYearAndMonth = [];

  const formattedPosts = posts.map(p => {
    const result = {
      ...p._doc,
      month: getMonth(p.date),
      year: getYear(p.date)
    };
    return result;
  });

  const monthList = [...new Set(posts.map(p => getMonth(p.date)))];

  const yearList = [...new Set(posts.map(p => getYear(p.date)))];

  yearList.forEach(year => {
    const postsForGivenYear = getDataForGivenYear(year, formattedPosts);

    const grouped = _.groupBy(postsForGivenYear, 'month');

    const totalRevenueByMonth = monthList.map(month => {
      const revenue = _.sumBy(grouped[month], 'revenue');
      return {
        month,
        revenue
      };
    });

    const result = totalRevenueByMonth.map(({ month, revenue }) => {
      const postOfMonth = postInfo.find(p => getMonth(p.date) === month);

      if (postOfMonth) {
        return {
          month,
          year,
          scored: postOfMonth.achieve,
          expected: postOfMonth.target,
          adr: (revenue / postOfMonth.totalSoldRoom).toFixed(2),
          revpar: (revenue / postOfMonth.totalRoom).toFixed(2)
        };
      }
    });

    comparisonDataByYearAndMonth.push(result);
  });

  res.json({
    comparisonData
  });
};

getMonth = date => {
  return moment(date, 'YYYY/MM/DD').format('MMMM');
};

getYear = date => {
  return moment(date, 'YYYY/MM/DD').format('YYYY');
};

getDataForGivenYear = (year, data) => {
  return data.filter(d => d.year === year);
};

exports.getComparisonData = getComparisonData;
