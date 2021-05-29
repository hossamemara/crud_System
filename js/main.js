/*_______________________ Variable Decleration Start _______________________*/





var employees = [];
var currentIndex;

/*_______________________ Variable Decleration End _______________________*/


/*_________________ Code Start Here _________________*/

// Test If Local Storage Have Data
if (JSON.parse(localStorage.getItem("employeeLists")) != null) {
    employees = JSON.parse(localStorage.getItem("employeeLists"))
    displayEmployee();
}


/*_________________ When Click addBtn  Start _________________*/
$('#addBtn').click(function () {
    if ($('#addBtn').html() == '<i class="fas fa-edit"></i> Update') {
        updateEmployee();

    }
    else if ($('#addBtn').html() == '<i class="fas fa-plus"></i> Add Employee ') {


        addEmployee();
        displayEmployee();
        clearForm();

    }
})

/*_________________ When Click addBtn  End _________________*/


/*_________________ addEmployee function Start _________________*/

function addEmployee() {




    var employee =
    {
        employee_Id: $('#employeeId').val(),
        employee_Name: $('#employeeName').val(),
        employee_Salary: $('#employeeSalary').val(),
        employee_Position: $('#employeePosition').val(),
        employee_Department: $('#employeeDepartment').val()

    }
    employees.push(employee);
    localStorage.setItem("employeeLists", JSON.stringify(employees))
    console.log(employees);



}
/*_________________ addEmployee function End _________________*/


/*_________________ displayEmployee function Start _________________*/

function displayEmployee() {

    var employeeContainer = '';
    for (var i = 0; i < employees.length; i++) {
        employeeContainer +=
            `
        <tr>
        <td>${employees[i].employee_Id}</td>
        <td>${employees[i].employee_Name}</td>
        <td>${employees[i].employee_Salary}</td>
        <td>${employees[i].employee_Position}</td>
        <td>${employees[i].employee_Department}</td>
        <td><button class="btn btn-danger" onclick="deleteEmployee(${i})"><i class="far fa-trash-alt"></i></button></td>
        <td><a href="#crud"><button class="btn btn-success" onclick="getEmployeeData(${i})"><i class="fas fa-edit"></i></button></a></td>
        </tr>
                 `
            ;


    }

    $('#employeeData').html(employeeContainer);
    localStorage.setItem("employeeLists", JSON.stringify(employees))


}
/*_________________ displayEmployee function End _________________*/


/*_________________ clearForm function Start _________________*/

function clearForm() {

    $('.form-control').val('');
    $('.form-control').removeClass('is-valid')
    $('.form-control').removeClass('is-invalid')
    $('.alert').addClass('d-none')
    $('.alert').removeClass('d-block')

}
/*_________________ clearForm function End _________________*/



/*_________________ getEmployeeData function Start _________________*/
function getEmployeeData(index) {
    alert('Updating Employee ' + employees[index].employee_Name + ' Data at' + ' Row ' + (index + 1));
    $('#employeeId').val(employees[index].employee_Id);
    $('#employeeName').val(employees[index].employee_Name);
    $('#employeeSalary').val(employees[index].employee_Salary);
    $('#employeePosition').val(employees[index].employee_Position);
    $('#employeeDepartment').val(employees[index].employee_Department);

    localStorage.setItem("employeeLists", JSON.stringify(employees))

    currentIndex = index;

    $('#addBtn').html('<i class="fas fa-edit"></i> Update');

}
/*_________________ getEmployeeData function End _________________*/

/*_________________ deleteEmployee function Start _________________*/
function deleteEmployee(index) {
    alert('Deleting Engineer ' + employees[index].employee_Name + ' Data at' + ' Row ' + (index + 1));
    employees.splice(index, 1);
    displayEmployee();
    localStorage.setItem("employeeLists", JSON.stringify(employees))



}
/*_________________ deleteEmployee function End _________________*/


/*_________________ updateEmployee function Start _________________*/
function updateEmployee() {

    var employee =
    {
        employee_Id: $('#employeeId').val(),
        employee_Name: $('#employeeName').val(),
        employee_Salary: $('#employeeSalary').val(),
        employee_Position: $('#employeePosition').val(),
        employee_Department: $('#employeeDepartment').val(),
    }

    employees[currentIndex] = employee;
    localStorage.setItem("employeeLists", JSON.stringify(employees))
    displayEmployee();
    clearForm();
    $('#addBtn').html('<i class="fas fa-plus"></i> Add Employee </button>');
}
/*_________________ updateEmployee function End _________________*/


