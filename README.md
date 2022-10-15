# Spring Boot 2 Zip example

A basic pet store application written with the Spring Boot 2 framework. You can build and test it locally as a typical Spring Boot 2 application.

The application can be deployed in an AWS account using the [Serverless Application Model](https://github.com/awslabs/serverless-application-model). The `template.yaml` file in the root folder contains the application definition.

To run the application we are using the run.sh script located in the resources folder:

```shell
#!/bin/sh

java -cp "./:lib/*" "-XX:TieredStopAtLevel=1" "com.amazonaws.demo.petstore.Application"
```

In the configuration we have to specify the AWS Lambda adapter as a layer and configure the script as handler:

```yaml
 Properties:
      MemorySize: 512
      Handler: run.sh
      CodeUri: app/
      Runtime: java11
      Environment:
        Variables:
          RUST_LOG: info
          READINESS_CHECK_PATH: /healthz
          AWS_LAMBDA_EXEC_WRAPPER: /opt/bootstrap
      Layers:
        - !Sub arn:aws:lambda:${AWS::Region}:753240598075:layer:LambdaAdapterLayerX86:7
```


## Pre-requisites

The following tools should be installed and configured.

* [AWS CLI](https://aws.amazon.com/cli/)
* [SAM CLI](https://github.com/awslabs/aws-sam-cli)
* [Maven](https://maven.apache.org/)
* [Docker](https://www.docker.com/products/docker-desktop)

## Deploy to Lambda
Navigate to the sample's folder and use the SAM CLI to build the application:

```shell
$ sam build
```

This command compiles the application and prepares a deployment package in the `.aws-sam` sub-directory.

To deploy the application in your AWS account, you can use the SAM CLI's guided deployment process and follow the instructions on the screen

```shell
$ sam deploy --guided
```

Once the deployment is completed, the SAM CLI will print out the stack's outputs, including the new application URL. You can use `curl` or a web browser to make a call to the URL

```shell
...
---------------------------------------------------------------------------------------------------------
OutputKey-Description                        OutputValue
---------------------------------------------------------------------------------------------------------
PetStoreApi - URL for application            https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/Prod/pets
---------------------------------------------------------------------------------------------------------
...

$ curl https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/Prod/pets
```

## Clean up

This example use provisioned concurrency to reduce cold start time. It incurs additional cost. You can remove the whole example with the following command. 

```shell
sam delete
```