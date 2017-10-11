sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/GroupHeaderListItem",
	"banking/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, GroupHeaderListItem, formatter, Filter, FilterOperator) {
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
		
		onFilterOperations : function (oEvent) {
			
			/* SEARCH WHEN ENTER IS PUSHED*/
			/*
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}
			
			var oList = this.getView().byId("OperationList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
			*/
			
			/* COMPLETE LIVE SEARCH */
			var data = oEvent.getSource().getValue();
			var oFilter = new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, data);
			var oElement = this.getView().byId("OperationList");
			var oBinding = oElement.getBinding("items");
			oBinding.filter([oFilter]);
 
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
