export class PlaceOrderModel{
        constructor(oid,orderDate,CustomerId,CustomerName,CustomerAddress,CustomerSalary,ItemCode,ItemName,ItemPrice,ItemQty,total) {
                this._oid=oid;
                this._orderDate=orderDate;
                this._CustomerName = CustomerName;
                this._CustomerId = CustomerId;
                this._CustomerAddress = CustomerAddress;
                this._CustomerSalary = CustomerSalary;
                this._ItemCode=ItemCode;
                this._ItemName=ItemName;
                this._ItemPrice=ItemPrice;
                this._ItemQty=ItemQty;
                this._total=total;

        }


        get oid() {
                return this._oid;
        }

        set oid(value) {
                this._oid = value;
        }

        get orderDate() {
                return this._orderDate;
        }

        set orderDate(value) {
                this._orderDate = value;
        }

        get CustomerId() {
                return this._CustomerId;
        }

        set CustomerId(value) {
                this._CustomerId = value;
        }

        get CustomerName() {
                return this._CustomerName;
        }

        set CustomerName(value) {
                this._CustomerName = value;
        }

        get CustomerAddress() {
                return this._CustomerAddress;
        }

        set CustomerAddress(value) {
                this._CustomerAddress = value;
        }

        get CustomerSalary() {
                return this._CustomerSalary;
        }

        set CustomerSalary(value) {
                this._CustomerSalary = value;
        }

        get ItemCode() {
                return this._ItemCode;
        }

        set ItemCode(value) {
                this._ItemCode = value;
        }

        get ItemName() {
                return this._ItemName;
        }

        set ItemName(value) {
                this._ItemName = value;
        }

        get ItemPrice() {
                return this._ItemPrice;
        }

        set ItemPrice(value) {
                this._ItemPrice = value;
        }

        get ItemQty() {
                return this._ItemQty;
        }

        set ItemQty(value) {
                this._ItemQty = value;
        }

        get total() {
                return this._total;
        }

        set total(value) {
                this._total = value;
        }
}