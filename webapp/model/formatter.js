sap.ui.define([], function () {
	"use strict";
	return {

		OperationType: function (sType) {
			return sType ? "sap-icon://arrow-top" : "sap-icon://arrow-bottom";
		}

	};
});