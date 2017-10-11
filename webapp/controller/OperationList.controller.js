sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/GroupHeaderListItem',
	"banking/model/formatter"
], function(Controller, JSONModel, GroupHeaderListItem, formatter) {
	"use strict";

	return Controller.extend("banking.controller.OperationList", {
		formatter: formatter,
		
		onInit : function () {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},

		getGroupHeader: function (oGroup){
			var formatGroup = !oGroup.key ? "Outcomes" : "Incomes";
			return new GroupHeaderListItem( {
				title: formatGroup,
				upperCase: true
			});
		},
		
		handleDelete: function(oEvent) {
			var oList = oEvent.getSource();
			var oItem = oEvent.getParameter("listItem");
			
			/*	[TO FIX]
				getPath return undefined
			*/
			var sPath = oItem.getBindingContext().getPath();

			// after deletion put the focus back to the list
			oList.attachEventOnce("updateFinished", oList.focus, oList);

			// send a delete request to the odata service
			this.getView().getModel("operation").remove(sPath);
		}

	});
});
