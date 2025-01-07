// sap.ui.define([
//     "sap/m/MessageToast"
// ], function(MessageToast) {
//     'use strict';

//     return {
//         UploadExcel: function(oEvent) {
//             MessageToast.show("Custom handler invoked.");
//             debugger;
//             //Header
//             //ebeln
//             this.byId("ns.salesorder::IncidentsObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::ebeln::Field-edit").setValue("221");
//             //type
//             this.byId("ns.salesorder::IncidentsObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::type::Field-edit").setValue("a");
//             //bukrs
//             this.byId("ns.salesorder::IncidentsObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::bukrs::Field-edit").setValue("a");
//             //status
//             this.byId("ns.salesorder::IncidentsObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::status::Field-edit").setValue("a");
//             //Item
//             this._view.byId("ns.salesorder::IncidentsObjectPage--fe::table::items::LineItem::i18nSalesOrderItem-innerTable").getBinding('items').create({});
//         }
//     };
// });
sap.ui.define([
    "sap/ui/core/mvc/ControllerExtension",
    "sap/ui/core/Fragment",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
],
    function (
        ControllerExtension,
        Fragment,
        MessageToast,
        JSONModel
    ) {
        "use strict";
        function _createUploadController(oExtensionAPI, Entity) {
            var oUploadDialog;
            var self;
            return {
                onInit: function () {
                    debugger;
                    self = this;

                },

                /*
                 * Batching mport data from Excel file
                 */
                onBatchUpload: function (oEvent) {
                    var oFile = oEvent.getSource().oFileUpload.files[0];
                    var iLine = 2;
                    var aColumnSheet = [
                        [
                            "ebeln",
                            "type",
                            "bukrs",
                            "status",
                            "ebeln",
                            "matnr",
                            "des",
                            "plant",
                            "lgort"
                        ],
                        [
                            "zbh_id",
                            "zbhtj_nr",
                            "zbhtj_txt"
                        ]
                    ];
                    var Oview = oEvent.getSource().getParent().getParent().getParent().getParent();
                    this.importExcel(Oview,oFile, iLine, aColumnSheet);
                },

                importExcel: function (Oview,oFile, sline, aColumnSheet) {
                    sap.ui.core.BusyIndicator.show(0);
                    if (oFile && window.FileReader) {
                        var reader = new FileReader();
                        var result = [],
                            data;
                        var that = this;
                        debugger;
                        reader.onload = function (e) {
                            data = e.target.result;
                            var wb = XLSX.read(data, {
                                type: 'binary'
                            });
                            wb.SheetNames.forEach(function (sheetName, index) {
                                var opts = [];
                                var sheet = wb.Sheets[sheetName];
                                var str = sheet["!ref"];
                                var st2 = str.split(":");
                                st2[0] = "A" + sline;
                                opts.range = sheet["!ref"] = st2[0] + ":" + st2[1];
                                if (aColumnSheet.length > 0) {
                                    opts.header = aColumnSheet[index];
                                } else {
                                    opts.header = "A";
                                }
                                var roa = XLSX.utils.sheet_to_row_object_array(sheet, opts);
                                if (roa.length > 0) {
                                    result.push(roa);
                                }
                            });
                        };
                        reader.readAsBinaryString(oFile);
                        reader.onloadend = function (e) {
                            that.result = result;
                            var aHead = {};
                            var aItem = [];
                            result.forEach(function (item, index) {
                                var JSONString = JSON.stringify(item);
                                var JSONObject = JSON.parse(JSONString);
                                for (var i = 0; i < JSONObject.length; i++) {
                                    if (index === 0) {
                                        aHead = {
                                            ebeln: JSONObject[i].ebeln, 
                                            type: JSONObject[i].type,
                                            bukrs: JSONObject[i].bukrs,
                                            status: JSONObject[i].status,
                                        },
                                        aItem.push({
                                            ebeln: JSONObject[i].ebeln, 
                                            ebelp: JSONObject[i].ebelp,
                                            matnr: JSONObject[i].matnr,
                                            des: JSONObject[i].des, 
                                            plant: JSONObject[i].plant,
                                            lgort: JSONObject[i].lgort
                                        });
                                    }
                                }
                            });
                            debugger;
                            var oImportData = {
                                HeadSet: aHead,
                                ItemSet: aItem
                            };

            Oview.byId("ns.salesorder::IncidentsObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::ebeln::Field-edit").setValue(aHead.ebeln);
            //type
            Oview.byId("ns.salesorder::IncidentsObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::type::Field-edit").setValue(aHead.type);
            //bukrs
            Oview.byId("ns.salesorder::IncidentsObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::bukrs::Field-edit").setValue(aHead.bukrs);
            //status
            Oview.byId("ns.salesorder::IncidentsObjectPage--fe::FormContainer::GeneratedFacet1::FormElement::DataField::status::Field-edit").setValue(aHead.status);
            //Item
            Oview.byId("ns.salesorder::IncidentsObjectPage--fe::table::items::LineItem::i18nSalesOrderItem-innerTable").getBinding('items').create(aItem);

                        };
                    }
                },

                onCloseDialog: function (oEvent) {
                    oEvent.getSource().getParent().close();
                },

                // This function uploads a CSV file with book data to a table in a Fiori Elements application.
                onUploadData: function (oEvent) {
                    // If the object with the load records is not undefined, the object is read and the entries are created
                    if (this.oFileData != undefined) {
                        var Oview = oEvent.getSource().getParent().getParent();
                        var oBinding = Oview.byId("ns.exceluplod::IncidentsList--fe::table::Incidents::LineItem-innerTable").getBinding('items')
                        var aEntries = [];

                        oBinding.create({
                            "title": "abcd",
                            "conversation": [{ 'message': "right" }, { 'message': "right2" }]
                        });
                        debugger;
                        oBinding.aContexts.forEach(function (oRecord) {
                            if (oRecord.sPath.indexOf("IsActiveEntity=false") !== -1) {
                                var draftActivateUrl = this.getView().getModel().sServiceUrl +
                                    oRecord.sPath +
                                    "/CatalogService.draftActivate?$select=HasActiveEntity,HasDraftEntity,ID,IsActiveEntity,stock,title&$expand=DraftAdministrativeData($select=DraftIsCreatedByMe,DraftUUID,InProcessByUser)";

                                // Make an AJAX request to activate the draft entry
                                $.ajax({
                                    headers: {
                                        Accept: "application/json;odata.metadata=minimal;IEEE754Compatible=true",
                                        "Accept-Language": "en-US",
                                        Prefer: "handling=strict",
                                        "Content-Type": "application/json;charset=UTF-8;IEEE754Compatible=true",
                                    },
                                    url: draftActivateUrl,
                                    type: "POST",
                                    success: function () {
                                        this.iCompleted++;
                                    }.bind(this),
                                    error: function (error) {
                                        console.log(`Error ${error}`);
                                    }.bind(this),
                                });
                                this.iItems++;
                            }
                        }.bind(this));
                    } else {
                        var msgNonFileSelect = this.getView()
                            .getModel("i18n")
                            .getResourceBundle()
                            .getText("msgNonFileSelect");
                        MessageToast.show(msgNonFileSelect);
                    }
                },

                handleFiles: function (oEvent) {
                    var oModelContentCsv = new JSONModel();
                    var oFileToRead = oEvent.getParameters().files["0"];
                    var reader = new FileReader();
                    var loadHandler = function (oEvent) {
                        var csv = oEvent.target.result,
                            allTextLines = csv.split(/\r\n|\n/),
                            lines = [];
                        for (var i = 0; i < allTextLines.length; i++) {
                            var data = allTextLines[i].split(";"),
                                tarr = [];
                            for (var j = 0; j < data.length; j++) {
                                tarr.push(data[j]);
                            }
                            lines.push(tarr);
                        }
                        lines.splice(-1);
                        oModelContentCsv.setData(lines);
                        this.oFileData = oModelContentCsv.oData;
                    }.bind(this);

                    var errorHandler = function (evt) {
                        if (evt.target.error.name == "NotReadableError") {
                            var msgErrorRead = this.getView()
                                .getModel("i18n")
                                .getResourceBundle()
                                .getText("msgErrorRead");
                            MessageToast.show(msgErrorRead);
                        }
                    }.bind(this);

                    reader.readAsText(oFileToRead);

                    // Handle errors load
                    reader.onload = loadHandler;
                    reader.onerror = errorHandler;
                },

            };
        };

        return {
            UploadExcel: function () {
                this.loadFragment({
                    id: 'excelUploadDialog',
                    name: "ns.salesorder.ext.view.uploadDialog",
                    controller: _createUploadController(this, 'Students')
                }).then(function (oDialog) {
                    oDialog.open();
                });
            },

        };
    });
