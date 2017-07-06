/**
 * Created by domob on 2017/7/4.
 */
var mValue="";
var mData=null;


function goToDetail(appId) {

    window.open("appdetail.html?value="+appId);
}

function deleteApp(appId){
    var appName;
    var i=0;
    for(;i<mData.length;i++){
        if(appId==mData[i].appId){
            appName=mData[i].appName;
            break;
        }
    }


    var msg = "您真的确定要删除 \""+appName+"\" 吗？";
    if (confirm(msg)==true){

        //向服务端请求应用列表数据
        loadXMLDocByGet(getBaseUrl()+"/app/delete?value="+mValue+"&appid="+appId, function (err, data) {
            if (err) {
                alert(err)
            } else {
                if(data.error){
                    alert(data.error.msg);
                }else{
                   alert("删除成功！");
                    initData();
                }
            }
        });





        return true;
    }else{
        return false;
    }
}

//将数据显示在table中
function insertIntoTable(data) {
   var bodyObj= document.getElementById("tbody_app_list");
    var newRow = bodyObj.insertRow(0);
    var cellName=newRow.insertCell(0);
    var cellPkg=newRow.insertCell(1);
    var cellAppID=newRow.insertCell(2);
    var cellTime=newRow.insertCell(3);
    var cellActions=newRow.insertCell(4);

    cellPkg.innerHTML=data.appPkg;
    cellAppID.innerHTML=data.appId;
    cellTime.innerHTML=data.appTime;

    (function () {
        var appId=""+data.appId;
        var appName=data.appName;
        cellActions.innerHTML='<a class="a_app_list_delete" onclick="return deleteApp('+appId+')">删除</a>';
        cellName.innerHTML='<a class="a_app_list_app_name" onclick="goToDetail('+appId+')">'+appName+'</a>';
    })();

}

//初始化数据
function initData() {
    var bodyObj= document.getElementById("tbody_app_list");
    bodyObj.innerHTML="";

    var value=GetQueryString("value");
    mValue=value;
    //向服务端请求应用列表数据
    loadXMLDocByGet(getBaseUrl()+"/app/list?value="+value, function (err, data) {
        if (err) {
            alert(err)
        } else {
           if(data.error){
               alert(data.error.msg);
           }else{
               if(data.data==null||data.data.length==0){
                   alert("还没有创建应用，去创建一个应用吧！");
               }

               mData=data.data;

               var i = 0;
               for (i=0; i < data.data.length; i++) {
                   insertIntoTable(data.data[i]);
               }
           }
        }
    });

}

document.onload = new function () {
    initData();
     document.getElementById("img_title_add").onclick=function () {
         if(mValue!=""){
             self.location="newapp.html?value="+mValue;
         }
     };

    document.getElementById("div_cover_add").style.height=1000;
};