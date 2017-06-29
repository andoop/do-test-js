/**
 * Created by domob on 2017/6/21.
 */

//菜单默认选中第一个
var selected_pos=0;
//log数据
var log_data;
//当前显示的Log type
var log_type=1;
//当前搜索的key
var log_key="";
//log panel_id
var panel_id="div_log_console_tab01";


/*移动under line到以前选中的菜单指定位置*/
var move_under_line_to_current_selected=function () {
    move_under_line_to(selected_pos)

};

/*移动under line到菜单指定位置 pos：菜单位置*/
var move_under_line_to=function (pos) {
    var under_line=document.getElementsByClassName("div_under_line")[0];
    var menu=document.getElementsByClassName("div_menu")[0];
    under_line.style.marginLeft=(menu.offsetWidth/3)*pos+'px';

    var lis=document.getElementsByClassName("ul_menu")[0].getElementsByTagName('li');
    var i=0;
    for(i=0;i<lis.length;i++){
        if(i==pos){
            lis[i].getElementsByTagName("a")[0].className="selected";
        }else {
            lis[i].getElementsByTagName("a")[0].className="unselected";
        }
    }
};

/**
 * 格式化时间
 * @returns {string}
 */
function getTime(/** timestamp=0 **/) {
    var ts = arguments[0] || 0;
    var t,y,m,d,h,i,s;
    t = ts ? new Date(ts*1000) : new Date();
    y = t.getFullYear();
    m = t.getMonth()+1;
    d = t.getDate();
    h = t.getHours();
    i = t.getMinutes();
    s = t.getSeconds();
    // 可根据需要在这里定义时间格式
    return y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+' '+(h<10?'0'+h:h)+':'+(i<10?'0'+i:i)+':'+(s<10?'0'+s:s);
}

/**
 * 获取item模板
 */
function getItemTemplet(time,verbose,debug,warn,error,clik) {
    return ' <p class="_log_list_item_time normal">'+time+'</p>'+
    '<p class="_log_list_item_verbose verbose">'+verbose+'</p>'+
    '<p class="_log_list_item_debug debug">'+debug+'</p>'+
    '<p class="_log_list_item_time warn">'+warn+'</p>'+
    '<p class="_log_list_item_time error">'+error+'</p>'+
    '<img  src="images/look.png" class="img_item_log"/>'
}
/**
 * log项目被点击查看
 * @param pos
 */
function onLogItemCliked(pos) {
    //显示详细页面
    document.getElementById("div_body_content").style.display="none";
    document.getElementById("div_log_detail_cover").style.display="block";
    panel_id="div_log_detail_cover";//panel_id
    init_log_items_tag_with_data(log_data[pos],1,"",panel_id);
}


//初始化log list数据
var init_log_list_data=function (data) {
    var ul_list=document.getElementById("ul_logs_list");
    var i=0;

    for(i=0;i<data.length;i++){
        var newli=document.createElement("li");
        newli.className="li_log_list_item";
        var debug=0;
        var warn=0;
        var error=0;
        var j=0;
        for(j=0;j<data[i].data.length;j++){
            var log=data[i].data[j];
            if(log.indexOf("#debug#")>=0){
                debug++;
            }else if(log.indexOf("#warn#")>=0){
                warn++;
            }else if(log.indexOf("#error#")>=0){
                error++;
            }
        }
        newli.innerHTML=getItemTemplet(getTime(data[i].time),data[i].data.length,debug,warn,error)
        ul_list.appendChild(newli);
        var img=newli.getElementsByClassName("img_item_log")[0];
        (function () {
            var p=i;
            img.onclick=function () {
               onLogItemCliked(p);
            }
        })();
    }
};

/**
 * 根据数据生成log item
 * @param data
 */
function init_log_items_tag_with_data(data,type,key,panel_id) {
    var newest_log=data;
    var time=newest_log.time;
    //格式化时间并显示
    document.getElementById(panel_id).getElementsByClassName("p_div_log_list_time")[0].innerText=getTime(time);
    var ol_list=document.getElementById(panel_id).getElementsByClassName("log_detail_list")[0];
    ol_list.innerHTML="";
    var i=0;
    for(i=0;i<newest_log.data.length;i++){
        var log= newest_log.data[i];
        var newclass=log.split("#")[1];

        if(key){
          //有搜索条件
            if(log.indexOf(key)<0){
                continue;
            }
        }

        if(log.indexOf("#verbose#")>=0){
            if(type>1){
                continue;
            }
        }

        if(log.indexOf("#debug#")>=0){
            if(type>2){
                continue;
            }
        }
        if(log.indexOf("#warn#")>=0){
            if(type>3){
                continue;
            }
        }
        
        log=log.replace("#error#","");
        log=log.replace("#warn#","");
        log=log.replace("#debug#","");
        log=log.replace("#verbose#","");
        var newli=document.createElement("li");
        newli.className=newclass;
        newli.innerText=log;
        ol_list.appendChild(newli);
    }

}


//读取到log数据的回调
function fun(data) {
    log_data=data;
   //根据数据生成log项
    init_log_items_tag_with_data(data[data.length-1],1,log_key,panel_id);
    //初始化历史log数据
    init_log_list_data(data);

}
/**
 * select改变回调
 * @param value
 */
function onSelectedChange(value) {
    log_type=value;
   init_log_items_tag_with_data(log_data[log_data.length-1],value,log_key,panel_id);
}

/**
 * 初始化panel中组件的事件
 */
function init_panel_item_event(panel_id) {
    //设置select事件
    var select_log_type=document.getElementById(panel_id).getElementsByClassName("select_log_type")[0];
    select_log_type.onchange=function () {
        onSelectedChange(select_log_type.options[select_log_type.options.selectedIndex].value);
    };

    //
    var input_log_search=document.getElementById(panel_id).getElementsByClassName("input_log_search")[0];
    input_log_search.oninput=function () {
        log_key=input_log_search.value;
        init_log_items_tag_with_data(log_data[log_data.length-1],log_type,log_key,panel_id);
    };
}


document.onload=new function () {


    //添加返回事件
    document.getElementById("img_back").onclick=function () {
        //关闭详细页面
        document.getElementById("div_body_content").style.display="block";
        document.getElementById("div_log_detail_cover").style.display="none";
        panel_id="div_log_console_tab01";//panel_id
       
    };

    var lis=document.getElementsByClassName("ul_menu")[0].getElementsByTagName('li');
    var i=0;
    for(i=0;i<lis.length;i++){
        (function () {
            var p=i;
            lis[i].onmouseover=function () {
                move_under_line_to(p);
            };
            lis[i].onmouseout=function () {
                   move_under_line_to_current_selected(selected_pos);
            };
            lis[i].onclick=function () {
              selected_pos=p;
                document.getElementsByClassName("div_content")[0].style.marginLeft
                    =-document.body.clientWidth*p+"px";
            };
        })()
    }

    //内容适配title高度
    var title_bar=document.getElementsByClassName("title_bar")[0];
    var div_content=document.getElementsByClassName("div_content")[0];
    div_content.style.marginTop=title_bar.offsetHeight+"px";
    init_panel_item_event(panel_id);
    init_panel_item_event("div_log_detail_cover");

};
