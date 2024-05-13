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
                <td class="item-code-value">${item.Code}</td>
                <td class="item-name-value">${item.Name}</td>
                <td class="item-price-value">${item.Price}</td>
                <td class="item-qty-value">${item.Qty}</td>
                
            </tr>`;
        $("#item-tbl-body").append(record);
    });
}

$('#item-search-btn').click(() => {
    const itemCode = $('#search-item-code').val(); // Assuming your input field has id "search-customer-id"
    const foundItem = items.find(item => item.Code === itemCode);

    if (foundItem) {
        $("#item-tbl-body").empty(); // Clear existing table
        let record = `<tr>
            <td class="item-code-value">${foundItem.Code}</td>
            <td class="item-name-value">${foundItem.Name}</td>
            <td class="item-price-value">${foundItem.Price}</td>
            <td class="item-qty-value">${foundItem.Qty}</td>
        </tr>`;
        $("#item-tbl-body").append(record); // Append the found customer to the table
    } else {
        alert("Item not found!"); // Show an alert if customer not found
    }
});

$('#item-cancel-btn').click(() => {
    loadTable();
});


$('#item-add-btn').on('click',()=> {
    var itemCode =$('#item-code').val();
    var itemName =$('#item-name').val();
    var itemPrice =$('#item-price').val();
    var itemQty =$('#item-qty').val();

    if (!/^C-00\d*$/.test(itemCode)) {
        alert("Item code Invalid");
        return;
    }
    if (itemName.length < 4){
        alert("Item Name Invalid");
        return;
    }
    if (!/^\d{1,5}\.00$/.test(itemPrice)){
        alert("Item Price Invalid");
        return;
    }
    if (!/^\d{1,4}$/.test(itemQty)){
        alert("Item Qty Invalid");
        return;
    }

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
$("#item-code").focus(() => {
    const itemCode = $('#item-code').val();

    // Validate customer ID using CID-001 pattern
    if (!/^C-00\d*$/.test(itemCode)) {
        $('#itemCodeAlert').html("Please enter a valid Code in the format  C-00").css("color", "red"); // Show alert in red color under the input field
    } else {
        $('#itemCodeAlert').html("").css("color", ""); // Clear the alert message if the ID format is valid
    }
});

$("#item-name").focus(() => {
    const itemName = $('#item-name').val();


    if (itemName.length < 4) {
        $('#itemNameAlert').html("Item-Name should have at least 4 characters").css("color", "red");
    } else {
        $('#itemNameAlert').html("").css("color", "");
    }
});

$("#item-price").focus(() => {
    const itemPrice = $('#item-price').val();


    if (!/^\d{1,5}\.00$/.test(itemPrice)) {
        $('#itemPriceAlert').html("item Price end .00").css("color", "red");
    } else {
        $('#itemNameAlert').html("").css("color", "");
    }
});

$("#item-qty").focus(() => {
    const itemQty = $('#item-qty').val();


    if (!/^\d{1,4}$/.test(itemQty)) {
        $('#itemQtyAlert').html("item Qty should between 1-4 ").css("color", "red");
    } else {
        $('#itemQtyAlert').html("").css("color", "");
    }
});

$('#item-update-btn').on('click',() => {
    var itemId = $('#item-code').val();
    var itemName = $('#item-name').val();
    var itemPrice = $('#item-price').val();
    var itemQty = $('#item-qty').val()



    let itemObj = items[recordIndex];

    itemObj.Code = itemId;
    itemObj.Name = itemName;
    itemObj.Price = itemPrice;
    itemObj.Qty = itemQty;


    localStorage.setItem('item', JSON.stringify(items));
    loadTable();

    $('#item-code').val('');
    $('#item-name').val('');
    $('#item-price').val('');
    $('#item-qty').val('');

    alert("Item updated");


});

$('#item-tbl-body').on('click','tr',function () {
    var index = $(this).index(); /*this will return the current cash status*/
    recordIndex = index; /*to store the index number of the table*/

    var Code = $(this).find(".item-code-value").text();
    var Name = $(this).find(".item-name-value").text();
    var Price = $(this).find(".item-price-value").text();
    var Qty = $(this).find(".item-qty-value").text();

    console.log("clicked","Index :",index);

    $('#item-code').val(Code);
    $('#item-name').val(Name);
    $('#item-price').val(Price);
    $('#item-qty').val(Qty);


});

$('#item-delete-btn').on('click', (event) => {
    event.preventDefault(); // Prevent default form submission or button behavior

    if (recordIndex >= 0 && recordIndex < items.length) {
        items.splice(recordIndex, 1);

        localStorage.setItem('item', JSON.stringify(items));


        loadTable(); // Reload the table data after deletion

        $('#item-code').val('');
        $('#item-name').val('');
        $('#item-price').val('');
        $('#item-qty').val('');

        alert("Item deleted");
    } else {
        console.error('Invalid recordIndex or error.');
    }
});

document.getElementById('item-clear-btn').addEventListener('click',function (){

    document.getElementById("item-code").value='';
    document.getElementById("item-name").value='';
    document.getElementById("item-price").value='';
    document.getElementById("item-qty").value='';
});