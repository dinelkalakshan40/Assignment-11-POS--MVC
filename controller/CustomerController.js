import {CustomerModel} from"/model/CustomerModel.js";
import {customers} from "/db/Db.js";



var recordIndex;

$(document).ready(() => {

    const storedCustomers = JSON.parse(localStorage.getItem('customer'));
    if (storedCustomers && Array.isArray(storedCustomers)) {
        // Update the customers array with local storage data
        customers.push(...storedCustomers);
        loadTable(); // Load table with existing data
    }
    /*if (localStorage.getItem('customer')) {
        customers = JSON.parse(localStorage.getItem('customer'));
        loadTable();
    }*/
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
$("#customer-add-btn").on('click', () => {

    var customerId = $('#customer-id').val();
    var customerName = $('#customer-name').val();
    var customerAddress = $('#customer-address').val();
    var customerSalary = $('#customer-salary').val();

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

    $("#customer-clear-btn").click();
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
    $('#customer-clear-btn').click();
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


