/*_______________________ Variable Decleration Start _______________________*/

var employeeData = document.getElementById('employeeData'),
    employeeId = document.getElementById('employeeId'),
    employeeName = document.getElementById('employeeName'),
    employeeSalary = document.getElementById('employeeSalary'),
    employeePosition = document.getElementById('employeePosition'),
    employeeDepartment = document.getElementById('employeeDepartment'),
    addBtn = document.getElementById('addBtn'),
    myInputs = document.getElementsByClassName('form-control'),
    employeeSearch = document.getElementById('employeeSearch'),
    employeeIdValid = document.getElementById('employeeIdValid'),
    employeeIdInvalid = document.getElementById('employeeIdInvalid'),
    employeeNameValid = document.getElementById('employeeNameValid'),
    employeeNameInvalid = document.getElementById('employeeNameInvalid'),
    employeeSalaryValid = document.getElementById('employeeSalaryValid'),
    employeeSalaryInvalid = document.getElementById('employeeSalaryInvalid'),
    employeePositionValid = document.getElementById('employeePositionValid'),
    employeePositionInvalid = document.getElementById('employeePositionInvalid'),
    employeeDepartmentValid = document.getElementById('employeeDepartmentValid'),
    employeeDepartmentInvalid = document.getElementById('employeeDepartmentInvalid'),
    myAlerts = document.getElementsByClassName('alert');


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
addBtn.addEventListener('click', function () {
    if (addBtn.innerHTML == 'Update') {
        updateEmployee();

    }
    else if (addBtn.innerHTML == 'Add Employee') {


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
        employee_Id: employeeId.value,
        employee_Name: employeeName.value,
        employee_Salary: employeeSalary.value,
        employee_Position: employeePosition.value,
        employee_Department: employeeDepartment.value,

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
        <td><button class="btn btn-danger" onclick="deleteEmployee(${i})">Delete</button></td>
        <td><a href="#crud"><button class="btn btn-success" onclick="getEmployeeData(${i})">Update</button></a></td>
        </tr>
                 `
            ;


    }

    employeeData.innerHTML = employeeContainer;

}
/*_________________ displayEmployee function End _________________*/


/*_________________ clearForm function Start _________________*/

function clearForm() {
    for (var i = 0; i < myInputs.length; i++) {
        myInputs[i].value = '';
        myInputs[i].classList.remove('is-valid')
        myInputs[i].classList.remove('is-invalid')
    }
    for (var i = 0; i < myAlerts.length; i++) {


        myAlerts[i].classList.add('d-none');
        myAlerts[i].classList.remove('d-block');
    }



}
/*_________________ clearForm function End _________________*/



/*_________________ getEmployeeData function Start _________________*/
function getEmployeeData(index) {
    alert('Updating Engineer ' + employees[index].employee_Name + ' Data at' + ' Row ' + (index + 1));
    employeeId.value = employees[index].employee_Id;
    employeeName.value = employees[index].employee_Name;
    employeeSalary.value = employees[index].employee_Salary;
    employeePosition.value = employees[index].employee_Position;
    employeeDepartment.value = employees[index].employee_Department;
    localStorage.setItem("employeeLists", JSON.stringify(employees))

    currentIndex = index;

    addBtn.innerHTML = 'Update';

}
/*_________________ getEmployeeData function End _________________*/

/*_________________ deleteEmployee function Start _________________*/
function deleteEmployee(index) {
    alert('Deleting Engineer ' + employees[index].employee_Name + ' Data at' + ' Row ' + (index + 1)); employees.splice(index, 1);
    displayEmployee();
    localStorage.setItem("employeeLists", JSON.stringify(employees))



}
/*_________________ deleteEmployee function End _________________*/


/*_________________ updateEmployee function Start _________________*/
function updateEmployee() {

    var employee =
    {
        employee_Id: employeeId.value,
        employee_Name: employeeName.value,
        employee_Salary: employeeSalary.value,
        employee_Position: employeePosition.value,
        employee_Department: employeeDepartment.value,
    }

    employees[currentIndex] = employee;
    localStorage.setItem("employeeLists", JSON.stringify(employees))
    displayEmployee();
    clearForm();
    addBtn.innerHTML = 'Add Employee'
}
/*_________________ updateEmployee function End _________________*/


/*_________________ When employeeSearch keyup Start _________________*/
employeeSearch.addEventListener('keyup', searchByName);
/*_________________ When employeeSearch keyup End _________________*/


/*_________________ searchByName function Start _________________*/
function searchByName() {
    var employeeContainer = '';
    for (var i = 0; i < employees.length; i++) {
        if (employees[i].employee_Name.toUpperCase().includes(employeeSearch.value.toUpperCase())) {
            employeeContainer +=
                `
        <tr>
        <td id='id-${i}'>${employees[i].employee_Id}</td>
        <td>${employees[i].employee_Name}</td>
        <td>${employees[i].employee_Salary}</td>
        <td>${employees[i].employee_Position}</td>
        <td>${employees[i].employee_Department}</td>
        <td><button class="btn btn-danger" onclick="deleteEmployee(${i})">Delete</button></td>
        <td><a href="#crud"><button class="btn btn-success" onclick="getEmployeeData(${i})">Update</button></a></td>
        </tr>
                 `
                ;

        }
        employeeData.innerHTML = employeeContainer;

        localStorage.setItem("employeeLists", JSON.stringify(employees))


    }
}
/*_________________ searchByName function End _________________*/

/*________________________________ Input Validation Start ________________________________*/
/*____________ Employee ID Validation Start ____________*/
function checkId() {
    var employeeIdValidationRej = /^(([0-6]?[0-9]?[0-9])|(700))$/
    var res = employeeIdValidationRej.test(employeeId.value)
    return res;
}
function checkName() {
    var employeeNameValidationRej = /^[A-z]{3,8} [A-z]{3,8} [A-z]{3,8} [A-z]{3,8}$/
    var res = employeeNameValidationRej.test(employeeName.value)
    return res;
}
function checkSalary() {
    var employeeSalaryValidationRej = /^(([2-4][0-9][0-9][0-9])|(5000))$/
    var res = employeeSalaryValidationRej.test(employeeSalary.value)
    return res;
}
function checkPosition() {
    var employeePositionValidationRej = /^[A-z]{3,10}$/
    var res = employeePositionValidationRej.test(employeePosition.value)
    return res;
}
function checkDepartment() {
    var employeeDepartmentValidationRej = /^[A-Z]{2,10}$/
    var res = employeeDepartmentValidationRej.test(employeeDepartment.value)
    return res;
}
employeeId.addEventListener('keyup', employeeIdValidation);

function employeeIdValidation() {
    if (checkId() && checkName() && checkDepartment() && checkPosition() && checkSalary()) {
        addBtn.removeAttribute('disabled')
    }
    else {
        addBtn.setAttribute('disabled', 'true')
    }

    if (checkId() == true) {
        employeeId.classList.add('is-valid')
        employeeId.classList.remove('is-invalid')
        employeeIdValid.classList.remove('d-none');
        employeeIdInvalid.classList.remove('d-block');;

    }
    else {
        employeeId.classList.remove('is-valid')
        employeeId.classList.add('is-invalid')

        employeeIdInvalid.classList.add('d-block');
        employeeIdValid.classList.add('d-none');;

    }
    if (employeeId.value == '') {
        employeeId.classList.remove('is-valid')
        employeeId.classList.remove('is-invalid')
        employeeIdInvalid.classList.remove('d-block');
        employeeIdInvalid.classList.remove('d-block');

    }


}


/*____________ Employee ID Validation End ____________*/



/*____________ Employee Name Validation Start ____________*/
employeeName.addEventListener('keyup', employeeNameValidation);

function employeeNameValidation() {
    if (checkId() && checkName() && checkDepartment() && checkPosition() && checkSalary()) {
        addBtn.removeAttribute('disabled')
    }
    else {
        addBtn.setAttribute('disabled', 'true')
    }
    if (checkName()) {
        employeeName.classList.add('is-valid')
        employeeName.classList.remove('is-invalid')
        employeeNameValid.classList.remove('d-none');
        employeeNameInvalid.classList.remove('d-block');;

    }
    else {
        employeeName.classList.remove('is-valid')
        employeeName.classList.add('is-invalid')
        employeeNameInvalid.classList.add('d-block');
        employeeNameValid.classList.add('d-none');;


    }
    if (employeeName.value == '') {
        employeeName.classList.remove('is-valid')
        employeeName.classList.remove('is-invalid')


        employeeNameInvalid.classList.remove('d-block');
        employeeNameInvalid.classList.remove('d-block');
    }

}

/*____________ Employee Name Validation End ____________*/


/*____________ Employee Salary Validation Start ____________*/
employeeSalary.addEventListener('keyup', employeeSalaryValidation);

function employeeSalaryValidation() {
    if (checkId() && checkName() && checkDepartment() && checkPosition() && checkSalary()) {
        addBtn.removeAttribute('disabled')
    }
    else {
        addBtn.setAttribute('disabled', 'true')
    }
    if (checkSalary()) {
        employeeSalary.classList.add('is-valid')
        employeeSalary.classList.remove('is-invalid')
        employeeSalaryValid.classList.remove('d-none');
        employeeSalaryInvalid.classList.remove('d-block');;




    }
    else {
        employeeSalary.classList.remove('is-valid')
        employeeSalary.classList.add('is-invalid')


        employeeSalaryInvalid.classList.add('d-block');
        employeeSalaryValid.classList.add('d-none');;

    }
    if (employeeSalary.value == '') {
        employeeSalary.classList.remove('is-valid')
        employeeSalary.classList.remove('is-invalid')



        employeeSalaryInvalid.classList.remove('d-block');
        employeeSalaryInvalid.classList.remove('d-block');

    }

}

/*____________ Employee Salary Validation End ____________*/


/*____________ Employee Position Validation Start ____________*/
employeePosition.addEventListener('keyup', employeePositionValidation);

function employeePositionValidation() {
    if (checkId() && checkName() && checkDepartment() && checkPosition() && checkSalary()) {
        addBtn.removeAttribute('disabled')
    }
    else {
        addBtn.setAttribute('disabled', 'true')
    }
    if (checkPosition()) {
        employeePosition.classList.add('is-valid')
        employeePosition.classList.remove('is-invalid')
        employeePositionValid.classList.remove('d-none');
        employeePositionInvalid.classList.remove('d-block');;




    }
    else {
        employeePosition.classList.remove('is-valid')
        employeePosition.classList.add('is-invalid')


        employeePositionInvalid.classList.add('d-block');
        employeePositionValid.classList.add('d-none');;


    }
    if (employeePosition.value == '') {
        employeePosition.classList.remove('is-valid')
        employeePosition.classList.remove('is-invalid')
        employeePositionInvalid.classList.remove('d-block');
        employeePositionInvalid.classList.remove('d-block');


    }

}

/*____________ Employee Position Validation End ____________*/

/*____________ Employee Department Validation Start ____________*/
employeeDepartment.addEventListener('keyup', employeeDepartmentValidation);

function employeeDepartmentValidation() {
    if (checkId() && checkName() && checkDepartment() && checkPosition() && checkSalary()) {
        addBtn.removeAttribute('disabled')
    }
    else {
        addBtn.setAttribute('disabled', 'true')
    }

    if (checkDepartment()) {
        employeeDepartment.classList.add('is-valid')
        employeeDepartment.classList.remove('is-invalid')

        employeeDepartmentValid.classList.remove('d-none');
        employeeDepartmentInvalid.classList.remove('d-block');;


    }

    else {
        employeeDepartment.classList.remove('is-valid')
        employeeDepartment.classList.add('is-invalid')

        employeeDepartmentInvalid.classList.add('d-block');
        employeeDepartmentValid.classList.add('d-none');;


        addBtn.setAttribute('disabled', 'true')

    }
    if (employeeDepartment.value == '') {
        employeeDepartment.classList.remove('is-valid')
        employeeDepartment.classList.remove('is-invalid')

        addBtn.setAttribute('disabled', 'true')

        employeeDepartmentInvalid.classList.remove('d-block');
        employeeDepartmentInvalid.classList.remove('d-block');
    }

}
/*____________ Employee Department Validation End ____________*/





/*________________________________ Input Validation End ________________________________*/
