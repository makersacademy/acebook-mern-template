const fs = require('fs');
const AWS = require('aws-sdk');

const bucketName = process.env.REACT_APP_AWS_BUCKET_NAME;
const region = process.env.REACT_APP_AWS_BUCKET_REGION;
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_KEY;

const s3Client = new AWS.S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3Client
    .upload(uploadParams, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log('Successfully uploaded data to myBucket/myKey');
      }
    })
    .promise();
};

exports.uploadFile = uploadFile;
