## Customizable monitoring with AWS Lambda

### Prerequisities

* aws cli installed (test with ```aws --version```)
* an access and a secret key
* aws cli configured (do with ```aws configure```)
* an S3 bucket you'll upload the code

### Package

* ```cd src && npm i && cd .. && mkdir -p .tmp && aws cloudformation package --template-file cloudformation.yml --s3-bucket <bucket> --output-template-file .tmp/output.yml```

### Deploy

* ```aws cloudformation deploy --template-file .tmp/output.yml --stack-name <stack name> --capabilities CAPABILITY_IAM```
* You can also override the default 1-minute rate with ```--parameter-overrides "ScheduleExpression=rate(10 minutes)"```
