const cdk = require("aws-cdk-lib");
const { LambdaStack } = require("./cdk/stacks/lambda-stack");
const { CognitoStack } = require("./cdk/stacks/cognito-stack");
const { ApiStack } = require("./cdk/stacks/api-stack");
const { SecretStack } = require("./cdk/stacks/secret-stack");
const fs = require("fs");
const settings = require("./config/settings.json");

const env = process.argv[2];
const environmentSettings = settings[env];

if (!environmentSettings) {
  console.error(`Invalid environment: ${env}`);
  process.exit(1);
}


class App extends cdk.App {
  constructor() {
    super();

    const secretStack = new SecretStack(
      this,
      `${environmentSettings.prefix}secret-stack`,
      {
        env: environmentSettings,
      }
    );

    const cognitoStack = new CognitoStack(
      this,
      `${environmentSettings.prefix}cognito-stack`,
      {
        env: environmentSettings,
      }
    );

    const lambdaStack = new LambdaStack(
      this,
      `${environmentSettings.prefix}lambda-stack`,
      {
        env: environmentSettings,
        userPoolId: cognitoStack.userPool.userPoolId,
        userPoolClientId: cognitoStack.userPoolClient.userPoolClientId,
        userPoolClientSecret: cognitoStack.userPoolClientSecret,
      }
    );
    lambdaStack.addDependency(cognitoStack);

    const apiStack = new ApiStack(
      this,
      `${environmentSettings.prefix}api-stack`,
      {
        env: environmentSettings,
      }
    );
    apiStack.addDependency(lambdaStack);
  }
}

new App();
