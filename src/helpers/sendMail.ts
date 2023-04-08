const sgMail = require('@sendgrid/mail');

const { SG_API_KEY } = process.env;

sgMail.setApiKey(SG_API_KEY);

module.exports = sgMail;
