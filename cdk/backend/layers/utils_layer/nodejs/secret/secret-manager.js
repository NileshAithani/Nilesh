const {
  GetSecretValueCommand,
  SecretsManagerClient,
} = require("@aws-sdk/client-secrets-manager");
const client = new SecretsManagerClient({
  region: process.env.AWS_REGION || "ap-south-1",
});

console.log("AWS_REGION:", process.env.AWS_REGION);

async function getSecretKey(key) {
  try {
    const secretName = process.env.SECRET_KEY;
    console.log(`[getSecretKey] Fetching secret for: ${secretName}`);

    if (!secretName) {
      throw new Error("Environment variable SECRET_KEY is not defined");
    }

    const command = new GetSecretValueCommand({ SecretId: secretName });
    const response = await client.send(command);

    const secretObject = JSON.parse(response.SecretString);

    if (!secretObject[key]) {
      console.error(`[getSecretKey] Key "${key}" not found in secret`);
      throw new Error(`Key "${key}" not found in secret "${secretName}"`);
    }
    return secretObject[key];
  } catch (error) {
    console.error(`[getSecretKey] Failed to fetch secret:`, error);
    throw new Error("Secret retrieval failed");
  }
}

module.exports = { getSecretKey };
