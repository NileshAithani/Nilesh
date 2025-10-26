  const cdk = require('aws-cdk-lib');
  const cognito = require('aws-cdk-lib/aws-cognito');

  class CognitoStack extends cdk.Stack {
    constructor(scope, id, props) {
      super(scope, id, props);

      const prefix = props.env.prefix;

      this.userPool = new cognito.UserPool(this, `${prefix}user-pool`, {
        userPoolName: `${prefix}user-pool`,
        selfSignUpEnabled: true,
        signInAliases: { email: true }, 
        autoVerify: { email: true },
        standardAttributes: {
          email: { required: true, mutable: true },
        },
        passwordPolicy: {
          minLength: 8,
          requireUppercase: true,
          requireLowercase: true,
          requireDigits: true,
          requireSymbols: true,
        },
        removalPolicy: cdk.RemovalPolicy.RETAIN,
      });

      this.userPoolClient = new cognito.UserPoolClient(this, `${prefix}user-pool-client`, {
        userPool: this.userPool,
        userPoolClientName: `${prefix}user-pool-client`,
        generateSecret: true, 
        authFlows: {
          userPassword: true,
          userSrp: true,
        },
        accessTokenValidity: cdk.Duration.hours(1),
        idTokenValidity: cdk.Duration.hours(1),
        refreshTokenValidity: cdk.Duration.days(30),
      });

      new cdk.CfnOutput(this, 'UserPoolId', { value: this.userPool.userPoolId });
      new cdk.CfnOutput(this, 'UserPoolClientId', { value: this.userPoolClient.userPoolClientId });
      this.userPoolClientSecret = this.userPoolClient.clientSecret;
    }
  }

  module.exports = { CognitoStack };
