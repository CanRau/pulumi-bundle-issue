// todo: testing https://github.com/pulumi/pulumi/issues/2260
// https://aws.amazon.com/about-aws/whats-new/2018/04/aws-sam-cli-launches-new-commands/

// import { readdirSync } from "fs";
// import { join } from "path";
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
// import * as awsx from "@pulumi/awsx";
// import * as mime from "mime";
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

// const lambda = new aws.lambda.Function("handler", {
//   code: new pulumi.asset.FileArchive("./dist/main.zip"),
//   role: role.arn,
//   handler: "main.handler",
//   runtime: "nodejs14.x",
// });

// const lambdaLayer = new aws.lambda.L
const lambda = new aws.lambda.CallbackFunction(
  "handler",
  {
    callback: handler,
    // callbackFactory: () => handler,
    role,
    runtime: "nodejs14.x",
    // layers: []
  },
  providerOpts,
);

// const bucket = new aws.s3.Bucket("bucket", {}, providerOpts);
// const handlerObject = new aws.s3.BucketObject(
//   "handler.zip",
//   {
//     bucket,
//     source: new pulumi.asset.FileArchive("./www"),
//     contentType: "application/zip",
//   },
//   { replaceOnChanges: ["source"], ...providerOpts },
// );

// const lambda = new aws.lambda.Function(
//   "handler",
//   {
//     // code: new pulumi.asset.FileArchive("./www"),
//     role: role.arn,
//     handler: "server/lambda.handler",
//     runtime: "nodejs14.x",
//     s3Bucket: bucket.arn,
//     s3Key: handlerObject.key,
//   },
//   providerOpts,
// );

export const lambdaInvokeArn = lambda.invokeArn;
export const lambdaArn = lambda.arn;

// // Create an AWS resource (S3 Bucket)
// const bucket = new aws.s3.Bucket("canrau.com-prod", {
//   website: {
//     indexDocument: "index.html",
//   },
// });

// // const bucketObject = new aws.s3.BucketObject("index.html", {
// //   acl: "public-read",
// //   contentType: "text/html",
// //   bucket: bucket,
// //   source: new pulumi.asset.FileAsset("index.html")
// // });

// let siteDir = "www/dist/client"; // directory for content files

// // For each file in the directory, create an S3 object stored in `siteBucket`
// for (let item of readdirSync(siteDir)) {
//   let filePath = join(siteDir, item);
//   let object = new aws.s3.BucketObject(item, {
//     bucket: bucket,
//     source: new pulumi.asset.FileAsset(filePath), // use FileAsset to point to a file
//     contentType: mime.getType(filePath) || undefined, // set the MIME type of the file
//   });
// }

// // Export the name of the bucket
// export const bucketName = bucket.id;
// export const bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
