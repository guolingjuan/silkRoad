 //双击事件处理函数
        function doDblClickRow(rowIndex, rowData){//{id:xxx,name:xx,}
            // var rows=$('#box').datagrid('getSelections');//alert(rows[0].name);
            // $('#dept1').combobox('setValue',rows[0].name);
            $('#editInfo').window("open");//打开修改窗口
            $("#editForm").form("load",rowData);
            alert(rowData.name);
            $('#dept').combobox({
                url:'../json/combobox_data.json',
                valueField:'id',
                textField:'text',
                onLoadSuccess : function(data) {
                    $('#dept').combobox('setValue', rowData.advertisingArea);
                }
            });
            $('#dept1').combobox({
                url:'../json/combobox_data.json',
                valueField:'id',
                textField:'text',
                onLoadSuccess : function(data) {
                    $('#dept1').combobox('setValue', rowData.advertisingArea);
                }
            })
        }
        /*搜索*/
        function doView(){

        }
        /*编辑*/
        function doEdit(){
            $.messager.alert('提示信息','双击所要修改的行进行修改','tip');
            //window.alert();
        }
        /*添加内容*/
        function doAdd(){
            //alert("增加...");
            $('#addAdvertise').window("open");
        }
        /*删除*/
        function doDelete(){
            /*获取选中的行*/
            var rows=$('#box').datagrid('getSelections');

            if(rows.length==0){
                $.messager.alert("提示信息","请选择需要删除的记录","warning");
            }else{
                var array=new Array();
                //选中了记录，获取选中的id
                for(var i=0;i<rows.length;i++){
                    var id=rows[i].id;
                    $("#box").datagrid('deleteRow',i);
                    //array.push(id);
                }
                var ids = array.join(",");
                //发送请求，传递ids参数
                //window.location.href =""
            }
        }
        /*还原*/
        function doRestore(){
            alert('');
        }
        /*定义字段*/
        var  columns=[[
            {
                field:"id",
                title:"主键",
                sortable:true,
                checkbox:true
            },
            {
                field:"name",
                title:"广告区域名称",
                align:"center",
                width:120,
                editor : {
                    type : 'validatebox',
                    options : {
                        required : true
                    }
                }
            },{
                field:"informations",
                title:"通知公告",
                width:360,
                align:"center",
                editor : {
                    type : 'validatebox',
                    options : {
                        required : true
                    }
                }
            },{
                field:"messages",
                title:"消息提示",
                width:200,
                align:"center",
                editor : {
                    type : 'validatebox',
                    options : {
                        required : true
                    }
                }
            },{
                field:"stores",
                title:"广告分发门店",
                width:260,
                align:"center",
                editor : {
                    type : 'validatebox',
                    options : {
                        required : true
                    }
                }
            }
        ]];
        //工具栏
        var toolbar = [ {
            id : 'button-view',
            text : '查询',
            iconCls : 'icon-search'
        }, {
            id : 'button-add',
            text : '增加',
            iconCls : 'icon-add',
            handler:doAdd

        }, {
            id : 'button-delete',
            text : '作废',
            iconCls : 'icon-cancel',
            handler:doDelete

        },{
            id : 'button-save',
            text : '还原',
            iconCls : 'icon-save'
        },{
            id :'button-edit',
            text :'编辑',
            iconCls : 'icon-edit',
            handler : doEdit
        }];
        $(function(){
            // 先将body隐藏，再显示，不会出现页面刷新效果
            $("body").css({visibility:"visible"});
            // 添加广告窗口
            $('#addAdvertise').window({
                title: '添加广告',
                width: 360,
                modal: true,//遮罩效果
                shadow: true,//阴影效果
                closed: true,//关闭状态
                height: 260,
                resizable:false//是否可以调整大小
            });
            /*编辑广告窗口*/
            $('#editInfo').window({
                title: '编辑广告',
                width: 360,
                modal: true,//遮罩效果
                shadow: true,//阴影效果
                closed: true,//关闭状态
                height: 260,
                resizable:false//是否可以调整大小
            });
            $("#box").datagrid({
                url:"./../json/advertise.json",
                iconCls:"icon-search",
                toolbar:toolbar,
                fit:true,//自适应
                border:false,
				pagination:true,
        //pagePosition:'bottom',
       
				rownumbers:true,
       
              
                 striped:true,
                 pagination : true,
                 pageSize : 10,
				  pageList:[5,10,15,20],
               //  pageList : [3, 6, 9],
                 pageNumber : 1,
                sortName : 'date',
                sortOrder : 'DESC',
                 columns:columns,
                onDblClickRow : doDblClickRow//指定数据表格的双击行事件
            });
        })