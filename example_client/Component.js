sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel"
], function(UIComponent, JSONModel, ODataModel) {
    "use strict";
    return UIComponent.extend("ch.soinwi.example.Component", {
        metadata: {
            rootView: "ch.soinwi.example.App"
        },

        init: function() {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            
            
            this.peopleModel = new ODataModel("https://node-simple-odata-server-soinwi.c9.io/odata", {useBatch: false, json: true} );
            
            
            this.peopleModel.attachEvent('requestSent', null, function(e){
               alert("request sent"); 
            });
            

            //this.peopleModel = new ODataModel("proxy/http/services.odata.org/V2/OData/OData.svc");
            this.setModel(this.peopleModel, "users");
            
            //var md = this.peopleModel.getMetadata();
            
            
        }
    });
});