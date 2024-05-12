export class ItemModel{
    constructor(Code,Name,Price,Qty) {
        this._Code=Code;
        this._Name=Name;
        this._Price=Price;
        this._Qty=Qty;
    }

    get Code() {
        return this._Code;
    }

    set Code(value) {
        this._Code = value;
    }

    get Name() {
        return this._Name;
    }

    set Name(value) {
        this._Name = value;
    }

    get Price() {
        return this._Price;
    }

    set Price(value) {
        this._Price = value;
    }

    get Qty() {
        return this._Qty;
    }

    set Qty(value) {
        this._Qty = value;
    }
}