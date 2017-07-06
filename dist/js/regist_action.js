/**
 * Created by domob on 2017/7/3.
 */

function checkUser(email,password) {
    if(email == ""  ){
        alert("邮箱不能为空");
        return false;
    }
    if(password == ""  ){
        alert("密码不能为空");
        return false;
    }

    return true;
}

function login() {
    var result = document.getElementById("input_login_email").value;
    var password = document.getElementById("input_login_password").value;

    if(!checkUser(result,password)){
        return;
    }
    //向服务端检查用户是否存在，密码是否正确
    loadXMLDocByGet("http://192.168.11.5:8080/dev/login?developer_email="+result+"&developer_password="+password,function (err,data) {
        if(err){
            alert(err);
        }else {
            if(data.error!=null){
                alert(data.error.msg);
            }else{
                self.location="index.html?developer_email="+result;
            }
        }
    });

   // document.getElementById("form_login").submit();
}

document.onload=new function () {
    document.getElementById("bt_login").onclick=function () {
        login();
    };

};
