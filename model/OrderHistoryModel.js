export class OrderHistoryModel {
    constructor(orderId, orderDate, customerName, customerId, itemCode, itemName) {
        this._orderId = orderId;
        this._orderDate = orderDate;
        this._customerName = customerName;
        this._customerId = customerId;
        this._itemCode = itemCode;
        this._itemName = itemName;
    }

    get orderId() {
        return this._orderId;
    }

    get orderDate() {
        return this._orderDate;
    }

    get customerName() {
        return this._customerName;
    }

    get customerId() {
        return this._customerId;
    }

    get itemCode() {
        return this._itemCode;
    }

    get itemName() {
        return this._itemName;
    }
}
