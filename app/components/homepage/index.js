const database = require('../../dbo/database');
let selectedClient = [];

window.onload = function() {
  initDatable();

  // Add the add button click event
  document.getElementById('add').addEventListener('click', () => {

    // Retrieve the input fields
    var firstname = document.getElementById('firstname');
    var lastname = document.getElementById('lastname');
    if(firstname.value != '' && lastname.value != ''){
      // Save the person in the database
      database.addPerson(firstname.value, lastname.value);

      // Reset the input fields
      firstname.value = '';
      lastname.value = '';
      updateDatable();
    }

  });
}

function initDatable(){
    // dt is needed for pagination and search
  var dt = require( 'datatables.net' )();
  var $  = require( 'jquery' );
  try {
    $(document).ready(function() {
      database.getPersons(function(persons) {
        //init table if it has data!
        if(persons.length > 0){
          $('#tableHasData').addClass('d-inline-block');
          $('#tableHasData').removeClass('d-none');
          let strDataNew = [];
          console.log(persons);
          persons.forEach( row => {
            let obj = {
              "First Name": row['firstname'],
              "Last Name": row['lastname'],
              "Action": '<button type="button" class="btn btn-outline-dark editbtn" onclick="updatePerson(\'' +row['_id'] +'\')">Edit</button>'
                        +'<button type="button" class="btn ml-2 btn-outline-dark" onclick="deletePerson(\'' +row['_id'] +'\')">Delete</button>'
                        +'<div id="' +row['_id'] +'"></div>'
            };
            strDataNew.push(obj);
          });
          var adColumns = [];
          Object.keys(strDataNew[0]).forEach(key => {
            var col = { data: key, title: key };
            adColumns.push(col);
          });
          $('#main-table').DataTable({
            "data": strDataNew,
            "columns": JSON.parse(JSON.stringify(adColumns)),
            "order": [1, 'asc'],
          });
        } else {
          $('#tableHasData').removeClass('d-inline-block');
          $('#tableHasData').addClass('d-none');
          let strDataNew = [];
          let obj = {
            "First Name": "",
            "Last Name": "",
            "Action": ""
          };
          strDataNew.push(obj);
          $('#main-table').DataTable({
            "data": [],
            "columns": [ null, null, null]
          });          
        }
      });
    }); 
  } catch (error) {
    console.log('error:' +error);
  }
}

function updateDatable(){
  var $  = require( 'jquery' );
  $('#main-table').DataTable().clear().destroy();
  initDatable();
}

// Updates a person
function updatePerson(id) {
  var $  = require( 'jquery' );

  let currentElement = document.getElementById(id)  
  /* SAVE RECORD */
  if(currentElement.classList.contains("isCurrentlyEditableEntry")){

    let modalEditOptions  = {
      buttons: ["Yes","No"],
      message: "Do you want to save new entry?"
   }
    const dialog = require('electron').remote.dialog
    if(dialog.showMessageBox(modalEditOptions) === 0){
      clearEditableTable()
      getEditableValues(id)
      console.log('Firstname' +selectedClient[0]);
      console.log('Lastname' +selectedClient[1]);
      database.updatePerson(id,selectedClient[0],selectedClient[1])
      updateDatable()
    }
  } else {
    clearEditableTable()
    setEditableTableFrame(id)
  }
}

function getEditableValues(id){
  var $  = require( 'jquery' );
  let currentTD = document.getElementById(id).parentElement.parentElement.children;
  $.each(currentTD, function (index,element ) {
    if(index!=currentTD.length - 1){
      $(this).prop('contenteditable', true)
      console.log('ADDING IN CURRENT SELECTION')
      selectedClient.push(element.textContent)
    }
  })
}

function clearEditableTable(){
  var $  = require( 'jquery' );
  selectedClient = []
  /* CLEAR ALL EDIT */
  $('table > tbody  > tr > td').each(function(index, td) { 
    $(td).prop('contenteditable', false)
  });
  $('table > tbody  > tr').each(function(index, tr) { 
    $(tr).css('outline', 'none')
  });
  $('.isCurrentlyEditableEntry').removeClass('isCurrentlyEditableEntry')
  $('button').each(function(index, btn) { 
    if($(btn).html() === 'Save'){
      console.log($(btn)[0].innerHTML = 'Edit')
    }
  });
}

function setEditableTableFrame(id){
  var $  = require( 'jquery' );
  let currentTR = document.getElementById(id).parentElement.parentElement
  /* APPLY NEW EDIT */
  $(currentTR).css("outline","2px solid black")
  $(currentTR).add('isCurrentlyEditableEntry')
  let currentTD = document.getElementById(id).parentElement.parentElement.children;
  $.each(currentTD, function (index,element ) {
    if(index!=currentTD.length - 1){
      $(this).prop('contenteditable', true)
    } else {
      $(this).find('.editbtn')[0].innerHTML = 'Save'
      document.getElementById(id).classList.add('isCurrentlyEditableEntry')
    }
  })
}

// Deletes a person
function deletePerson(id) {
   // Delete the person from the database
  let modalDeleteOptions  = {
      buttons: ["Yes","No"],
      message: "Do you really want to delete entry?"
  }
  const dialog = require('electron').remote.dialog
  if(dialog.showMessageBox(modalDeleteOptions) === 0){
    database.deletePerson(id);
    updateDatable(); 
  }
}