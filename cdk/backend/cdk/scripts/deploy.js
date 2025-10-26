const { execSync } = require("child_process");
const env = process.argv[2] || "dev";

console.log(`Deploying to ${env}...`);
execSync(
  `npx cdk deploy --all --app "node app.js ${env}" --require-approval never`,
  { stdio: "inherit" }
);
