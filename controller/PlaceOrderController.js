import {customers,items,Orders} from "/db/Db.js";

import {PlaceOrderModel} from "/model/PlaceOrderModel.js";

let CustomerIndexElement;
let ItemIndexElement;

$(document).ready(()=>{
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    $("#orderDate").val(formattedDate);

    const initialOrderId = generateOrderId();
    $("#orderId").val(initialOrderId);
});

const generateOrderId = () => {
    let orderCounter = localStorage.getItem('orderCounter');
    if (!orderCounter) {
        orderCounter = 1;
    } else {
        orderCounter = parseInt(orderCounter) + 1;
    }
    localStorage.setItem('orderCounter', orderCounter);

    const orderId = `OID-${String(orderCounter).padStart(3, '0')}`;
    return orderId;
};


const loadCustomerData = () =>{
    $("#customer-tbl-body").empty();
    $("#customer-select").empty();



    customers.forEach(customer=> {
        let record = `<tr>
        <td class='customer-id-value' data-customer-id="${customer.id}">${customer.id}</td>
        <td class='customer-name-value'>${customer.name}</td>
        <td class='customer-address-value'>${customer.address}</td>
        <td class='customer-salary-value'>${customer.salary}</td>
        </tr>`;
        $("#customer-tbl-body").append(record);


        $("#customer-select").append(`<option value="${customer.id}">${customer.id}</option>`);

    });

    $("#customer-select").val($("#customerIdOrder").val()); // Set selected value based on customerIdOrder

};

$(document).ready(() => {
    loadCustomerData();

    $("#customer-select").change(() => {
        const selectedCustomerId = $("#customer-select").val();
        const selectedCustomer = customers.find(customer => customer.id == selectedCustomerId);
        if (selectedCustomer) {
            $("#customerIdOrder").val(selectedCustomer.id);
            $("#customerNameOrder").val(selectedCustomer.name);
            $("#customerAddressOrder").val(selectedCustomer.address);
            $("#customerSalaryOrder").val(selectedCustomer.salary);

        } else {
            console.error(`Customer with ID ${selectedCustomerId} not found.`);
            // Handle the error appropriately (e.g., display a message to the user)
        }


    });

    const displayedCustomerId = $("#customerIdOrder").val();
    $("#customer-select").val(displayedCustomerId);

    // Show all customer IDs when clicking the select dropdown
    $("#customer-select").click(() => {
        const showId=$("#customerIdOrder").val();
        $("#customer-select").val(showId);
        loadCustomerData();
    });
    const defaultCustomerId = customers.length > 0 ? customers[0].id : null;
    if (defaultCustomerId) {
        $("#customer-select").val(defaultCustomerId);
    }

});
/*================================================================================================*/

const loadItemData = () =>{
    $("#item-tbl-body").empty();
    $("#item-select").empty();



    items.forEach(item=> {
        let record = `<tr>
        <td class='item-code-value' data-item-Code="${item.Code}">${item.Code}</td>
        <td class='item-name-value'>${item.Name}</td>
        <td class='item-price-value'>${item.Price}</td>
        <td class='item-qty-value'>${item.Qty}</td>
        </tr>`;
        $("#item-tbl-body").append(record);


        $("#item-select").append(`<option value="${item.Code}">${item.Code}</option>`);

    });

    $("#item-select").val($("#itemCodeOrder").val()); // Set selected value based on customerIdOrder

};

$(document).ready(() => {
    loadItemData();

    $("#item-select").change(() => {
        const selectedItemCode = $("#item-select").val();
        const selectedItem = items.find(item => item.Code == selectedItemCode);
        if (selectedItem) {
            $("#itemCodeOrder").val(selectedItem.Code);
            $("#itemNameOrder").val(selectedItem.Name);
            $("#itemPriceOrder").val(selectedItem.Price);
            $("#itemQtyOrder").val(selectedItem.Qty);

        } else {
            console.error(`Item with code ${selectedItemCode} not found.`);
            // Handle the error appropriately (e.g., display a message to the user)
        }


    });

    const displayedItemCode = $("#itemCodeOrder").val();
    $("#item-select").val(displayedItemCode);

    // Show all customer IDs when clicking the select dropdown
    $("#item-select").click(() => {
        const showCode=$("#itemCodeOrder").val();
        $("#item-select").val(showCode);
        loadItemData();
    });
    const defaultItemCode = items.length > 0 ? items[0].Code : null;
    if (defaultItemCode) {
        $("#item-select").val(defaultItemCode);
    }

});

