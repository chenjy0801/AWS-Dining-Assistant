var access_token = null;
var id_token = null;

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;}

var authen_code = GetQueryString("code");

console.log("Auth_code from uri is:" + authen_code);
var temp = null;

/*HTTP request to AWS token endpoint*/
if (authen_code!==null){
    $.ajax({
        url: "https://columbiacchw1.auth.us-east-1.amazoncognito.com/oauth2/token",
        async: false,//syncro
        type: "POST",
        data: { "Content-Type" : 'application/x-www-form-urlencoded' ,
                
                "grant_type" : "authorization_code",
                "client_id" : "",
                "code": authen_code,
                "redirect_uri": ""}, /*replacement needed*/
        success: function (data) {
            temp = data;
        }
    });
    
}

if (temp!==null) {
    access_token = temp["access_token"];
    id_token = temp["id_token"];
}


console.log("id_token: "+id_token);
console.log("access_token: "+access_token);