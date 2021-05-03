const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AMAZON_ID,
  secretAccessKey: process.env.AMAZON_SECRET,
});

module.exports = s3;
