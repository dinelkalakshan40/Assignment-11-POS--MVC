import {CustomerModel} from"/model/CustomerModel.js";  /*bring in functions, objects, or primitives from another module.*/
import {customers} from "/db/Db.js";



var recordIndex;

/*displaying customer records in a table */
function loadTable() {

    $("#customer-tbl-body").empty(); /* remove all child elements*/

    customers.map((item, index) => { /*current element being processed in the array (customers), */
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

    var customerId = $('#customer-id').val(); /* get the current value of the  element*/
    var customerName = $('#customer-name').val();
    var customerAddress = $('#customer-address').val();
    var customerSalary = $('#customer-salary').val();

    if (!/^CID-00\d*$/.test(customerId)) { /* test:match in a string*/
        alert("customer id Invalid");
      //  $('#customerIdAlert').html("Please enter a valid customer ID in the CID-001 format (e.g., CID-01)."); // Show alert under the input field
        return;
    }
    if (!/^[a-zA-Z]{4,}$/.test(customerName)) { /*check string of customerName*/
        alert("Customer Name Invalid.");
        return;
    }
    if (!/^No:[a-zA-Z]{4,}$/.test(customerAddress)){
        alert("Customer Address Invalid");
        return;
    }
    if (!/^\d{4,5}\.00$/.test(customerSalary)) {
        alert("Customer Salary Invalid. It should be in the format of 4 or 5 digits followed by '.00'.");
        return;
    }


    let customerModel =new  CustomerModel(customerId,customerName,customerAddress,customerSalary);

    let customer = { /*Create a Customer Object*/
        id: customerId,
        name: customerName,
        address: customerAddress,
        salary: customerSalary,
    }

    customers.push(customer);

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

        $('#customerIdAlert').html("Please enter a valid ID in the format  CID-00").css("color", "red"); // Show alert in red color under the input field

});

$("#customer-name").focus(() => {
    const customerName = $('#customer-name').val();

        $('#customerNameAlert').html("Name should have at least 4 characters").css("color", "red");

});

$("#customer-address").focus(() => {
    const customerAddress = $('#customer-address').val();

        $('#customerAddressAlert').html("Address start on No:").css("color", "red");

});

$("#customer-salary").focus(() => {
    const customerSalary = $('#customer-salary').val();

        $('#customerSalaryAlert').html("Customer Salary format of 4 or 5 digits followed by '.00'.").css("color", "red");

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


/*clear action*/
$('#customer-clear-btn').click(function() {
    $('#customer-id').val('');
    $('#customer-name').val('');
    $('#customer-address').val('');
    $('#customer-salary').val('');
});

