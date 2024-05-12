import {ItemModel} from "/model/ItemModel.js";
import {items} from "/db/Db.js";


var recordIndex;

$(document).ready(() => {

    const storedItems = JSON.parse(localStorage.getItem('item'));
    if (storedItems && Array.isArray(storedItems)) {
        // Update the items array with local storage data
        items.push(...storedItems);
        loadTable();
        // Load table with existing data
    }
});

function loadTable() {

    $("#item-tbl-body").empty();

    items.map((item, index) => {
        let record = `<tr>
                <td class="item-id-value">${item.Code}</td>
                <td class="item-name-value">${item.Name}</td>
                <td class="item-Address-value">${item.Price}</td>
                <td class="item-salary-value">${item.Qty}</td>
                
            </tr>`;
        $("#item-tbl-body").append(record);
    });
}
$('#item-add-btn').on('click',()=> {
    var itemCode =$('#item-code').val();
    var itemName =$('#item-name').val();
    var itemPrice =$('#item-price').val();
    var itemQty =$('#item-qty').val();

    let itemModel = new ItemModel(itemCode,itemName,itemPrice,itemQty);

    let item = {
        Code:itemCode,
        Name:itemName,
        Price:itemPrice,
        Qty:itemQty,
    }
    items.push(item);
    localStorage.setItem('item',JSON.stringify(items));
    loadTable();

    $('#item-code').val('');
    $('#item-name').val('');
    $('#item-price').val('');
    $('#item-qty').val('');

    alert("item Saved");
});