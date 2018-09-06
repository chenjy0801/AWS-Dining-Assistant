/*Integrating User Pools with Cognito Identity.*/ 
// Add the User's Id Token to the Cognito credentials login map.
var accessKey = null;
var secretKey = null;

if (access_token!==null){
    
    /*Should specify a region if not defined before*/
    AWS.config.region = 'us-east-1';
    
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: '',
        Logins: {
            'cognito-idp.us-east-1.amazonaws.com/': id_token  /*userpool id is required in the key*/
                }
                });
    setTimeout(
    //call refresh method in order to authenticate user and get new temp credentials
    AWS.config.credentials.refresh((error) => {
        if (error) {
            console.error(error);
            } 
        else {
            console.log('Successfully logged!');
            //console.log(AWS.config.credentials);
            accessKey = AWS.config.credentials.accessKeyId;
            secretKey = AWS.config.credentials.data.Credentials.SecretKey;
            sessionToken = AWS.config.credentials.sessionToken;
            console.log(AWS.config.credentials);
            console.log(accessKey);
            console.log(secretKey);
            console.log(sessionToken);

            if(accessKey!==null){
                $("p").hide();
                var dataResult;
                console.log("accessing with:" + accessKey);
                console.log("secretKey:" + secretKey);
                $(document).ready(function(){
                    var apigClient=apigClientFactory.newClient(
                    {
                      accessKey: accessKey,
                      secretKey: secretKey,
                      sessionToken: sessionToken,
                    }
                    );
                    $('form').submit(function (event) {
                        $('#results').append('<b>'+'Me: '+$('input[name=message]').val()+'<br/>');
                        var formData={
                        };

                        var params={
                        };

                        var body={
                            "messages":[
                                {
                                    "type": "string",
                                        "unstructured": {
                                            "id": "string",
                                            "text": $('input[name=message]').val(),
                                            "timestamp": "string"
                                }
                            }
                            ]

                            };

                        var additionalParams={
                            //headers:{},
                            //queryParams:{
                            //    'bookid':$('input[name=bookid]').val()
                            //
                            message: {
                                "unstructured": {
                                    "id": "string",
                                    "text": "Hi",
                                    "timestamp": "string"
                                }
                            }
                        };

                        apigClient.chatbotPost(params,body,additionalParams)
                            .then(function(result){
                                console.log(result.data);
                                dataResult=result.data;
                                var resultStr='<b>'+'chatbot: '+result.data+'</br>';
                                //console.log(resultStr);
                                $('#results').append(resultStr);
                            }).catch(function(result){
                            console.log("error from lambda");
                            });
                        return false;

                        });
                    });
                }
                else{
                    console.log("login needed!");
                }

            }
        }) ,1000);
    }