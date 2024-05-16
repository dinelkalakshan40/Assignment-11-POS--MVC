import {customers,items,Orders} from "/db/Db.js";

import {PlaceOrderModel} from "/model/PlaceOrderModel.js";

let CustomerIndexElement;
let ItemIndexElement;

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
       //selectedOption.text(selectedCustomerId);

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



