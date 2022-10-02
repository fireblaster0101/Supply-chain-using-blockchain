import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace com.boanntech.supplychain.network{
   export class Trace {
      timestamp: Date;
      location: Address;
      company: Trader;
   }
   export class PO extends Asset {
      orderID: string;
      itemList: Commodity[];
      orderTotalPrice: number;
      orderStatus: OrderStatus;
      orderer: Trader;
      vendor: Trader;
   }
   export class Commodity extends Asset {
      commodityID: string;
      name: string;
      description: string;
      quantity: number;
      unitPrice: number;
      totalPrice: number;
      trace: Trace[];
      purchaseorder: PO;
      owner: Trader;
      issuer: Trader;
   }
   export enum OrderStatus {
      INITIATED,
      CONFIRMED,
      DELIVERING,
      DELIVERED,
   }
   export class Address {
      longitude: number;
      latitude: number;
      city: string;
      country: string;
      locality: string;
      region: string;
      street: string;
      postalCode: string;
      postOfficeBoxNumber: string;
   }
   export abstract class Trader extends Participant {
      companyName: string;
      address: Address;
   }
   export class Supplier extends Trader {
      tradeID: string;
   }
   export class Manufacturer extends Trader {
      tradeID: string;
   }
   export class Distributer extends Trader {
      tradeID: string;
   }
   export class Retailer extends Trader {
      tradeID: string;
   }
   export class Customer extends Trader {
      tradeID: string;
   }
   export class InitiatePO extends Transaction {
      orderID: string;
      itemList: Commodity[];
      orderTotalPrice: number;
      orderer: Trader;
      vendor: Trader;
   }
   export class TransferCommodity extends Transaction {
      commodity: Commodity;
      newOwner: Trader;
      issuer: Trader;
      purchaseOrder: PO;
      shipperLocation: Address;
   }
// }
