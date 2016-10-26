var clientContext = new SP.ClientContext.get_current();
var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
var parentContext = new SP.AppContextSite(clientContext, hostweburl);
var parentWeb = parentContext.get_web();
var listItems = parentWeb.get_lists().getByTitle("SemesterLista").getItems("");
var list = parentWeb.get_lists().getByTitle("SemesterLista");
var itemCreateInfo = new SP.ListItemCreationInformation();
var listItem = list.addItem(itemCreateInfo);

$(document).ready(function () {

    $("#txtStartDatum").datepicker({ dateFormat: 'yy-mm-dd', timeFormat: 'hh:mm', dateonly: true });
    $("#txtSlutDatum").datepicker({ dateFormat: 'yy-mm-dd', timeFormat: 'hh:mm', dateonly: true });

    $("#divAllaItems").jqxListBox({

        theme: 'energyblue',
        width: '550px',
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
    

    clientContext.load(listItems);
    clientContext.executeQueryAsync(VisaAlla, onFail);
});

function itemsInAnsvarigTextboxes2() {

    currentItem = list.getItemById($("#hidRowID").val());

    clientContext.load(currentItem);
    clientContext.load(list);

    clientContext.executeQueryAsync(function getListRowSuccess() {


        var testaID = currentItem.get_item("Title");

        $("#txtFornamn").val(currentItem.get_item("Title"));
        $("#txtEfternamn").val(currentItem.get_item("Efternamn"));
        $("#txtStartDatum").val(currentItem.get_item("Startdatum").format('yyyy-MM-dd'));
        $("#txtSlutDatum").val(currentItem.get_item("Slutdatum").format('yyyy-MM-dd'));
        //$("#txtStatus2").val(currentRows.get_item("_Status"));
        $("#txtOmfattning").val(currentItem.get_item("Omfattning"));
        $("#txtAnsvarig").val(currentItem.get_item("Ansvarig"));

    },

        function TxtonFail(sender, args) {
            alert('Error: ' + args.get_message());
        });
}


function VisaAlla() {
    //Visa alla ansökningar

    var listString = "";
    var listEnumerator = listItems.getEnumerator();

    $('#divAllaItems').jqxListBox('clear');

    while (listEnumerator.moveNext()) {

        var currentItem = listEnumerator.get_current();
        listString =  currentItem.get_id() + ": " +
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

    function onFail(sender, args) {

        alert('Det gick fel att visa ansökningar. Error:' + args.get_message());
    }

    function Update() {
        // Uppdatera ansökningar

        var items = $("#divAllaItems").jqxListBox("getSelectedItems");
        if (items == "") {
            alert("Välj en rad att uppdatera!")
        }
        else {
            var selectedItem = (items[0].label).split(" ");
            var index = selectedItem[5];
            var camlQuery = "<View><Query><Where><Eq><FieldRef Name='Startdatum'></FieldRef><Value Type='DateTime'>" + index + "</Value></Eq></Where></Query></View>";
            var query = new SP.CamlQuery();
            query.set_viewXml(camlQuery);

            var updatelist = parentWeb.get_lists().getByTitle("Semesterlistan").getItems(query);
            clientContext.load(updatelist);
            clientContext.executeQueryAsync(OnSuccUpdate, OnFail);


        }
        function OnFail(sender, args) {
            alert('Error:' + args.get_message());
        }

        function OnSuccUpdate() {
            if (updatelist.get_count()) {
                var itemToUpdate = updatelist.getItemAtIndex(0);

                var fornamn = $("#txtFornamn").val();
                var efternamn = $("#txtEfternamn").val();
                var startdatum = $("#txtStartDatum").val();
                var slutdatum = $("#txtSlutDatum").val();
                var status = $("#ddlStatus").val();
                var omfattning = $("#txtOmfattning").val();
                var ansvarig = $("#txtAnsvarig").val();

                itemToUpdate.set_item("Title", fornamn);
                itemToUpdate.set_item("Efternamn", efternamn);
                itemToUpdate.set_item("Startdatum", startdatum);
                itemToUpdate.set_item("Slutdatum", slutdatum);
                itemToUpdate.set_item("Status", status);
                itemToUpdate.set_item("Omfattning", omfattning);
                itemToUpdate.set_item("Ansvarig", ansvarig);
                itemToUpdate.update();

                clientContext.load(itemToUpdate);
                clientContext.executeQueryAsync(OnSucc, OnFail);
            }

            function OnSucc() {
                alert("Ansökan är nu uppdaterad!");
                VisaLista();
                //location.reload();
            }

            function OnFail(sender, args) {
                alert('Det gick fel med att uppdatera. Error: ' + args.get_message());
            }
        }
    }

    function TaBort() {
        // Ta bort ansökningar
        var itemId = $('#hidRowID').val();
        listItem = list.getItemById(itemId);
        listItem.deleteObject();

        clientContext.executeQueryAsync(onDeleteSuccess, onFail);

        function onDeleteSuccess() {
            alert("Ansökan är nu borttagen");
            VisaLista();

        }
        function onFail(sender, args) {
            alert("Det gick fel. Error: " + args.get_message());
        }
    }

    function Tillbaka() {
        //Tillbaka till ansöknings sidan
        location.replace("Default.aspx?SPHostUrl=" + getQueryStringParameter("SPHostUrl"))
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

    function VisaLista() {
        //Knapp för att visa ansökningar
        //listItems = list.getItems("");
        clientContext.load(listItems);
        clientContext.executeQueryAsync(OnSuccessVisa, OnFail);
    }

    function OnSuccessVisa() {
        var listString;
        var listEnumerator = listItems.getEnumerator();

        $('#divAllaItems').jqxListBox('clear');

        while (listEnumerator.moveNext()) {

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

        //$('#divAllaItems').jqxListBox('addItem', currentItem.get_item('Title'));
        //$('#divAllaItems').html(listString);
    }
    function OnFail(sender, args) {
        alert('Det gick fel. Error:' + args.get_message());
    }