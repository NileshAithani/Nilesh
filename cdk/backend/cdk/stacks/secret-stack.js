const cdk = require("aws-cdk-lib");
const secretsmanager = require("aws-cdk-lib/aws-secretsmanager");

class SecretStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const prefix = props.env.prefix;

    const secretObject = {
      MAIL_FROM: cdk.SecretValue.unsafePlainText(
        "orchestrate-support@aventiq.ai"
      ),
      MAIL_HOST: cdk.SecretValue.unsafePlainText("smtp.office365.com"),
      MAIL_PASS: cdk.SecretValue.unsafePlainText("Winter@4312"),
      MAIL_PORT: cdk.SecretValue.unsafePlainText("587"),
      MAIL_USER: cdk.SecretValue.unsafePlainText(
        "orchestrate-support@aventiq.ai"
      ),
      MONGO_URI: cdk.SecretValue.unsafePlainText(
        "mongodb+srv://nileshaithani007:eXm6JsPnoaqdgUI9@clothing-cluster.6lsbvr8.mongodb.net/clothing-e-commerce"
      ),
      JWT_SECRET_KEY: cdk.SecretValue.unsafePlainText(
        "cdf1f794ae629eab846141333885c6177e9b3e21c2d409e41cc1f28e55de338017e49977a9622762e0b41cf70203b9e2f334ba8fe1b182693064867144eabc1b404e6474276084944c42ec898c518f51e8b65693f12129948b5461c5bcdbcd5e7470e601e7e71c261b5e8b6f4c2fa4b4c43207f36264110da2adbc11e4c8cdc442dea02a21f9cb1e428eab28c146323ab73e6cbb08f0c93426c4c592428a482900763920e7408fc139f08cff7a820512d0d92657bc9e93cb44b3a5dccaa7cba743960a98b1d7800c99aa474b12e74dcc78a29d8f7cf760d85bea7810badae53221b4140ec4ec0789814e7bb57f61a6425b7b83a4f2c0773f6d2646c8055b9b4e",
      ),
      USER_POOL_CLIENT_SECRET: cdk.SecretValue.unsafePlainText(
        "1ljqc39chqd94nhvoid57mt4dtv1o3q6v8al8gduetd97m1fs210"
      ),
      UI_URL: cdk.SecretValue.unsafePlainText(
        "https://orchestrate-dev.aventiq.ai"
      ),
      ENCRYPTION_KEY: cdk.SecretValue.unsafePlainText(
        "3e77c3fa-1a58-4be7-a0c9-1f88896c820f"
      ),
    };

    const secret = new secretsmanager.Secret(this, `${prefix}AppSecret`, {
      secretName: `${prefix}app-secret`,
      description:
        "Flat secret values for mail, MongoDB, Cognito, and encryption",
      secretObjectValue: secretObject,
    });

    this.secret = secret;
  }
}

module.exports = { SecretStack };
