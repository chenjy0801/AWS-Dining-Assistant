/* jshint browser: true */

var poolData = {
    UserPoolId : '',
    ClientId : ''
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

