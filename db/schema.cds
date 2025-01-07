using {cuid,managed} from '@sap/cds/common';

namespace sap.capire.so;

/**
* Incidents created by Customers.
*/
entity SalesOrder : cuid, managed {
        ebeln  : String(10);
        type   : String(2);
        bukrs  : String(4);
        status : String(2);
        items  : Composition of many {
                     key ID: UUID;
                         ebeln     : String(10);
                         ebelp     : String(10);
                         matnr     : String(40);
                         des       : String(80);
                         plant     : String(5);
                         lgort     : String(3);
                         timestamp : type of managed : createdAt;
                 };
}