/*_________________ When employeeSearch keyup Start _________________*/
$('#employeeSearch').keyup(function () {
    var employeeContainer = '';
    for (var i = 0; i < employees.length; i++) {
        if (employees[i].employee_Name.toLowerCase().includes(this.value.toLowerCase())) {
            employeeContainer +=
                `
        <tr>
        <td>${employees[i].employee_Id}</td>
        <td>${employees[i].employee_Name}</td>
        <td>${employees[i].employee_Salary}</td>
        <td>${employees[i].employee_Position}</td>
        <td>${employees[i].employee_Department}</td>
        <td><button class="btn btn-danger" onclick="deleteEmployee(${i})"><i class="far fa-trash-alt"></i></button></td>
        <td><a href="#crud"><button class="btn btn-success" onclick="getEmployeeData(${i})"><i class="fas fa-edit"></i></button></a></td>
        </tr>
                 `
                ;


        }


    }
    $('#employeeData').html(employeeContainer);

})


// Clear Local Storage 

$('#clear-local-storage').click(function () {
    if (JSON.parse(localStorage.getItem('employeeLists')) == '' || JSON.parse(localStorage.getItem('employeeLists')) == null) {
        alert('Local Storage is already empty')
        clearForm();

    }

    else {
        clearStorage()
        clearForm();
    }


})

function clearStorage() {
    localStorage.clear();
    employees = []
    displayEmployee();
    alert('Local Storage Has Successfully Cleared')

}
/*_________________ When employeeSearch keyup End _________________*/


/*_________________ searchByName function Start _________________*/

/*_________________ searchByName function End _________________*/

/*________________________________ Input Validation Start ________________________________*/
/*____________ Employee ID Validation Start ____________*/
function checkId() {
    var employeeIdValidationRej = /^(([0-6]?[0-9]?[0-9])|(700))$/
    var res = employeeIdValidationRej.test($('#employeeId').val())
    return res;
}
function checkName() {
    var employeeNameValidationRej = /^[A-z]{3,8} [A-z]{3,8} [A-z]{3,8} [A-z]{3,8}$/
    var res = employeeNameValidationRej.test($('#employeeName').val())
    return res;
}
function checkSalary() {
    var employeeSalaryValidationRej = /^(([2-4][0-9][0-9][0-9])|(5000))$/
    var res = employeeSalaryValidationRej.test($('#employeeSalary').val())
    return res;
}
function checkPosition() {
    var employeePositionValidationRej = /^[A-z]{3,10}$/
    var res = employeePositionValidationRej.test($('#employeePosition').val())
    return res;
}
function checkDepartment() {
    var employeeDepartmentValidationRej = /^[A-Z]{2,10}$/
    var res = employeeDepartmentValidationRej.test($('#employeeDepartment').val())
    return res;
}
$('#employeeId').keyup(function(){
    if (checkId() && checkName() && checkDepartment() && checkPosition() && checkSalary()) {
        $('#addBtn').removeAttr('disabled')
    }

    else {
        $('#addBtn').attr('disabled', 'true')
    }
    if (checkId()) {
        $('#employeeId').addClass('is-valid');
        $('#employeeId').removeClass('is-invalid');
        $('#employeeIdValid').removeClass('d-none');
        $('#employeeIdInvalid').removeClass('d-block');

    }
    else {
        $('#employeeId').addClass('is-invalid');
        $('#employeeId').removeClass('is-valid');
        $('#employeeIdInvalid').addClass('d-block');
        $('#employeeIdValid').addClass('d-none');


    }
    if ($('#employeeId').val() == '') {
        $('#employeeId').removeClass('is-valid');
        $('#employeeId').removeClass('is-invalid');
        $('#employeeIdInvalid').removeClass('d-block');

        $('#employeeIdvalid').removeClass('d-block');



    }});




/*____________ Employee ID Validation End ____________*/



