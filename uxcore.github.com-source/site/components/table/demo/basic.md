# 基本表格

- order: 0

---

````jsx

let Table = require('uxcore-table');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           data:this.props.data
        }
    }

    onModifyRow(value,dataKey,record) {
        //doValidate
        //debugger;
        //return false;
        return true;
    }

      render () {
        console.log("demo render");
        let me=this;
        // 通过 rowSelection 对象表明需要行选择
        let rowSelection = {
          onSelect: function(record, selected, selectedRows) {
            console.log(record, selected, selectedRows);
          },
          onSelectAll: function(selected, selectedRows) {
            console.log(selected, selectedRows);
          }
        };

        let doAction= function(rowData,e) {
            let el=$(e.target);
            if(el.hasClass('action')) {
               if( el.data('type') =='edit') {
                  console.info(rowData,el.data('type'));
               }else if(el.data('type') =='del') {
                 console.info(rowData,el.data('type'));
               }
            }
        }
        // title, width, type, hidden,dataKey
        let columns = [
            { dataKey: 'id', title: 'ID', width: 50,hidden:true},
            { dataKey: 'country', title:'国家', width: 200,ordered:true},
            { dataKey: 'city',title:'城市', width: 150,ordered:true },
            { dataKey: 'firstName',title:"FristName" },  
            { dataKey: 'lastName' ,title:"LastName"},
            { dataKey: 'email',title:"Email",width: 200,ordered:true },
            { dataKey: 'action1', title:'操作1', width:100, type:"action",actions:{
                "编辑": function(rowData, actions) {
                    console.log(actions.addEmptyRow);
                    me.refs.grid.toggleSubComp(rowData);
                },
                "删除": function(rowData) {
                    me.refs.grid.delRow(rowData);
                }
              },
              beforeRender: function(rowData,actionItems) {
                 if(rowData.jsxid%2==0) {
                    return ['编辑'];
                 }else {
                    return ['编辑','删除'];
                 }
                 
              }
            },
            { dataKey: 'action', title:'链接', width:100,render: function(rowData){
               return <div><a href="#">111</a></div>
              }
            }
        ]

        let fetchUrl = './demo/data.json';
        
        let renderProps={
           
            actionColumn: {
               'edit': function() {},
               'del': function() {}
            },
            fetchParams:'',
            showColumnPicker:false,
            fetchUrl: fetchUrl,
            jsxcolumns:columns,
        };
        return (<Table {...renderProps}  ref="grid"/>);
      }
};

ReactDOM.render(<Demo />, document.getElementById('components-table-demo-basic'))
````