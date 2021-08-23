import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { handler } from "./www/server/lambda";

const config = new pulumi.Config("aws");
const providerOpts = {
  provider: new aws.Provider("provider:aws", {
    region: <aws.Region>config.require("region"),
  }),
};

const role = new aws.iam.Role(
  "lambda-role",
  {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({
      Service: "lambda.amazonaws.com",
    }),
  },
  providerOpts,
);

new aws.iam.RolePolicyAttachment("lambda-basic-execution", {
  policyArn: "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
  role: role.name,
});

const lambda = new aws.lambda.CallbackFunction(
  "handler",
  {
    callback: handler,
    role,
    runtime: "nodejs14.x",
  },
  providerOpts,
);

export const lambdaInvokeArn = lambda.invokeArn;
export const lambdaArn = lambda.arn;
