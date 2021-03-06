var Tasks = Ext.extend(Ext.Panel,
{
       initComponent : function(test)
       {
       var form = new Kwf.Auto.FormPanel({
                                         controllerUrl   : '/task',
                                         region          : 'center'
                                         });
              
       var grid = new Kwf.Auto.GridPanel({
                                         controllerUrl   : '/tasks',
                                         region          : 'west',
                                         width           : 300,
                                         resizable       : true,
                                         split           : true,
                                         collapsible     : true,
                                         title           : trlKwf('Tasks'),
                                         bindings: [{
                                                    queryParam: 'id',
                                                    item: form
                                                    }]
                                         });
       
       this.layout = 'border';
       this.items = [grid, {
                     layout: 'border',
                     region: 'center',
                     items: [form]
                     }];
       Tasks.superclass.initComponent.call(this);
    }
});

Ext.util.Format.taskCheckDate = function(val)
{
    var month = val.getUTCMonth() + 1;
    var monthStr = month < 10 ? '0' + month : month;
    var day = val.getUTCDate() + 1;
    var dayStr = day < 10 ? '0' + day : day;
    var year = val.getUTCFullYear();
    
    var newdate = dayStr + "-" + monthStr + "-" + year;

    var dateToCheck = new Date();
    var today = new Date();
    
    dateToCheck.setDate(dateToCheck.getDate() - 3);
    
    if ((val > today) && (val > dateToCheck))
    {
        return '<span style="color:green;">' + newdate + '</span>';
    }
    else
    {
        return '<span style="color:red;">' + newdate + '</span>';
    }
    return val;
};
