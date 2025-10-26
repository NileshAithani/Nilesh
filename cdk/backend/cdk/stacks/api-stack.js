const cdk = require("aws-cdk-lib");
const apigateway = require("aws-cdk-lib/aws-apigateway");
const lambda = require("aws-cdk-lib/aws-lambda");
const fs = require("fs");

class ApiStack extends cdk.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const prefix = props.env.prefix;
    const stage = props.env.stage;
    const region = props.env.region;
    const account = props.env.account;

    const functionConfig = JSON.parse(
      fs.readFileSync("./config/functions-config.json", "utf-8")
    );

    const disallowedMethods = ["DELETE", "HEAD"];
    const allowedMethodsForAny = ["GET", "POST", "PUT", "PATCH", "OPTIONS"];

    const api = new apigateway.RestApi(this, `${prefix}api`, {
      restApiName: `${prefix}api-gateway-v2`,
      deployOptions: { stageName: stage },
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: [
          "Content-Type",
          "Authorization",
          "X-Requested-With",
          "Access-Control-Allow-Origin",
          "Access-Control-Allow-Headers",
          "Access-Control-Allow-Methods",
        ],
      },
    });

    const methodMap = new Map();

    functionConfig.forEach((func) => {
      if (
        !func.routes ||
        !Array.isArray(func.routes) ||
        func.routes.length === 0
      )
        return;
      if (func.lambda === "authorizer") return;

      const lambdaFunction = lambda.Function.fromFunctionArn(
        this,
        `${prefix}${func.lambda}`,
        `arn:aws:lambda:${region}:${account}:function:${prefix}${func.lambda}`
      );

      const lambdaIntegration = new apigateway.LambdaIntegration(
        lambdaFunction
      );

      func.routes.forEach((route) => {
        if (!route.path || !route.method) {
          throw new Error(`Invalid route config for function: ${func.lambda}`);
        }

        const validMethods = [
          "GET",
          "POST",
          "PUT",
          "PATCH",
          "OPTIONS",
          "DELETE",
          "HEAD",
          "ANY",
        ];
        if (!validMethods.includes(route.method)) {
          throw new Error(
            `Unsupported method ${route.method} in route: ${route.path}`
          );
        }

        const pathSegments = route.path.split("/").filter((p) => p !== "");
        const isProxy = route.path.includes("{proxy+}");

        let resource = api.root;

        const createResourcePath = (segments) => {
          let current = api.root;
          for (const segment of segments) {
            current =
              current.getResource(segment) || current.addResource(segment);
          }
          return current;
        };

        const addMethodOnce = (res, method) => {
          const key = `${res.node.path}:${method}`;
          if (methodMap.has(key)) return;
          res.addMethod(method, lambdaIntegration);
          methodMap.set(key, true);
        };

        if (isProxy) {
          // Get base path (e.g., /process)
          const baseSegments = pathSegments.slice(
            0,
            pathSegments.indexOf("{proxy+}")
          );
          const baseResource = createResourcePath(baseSegments);

          // Add method(s) to /process
          if (route.method === "ANY") {
            allowedMethodsForAny.forEach((method) => {
              if (method !== "OPTIONS") addMethodOnce(baseResource, method);
            });
          } else if (
            !disallowedMethods.includes(route.method) &&
            route.method !== "OPTIONS"
          ) {
            addMethodOnce(baseResource, route.method);
          }

          // Add proxy under it
          resource =
            baseResource.getResource("{proxy+}") ||
            baseResource.addProxy({ anyMethod: false });

          // Add method(s) to /process/{proxy+}
          if (route.method === "ANY") {
            allowedMethodsForAny.forEach((method) => {
              if (method !== "OPTIONS") addMethodOnce(resource, method);
            });
          } else if (
            !disallowedMethods.includes(route.method) &&
            route.method !== "OPTIONS"
          ) {
            addMethodOnce(resource, route.method);
          }
        } else {
          // Non-proxy path
          resource = createResourcePath(pathSegments);

          if (route.method === "ANY") {
            allowedMethodsForAny.forEach((method) => {
              if (method !== "OPTIONS") addMethodOnce(resource, method);
            });
          } else if (
            !disallowedMethods.includes(route.method) &&
            route.method !== "OPTIONS"
          ) {
            addMethodOnce(resource, route.method);
          }
        }
      });
    });
  }
}

module.exports = { ApiStack };
