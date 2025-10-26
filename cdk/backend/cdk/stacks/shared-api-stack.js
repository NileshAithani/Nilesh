const cdk = require('aws-cdk-lib');
const apigateway = require('aws-cdk-lib/aws-apigateway');

class SharedApiStack extends cdk.NestedStack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { api, lambdaFunctions, routesGroup } = props;
    const resourceCache = new Map();

    routesGroup.forEach((func) => {
      const lambda = lambdaFunctions[func.lambda];
      if (!lambda) return;

      const integration = new apigateway.LambdaIntegration(lambda);

      func.routes.forEach(route => {
        let resource = api.root;
        const segments = route.path.split('/').filter(Boolean);
        segments.forEach((segment, idx) => {
          const pathKey = segments.slice(0, idx + 1).join('/');
          if (!resourceCache.has(pathKey)) {
            resource = resource.addResource(segment);
            resourceCache.set(pathKey, resource);
          } else {
            resource = resourceCache.get(pathKey);
          }
        });

        resource.addMethod(route.method, integration);
      });
    });
  }
}

module.exports = { SharedApiStack };
