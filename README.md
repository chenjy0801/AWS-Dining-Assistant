# AWS-Dining-Assistant

#### The system is implemented with various Amazon Web Service, supports recommendation, ordering and intelligent review.
* sign up through registering or using a google account.
* sign in using the account created.
* chat with lexbot with text to provide anticipate restuarant info and get recommendation with text messages
* make orders for certain restuarants
* review certain restuarants with star, text and selfie rating

#### Different Amazon Web Service applied in the project:

* AWS S3: Host webpage producing by HTML and Javascript
* AWS API Gateway: Integrates with AWS Lambda
* AWS Cognito: Realized user verification and security
* AWS Lex: Proceed natural language analyzing of user chat content
* AWS SQS: Message queue for transmitting user messages
* AWS Cloud Watch: Trigger lambda for certain period
* AWS DynamoDB: Store user, restuarant and dish info
* AWS SNS: Send text message to users
* AWS Rekognition: Face Recognition
* AWS Comprehension: Sentiment Analysis
* AWS Lambda: Backend logistic processing for the whole system
