/**
 * Created by LBB on 2017/6/10.
 */
$(function(){
    var company=$('#company');
    //添加页面
    var addForm=$('#addForm');
    var region=$('#region');
    var range=$('#range');
    var list=$('#list');
    //修改页面
    var editForm=$('#editForm');
    var  area=$('#area');
    var business=$('#business');
    var store_list=$('#store_list');


    company.datagrid({
        url:"../json/company.json",
        fit:true,
        pagination:true,
        pagePosition:'bottom',
        pageSize:5,
        rownumbers:true,
        pageList:[5,10,15,20],
        onDblClickRow:onDblClickRow,
        columns:[[
            {field:"id","title":"编号",align:'center',checkbox:true,width:35},
            {field:"companyName","title":"公司名称",width:114,align:'center',fixed:true},
            {field:"companyType","title":"公司类型",width:80,align:'center',fixed:true},
            {field:"companyAbbr","title":"公司简称",width:80,align:'center',fixed:true},
            {field:"companyBusines","title":"经营范围",width:80,align:'center',fixed:true},
            {field:"telephoneNumber","title":"联系电话",width:80,align:'center',fixed:true},
            {field:"companyRegion","title":"所属区域",width:80,align:'center',fixed:true},
            {field:"companyLicense","title":"营业执照",width:100,align:'center'},
            {field:"organizationCode","title":"机构代码证",width:100,align:'center'},
            {field:"taxRegistCertificate","title":"税务登记证",width:100,align:'center'},
            {field:"bankCount","title":"开户行结算账号信息",width:110,align:'center'},
            {field:"contactEmail","title":"电子邮箱",width:90,align:'center'},
            {field:"stores","title":"店面列表",width:100,align:'center'}
        ]],
        toolbar: [{
            text:"增加",
            iconCls: 'icon-add',
            handler: function () {
                addForm.form('disableValidation');
                addForm.show();
                    $('#div1').dialog({
                        width:500,
                        height:360,
                        constrain:true,
                        top:20,
                        iconCls:'icon-add_new',
                        /*draggable:true,*/
                       /* resizable:true,*/
                        title:'公司表添加页面',
                        toolbar:[{
                            text:"保存",
                            iconCls: 'icon-save',
                            handler:function(){
                                addForm.form('enableValidation');
                                var domain=region.combo('getText');
                                var scope=range.combo('getText');
                                var companyName=$('#name').val();
                                var companyType=$('#type').val();
                                var companyAbbr=$('#attr').val();
                                var telephoneNumber=$('#phone').val();
                                var companyLicense=$('#license').val();
                                var organizationCode=$('#code').val();
                                var taxRegistCertificate=$('#tax').val();
                                var bankCount=$('#bankCount').val();
                                var contactEmail=$('#email').val();
                                var stores=$('#list').val();
                                var v = addForm.form("validate");
                                if(v){
                                    company.datagrid('insertRow',{
                                        index:0,
                                        row:{
                                            companyName:companyName,
                                            companyType:companyType,
                                            companyAbbr:companyAbbr,
                                            companyBusines:scope,
                                            telephoneNumber:telephoneNumber,
                                            companyRegion:domain,
                                            companyLicense:companyLicense,
                                            organizationCode:organizationCode,
                                            taxRegistCertificate:taxRegistCertificate,
                                            bankCount:bankCount,
                                            contactEmail:contactEmail,
                                            stores:stores
                                        }
                                    });
                                    addForm.window('close');
                                }else{
                                    window.alert("请正确的填写完要添加的数据");
                                }
                            }
                        }]
                    });
            }
        },'-',
            {
                text:"删除",
                iconCls: 'icon-cancel',
                handler:function(){
                    var rows=company.datagrid('getSelections');
                    if(rows.length==0){
                        //没有选中消息，提示
                        $.messager.confirm('确认','请至少选择一条您要删除的信息')
                    }else{
                        for(var i=0;i<rows.length;i++){
                            var thisIndex=company.datagrid("getRowIndex",rows[i]);
                            company.datagrid("deleteRow",thisIndex);
                        }
                    }}
            },'-',{
                text:"修改",
                iconCls: 'icon-edit',
                handler:function() {
                    var rows=company.datagrid('getSelections');
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
                                $('#lookfor').show();
                                var userName=$('#firmName').val();
                                company.datagrid({
                                        rowStyler: function(i,row){
                                            if(row.companyName== userName){
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
                                company.datagrid('clearChecked');
                            }
                        }]
                    });
                }
            }]
    });
    //双击事件处理函数
    function onDblClickRow(index,rowData){
        editIndex=index;
        //修改表单的所属区域的下拉框
        area.combobox({
            url:'../json//companyArea.json',
            valueField:'id',
            textField:'text',
            value:rowData.companyRegion
        });
        //修改表单的经营范围的下拉框
        business.combobox({
            url:'../json//companyRange.json',
            valueField:'id',
            textField:'text',
            value:rowData.companyBusines
        });
        //修改表单的店面列表的下拉框
        store_list.combobox({
            url:'../json//companyList.json',
            valueField:'id',
            textField:'text',
            value:rowData.stores
        });

        addForm.hide();
        $('#kookFor').hide();
        company.datagrid('selectRow',index);
        //找出所选行的每个单元格的信息内容
        editForm.form("load",rowData);
        $('#div2').dialog({
            width:500,
            height:370,
            constrain:true,
            top:20,
            iconCls: 'icon-edit',
            title:'公司表修改页面',
            toolbar:[{
                text:'保存',
                iconCls:'icon-save',
                handler:function(){
                    //获取下来框的值
                    var textB=business.combo('getText');
                    var textA=area.combo('getText');
                    var textC=store_list.combo('getText');
                    $('#kookFor').show();
                    var v=editForm.form('validate');
                   var name=$('input[name=companyName]').val();
                    var type=$('input[name=companyType]').val();
                    var attr=$('input[name=companyAbbr]').val();
                    var phone=$('input[name=telephoneNumber]').val();
                   var license=$('input[name=companyLicense]').val();
                    var code=$('input[name=organizationCode]').val();
                    var tax=$('input[name=taxRegistCertificate]').val();
                    var bank=$('input[name=bankCount]').val();
                    var email=$('input[name=contactEmail]').val();
                    if(v){

                        $('#div2').window('close');
                        company.datagrid('clearChecked');
                        company.datagrid("updateRow",{
                            index:index,
                            row: {
                                companyName: name,
                                companyType:type,
                                companyAbbr:attr,
                                companyBusines:textB,
                                telephoneNumber:phone,
                                companyRegion:textA,
                                companyLicense:license,
                                organizationCode:code,
                                taxRegistCertificate:tax,
                                bankCount:bank,
                                contactEmail:email,
                                stores:textC
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
                validator: function(value){
                    return reg.test(value);
                },
                message: '手机号输入有误！'
            }
        });
    });

    //添加表单的所属区域的下拉框
    region.combobox({
        url:'../json//companyArea.json',
        valueField:'id',
        textField:'text'
    });
    //添加表单的经营范围的下拉框
    range.combobox({
        url:'../json//companyRange.json',
        valueField:'id',
        textField:'text'
    });
    //添加表单的店面列表的下拉框
    list.combobox({
        url:'../json//companyList.json',
        valueField:'id',
        textField:'text'
    });

});