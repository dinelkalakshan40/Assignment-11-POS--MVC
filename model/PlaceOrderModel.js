export class PlaceOrderModel{
        constructor(id,name,address,salary) {
                this._oid=oid;
                this._orderDate=orderDate;
                this._CustomerID = CustomerId;
                this._customerName = customerName;
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

        get CustomerID() {
                return this._CustomerID;
        }

        set CustomerID(value) {
                this._CustomerID = value;
        }

        get customerName() {
                return this._customerName;
        }

        set customerName(value) {
                this._customerName = value;
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