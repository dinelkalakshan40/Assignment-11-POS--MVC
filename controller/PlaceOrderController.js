import {customers,items,Orders} from "/db/Db.js";

import {PlaceOrderModel} from "/model/PlaceOrderModel.js";

let CustomerIndexElement;
let ItemIndexElement;

$(document).ready(()=>{

    // Reset the order counter on page load
    localStorage.setItem('orderCounter', 0);

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    $("#orderDate").val(formattedDate);

    const initialOrderId = generateOrderId();
    $("#orderId").val(initialOrderId);

    loadCustomerData();
    loadItemData();
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

/*const calculateItemTotal = () => {
    const itemPrice = parseFloat($("#itemPriceOrder").val()) || 0;
    const orderQty = parseInt($("#OrderQty").val()) || 0;
    const total = itemPrice * orderQty;
    return total;
};*/


const calculateTotal = () => {
    const itemPrice = parseFloat($("#itemPriceOrder").val()) || 0;
    const orderQty = parseInt($("#OrderQty").val()) || 0;
    const total = itemPrice * orderQty;
   // $("#total").val(total.toFixed(2));
    return total;
};

const updateTotal=()=>{
    const currentTotal = parseFloat($("#total").val()) || 0;
    const newItemTotal = calculateTotal();
    const updatedTotal = currentTotal + newItemTotal;
    $("#total").val(updatedTotal.toFixed(2));
}


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

/*$(document).ready(() => {

});*/
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
    loadCustomerData();
    loadItemData();

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

    $("#OrderQty").on('input', () => {
        const orderQty = parseInt($("#OrderQty").val());
        const availableQty = parseInt($("#itemQtyOrder").val());

        if (orderQty > availableQty) {
            alert('Order quantity exceeds available quantity!');
            $("#OrderQty").val(availableQty); // Reset to maximum available quantity

        }
        /*calculateTotal();*/
    });

    $("#AddCartBtn").click(() => {
        const selectedItemCode = $("#itemCodeOrder").val();
        const selectedItemName = $("#itemNameOrder").val();
        const selectedItemPrice = parseFloat($("#itemPriceOrder").val());
        const orderQty = parseInt($("#OrderQty").val());
        const itemTotal = calculateTotal();


        const selectedItem = items.find(item => item.Code == selectedItemCode);
        if (selectedItem) {
            if (orderQty <= selectedItem.Qty) {
                selectedItem.Qty -= orderQty; // Decrease QtyOnHand
                updateItemDataInUI(selectedItemCode, selectedItem.Qty); // Update the UI
                $("#itemQtyOrder").val(selectedItem.Qty); // Update the Qty field in the form
                updateTotal(); // Update total when Add to Cart button is clicked

                const order=new PlaceOrderModel(
                    $("#orderId").val(),
                    $("#orderDate").val(),
                    $("#customerIdOrder").val(),
                    $("#customerNameOrder").val(),
                    $("#customerAddressOrder").val(),
                    $("#customerSalaryOrder").val(),
                    selectedItemCode,
                    selectedItemName,
                    selectedItemPrice,
                    orderQty,
                    itemTotal
                );
                    addItemToCart(order);
            } else {
                alert('Order quantity exceeds available quantity!');
            }
        }
    });

    // Generate a new order ID when the "Place Order" button is clicked
    $("#placeOrderBtn").click(() => {
        const newOrderId = generateOrderId();
        $("#orderId").val(newOrderId);

    });

  //  calculateTotal();

});
const updateItemDataInUI = (itemCode, newQty) => {
    $(`#item-tbl-body tr:has(td[data-item-code="${itemCode}"]) .item-qty-value`).text(newQty);
    const itemSelectOption = $(`#item-select option[value="${itemCode}"]`);
    if (itemSelectOption.length > 0) {
        itemSelectOption.text(`${itemCode} `);
    }
};
const addItemToCart = (order) => {
    const cartRow = `
        <tr>
            <td>${order.ItemCode}</td>
            <td>${order.ItemName}</td>
            <td>${order.ItemPrice.toFixed(2)}</td>
            <td>${order.ItemQty}</td>
            <td>${order.total.toFixed(2)}</td>
        </tr>
    `;
    $("#cart-tbl-body").append(cartRow);
};


