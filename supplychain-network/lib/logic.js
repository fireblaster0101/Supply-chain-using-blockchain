/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/**
 * Initiate PO From One Trader To Another
 * @param { com.boanntech.supplychain.network.InitiatePO} InitiatePO - The InitiatePO is to be processed
 * @transaction
 */
function initiatePurchaseOrder(InitiatePO) {

    //Add Log
    console.log("initiatePurchaseOrder - Start Initiate PO Function");

    //Create factory
    var factory = getFactory();

    //Add namespace variable to save time
    var NS = 'com.boanntech.supplychain.network';

    //Declare variable to get participant who called transaction 
    var me = getCurrentParticipant();

    //Use factory to create new order asset
    var order = factory.newResource(NS, 'PO', InitiatePO.orderID);
    order.itemList = InitiatePO.itemList;

    if (InitiatePO.orderTotalPrice) {
        order.orderTotalPrice = InitiatePO.orderTotalPrice;
    }
    order.orderStatus = INITIATED;

    order.orderer = me;
    order.vendor = InitiatePO.vendor;

    //Store new asset in the asset registry

    return getAssetRegistry(order.getFullyQualifiedType()).then(function (assetRegistry) {
        return assetRegistry.add(order)
    });
}

/**
 * Track the transer of commoditity from one trader to another
 * @param { com.boanntech.supplychain.network.TransferCommodity} TransferCommodity- The TransferCommodity is to be processed
 * @transaction
 */
function transferCommodity(TransferCommodity) {
    //Add Log
    console.log("transferCommodity - Start Transer of Commoditity Function");

    //Add namespace variable to save time
    var NS = 'com.boanntech.supplychain.network';

    //Declare variable to get participant who called transaction 
    var me = getCurrentParticipant();

    TransferCommodity.commodity.issuer = me;
    TransferCommodity.commodity.owner = TransferCommodity.newOwner;
    TransferCommodity.commodity.purchaseOrder = TransferCommodity.purchaseOrder;

    //Create factory for trace type
    var traceFactory = getFactory();

    var newTrace = traceFactory.newConcept(NS, 'Trace');

    newTrace.timestamp = new Date();
    newTrace.location = TransferCommodity.shipperLocation;
    newTrace.company = me;

    TransferCommodity.commodity.trace.push(newTrace);

    return getAssetRegistry('com.boanntech.supplychain.network').then(function (assetRegistry) {
        return assetRegistry.update(TransferCommodity.commodity);
    });

}
