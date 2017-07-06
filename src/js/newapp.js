/**
 * Created by domob on 2017/7/4.
 */


function addApp() {

    var appName = document.getElementById("input_app_name").value;
    var appPkg = document.getElementById("input_app_pkg").value;

    if (appName == "") {
        alert("应用名称不能为空！");
        return;
    } else if (appPkg == "") {
        alert("应用包名不能为空！");
        return;
    }

    loadXMLDocByGet(getBaseUrl() + "/app/add?value=" + GetQueryString("value") + "&name=" + appName + "&pkg=" + appPkg,
        function (err, data) {

            if(data.data){
                self.location="apps.html?value="+GetQueryString("value");
            }else {
                alert("添加失败！");
            }
        });

}

window.onload = new function () {

    document.getElementById("img_back").onclick = function () {
        window.history.back(-1);
    };

    document.getElementById("img_ok").onclick = function () {
        addApp();
    };
    
    

};