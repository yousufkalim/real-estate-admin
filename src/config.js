let baseUrl = 'http://localhost:5000/api/';
let url = 'http://localhost:5000/';

if (window.location.host === 'realestate-admin-dev.falconweb.app') {
  baseUrl = 'https://realestate-api-dev.falconweb.app/api/';
  url = 'https://realestate-api-dev.falconweb.app/';
} else if (window.location.host === 'realestate-admin-qa.falconweb.app') {
  baseUrl = 'https://realestate-api-qa.falconweb.app/api/';
  url = 'https://realestate-api-qa.falconweb.app/';
} else if (window.location.host === 'realestate-admin-staging.falconweb.app') {
  baseUrl = 'https://realestate-api-staging.falconweb.app/api/';
  url = 'https://realestate-api-staging.falconweb.app/';
} else if (window.location.host === 'realestate-admin-prod.falconweb.app') {
  baseUrl = 'https://realestate-api-prod.falconweb.app/api/';
  url = 'https://realestate-api-prod.falconweb.app/';
}

module.exports = { baseUrl, url };