/*____________ Employee Name Validation Start ____________*/
$('#employeeName').keyup(function(){
    if (checkId() && checkName() && checkDepartment() && checkPosition() && checkSalary()) {
        $('#addBtn').removeAttr('disabled')
    }

    else {
        $('#addBtn').attr('disabled', 'true')
    }
    if (checkName()) {
        $('#employeeName').addClass('is-valid');
        $('#employeeName').removeClass('is-invalid');
        $('#employeeNameValid').removeClass('d-none');
        $('#employeeNameInvalid').removeClass('d-block');

    }
    else {
        $('#employeeName').addClass('is-invalid');
        $('#employeeName').removeClass('is-valid');
        $('#employeeNameInvalid').addClass('d-block');
        $('#employeeNameValid').addClass('d-none');


    }
    if ($('#employeeName').val() == '') {
        $('#employeeName').removeClass('is-valid');
        $('#employeeName').removeClass('is-invalid');
        $('#employeeNameInvalid').removeClass('d-block');

        $('#employeeNamevalid').removeClass('d-block');



    }
} );



/*____________ Employee Name Validation End ____________*/


/*____________ Employee Salary Validation Start ____________*/
$('#employeeSalary').keyup(function(){
    if (checkId() && checkName() && checkDepartment() && checkPosition() && checkSalary()) {
        $('#addBtn').removeAttr('disabled')
    }
    else {
        $('#addBtn').attr('disabled', 'true')
    }

    if (checkSalary()) {
        $('#employeeSalary').addClass('is-valid');
        $('#employeeSalary').removeClass('is-invalid');
        $('#employeeSalaryValid').removeClass('d-none');
        $('#employeeSalaryInvalid').removeClass('d-block');

    }
    else {
        $('#employeeSalary').addClass('is-invalid');
        $('#employeeSalary').removeClass('is-valid');
        $('#employeeSalaryInvalid').addClass('d-block');
        $('#employeeSalaryValid').addClass('d-none');


    }
    if ($('#employeeSalary').val() == '') {
        $('#employeeSalary').removeClass('is-valid');
        $('#employeeSalary').removeClass('is-invalid');
        $('#employeeSalaryInvalid').removeClass('d-block');

        $('#employeeSalaryvalid').removeClass('d-block');



    }

} );




/*____________ Employee Salary Validation End ____________*/


/*____________ Employee Position Validation Start ____________*/
$('#employeePosition').keyup(function(){
    if (checkId() && checkName() && checkDepartment() && checkPosition() && checkSalary()) {
        $('#addBtn').removeAttr('disabled')
    }
    else {
        $('#addBtn').attr('disabled', 'true')
    }


    if (checkPosition()) {
        $('#employeePosition').addClass('is-valid');
        $('#employeePosition').removeClass('is-invalid');
        $('#employeePositionValid').removeClass('d-none');
        $('#employeePositionInvalid').removeClass('d-block');

    }
    else {
        $('#employeePosition').addClass('is-invalid');
        $('#employeePosition').removeClass('is-valid');
        $('#employeePositionInvalid').addClass('d-block');
        $('#employeePositionValid').addClass('d-none');


    }
    if ($('#employeePosition').val() == '') {
        $('#employeePosition').removeClass('is-valid');
        $('#employeePosition').removeClass('is-invalid');
        $('#employeePositionInvalid').removeClass('d-block');

        $('#employeePositionvalid').removeClass('d-block');



    }
} );



/*____________ Employee Position Validation End ____________*/

/*____________ Employee Department Validation Start ____________*/

$('#employeeDepartment').keyup(function(){
    if (checkId() && checkName() && checkDepartment() && checkPosition() && checkSalary()) {
        $('#addBtn').removeAttr('disabled')
    }
    else {
        $('#addBtn').attr('disabled', 'true')
    }


    if (checkDepartment()) {
        $('#employeeDepartment').addClass('is-valid');
        $('#employeeDepartment').removeClass('is-invalid');
        $('#employeeDepartmentValid').removeClass('d-none');
        $('#employeeDepartmentInvalid').removeClass('d-block');

    }
    else {
        $('#employeeDepartment').addClass('is-invalid');
        $('#employeeDepartment').removeClass('is-valid');
        $('#employeeDepartmentInvalid').addClass('d-block');
        $('#employeeDepartmentValid').addClass('d-none');


    }
    if ($('#employeeDepartment').val() == '') {
        $('#employeeDepartment').removeClass('is-valid');
        $('#employeeDepartment').removeClass('is-invalid');
        $('#employeeDepartmentInvalid').removeClass('d-block');

        $('#employeeDepartmentvalid').removeClass('d-block');



    }
} );



/*____________ Employee Department Validation End ____________*/





/*________________________________ Input Validation End ________________________________*/
