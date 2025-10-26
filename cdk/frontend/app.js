const cdk = require('aws-cdk-lib');
const settings = require('./config/settings.json');
const {CloudFrontStack } = require('./cdk/stacks/cloudfront-stack');

const env = process.argv[2];

const environmentSettings = settings[env];
if (!environmentSettings) {
  console.error(`Invalid environment: ${env}`);
  process.exit(1); 
}

class App extends cdk.App {
  constructor() {
    super();
    const cloudfrontStack = new CloudFrontStack(this, `${environmentSettings.prefix}cloudfront-stack`, { env: environmentSettings });
  }
}

new App();
