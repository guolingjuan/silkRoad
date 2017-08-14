/**
 * Created by admin on 2017/6/4.
 */
$(function(){
    var list=$('#tb');
    var Erows=0;
    list.datagrid({
        rownumbers:true,
        pagination:true,
        pagePosition:'top',
        url:'../json/commerce.json',
        columns:[[
            {field:'id',title:'主键',checkbox:true},
            {field:"userName",title:"店面账号",align:'center'},
            {field:"password",title:"登录密码",align:'center'},
            {field:"storeName",title:"店面名称",align:'center'},
            {field:"storeType",title:"店面类型",align:'center'},
            {field:"Company",title:"所属公司",align:'center'},
            {field:"advertisingArea", title:"所属广告区",align:'center'},
            {field:"telephoneNumber",title:"联系电话",align:'center'},
            {field:"storeAdress",title:"店面地址",align:'center'},
            {field:"pushSwich", title:"推送开关",align:'center'},
            { field:"storeLicense",title:"营业执照",align:'center'},
            {field:"wechatAccount",title:"公司微信号",width:110,align:'center'},
            {field:"contactEmail",title:"电子邮箱",width:110, align:'center'},
            {field:"loginIP",title:"登录ip地址"}
        ]],
        toolbar:[
            {
                text:"添加",
                iconCls:"icon-add",
                handler:function(){

                    add();
                }
            },"-",{
                text:"修改",
                iconCls:"icon-add",
                handler:function(){
                    Erows=list.datagrid("getSelections");
                    if(Erows.length==0){
                        $.messager.alert("警告信息","请选择一条数据进行修改");
                    }else if(Erows.length>1){
                        $.messager.alert("警告信息","您只能修改一条数据");
                    }else{

                        edit();
                    }
                }
            },"-",{
                text:"作废",
                iconCls:"icon-cancel",
                handler:function(){
                    Delete();
                }
            },"-",{
                text:"查询",
                iconCls:"icon-search",
                handler:function(){
                    search();
                }
            },"-",{
                text:"导入",
                iconCls:"icon-undo",
                handler:function(){

                }
            },"-",{
                text:"导出",
                iconCls:"icon-redo",
                handler:function(){

                }
            }
        ],

        onDblClickRow:function(rowIndex, rowData){
            edit();

            $("#Einvolved_Company").combo("setText",rowData.userName);
            alert(rowIndex+""+rowData.userName);
            $("#editfrom").form("load",rowData);
        }
    });

    function add(){
        $("#add_adArea").combobox({
            url:"../json/adAreaCombox.json",
            valueField:"id",
            textField:'text'
        });
        $("#involved_Company").combobox({
            url:'../json/involved_Company.json',
            valueField:"id",
            textField:"text"
        });
        var addDialog=$("#addDialog");
        addDialog.dialog({
            shadow:true,
            width:520,
            height:275,
            modal:true,
            closed:false,
            cache:false,
            draggable:true,
            title:"店面表信息添加页面",
            toolbar:[
                {
                    text:'保存',
                    iconCls:"icon-save",
                    handler:function(){
                        var fmadd=$("#addform").form("validate");
                        if(fmadd){
                            alert("保存");
                            list.propertygrid("insertRow",{
                                index:0,
                                row:{
                                    userName:$("#addtb").find("input[name='userName']").val(),
                                    password:$("#addtb").find("input[name='password']").val(),
                                    storeName:$("#addtb").find("input[name='storeName']").val(),
                                    storeType:$("#addtb").find("input[name='storeType']").val(),
                                    Company:$("#involved_Company").combo("getText"),
                                    advertisingArea:$("#add_adArea").combo("getText"),
                                    telephoneNumber:$("#addtb").find("input[name='telephoneNumber']").val(),
                                    storeAdress:$("#addtb").find("input[name='storeAdress']").val(),
                                    pushSwich:$("#addtb").find("input[name='pushSwich']").val(),
                                    storeLicense:$("#addtb").find("input[name='storeLicense']").val(),
                                    wechatAccount:$("#addtb").find("input[name='wechatAccount']").val(),
                                    contactEmail:$("#addtb").find("input[name='contactEmail']").val(),
                                    loginIP:$("#addtb").find("input[name='loginIP']").val()
                                }
                            });
                            addDialog.dialog("close");
                        }else{
                            alert("不保存");
                            return false;
                        }
                    }
                }
            ]
        })
    }

    //作废操作
    function Delete(){
        var Drows=$("#tb").datagrid("getSelections");
        if(Drows.length==0){
            $.messager.alert("警告信息","请至少选择一条要删除的数据");
        }else{
            $.messager.confirm("提示信息","您确定要删除选择的信息？",function(flag){
                if(flag){
                    for(var i=0;i<Drows.length;i++){
                        var thisIndex=list.datagrid("getRowIndex",Drows[i]);
                        list.datagrid("deleteRow",thisIndex);
                    }
                }else{
                    list.datagrid("clearSelections");
                    return false;
                }
            });
        }
    }


    //修改操作
    function edit(){
        $("#edit_adArea").combobox({
            url:"../json/adAreaCombox.json",
            valueField:"id",
            textField:'text'
        });
        $("#Einvolved_Company").combobox({
            url:'../json/involved_Company.json',
            valueField:"id",
            textField:"text"
        });
        var editDialog=$("#editDialog");
        Erows=list.datagrid("getSelections");
        editDialog.dialog({
            shadow:true,
            width:520,
            height:275,
            modal:true,
            closed:false,
            cache:false,
            draggable:true,
            title:"店面表信息修改页面",
            toolbar:[
                {
                    text:"保存修改",
                    iconCls:"icon-save",
                    handler:function(){
                        //启用表单验证
                        $("#editfrom").form("enableValidation");
                        var eform=$("#editfrom").form("validate");
                        var rowselected=list.datagrid("getRowIndex",Erows[0]);
                        //获取各个下拉菜单框的值


                        var EadvertisingArea=$("#edit_adArea").combo("getText");
                        var involved_Company=$("#Einvolved_Company").combo("getText");
                        if(eform){
                            list.datagrid("updateRow",{
                                index:rowselected,
                                row:{
                                    userName:$("#edittb").find("input[name='userName']").val(),
                                    password:$("#edittb").find("input[name='password']").val(),
                                    storeName:$("#edittb").find("input[name='storeName']").val(),
                                    storeType:$("#edittb").find("input[name='storeType']").val(),
                                    Company:involved_Company,
                                    advertisingArea:EadvertisingArea,
                                    telephoneNumber:$("#edittb").find("input[name='telephoneNumber']").val(),
                                    storeAdress:$("#edittb").find("input[name='storeAdress']").val(),
                                    pushSwich:$("#edittb").find("input[name='pushSwich']").val(),
                                    storeLicense:$("#edittb").find("input[name='storeLicense']").val(),
                                    wechatAccount:$("#edittb").find("input[name='wechatAccount']").val(),
                                    contactEmail:$("#edittb").find("input[name='contactEmail']").val(),
                                    loginIP:$("#edittb").find("input[name='loginIP']").val()

                                }
                            });
                        }else{
                            editDialog.dialog("open");
                            return false;
                        }
                        editDialog.dialog("close");
                    }
                }
            ]
        });
        $("#editfrom").form("disableValidation");
    }

    //查询操作
    function search(){
        $("#searchDialog").dialog({
            shadow:true,
            modal:true,
            width:300,
            height:150,
            title:"店面表信息查询",
            cache:false,
            closed:false,
            content:'<div style="margin:20px 0 0 25px;"><label>店面账号查询：</label><input type="text" id="searchtext" /></div>',
            buttons:[{
                text:"查询",
                iconCls:"icon-search",
                handler:function(){
                    var srw=0;
                    var rows=list.datagrid("getRows");
                    var key=$("#searchtext").val();
                    if(key===""){
                        $.messager.alert("警告","请输入要查找的店面账号");
                        $("#searchDialog").dialog("open");
                    }
                    else{
                        for(var i=0;i<rows.length;i++){
                            if(key==rows[i].userName){
                                list.datagrid("highlightRow",i);
                                $("#searchDialog").dialog("close");
                            }else{
                                //选择未查询的行
                                list.datagrid("selectRow",i);
                                srw=list.datagrid("getSelections");
                            }
                        }
                    }
                    //查不到结果隐藏
                    for(var j=0;j<srw.length;j++){
                        var sIndex=list.datagrid("getRowIndex",srw[j]);
                        list.datagrid("deleteRow",sIndex);
                        list.datagrid("clearSelections");
                        $("#searchDialog").dialog("close");
                    }
                }
            }],
            //关闭后清空文本框中的值
            onClose:function(){
                $("#searchtext").val("");
            }
        });
    }
});