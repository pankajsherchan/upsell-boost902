const _ = require('lodash');
const Post = require('../models/post');
const PostInfo = require('../models/post-info');
const moment = require('moment');

getDashboardInfo = async (req, res, next) => {
  posts = await Post.find();
  colleagueList = [...new Set(posts.map(p => p.colleague))];
  postInfo = await PostInfo.find();

  const upsellSummary = await getUpsellSummary(colleagueList, posts);
  const revenueInfo = await getRevenueInfo(colleagueList, posts, postInfo);

  return res.json({ upsellSummary, revenueInfo });
};

getUpsellSummary = async (colleagueList, posts) => {
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

  return result;
};

getRevenueInfo = async (colleagueList, posts, postInfo) => {
  let requiredRevenue = 0;
  let remainingNumberOfDays = 0;
  let lastMonthAchiever = '';
  let mtdHighestAchiever = '';
  let ytdHighestAchiever = '';

  try {
    const totalRevenue = _.sumBy(posts, 'revenue');
    requiredRevenue = postInfo[0].target - totalRevenue;
    remainingNumberOfDays = daysInThisMonth() - (new Date().getDay() + 1);

    lastMonthAchiever = getLastMonthHighestAchiever(colleagueList, posts);

    ytdHighestAchiever = getYTDHighestAchiever(colleagueList, posts);
    mtdHighestAchiever = getMTDHighestAchiever(colleagueList, posts);
  } catch (err) {
    console.log('err: ', err);

    const error = new Error('Something went wrong getting the dashboard info');
    error.code = 500;
    return next(error);
  }

  const result = {
    requiredRevenue: requiredRevenue,
    remainingNumberOfDays: remainingNumberOfDays,
    upsellRequiredPerDay: requiredRevenue / remainingNumberOfDays,
    lastMonthAchiever,
    mtdHighestAchiever,
    ytdHighestAchiever
  };

  return result;
};

daysInThisMonth = () => {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

getLastMonthHighestAchiever = (colleagueList, posts) => {
  const currentDate = moment(moment(), 'YYYY/MM/DD');

  const currentMonth = currentDate.format('M');

  posts = posts.filter(
    p => moment(p.date, 'YYYY/MM/DD').format('M') === currentMonth - 1
  );
  const groupedByColleague = _.groupBy(posts, 'colleague');

  return getHighestAchiever(colleagueList, groupedByColleague);
};

getMTDHighestAchiever = (colleagueList, posts) => {
  const currentDate = moment(moment(), 'YYYY/MM/DD');

  const currentMonth = currentDate.format('M');

  posts = posts.filter(
    p => moment(p.date, 'YYYY/MM/DD').format('M') === currentMonth
  );
  const groupedByColleague = _.groupBy(posts, 'colleague');

  return getHighestAchiever(colleagueList, groupedByColleague);
};

getYTDHighestAchiever = (colleagueList, posts) => {
  const currentDate = moment(moment(), 'YYYY/MM/DD');

  const currentYear = currentDate.format('Y');

  posts = posts.filter(
    p => moment(p.date, 'YYYY/MM/DD').format('Y') === currentYear
  );
  const groupedByColleague = _.groupBy(posts, 'colleague');

  return getHighestAchiever(colleagueList, groupedByColleague);
};

getHighestAchiever = (colleagueList, groupedByColleague) => {
  let highestAchiever = '';
  let colleagueRevenue = 0;

  colleagueList
    .map(colleague => {
      const revenue = _.sumBy(groupedByColleague[colleague], 'revenue');
      return {
        revenue,
        colleague
      };
    })
    .forEach(element => {
      if (element.revenue > colleagueRevenue) {
        colleagueRevenue = element.revenue;
        highestAchiever = element.colleague;
      }
    });

  return highestAchiever;
};

exports.getDashboardInfo = getDashboardInfo;
