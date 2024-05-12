import {CustomerModel} from"/model/CustomerModel.js";
import {customers} from "/db/Db.js";



var recordIndex;

$(document).ready(() => {

    const storedCustomers = JSON.parse(localStorage.getItem('customer'));
    if (storedCustomers && Array.isArray(storedCustomers)) {
        // Update the customers array with local storage data
        customers.push(...storedCustomers);
        loadTable();
        // Load table with existing data
    }
    /*let customerId = generateCustomerId();
    $('#customer-id').val(customerId);*/

});
function loadTable() {

    $("#customer-tbl-body").empty();

    customers.map((item, index) => {
        let record = `<tr>
                <td class="customer-id-value">${item.id}</td>
                <td class="customer-name-value">${item.name}</td>
                <td class="customer-Address-value">${item.address}</td>
                <td class="customer-salary-value">${item.salary}</td>
                
            </tr>`;
        $("#customer-tbl-body").append(record);
    });
}



$('#search-customer-btn').click(() => {
    const customerId = $('#search-customer-id').val(); // Assuming your input field has id "search-customer-id"
    const foundCustomer = customers.find(customer => customer.id === customerId);

    if (foundCustomer) {
        $("#customer-tbl-body").empty(); // Clear existing table
        let record = `<tr>
            <td class="customer-id-value">${foundCustomer.id}</td>
            <td class="customer-name-value">${foundCustomer.name}</td>
            <td class="customer-Address-value">${foundCustomer.address}</td>
            <td class="customer-salary-value">${foundCustomer.salary}</td>
        </tr>`;
        $("#customer-tbl-body").append(record); // Append the found customer to the table
    } else {
        alert("Customer not found!"); // Show an alert if customer not found
    }
});

$('#customer-cancel-btn').click(() => {
    loadTable();
});




$("#customer-add-btn").on('click', () => {

    var customerId = $('#customer-id').val();
    var customerName = $('#customer-name').val();
    var customerAddress = $('#customer-address').val();
    var customerSalary = $('#customer-salary').val();

    if (!/^CID-00\d*$/.test(customerId)) {
        alert("customer id Invalid");
      //  $('#customerIdAlert').html("Please enter a valid customer ID in the CID-001 format (e.g., CID-01)."); // Show alert under the input field
        return;
    }
    if (customerName.length < 4) {
        alert("Customer Name Invalid.");
        return;
    }
    if (customerAddress.length < 5){
        alert("Customer Address Invalid");
        return;
    }
    if (!/^\d{4,5}\.00$/.test(customerSalary)) {
        alert("Customer Salary Invalid. It should be in the format of 4 or 5 digits followed by '.00'.");
        return;
    }



    let customerModel =new  CustomerModel(customerId,customerName,customerAddress,customerSalary);

    let customer = {
        id: customerId,
        name: customerName,
        address: customerAddress,
        salary: customerSalary,
    }

    customers.push(customer);

    localStorage.setItem('customer', JSON.stringify(customers));
    loadTable();

    console.log(customers);

    $('#customer-id').val('');
    $('#customer-name').val('');
    $('#customer-address').val('');
    $('#customer-salary').val('');

    alert("Customer Saved");

});

$("#customer-id").focus(() => {
    const customerId = $('#customer-id').val();

    // Validate customer ID using CID-001 pattern
    if (!/^CID-\d{6}$/.test(customerId)) {
        $('#customerIdAlert').html("Please enter a valid ID in the format  CID-00").css("color", "red"); // Show alert in red color under the input field
    } else {
        $('#customerIdAlert').html("").css("color", ""); // Clear the alert message if the ID format is valid
    }
});

$("#customer-name").focus(() => {
    const customerName = $('#customer-name').val();


    if (customerName.length < 4) {
        $('#customerNameAlert').html("Name should have at least 4 characters").css("color", "red");
    } else {
        $('#customerNameAlert').html("").css("color", "");
    }
});

$("#customer-address").focus(() => {
    const customerAddress = $('#customer-address').val();


    if (customerAddress.length < 5) {
        $('#customerAddressAlert').html("Address should have at least 5 characters").css("color", "red");
    } else {
        $('#customerAddressAlert').html("").css("color", "");
    }
});

$("#customer-salary").focus(() => {
    const customerSalary = $('#customer-salary').val();


    if (!/^\d{4,5}\.00$/.test(customerSalary))  {
        $('#customerSalaryAlert').html("Customer Salary format of 4 or 5 digits followed by '.00'.").css("color", "red");
    } else {
        $('#customerSalaryAlert').html("").css("color", "");
    }
});






$('#customer-update-btn').on('click',() => {
    var customerId = $('#customer-id').val();
    var customerName = $('#customer-name').val();
    var customerAddress = $('#customer-address').val();
    var customerSalary = $('#customer-salary').val()



    let customerObj = customers[recordIndex];

    customerObj.id = customerId;
    customerObj.name = customerName;
    customerObj.address = customerAddress;
    customerObj.salary = customerSalary;


    localStorage.setItem('customer', JSON.stringify(customers));
    loadTable();

    $('#customer-id').val('');
    $('#customer-name').val('');
    $('#customer-address').val('');
    $('#customer-salary').val('');

    alert("Customer updated");


});


$('#customer-tbl-body').on('click','tr',function () {
    var index = $(this).index(); /*this will return the current cash status*/
    recordIndex = index; /*to store the index number of the table*/

    var id = $(this).find(".customer-id-value").text();
    var name = $(this).find(".customer-name-value").text();
    var address = $(this).find(".customer-Address-value").text();
    var salary = $(this).find(".customer-salary-value").text();

    console.log("clicked","Index :",index);
    console.log(id);
    console.log(name);
    console.log(address);
    console.log(salary);

    $('#customer-id').val(id);
    $('#customer-name').val(name);
    $('#customer-address').val(address);
    $('#customer-salary').val(salary);


});



$('#customer-delete-btn').on('click', (event) => {
    event.preventDefault(); // Prevent default form submission or button behavior

    if (recordIndex >= 0 && recordIndex < customers.length) {
        customers.splice(recordIndex, 1);

        localStorage.setItem('customer', JSON.stringify(customers));


        loadTable(); // Reload the table data after deletion

        $('#customer-id').val('');
        $('#customer-name').val('');
        $('#customer-address').val('');
        $('#customer-salary').val('');
        alert("Customer deleted");
    } else {
        console.error('Invalid recordIndex or customers array.');
    }
});



document.getElementById('customer-clear-btn').addEventListener('click',function (){

    document.getElementById("customer-id").value='';
    document.getElementById("customer-name").value='';
    document.getElementById("customer-address").value='';
    document.getElementById("customer-salary").value='';
});


