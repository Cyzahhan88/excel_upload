using SalesOrderService as service from '../../srv/services';
using from '../../db/schema';

annotate service.Incidents with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'ebeln',
                Value : ebeln,
            },
            {
                $Type : 'UI.DataField',
                Label : 'type',
                Value : type,
            },
            {
                $Type : 'UI.DataField',
                Label : 'bukrs',
                Value : bukrs,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status',
                Value : status,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>SalesOrderItem}',
            ID : 'i18nSalesOrderItem',
            Target : 'items/@UI.LineItem#i18nSalesOrderItem',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'ebeln',
            Value : ebeln,
        },
        {
            $Type : 'UI.DataField',
            Label : 'type',
            Value : type,
        },
        {
            $Type : 'UI.DataField',
            Label : 'bukrs',
            Value : bukrs,
        },
        {
            $Type : 'UI.DataField',
            Label : 'status',
            Value : status,
        },
    ],
);

annotate service.Incidents.items with @(
    UI.LineItem #i18nSalesOrderItem : [
        {
            $Type : 'UI.DataField',
            Value : ebelp,
            Label : 'SO No',
        },
        {
            $Type : 'UI.DataField',
            Value : ebeln,
            Label : 'So Item',
        },
        {
            $Type : 'UI.DataField',
            Value : matnr,
            Label : 'material',
        },
        {
            $Type : 'UI.DataField',
            Value : des,
            Label : 'description',
        },
        {
            $Type : 'UI.DataField',
            Value : plant,
            Label : 'factory',
        },
        {
            $Type : 'UI.DataField',
            Value : lgort,
            Label : 'location',
        },
    ]
);

