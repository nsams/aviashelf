var Employees = Ext.extend(Ext.Panel,
{
    initComponent : function(test)
    {                           
        var documents = new Kwf.Auto.GridPanel({
             controllerUrl   : '/documents',
             collapsible     : true,
             stripeRows      : true,
             title           : 'Периодическая подготовка'
        });
                           
        var user = new Kwf.Auto.FormPanel({
             controllerUrl   : '/employee',
             collapsible     : true,
             title           : trlKwf('General Info')
        });

        var accesses = new Kwf.Auto.GridPanel({
              controllerUrl   : '/flightaccesses',
              collapsible     : true,
              title           : 'Летные проверки'
        });
        
        var flightresults = new Kwf.Auto.GridPanel({
              controllerUrl   : '/flightresults',
              collapsible     : true,
              title           : trlKwf('Flight results')
        });
        
        var grid = new Kwf.Auto.GridPanel({
            controllerUrl   : '/employees',
            region          : 'west',
            width           : 340,
            resizable       : true,
            split           : true,
            collapsible     : true,
            title           : trlKwf('Flight crew'),
            bindings: [{
                queryParam: 'ownerId',
                item: documents
            },
            {
                queryParam: 'id',
                item: user
            },
            {
                queryParam: 'employeeId',
                item: accesses
            },
            {
                queryParam: 'ownerId',
                item: flightresults
            }]
        });
                           
        var tabs = new Ext.TabPanel({
               border    : true,
               activeTab : 0,
               region    : 'center',
               tabPosition:'top',
               items:[user, documents, accesses, flightresults]
        });

        this.layout = 'border';
        this.items = [grid, {
            layout: 'border',
            region: 'center',
            items: [tabs]
        }];
        Employees.superclass.initComponent.call(this);
    }
});

function toDate(dStr,format)
{
    console.log(dStr);

	var now = new Date();

	if (format == "h:m")
    {
 		now.setHours(dStr.substr(0,dStr.indexOf(":")));
 		now.setMinutes(dStr.substr(dStr.indexOf(":")+1));
 		now.setSeconds(0);
 		return now;
	}else
		return "Invalid Format";
}

// define a custom summary function
Ext.grid.GroupSummary.Calculations['totalFlightTime'] = function(v, record, field)
{
    if (v == 0)
    {
        return record.data.flightTime;
    }

    var totalTimeValue = v.split(':');
    var addTimeValue = record.data.flightTime.split(':');
    var hours = (totalTimeValue[0]) * 1 + (addTimeValue[0]) * 1;
    var minutes = 0;
    var hoursAddition = 0;
    
    if ((totalTimeValue[1]) * 1 + (addTimeValue[1]) * 1 > 60)
    {
        minutes = (totalTimeValue[1]) * 1 + (addTimeValue[1]) * 1 - 60;
        hoursAddition = 1;
    }
    else
    {
        minutes = (totalTimeValue[1]) * 1 + (addTimeValue[1]) * 1;
    }
    
    hours = hours + hoursAddition;

    return hours + ':' + minutes + ':00';
}

Ext.util.Format.docCheckDate = function(val)
{
    var month = val.getUTCMonth() + 1;
    var monthStr = month < 10 ? '0' + month : month;
    var day = val.getUTCDate() + 1;
    var dayStr = day < 10 ? '0' + day : day;
    var year = val.getUTCFullYear();
    
    var newdate = dayStr + "-" + monthStr + "-" + year;
    
    var dateToCheck = new Date();
    var today = new Date();
    
    dateToCheck.setDate(dateToCheck.getDate() - 7);
        
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

Ext.util.Format.checkGrade = function(val)
{    
    if (val == 'зачет' || val == 'пять' || val == 'четыре' || val == 'допущен')
    {
        return '<span style="color:green;">' + val + '</span>';
    }
    else
    {
        return '<span style="color:red;">' + val + '</span>';
    }
    return val;
};

//Kwf.keepAlive = function() {};
//Kwf.keepAliveActivated = false;
//Kwf.activateKeepAlive = function() {};
