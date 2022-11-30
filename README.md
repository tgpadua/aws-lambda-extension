# AWS Lambda Extension
Example code showing how to communicate an AWS Lambda function with an external [Lambda extension](https://docs.aws.amazon.com/lambda/latest/dg/lambda-extensions.html).

Written in Node.js with no dependencies for minimal footprint, the code was based on [nodejs-example-extension](https://github.com/aws-samples/aws-lambda-extensions/tree/main/nodejs-example-extension) repository. Check it out for more details on how to build an extension.



There are three components to this sample:
* `function/`: Contains the Lambda function code
* `extensions/`: Will be extracted to /opt/extensions where the Lambda platform will scan for executables to launch extensions
* `nodejs-example-extension/`: Will be extracted to /opt/nodejs-example-extension which is referenced by the `extensions/nodejs-example-extension` executable and includes a nodejs executable along with all of its necessary dependencies.

## Configure your webhook
1. Access [webhook.site](https://webhook.site) and copy your unique URL 
2. Open `template.yaml` file and replace the `DISPATCH_POST_URI` environment variable value with your unique URL


## Build the extension
```bash
sam build
```

## Deploy the function and extension
```bash
sam deploy --guided
```
