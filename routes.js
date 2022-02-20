const routes = require('next-routes')();

routes
  .add('/marriage', '/marriage/index')
  .add('/marriage/new', '/marriage/new')
  .add('/marriage/:index', 'marriage/show')
  .add('/government', 'government/index')
  .add('/childbirth', 'childbirth/index')
  .add('/childbirth/new', 'childbirth/new')
  .add('/divorce', 'divorce/index')
  .add('/divorce/new', 'divorce/new')
  .add('/certificate', 'certificate/index')
  .add('/certificate/marriage/:address', 'certificate/showMarriageCertificate')
  .add('/certificate/child/:address', 'certificate/showChildBirthCertificate')
  .add('/publicforeum', 'publicforeum/index');

module.exports = routes;
