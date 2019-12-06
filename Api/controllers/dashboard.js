const _ = require('lodash');
const Post = require('../models/post');
const PostInfo = require('../models/post');

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

  res.json({ dealSummary: result });
};

getDashboardInfo = async (req, res, next) => {
  let dashboardInfo;
  let posts = [];
  let postInfo = [];
  let requiredRevenue = 0;
  let remainingNumberOfDays = 0;
  let upsellRequiredPerDay = 0;
  let lastMonthAchiever = '';
  let mtdHighestAchiever = '';
  let ytdHighestAchiever = '';

  try {
    posts = await Post.find();
    postInfo = await PostInfo.find();

    const totalRevenue = _.sumBy(posts, 'revenue');
    requiredRevenue = postInfo[0].target - totalRevenue;
    remainingNumberOfDays = daysInThisMonth() - (new Date().getDay() + 1);

    colleagueList = [...new Set(posts.map(p => p.colleague))];

    const groupedByColleague = _.groupBy(posts, 'colleague');

    colleagueList.map(colleague => {
      const revenue = _.sumBy(groupedByColleague[colleague], 'revenue');
    });
  } catch (err) {
    const error = new Error('Something went wrong getting the dashboard info');
    error.code = 500;
    return next(error);
  }

  const result = {
    requiredRevenue: requiredRevenue,
    remainingNumberOfDays: remainingNumberOfDays,
    upsellRequiredPerDay: requiredRevenue / remainingNumberOfDays,
    lastMonthAchiever: '',
    mtdHighestAchiever: '',
    ytdHighestAchiever: ''
  };

  res.json({ result });
};

daysInThisMonth = () => {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

getLastMonthHighestAchiever = () => {
  // get all the dates of last month
};

getMTDHighestAchiever = () => {
  // get all the dates between first and till date of the month
};

getYTDHighestAchiever = () => {
  //get all the dates between Jan 01, 2019 to today
};

exports.getUpsellSummary = getUpsellSummary;
exports.getDashboardInfo = getDashboardInfo;
