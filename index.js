const awsConfig = new AWS.SNS({
  apiVersion: "2010-03-31",
  region: 'us-east-1',
  accessKeyId: 'AKIA4VEGVGLH6QGGBAMB',
  secretAccessKey: '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',
});

const messagesTopic = 'arn:aws:sns:us-east-1:870013285071:New_user';

function getUserEmail() {
  return document.getElementById('emailInput').value;
}

function sendMessage(event) {
  event.preventDefault();
  event.stopPropagation();

  awsConfig.publish({
    Message: `
      A new user is interested in my startup!
      ${getUserEmail()}
    `,
    TopicArn: messagesTopic,
  }).promise().then((response) => {

    $('#successModal').modal();

    console.log(response);
  }).catch((err) => {
    console.warn(err);
  });
}

function listenToFormSubmit() {
  const form = document.getElementById('accessForm');

  form.addEventListener('submit', sendMessage);
}

document.addEventListener('DOMContentLoaded', listenToFormSubmit);
