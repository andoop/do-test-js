/**
 * Created by domob on 2017/7/3.
 */

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