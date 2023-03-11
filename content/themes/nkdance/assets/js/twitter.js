/**
 * Twitter API
 * @desc Pull 3 latest tweets from twitter account
 */

var config = {
  "id": '715232380668264457',
  "domId": 'recentTweets',
  "maxTweets": 3,
  "enableLinks": true,
  "showImages": false,
  "showUser": false,
  "dateFunction": '',
  "showRetweet": false,
  "showTime": false,
  "showInteraction": false,
  "lang": 'en'
};


twitterFetcher.fetch(config);