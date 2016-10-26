var clientContext = new SP.ClientContext.get_current();
var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
var parentContext = new SP.AppContextSite(clientContext, hostweburl);
var parentWeb = parentContext.get_web();
var user = clientContext.get_web().get_currentUser();
var list = parentWeb.get_lists().getByTitle("SemesterLista");
//var listCollection = parentWeb.get_lists();

var listItems = list.getItems("");

// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {

    $("#txtStartdatum").datepicker({ dateFormat:'yy-mm-dd', timeFormat: 'hh:mm', dateonly: true });
    $("#txtSlutdatum").datepicker({ dateFormat: 'yy-mm-dd', timeFormat: 'hh:mm', dateonly: true });
    $("#txtStatus").val("Skapad");
    $("#txtSokDatum").datepicker({ dateFormat: 'yy-mm-dd', timeFormat: 'hh:mm', dateonly: true });
    
    $("#divAllaItems").jqxListBox({

        theme: 'energyblue',
        width: '590px',
        height: '300px',
        selectedIndex: 3
    });

    $("#divAllaItems").on('select', function (event) {

        var args = event.args;
        var value = args.item.value;
        var id = value.split(':');
        id = id[0].replace("<br/>", "");
        $("#hidRowID").val(id);

        //funktionen som sätter in värden i textboxarna
        itemsInAnsvarigTextboxes2();
    });
    getUserName();

    clientContext.load(listItems);
    clientContext.executeQueryAsync(onShowSuccess, onFail);
});

function itemsInAnsvarigTextboxes2() {

    currentItem = list.getItemById($("#hidRowID").val());

    clientContext.load(currentItem);
    clientContext.load(list);

    clientContext.executeQueryAsync(function getListRowSuccess() {


        var testaID = currentItem.get_item("Title");

        //$("#txtFornamn").val(currentItem.get_item("Title"));
        //$("#txtEfternamn").val(currentItem.get_item("Efternamn"));
        $("#txtStartdatum").val(currentItem.get_item("Startdatum").format('yyyy-MM-dd'));
        $("#txtSlutdatum").val(currentItem.get_item("Slutdatum").format('yyyy-MM-dd'));
        //$("#txtStatus2").val(currentRows.get_item("_Status"));
        $("#txtOmfattning").val(currentItem.get_item("Omfattning"));
        $("#txtAnsvarig").val(currentItem.get_item("Ansvarig"));

    },

        function TxtonFail(sender, args) {
            alert('Det gick fel med att hämta ifrån listan. Error: ' + args.get_message());
        });
}

function getUserName() {
    clientContext.load(user);       
    clientContext.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
}

// This function is executed if the above call is successful
// It replaces the contents of the 'message' element with the user name
function onGetUserNameSuccess() {
    
    var splitnamn = user.get_title().split(" ");
    var Efternamn = splitnamn[1];
    var Fornamn = "";
    for (var i = 0; i < splitnamn.length - 1; i++) {
        Fornamn += splitnamn[i] + " ";
    }
    document.getElementById("txtFornamn").value = Fornamn;
    document.getElementById("txtEfternamn").value = Efternamn;
}

// This function is executed if the above call fails
function onGetUserNameFail(sender, args) {
    alert('Gick fel att hämta användarnamn. Error:' + args.get_message());
}

function onShowSuccess() {

    //var listString = "";
    //var listEnumerator = listItems.getEnumerator();

    //$('#divAllaItems').jqxListBox('clear');

    //while (listEnumerator.moveNext()) {

    //    var currentItem = listEnumerator.get_current();
    //    listString = "<br/> " + currentItem.get_id() + ":" +
    //        currentItem.get_item('Title')
    //    + " " + currentItem.get_item('Efternamn')
    //    + ", Från " + currentItem.get_item('Startdatum').format('yyyy-MM-dd')
    //    + " till " + currentItem.get_item('Slutdatum').format('yyyy-MM-dd')
    //        + " " + currentItem.get_item('Status')
    //        + " " + currentItem.get_item('Omfattning')
    //        + "%  " + currentItem.get_item('Ansvarig');

    //    $('#divAllaItems').jqxListBox('addItem', listString);

    var currentDate = new Date();
    //var q = new SP.CamlQuery();
    //var Camltext = "<View><Query><Where><Geq><FieldRef Name='Startdatum' /><Value Type='DateTime'><Today/></Value></Geq></Where></Query></View>";
    //q.set_viewXml(Camltext);
    var r = parentWeb.get_lists().getByTitle("SemesterLista").getItems("");
    clientContext.load(r);
    clientContext.executeQueryAsync(onVisaAktuellaSuccess, onFail);

    function onVisaAktuellaSuccess() {

        var listString;
        var listEnumerator = listItems.getEnumerator();

        $('#divAllaItems').jqxListBox('clear');
        //var listEnumerator = listItems.getEnumerator();
        while (listEnumerator.moveNext()) {

            //Keyvans lösnings funktion för att bara visa aktuella ansökningar

            if (currentDate > listEnumerator.get_current().get_item("Startdatum"))
                continue;            

            var currentItem = listEnumerator.get_current();
            listString = currentItem.get_id() + ": " +
                currentItem.get_item('Title')
            + " " + currentItem.get_item('Efternamn')
            + ", Från " + currentItem.get_item('Startdatum').format('yyyy-MM-dd')
            + " till " + currentItem.get_item('Slutdatum').format('yyyy-MM-dd')
                + " " + currentItem.get_item('Status')
                + " " + currentItem.get_item('Omfattning')
                + "%  " + currentItem.get_item('Ansvarig');

            $('#divAllaItems').jqxListBox('addItem', listString);
        }
    }



    //$('#divAllaItems').jqxListBox('addItem', listString);
}

