"use strict"


// new alert for "choose additional criteria"
// 

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region 

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      // call function for additional search by critera
      searchResults = multipleCriteriaSearch(people);
      
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    info(person);
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region 

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName === firstName && potentialMatch.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  console.log(foundPerson);
  return foundPerson[0];
}

//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people){

}

//TODO: add other trait filter functions here.
function searchByGender(people){
  let personsGender = promptFor("What is the person's gender?", autoValid);
  let peopleOfSameGender = people.filter(function(potentialMatch){
    if(potentialMatch.gender === personsGender){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person single person object using the name they entered.
  console.log(peopleOfSameGender);
  return peopleOfSameGender;
}



function multipleCriteriaSearch (people) {
  let criteriaType = prompt("Which criteria would you like to search by?  Type gender or dob.").toLowerCase();
  let searchResults = ""; 
  switch(criteriaType) {
     case "gender":
       searchResults = searchByGender(people);
       displayPeople(searchResults);
       multipleCriteriaSearch(searchResults);
       break; 
   }
   return searchResults;
}

// (searchResults)

//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

function info(person){
  alert(`${person.firstName} ${person.lastName}:
  ID: ${person.id},
  Gender: ${person.gender},
  DOB: ${person.dob},
  Height: ${person.height},
  Weight: ${person.weight},
  Eye Color: ${person.eyeColor},
  Occupation: ${person.occupation}.`);
  
}

//#endregion



//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let isValid;
  do{
    var response = prompt(question).trim();
    isValid = valid(response);
  } while(response === ""  ||  isValid === false)
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input){
  
}

//#endregion

// ALGORITHM

// - Identify what code is operational and what runs in the browser already 
// - prompt user to search by first and last name works, it returns person as "undefined undefined"
// - program stops (code unfinished or bugged) at prompt for person "info, parents, descendants"
// - things to be completed:
//   - Create re-useable function for input validation that can be used throughout project. 
//     - define criteria for valid input for each prompt.
// - first and last name search criteria already in place, finish code to allow user to search by 
//   other critera.  (i.e. eye color and first, name) but up to 5).
// - return relevant list of people as defined by search criteria, verify correct results. 
//   - after search by 2 criteria and display results is operational, consider adding more search criteria. 
// - after search results are displayed and verified, create/finish function to display persons clientInformation. 
// - from displayed information, display only persons descendents if applicable.
//   - create function (loop thru arrays?) to display identify and display descendents only. 
// - after locating person, add option (or at end of search) to display family members( parents, spouse, siblings.)
// - make sure program runs throughout. 
//   - create/finish function (loop and conditionals) to display family members
// - bonus (recursion)  find out what this is. 