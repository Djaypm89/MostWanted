"use strict"

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

  /* Here we pass in the entire person object that we found in our search, 
  as well as the entire original dataset of people. We need people in order 
  to find descendants and other information that the user may want. */
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
    familyFinder(person, people);
    break;
    case "descendants":
    desFinder(person, people)
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

//NAME FILTER
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
  
  return foundPerson[0];
}

//GENDER FILTER
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
  
  return peopleOfSameGender;
}

//DOB FILTER
function searchByDOB(people){
  let dob = promptFor("What is the person's Date of Birth?", autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.dob === dob){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson;
}

//HEIGHT FILTER
function searchByHeight(){

}

//WEIGHT FILTER
function searchByWeight(){

}

//EYE COLOR FILTER
function searchByEyeColor(people){
  let eyeColor = prompt("What is the person's eye color?");

  let eyeColorResults = people.filter(function(potentialMatch){
    if(potentialMatch.eyeColor === eyeColor){
      return true;
    }
    else{
      return false;
    }
  })
  
  return eyeColor;
}



function multipleCriteriaSearch (people) {
  //Check Condition of Array. if Array > 1.
  let criteriaType;
  let searchResults = ""; 

  if(people.length == 1){
    criteriaType = "name"; 
    searchResults = people;
  }else{
    criteriaType = prompt("Which criteria would you like to search by?  Type gender or dob.").toLowerCase();
  }

  switch(criteriaType) {
    case "gender":
       searchResults = searchByGender(people);
       displayPeople(searchResults);
       multipleCriteriaSearch(searchResults);
       break; 
    case "dob":
      searchResults = searchByDOB(people);
      displayPeople(searchResults);
      multipleCriteriaSearch(searchResults);
      break;
    case "name":
      //return searchResults[0];
      searchResults = people;
      break;
   }
   return searchResults[0];
}

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

//Info Menu Option.
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

//Family Finder Menu Option.
function familyFinder(person, people){

  //Parent Finder.
  function parentFinder(person, people) {
    let parentList = person.parents;
    let parentResult = people.filter(function(potentialMatch){
     for (let i = 0; i < parentList.length; i++) { 
      if(potentialMatch.id === parentList[0] || potentialMatch.id === parentList[1]){
        return true;
      }
      else{
        return false;
      }
    }
    }) 
    return parentResult;
  }

  //Spouse Finder.
  function spouseFinder(person, people) {
    let spouse = person.currentSpouse;
    let spouseResult = people.filter(function(potentialMatch){ 
      if(potentialMatch.id === spouse){
        return true;
      }
      else{
        return false;
      }
    }) 
    return spouseResult;
  }

  //Sibling Finder.
  function siblingFinder(person, people) {
    let siblingResult;
    let parents;
    if (person.parents == 0) {
      return siblingResult = "";
      
    }
    else {
      parents = person.parents;
    }
    
    siblingResult = people.filter(function(potentialMatch){
      if((potentialMatch.parents[0] === parents[0] || potentialMatch.parents[1] === parents[1]) && potentialMatch.id !== person.id){
        return true;
      }
      else{
        return false;
      }
    }) 
    return siblingResult;
  }
 
  let parent = parentFinder(person, people);
  let spouse = spouseFinder(person, people);
  let sibling = siblingFinder(person, people);

  let parent01 = parent[0];
  let parent02 = parent[1];


  if (parent01 == undefined) {
    parent01 = "";
  }
  if (parent02 == undefined) {
    parent02 = "";
  }
  parent01 = parent01.firstName;
  parent02 = parent02.firstName;
  


  let spouse01 = spouse[0];
  if (spouse01 == undefined) {
    spouse01 = "";
  }
  spouse01 = spouse01.firstName;


  let sibling01 = sibling[0];
  let sibling02 = sibling[1];

  if (sibling01 == undefined) {
    sibling01 = "";
  }
  if (sibling02 == undefined) {
    sibling02 = "";
  }
sibling01 = sibling01.firstName;
sibling02 = sibling02.firstName;


  alert(
    `${person.firstName}'s Family:
    Parent(s): ${parent01} , ${parent02}
    Spouse: ${spouse01}
    Sibling(s): ${sibling01} and ${sibling02}`
  );
}

//Descendants Menu Option.
function desFinder(person, people){
  let kids;
  let grandKids;
  
  function finder(person, people){
    
    let foundDes = people.filter(function(potentialMatch){
      if(potentialMatch.parents[0] === person.id || potentialMatch.parents[1] === person.id){
        return true;
      }
      else{
        return false;
      }
    })
    
    return foundDes;
  }

  let names = [];

  kids = finder(person, people);
  console.log(kids);

  for(let i = 0; i < kids.length; i++){
    grandKids = finder(kids[i], people);
    console.log(grandKids);
    for(let j = 0; j < grandKids.length; j++){
      names.push(grandKids[j].firstName);
      console.log(names);
    }
  }

  for(let i = 0; i < kids.length; i++){
    names.push(kids[i].firstName);
  }
  alert(`Descendants: ${names.toString()}`);
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
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
// - bonus (recursion)  find out what this is