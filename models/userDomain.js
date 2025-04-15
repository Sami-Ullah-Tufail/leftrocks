const mongoose = require('mongoose');

const userDomainSchema = new mongoose.Schema({
  org: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true
  },
  domainId: {
    type: String,
    required: true
  }
});

const UserDomain = mongoose.model('UserDomain', userDomainSchema);

module.exports = UserDomain;
