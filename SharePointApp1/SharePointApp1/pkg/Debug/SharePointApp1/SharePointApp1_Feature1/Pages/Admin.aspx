<%@ Page language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />

   <%-- CSS--%>
    <link rel="Stylesheet" type="text/css" href="../Content/AdminSida.css" />
    <link rel="stylesheet" href="../content/jqx.base.css" type="text/css" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.3/themes/smoothness/jquery-ui.css" />



    <%--Scripts--%>
    
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="../_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="../_layouts/15/sp.js"></script>
    
    <%--<script type="text/javascript" src="../Scripts/App.js"></script>--%>
    <script type="text/javascript" src="../Scripts/AdminSida.js"></script>
    <%--<script type="text/javascript" src="../Scripts/Test.js"></script>--%>
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

<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />

    <div>
        
        <h1>Admin sida</h1>
        
        <div id ="box1">
           
             <div id="box2">

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

                <div id="box4">
                
                <asp:Label ID="lblOmfattning" runat="server" Text="Omfattning(%)" Font-Size="15px"></asp:Label>

                </div>
                                
                <br />


                <div id="box7">

                <asp:Label ID="lblAnsvarig" runat="server" Text="Ansvarig" Font-Size="15px"></asp:Label>

                </div>

         </div>
         </div>

                <div id="box3">

                <input id="txtFornamn" type="text" />

                <br />

                <input id="txtEfternamn" type="text" />

                <br />

                <input id="txtStartDatum" type="text" />

                <br />

                <input id="txtSlutDatum" type="text" />

                <br />

                    <select id="ddlStatus">
                        <option>Behandlas</option>
                        <option>Beviljad</option>
                        <option>Avslagen</option>
                    </select>

                <br />

                <input id="txtOmfattning" type="text" />

                <br />

                <input id="txtAnsvarig" type="text" />

         </div>


         <div id="box5">

             <h2>Ansökningar</h2>


             <div id="divAllaItems"></div>

         </div>

        <div id="box8">

            <input id="cmdUpdate" onclick="Update()" type="button" value="Uppdatera" />

            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 

            <input id="cmdTaBort" onclick="TaBort()" type="button" value="Ta bort"/>


            <br />
            <br />

            <input id="cmdTillbaka" onclick="Tillbaka()" type="button" value="Tillbaka" />

            <br />

            <input id="hidRowID" type="hidden" />

        </div>

         </div>

    </div>

</asp:Content>
