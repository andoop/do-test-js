/**
 * Created by domob on 2017/7/3.
 */


function getBaseUrl() {
    
    return "http://192.168.11.7:8080";
}

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


var xmlhttp;
function loadXMLDocByGet(url,callback)
{
    if (window.XMLHttpRequest)
    {// IE7+, Firefox, Chrome, Opera, Safari 代码
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// IE6, IE5 代码
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function () {
        var data=JSON.parse(xmlhttp.responseText);
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            callback(null, data);
        }else if(xmlhttp.status==404){
            callback("资源未找到",data);
        }else if(xmlhttp.status==500){
            callback("服务器错误", data);
        }
    };
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function getXmlHttp() {
    return xmlhttp;
}