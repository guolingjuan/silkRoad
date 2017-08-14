/**
 * Created by admin on 2017/6/10.
 */
$(function(){
    var list=$("#tb");
    var editRows=0;
    list.datagrid({
            rownumbers:true,
            pagination:true,
            pagePosition:'top',
            url:"../json/message.json",
            columns:[[
                {field:'id',checkbox:true,title:"主键"},
                {field:"advertisingArea",width:120,align:"center",title:'当前广告对应广告区域(外键)'},
                {field:"messageTitle",width:140,align:"center",title:'消息标题'},
                {field:"messageType",width:120,align:"center",title:'消息类型'},
                {field:"messageContent",width:180,align:"center",title:"消息内容"},
                {field:"messageSource",width:140,align:"center",title:"消息来源"},
                {field:"publishDate",width:120,align:"center",title:"发布时间"},
                {field:"deltag",width:120,align:"center",title:'删除标志',
                    formatter : function(data,row, index){
                        if(data=="0"){
                            return "已删除";
                        }else{
                            return "未删除";
                        }
                    }}
            ]],
            toolbar: [{
                iconCls: 'icon-add',
                text:"添加",
                handler: function(){
                    $("#add_adArea").combobox({
                        url:"../json/adAreaCombox.json",
                        valueField:"id",
                        textField:"text"
                    });
                    diaadd();
                }
            },'-',{
                iconCls: 'icon-edit',
                text:"修改",
                handler: function(){
                    editRows=$("#tb").datagrid("getSelections");
                    if(editRows.length==0){
                        $.messager.alert("警告信息","请选择一条要修改的数据");
                    }else if(editRows.length>1){
                        $.messager.alert("警告信息","您只能修改一条数据");
                    }else{
                        $("#edit_adArea").combobox({
                            url:"../json/adAreaCombox.json",
                            valueField:"id",
                            textField:"text"
                        });
                        dialogEdit();
                    }
                }
            },'-',{
                iconCls:"icon-cancel",
                text:"删除",
                handler:function(){
                    var rows=list.datagrid('getSelections');
                    /********后台删除代码***********/
                    //for(var i=0;i<rows.length;i++ ){
                    //     var id=rows[i].id;
                    //    alert(id);
                    //}
                    /********前端删除代码*******/
                    if(rows.length==0){
                        //没有选中消息，提示
                        $.messager.confirm('确认','请至少选择一条您要删除的信息')
                    }else{
                        $.messager.confirm("温馨提示","您确认要删除记录吗？",function(flag){
                            if(flag){
                                for(var i=0;i<rows.length;i++){
                                    var thisIndex=list.datagrid("getRowIndex",rows[i]);
                                    list.datagrid("deleteRow",thisIndex);
                                }
                            }else{
                                list.datagrid("clearSelections");
                                return false;
                            }
                        });
                    }
                }
            },"-",{
                iconCls: 'icon-save',
                text:"还原",
                handler: function(){alert('还原')}
            }],

            onDblClickRow:function(){
                editRows=$("#tb").datagrid("getSelections");
                if(editRows.length==0){
                    $.messager.alert("警告信息","请选择一条要修改的数据");
                }else if(editRows.length>1){
                    $.messager.alert("警告信息","您只能修改一条数据");
                }else{
                    $("#edit_adArea").combobox({
                        url:"../json/adAreaCombox.json",
                        valueField:"id",
                        textField:"text"
                    });
                    dialogEdit();
                }
            }
        }
    );
    /*添加对画框*/
    function diaadd(){

        $("#dialogAdd").dialog({
            shadow:true,
            modal:true,  //模式化窗口效果
            draggable:true,
            title:"消息表添加页面",
            width:300,
            height:350,
            cache:false,
            closed:false,
            top:40,
            toolbar:[
                {
                    text:"保存",
                    handler:function(){
                        var Messageform=$("#Messageform").form("validate");
                        /*******连接数据库提交*******/
                        //if(Messageform){
                        //    $("Messageform").submit();
                        //}
                        /*******前端模拟提交*******/
                        if(Messageform){
                            $("#tb").propertygrid("insertRow",{
                                index:0,
                                row:{
                                    advertisingArea:$("#add_adArea").combo("getText"),
                                    messageTitle:$("input[name='adtitle_add']").val(),
                                    messageType:$("input[name='adtype_add']").val(),
                                    messageContent:$(".textArea").val(),
                                    messageSource:$("input[name='adregion_add']").val(),
                                    publishDate:$("input[name='adtime_add']").val(),
                                    deltag:$("input[name='asymble_add']").val()
                                }
                            });
                            //关闭对话框
                            $("#dialogAdd").dialog("close");
                        }
                    },
                    iconCls:"icon-save"
                }
            ]
        });
    }
    //修改对画框
    function dialogEdit(){
        //将原来表格中的信息获取到文本框

        $("#edit_adArea").combo("setValue",editRows[0].advertisingArea);
        $("#Edit_table").find("input[name='informationTitle']").val(editRows[0].messageTitle);
        $("#Edit_table").find("input[name='informationType']").val(editRows[0].messageType);
        $("#Edit_table").find("textarea[name='informationContent']").val(editRows[0].messageContent);
        $("#Edit_table").find("input[name='informationRegion']").val(editRows[0].messageSource);
        $("#Edit_table").find("input[name='informationTime']").val(editRows[0].publishDate);
        //选择行的索引
        var rowIndex = list.datagrid('getRowIndex', editRows);
        $("#editDialog").dialog({
            shadow:true,
            modal:true,
            width:300,
            height:350,
            draggable:true,
            title:"消息表修改页面",
            cache:false,
            closed:true,
            toolbar:[
                {
                    text:"保存",
                    iconCls:'icon-save',
                    handler:function(){
                        var selectValues=$("#edit_adArea").combo("getText");
                        $("#editInformationForm").form("enableValidation");
                        var eidtform=$("#editInformationForm").form("validate");
                        var rowselected=list.datagrid("getRowIndex",editRows[0]);
                        if(eidtform){
                            list.datagrid("updateRow",{
                                    index:rowselected,
                                    row:{
                                        advertisingArea:selectValues,
                                        messageTitle: $("#Edit_table").find("input[name='informationTitle']").val(),
                                        messageType:$("#Edit_table").find("input[name='informationType']").val(),
                                        messageContent: $("#Edit_table").find("textarea[name='informationContent']").val(),
                                        messageSource: $("#Edit_table").find("input[name='informationRegion']").val(),
                                        publishDate:$("#Edit_table").find("input[name='informationTime']").val()
                                    }
                                }
                            );
                            $("#editDialog").dialog("close");
                            list.datagrid("clearSelections");
                        }
                        else{
                            return false;
                        }
                    }
                }
            ]
        });
        $("#editInformationForm").form("disableValidation");
        $("#editDialog").dialog("open");
    };
});