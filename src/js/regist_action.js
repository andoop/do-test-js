/**
 * Created by domob on 2017/7/3.
 */

var host="http://192.168.11.7:8080";

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
    loadXMLDocByGet(getBaseUrl()+"/dev/login?developer_email="+result+"&developer_password="+password,function (err,data) {
        if(err){
            alert(err);
        }else {
            if(data.error!=null){
                alert(data.error.msg);
            }else{
                self.location="apps.html?value="+data.data;
            }
        }
    });

   // document.getElementById("form_login").submit();
}

function regist() {
    var result = document.getElementById("input_regist_email").value;
    var password = document.getElementById("input_regist_password").value;

    if(!checkUser(result,password)){
        return;
    }
    //向服务端检查用户是否存在，密码是否正确
    loadXMLDocByGet(getBaseUrl()+"/dev/regist?developer_email="+result+"&developer_password="+password,function (err,data) {
        if(err){
            alert(err);
        }else {
            if(data.error!=null){
                alert(data.error.msg);
            }else{
                alert(data.data.msg);
            }
        }
    });
}

function reset() {
    var result = document.getElementById("input_reset_email").value;
    var name = document.getElementById("input_reset_name").value;

    if(name==""){
        alert("工号不能为空！");
        return;
    }

    if(!checkUser(result,name)){
        return;
    }
    //向服务端添加用户
    loadXMLDocByGet(getBaseUrl()+"/dev/reset?developer_email="+result+"&developer_name="+name,function (err,data) {
        if(err){
            alert(err);
        }else {
            if(data.error!=null){
                alert(data.error.msg);
            }else{
                alert(data.data.msg);
            }
        }
    });
}

document.onload=new function () {
    document.getElementById("bt_login").onclick=function () {
        login();
    };
    document.getElementById("bt_regist").onclick=function () {
        regist();
    };

    document.getElementById("bt_reset").onclick=function () {
        reset();
    };
};
