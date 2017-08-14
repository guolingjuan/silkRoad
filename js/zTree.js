/**
 * Created by LBB on 2017/5/11.
 */
$(function(){
    var setting1={
        data:{
            simpleData:{
                enable:true  //启用简单的json数据
            }
        },
        callback:{
            onClick:function(a, b, treeNode){
                var page=treeNode.page;
                if(page!=undefined){

                    //判断当前选项卡的状态
                    var tab=$('#tabs');
                    var e=tab.tabs("exists",treeNode.name);
                    if(e){
                        tab.tabs("select",treeNode.name);
                    }else{
                        tab.tabs("add",{
                            fit:true,
                            title : treeNode.name,
                            iconCls : "icon-user",
                            content:'<iframe frameborder="0" width="100%" height="100%" src="'+page+'"></iframe>',
                            iconAlign:'right',
                            closable : true
                        });
                    }
                }
            }
        }
    };
    //发送ajax请求，获取json数据结构
    var url1="./json/baseTree.json";
    var url2="./json/systemTree.json";
    $.post(url1,{},function(data){
        //创建zTree ,基本功能的树形结构
        $.fn.zTree.init($("#base"),setting1,data);
    },"json");
    $.post(url2,{},function(data){
        //创建zTree，系统功能的树形结构
        $.fn.zTree.init($("#system"),setting1,data);
    },"json");
});