const cdk = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const iam = require("aws-cdk-lib/aws-iam");
const fs = require("fs");
const path = require("path");

class LambdaStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const prefix = props.env.prefix;
    const UI_URL = props.env.ui_url;
    const userPoolId = props.userPoolId;
    const userPoolClientId = props.userPoolClientId;
    const userPoolClientSecret = props.userPoolClientSecret;
    const docBucket = props.env.document_bucket_name;
    const secretKey = props.env.secret_key;

    const functionConfig = JSON.parse(
      fs.readFileSync("./config/functions-config.json", "utf-8")
    );

    this.lambdaFunctions = {};
    this.lambdaLayers = {};

    const layersPath = "./layers";

    if (fs.existsSync(layersPath)) {
      const layerDirs = fs.readdirSync(layersPath).filter((layerName) => {
        return fs.existsSync(path.join(layersPath, layerName, "nodejs"));
      });

      layerDirs.forEach((layerName) => {
        console.log(`Creating Lambda Layer: ${prefix}${layerName}`);

        const layer = new lambda.LayerVersion(this, `${prefix}${layerName}`, {
          layerVersionName: `${prefix}${layerName}`,
          code: lambda.Code.fromAsset(path.join(layersPath, layerName)),
          compatibleRuntimes: [lambda.Runtime.NODEJS_22_X],
          removalPolicy: cdk.RemovalPolicy.RETAIN,
        });

        this.lambdaLayers[layerName] = layer;
      });
    }

    const allLayers = Object.values(this.lambdaLayers);

    functionConfig.forEach((func) => {
      console.log(`Creating Lambda function: ${prefix}${func.lambda}`);

      const lambdaFunction = new lambda.Function(
        this,
        `${prefix}${func.lambda}`,
        {
          functionName: `${prefix}${func.lambda}`,
          runtime: lambda.Runtime[func.runtime],
          handler: func.handler.trim(),
          code: lambda.Code.fromAsset(`./lambda_functions/${func.lambda}`),
          layers: allLayers,
          environment:
            func.lambda === "users"
              ? {
                  PREFIX: prefix,
                  USER_POOL_ID: userPoolId,
                  USER_POOL_CLIENT_ID: userPoolClientId,
                  SECRET_KEY: secretKey,
                }
              : {
                  PREFIX: prefix,
                  SECRET_KEY: secretKey,
                  AWS_DOCUMENT_BUCKET_NAME: docBucket,
                },
          timeout: cdk.Duration.seconds(60),
        }
      );

      if (
        func.lambda === "ideas" ||
        func.lambda === "process-documents" ||
        func.lambda === "automation-maintenance" ||
        func.lambda === "change-request" ||
        func.lambda === "ticket-raised"
      ) {
        lambdaFunction.addToRolePolicy(
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ["s3:PutObject", "s3:GetObject"],
            resources: [`arn:aws:s3:::${prefix}*`, `arn:aws:s3:::${prefix}*/*`],
          })
        );
        lambdaFunction.addToRolePolicy(
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ["s3:ListBucket"],
            resources: [`arn:aws:s3:::${prefix}*`],
          })
        );
      } else if (func.lambda === "users") {
        lambdaFunction.addToRolePolicy(
          new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: [
              "cognito-idp:SignUp",
              "cognito-idp:AdminCreateUser",
              "cognito-idp:adminGetUser",
              "cognito-idp:ListUsers",
            ],
            resources: [
              `arn:aws:cognito-idp:${props.env.region}:${props.env.account}:userpool/${userPoolId}`,
            ],
          })
        );
      }
      

      lambdaFunction.addToRolePolicy(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ["secretsmanager:GetSecretValue"],
          resources: [
            `arn:aws:secretsmanager:${props.env.region}:${props.env.account}:secret:${props.env.secret_key}*`,
          ],
        })
      );

      this.lambdaFunctions[func.lambda] = lambdaFunction;
    });
  }
}

module.exports = { LambdaStack };
