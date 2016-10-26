<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="../_layouts/15/sp.js"></script>

    <link href="../Content/jqx.base.css" rel="stylesheet" />

    <meta name="WebPartPageExpansion" content="full" />


    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="stylesheet" href="../Content/jqx.base.css" type="text/css" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css" />

    <script type="text/javascript" src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript" src="../Scripts/Test.js"></script>

    <script type="text/javascript" src="../Scripts/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="../jqwid/demos.js"></script>
    <script type="text/javascript" src="../Scripts/jqxcore.js"></script>
    <script type="text/javascript" src="../Scripts/jqxbuttons.js"></script>
    <script type="text/javascript" src="../Scripts/jqxscrollbar.js"></script>
    <script type="text/javascript" src="../Scripts/jqxlistbox.js"></script>
    <script type="text/javascript" src="../jqwid/globalize.js"></script>
    <script type="text/javascript" src="../jqwid/jqxtooltip.js"></script>
    <script type="text/javascript" src="../jqwid/jqxdatetimeinput.js"></script>
    <script type="text/javascript" src="../jqwid/jqxcalendar.js"></script>
    
    <script type="text/javascript" src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>


</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>


<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

   

    <div>

        <h1>Semester Ansökning</h1>

        <div id="box1">


            <div id="box3">

                <asp:Label ID="lblFornamn" runat="server" Text="Förnamn" Font-Size="Medium"></asp:Label>

                <br />

               <asp:Label ID="lblEfternamn" runat="server" Text="Efternamn" Font-Size="Medium"></asp:Label>

                <br />

                <asp:Label ID="lblStartdatum" runat="server" Text="Startdatum" Font-Size="Medium"></asp:Label>

                <br />

                <div id="box6">

                <asp:Label ID="lblSlutdatum" runat="server" Text="Slutdatum" Font-Size="Medium"></asp:Label>

                <br />


                <asp:Label ID="lblStatus" runat="server" Text="Status" Font-Size="Medium"></asp:Label>

                <br />
                
                <asp:Label ID="lblOmfattning" runat="server" Text="Omfattning(%)" Font-Size="15px"></asp:Label>
                                
                <br />

                <div id="box7">

                <asp:Label ID="lblAnsvarig" runat="server" Text="Ansvarig" Font-Size="15px"></asp:Label>

                </div>
                </div>
                </div>

            <div id="box4">

                <input id="txtFornamn" type="text" />

                <br />

                <input id="txtEfternamn" type="text" />

                <br />

                <input id="txtStartdatum" type="text" />

                <br />

                <input id="txtSlutdatum" type="text" />

                <br />

                <input id="txtStatus" type="text" readonly />

                <br />

                <input id="txtOmfattning" type="text" />

                <br />

                <input id="txtAnsvarig" type="text" />

            </div>
            </div>
            
           

         <div id="box5">

                <input id="cmdAnsok" onclick="Ansok()" type="button" value="Ansök" />

             &nbsp;

             <input id="cmdVisa" onclick="VisaLista()" type="button" value="Visa alla ansökningar" />

             <input id="hidRowID" type="hidden" />

            </div>


        <div id="box2" style="margin-left: 300px; margin-top: -277px;">

            <div id="box9">

            <asp:Label ID="lblSemesterAnsok" runat="server" Text="Semester ansökningar" Font-Size="Large"></asp:Label>

            &nbsp; &nbsp; &nbsp;

            <asp:Label ID="lblSokDatum" runat="server" Text="Sök via datum" Font-Size="Large"></asp:Label>

            &nbsp;

            <input id="txtSokDatum" type="text" />

            &nbsp;

            <input id="cmdSokDatum" onclick="Sok()" type="button" value="Sök" />

            </div>

            <div id="divAllaItems"></div>

            <br />

            <input id="cmdUpdate" onclick="Update()" type="button" value="Uppdatera" />

            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 

            <input id="cmdTaBort" onclick="TaBort()" type="button" value="Ta bort ansökning" />

        </div>


        <div id="box8">

        <%--<form action="admin.aspx" method="post">


        <input id="cmdAdmin" type="submit" value="Till admin sidan" />

        </form>--%>

            <input id="cmdAdmin" type="button" onclick="Flytta()" value="Till Admin sidan" />

        </div>

        </div>

    <input id="cmdSendEmail" type="button" onclick="SkickaEmail()" value="Skicka Email" />

</asp:Content>
