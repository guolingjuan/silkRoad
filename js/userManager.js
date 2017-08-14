/**
 * Created by LBB on 2017/6/4.
 */

$(function(){
    var list=$('#userInfo');
    var editUser=$('#editUser');
    var addUser=$('#addUser');
   list.datagrid({
        pagination:true,
        //pagePosition:'bottom',
        pageSize:5,
        rownumbers:true,
        pageList:[5,10,15,20],
        url:"../json/userManager.json",
       onDblClickRow:onDblClickRow,
        fit:true,
        columns:[[
            {field:'id',title:'编号',width:40,sortable:true,align:'center',checkbox:true},
            {field:'loginName',title:'登录用户名',width:120,sortable:true,align:'center',
                editor:{
                    type:'validatebox',
                    options:{
                        required:true,
                        missingMessage:'必须输入内容'
                    }
                }
            },
            {field:'password',title:'密码',width:100,sortable:true,align:'center',
                editor:{
                    type:'validatebox',
                    options:{
                        required:true,
                        missingMessage:'必须输入内容'
                    }
                }
            },
            {field:'telephone',title:'联系电话',width:100,sortable:true,align:'center',
                editor:{
                    type:'validatebox',
                    options:{
                        required:true,
                        validType: 'phoneNumber',
                        missingMessage:'必须输入内容'
                    }
                }
            },
            {field:'ContactEmail',title:'电子邮箱',width:100,sortable:true,align:'center',
                editor:{
                    type:'validatebox',
                    options:{
                        validType: 'email',
                        required:true,
                        missingMessage:'必须输入内容'
                    }
                }
            },
            {field:'WeChatNumber',title:'微信号',width:100,sortable:true,align:'center',
                editor:{
                    type:'validatebox',
                    options:{
                        required:true,
                        missingMessage:'必须输入内容'
                    }
                }
            },
            {field:'LoginIP',title:'登录IP地址',width:120,sortable:true,align:'center',
                editor:{
                    type:'validatebox',
                    options:{
                        required:true,
                        missingMessage:'必须输入内容'
                    }
                }
            },
            {field:'authentStatus',title:'实名认证状态',width:80,sortable:true,align:'center',
                editor:{
                    type:'validatebox',
                    options:{
                        required:true,
                        missingMessage:'必须输入内容'
                    }
                }
            },
            {field:'tradeLog',title:'交易记录',width:100,sortable:true,align:'center',
                editor:{
                    type:'validatebox',
                    options:{
                        required:true,
                        missingMessage:'必须输入内容'
                    }
                }
            },
            {field:'loginStatus',title:'上线状态',width:80,sortable:true,align:'center',
                editor:{
                    type:'validatebox',
                    options:{
                        required:true,
                        missingMessage:'必须输入内容'
                    }
                }
            },
            {field:'loginTime',title:'上线时间',width:100,sortable:true,align:'center',
                editor:{
                    type:'datebox',
                    options:{
                        required:true,
                        missingMessage:'请选择日期'
                    }
                }
            },
            {field:'logoutTime',title:'下线时间',width:100,sortable:true,align:'center',
                editor:{
                    type:'datebox',
                    options:{
                        required:true,
                        editable:false,
                        missingMessage:'请选择日期'
                    }
                }
            }
        ]],
        toolbar: [{
            text:"增加",
            iconCls: 'icon-add',
            handler: function () {
                addUser.show();
                addUser.form('disableValidation');
                {
                    addUser.dialog({
                        width:560,
                        height:340,
                        constrain:true,
                        top:20,
                        iconCls:'icon-add_new',
                        title:'用户账号管理添加页面',
                        toolbar:[{
                            text:"保存",
                            iconCls: 'icon-save',
                            handler:function(){
                                addUser.form('enableValidation');
                                var loginName=$('#login_name').val();
                                var password=$('#password').val();
                                var contactPhone=$('#telephone').val();
                                var email=$('#ContactEmail').val();
                                var WeChatNumber=$('#WeChatNumber').val();
                                var LoginIP=$('#LoginIP').val();
                                var authentStatus=$('#authentStatus').val();
                                var tradeLog=$('#tradeLog').val();
                                var loginStatus=$('#loginStatus').val();
                                var loginTime=$('#loginTime').val();
                                var logoutTime=$('#logoutTime').val();
                               var v=addUser.form('validate');
                                if(v){
                                    list.datagrid('insertRow',{
                                        index:0,
                                        row:{
                                            loginName:loginName,
                                            password:password,
                                            telephone:contactPhone,
                                            ContactEmail:email,
                                            WeChatNumber:WeChatNumber,
                                            LoginIP:LoginIP,
                                            authentStatus:authentStatus,
                                            tradeLog:tradeLog,
                                            loginStatus:loginStatus,
                                            loginTime:loginTime,
                                            logoutTime:logoutTime
                                        }
                                    })
                                }else{
                                    window.alert("请正确的填写完要添加的数据");
                                }
                            }
                        }]
                    });
                }
            }
        },'-',
            {
                text:"废除",
                iconCls: 'icon-cancel',
                handler:function(){
                    $('#redo').css('display','block');
                    var rows=list.datagrid('getSelections');
                    if(rows.length==0){
                        //没有选中消息，提示
                        $.messager.confirm('确认','请至少选择一条您要删除的信息')
                    }else{
                        for(var i=0;i<rows.length;i++){
                            var thisIndex=list.datagrid("getRowIndex",rows[i]);
                            list.datagrid("deleteRow",thisIndex);
                        }
                    }}
            },'-',{
                text:"修改",
                iconCls: 'icon-edit',
                handler:function() {
                    var rows=list.datagrid('getSelections');
                    if(rows==0){
                        window.alert('请双击选择一条数据进行修改');
                    }
                }
            },'-',{
                id:'search',
                text:'查询',
                iconCls:'icon-search',
                handler:function(){
                    $('#kookFor').dialog({
                        title:'查询',
                        width:280,
                        toolbar:[{
                            text:'查询',
                            iconCls:'icon-search',
                            handler:function(){
                                var userName=$('#loginName').val();
                                list.datagrid({
                                    rowStyler: function(i,row){
                                        if(row.loginName== userName){
                                            $('#kookFor').window('close');
                                            return 'display:block';
                                        }else{
                                            return 'display:none';
                                        }
                                    }
                                });
                            }
                        },{
                            id:'cancel',
                            text:'取消',
                            iconCls:'icon-cancel',
                            handler:function(){
                                $('#kookFor').dialog('close');
                                //当点击取消的时候清除勾选项
                                list.datagrid('clearChecked');
                            }
                        }]
                    });
                }
            }]
    });


    //双击事件
    function onDblClickRow(index,rowData){
        list.datagrid('selectRow',index);
        addUser.hide();
        $('#kookFor').hide();
        editUser.form('load',rowData);
        editUser.dialog({
            width:560,
            height:340,
            constrain:true,
            top:20,
            iconCls:'icon-edit',
            title:'用户账号管理修改页面',
            toolbar:[{
                text:"保存",
                iconCls:'icon-save',
                handler:function(){
                    editUser.dialog('close');
                    var loginName=$('input[name=loginName]').val();
                    var password=$('input[name=password]').val();
                    var contactPhone=$('input[name=telephone]').val();
                    var email=$('input[name=loginName]').val();
                    var WeChatNumber=$('input[name=WeChatNumber]').val();
                    var LoginIP=$('input[name=loginName]').val();
                    var authentStatus=$('input[name=authentStatus]').val();
                    var tradeLog=$('input[name=tradeLog]').val();
                    var loginStatus=$('input[name=loginStatus]').val();
                    var loginTime=$('input[name=loginTime]').val();
                    var logoutTime=$('input[name=logoutTime]').val();
                    var v=editUser.form('validate');
                    if(v){
                        list.datagrid('clearChecked');
                        list.datagrid('updateRow',{
                            index:index,
                            row:{
                                loginName:loginName,
                                password:password,
                                telephone:contactPhone,
                                ContactEmail:email,
                                WeChatNumber:WeChatNumber,
                                LoginIP:LoginIP,
                                authentStatus:authentStatus,
                                tradeLog:tradeLog,
                                loginStatus:loginStatus,
                                loginTime:loginTime,
                                logoutTime:logoutTime
                            }
                        });
                    }else{
                        window.alert('请正确修改所选的数据');
                    }

                }
            }]
        });

    }



    //电话号码的验证
    $(function(){
        var reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
        $.extend($.fn.validatebox.defaults.rules, {
            phoneNumber: {
                validator: function(value, param){
                    return reg.test(value);
                },
                message: '手机号输入有误！'
            }
        });
    });

});