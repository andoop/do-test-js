/**
 * Created by domob on 2017/7/5.
 */

var mData=null;

function initAppMsg(data) {
    document.getElementById("td_app_name").innerHTML = data.appName;
    document.getElementById("td_app_id").innerHTML = data.appId;
    document.getElementById("td_app_time").innerHTML = data.appTime;
}

function initData() {
    loadXMLDocByGet(getBaseUrl() + "/app/find?appid=" + GetQueryString("value"), function (err, data) {
        if (err) {
            alert(err)
        } else {
            if (data.error) {
                alert(data.error.msg);
            } else {
                if (data.data == null) {
                    alert("获取应用信息失败！");
                    return;
                }
                initAppMsg(data.data);
                initUserList();
            }
        }
    });
}


function deleteUser(id){
    var userId;
    var i=0;
    for(;i<mData.length;i++){
        if(id==mData[i].id){
            userId=mData[i].userId;
            break;
        }
    }


    var msg = "您真的确定要删除 \""+userId+"\" 吗？";
    if (confirm(msg)==true){

        //向服务端请求应用列表数据
        loadXMLDocByGet(getBaseUrl()+"/user/delete?value="+id+"&appid="+GetQueryString("value"), function (err, data) {
            if (err) {
                alert(err)
            } else {
                if(data.error){
                    alert(data.error.msg);
                }else{
                    alert("删除成功！");
                   initUserList();
                }
            }
        });

        return true;
    }else{
        return false;
    }
}


function initUserItem(data) {

    var tBody=document.getElementById("tbody_user_list");

    var newRow=tBody.insertRow(0);
    var userIdCell=newRow.insertCell(0);
    var userDescCell=newRow.insertCell(1);
    var oprateCell=newRow.insertCell(2);

    userIdCell.innerHTML=data.userId;
    userDescCell.innerHTML=data.userDesc;

    (function () {
        var id=data.id;
        oprateCell.innerHTML='<a class="a_user_list_delete" onclick="return deleteUser('+id+')">删除</a>';
    })();


}

function initUserList() {
    document.getElementById("input_user_id").innerHTML = "";
    document.getElementById("input_user_desc").innerHTML = "";
    loadXMLDocByGet(getBaseUrl() + "/user/list?value=" + GetQueryString("value"), function (err, data) {
        if (err) {
            alert(err)
        } else {
            if (data.error) {
                alert(data.error.msg);
            } else {

                var tBody=document.getElementById("tbody_user_list");
                tBody.innerHTML="";
                if (data.data == null || data.data.length == 0) {
                    alert("测试用户列表为空，请添加测试用户信息！");
                    return;
                }
                mData=data.data;
                var i=0;
                for(;i<data.data.length;i++){
                    initUserItem(data.data[i]);
                }

            }
        }
    });
}

function addUser(userId, userDesc) {

    loadXMLDocByGet(getBaseUrl() + "/user/add?value=" + GetQueryString("value") + "&userid=" + userId + "&userdesc=" + userDesc, function (err, data) {
        if (err) {
            alert(err)
        } else {
            if (data.error) {
                alert(data.error.msg);
            } else {
                alert(data.data.msg);
                initUserList();
            }
        }
    });

}

window.onload = new function () {
    initData();
    document.getElementById("input_user_add").onclick = function () {
        var userId = document.getElementById("input_user_id").value;
        var userDesc = document.getElementById("input_user_desc").value;

        if (userId == "") {
            alert("userId不能为空！");
            return;
        }
        if (userDesc == "") {
            alert("描述不能为空！");
            return;
        }

        addUser(userId, userDesc);
    }

};