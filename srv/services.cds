using { sap.capire.so as my } from '../db/schema';

service SalesOrderService { 
    entity Incidents as projection on my.SalesOrder;
}

annotate SalesOrderService.Incidents with @odata.draft.enabled; 