// This function is executed if the above call fails
function onFail(sender, args) {

    alert('Det gick fel. Error: ' + args.get_message());
}


function getQueryStringParameter(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}

//function VisaAktuella() {
//    var q = new SP.CamlQuery(); 
//    var Camltext = "<View><Query><Where><Geq><FieldRef Name='Startdatum' /><Value Type='DateTime'><Today/></Value></Geq></Where></Query></View>";
//    q.set_viewXml(Camltext);
//    var r = list.getItems(q);
//    clientContext.load(r);
//    clientContext.executeQueryAsync(onVisaAktuellaSuccess, onFail);

//    function onVisaAktuellaSuccess() {

//        var listString = "";
//        var listEnumerator = listItems.getEnumerator();

//        $('#divAllaItems').jqxListBox('clear');

//        while (listEnumerator.moveNext()) {

//            var currentItem = listEnumerator.get_current();
//            listString = "<br/> " + currentItem.get_id() + ":" +
//                currentItem.get_item('Title')
//            + " " + currentItem.get_item('Efternamn')
//            + ", Från " + currentItem.get_item('Startdatum').format('yyyy-MM-dd')
//            + " till " + currentItem.get_item('Slutdatum').format('yyyy-MM-dd')
//                + " " + currentItem.get_item('Status')
//                + " " + currentItem.get_item('Omfattning')
//                + "%  " + currentItem.get_item('Ansvarig');

//            $('#divAllaItems').jqxListBox('addItem', listString);
//        }
//    }
//}

function Sok() {
    //Sök funktionen för att kunna söka på datum

    //var camlQuery = new SP.CamlQuery();
    //var datum = $("#txtSokDatum").val();
    //var camlText = "'<View><Query></Query></View>'";
    //camlText = "'<View><Query><Where><Eq><FieldRef Name=\'Startdatum\'/>' + '<Value Type=\'Text\'>" + datum + "</Value></Eq></Where></Query></View>'";

    //camlQuery.set_viewXml(camlText);
    //listItems = list.getItems(camlQuery);
    //clientContext.load(listItems);
    //clientContext.executeQueryAsync(OnSuccess, OnFail);

        
    var camlQuery = new SP.CamlQuery();

    var SearchDate = $("#txtSokDatum").val()

    var Camltext = "<View><Query><Where><Geq><FieldRef Name='Startdatum' /><Value Type='DateTime' IncludeTimeValue='TRUE' StorageTZ='True'>" + SearchDate + "</Value></Geq></Where></Query></View>";
        camlQuery.set_viewXml(Camltext);                                                                          
    listItems = list.getItems(camlQuery);
        clientContext.load(listItems);
        clientContext.executeQueryAsync(OnSuccess, OnFail);
}

function OnSuccess() {
    var output = [];
    var currentItem;
    var num = listItems.getEnumerator();

    while (num.moveNext()) {
       var currentItem = num.get_current();
        output[output.length] = currentItem.get_id() + ": " +
                currentItem.get_item('Title')
            + " " + currentItem.get_item('Efternamn')
            + ", Från " + currentItem.get_item('Startdatum').format('yyyy-MM-dd')
            + " till " + currentItem.get_item('Slutdatum').format('yyyy-MM-dd')
                + " " + currentItem.get_item('Status')
                + " " + currentItem.get_item('Omfattning')
                + "%  " + currentItem.get_item('Ansvarig');
        $("#divAllaItems").jqxListBox({ source: output, multiple: true });
    }
}

function OnFail(sender, args) {
    alert('Det gick fel med sökningen. Error: ' + args.get_message());
}


function SkickaEmail() {

    appweburl = decodeURIComponent(getQueryStringParameter('SPAppWebUrl'));
    hostweburl = decodeURIComponent(getQueryStringParameter('SPHostUrl'));
    var urlTemplate = appweburl + "/_api/SP.Utilities.Utility.SendEmail";
    var from = "pretta@mittsharepoint.onmicrosoft.com";
    var to = "pretta@mittsharepoint.onmicrosoft.com";
    var body = "Det här mailet är skickat från en sharepoint hosted app! <br> </br> mvh/peter";
    var subject = "FirstMail";
    $.ajax({
        contentType: 'application/json',
        url: urlTemplate,
        type: "POST",
        data: JSON.stringify({
            'properties': {
                '__metadata': { 'type': 'SP.Utilities.EmailProperties' },
                'From': from,
                'To': { 'results': [to] },
                'Body': body,
                'Subject': subject
            }
        }
      ),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            console.log('success')
        },
        error: function (err) {
            console.log(JSON.stringify(err));
        }
    });
}
