const fs = require("fs"); // Importing fs to allow us to use it.
const { listenerCount } = require("process");
const readline = require('readline-sync');  // Import readline-sync for synchronous input


// No need for a comment as the function name is self-describing.
function getCurrentDateTimeFormatted() {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
  const year = String(currentDate.getFullYear());
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

const passwordCriteria = {
    length: /.{8,}/,                    // Minimum 8 characters
    uppercase: /[A-Z]/,                // Must have uppercase letters
    lowercase: /[a-z]/,                // Must have lowercase letters
    digit: /[0-9]/,                    // Must have digits
    specialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\|=]/  // Must have special characters
};

function isStrongPassword(password) {
    // Check each condition using the predefined regex
    return passwordCriteria.length.test(password) &&
           passwordCriteria.uppercase.test(password) &&
           passwordCriteria.lowercase.test(password) &&
           passwordCriteria.digit.test(password) &&
           passwordCriteria.specialChar.test(password);
}


function getPasswordStrength(password) {
    const conditionsPassed = [
        passwordCriteria.length.test(password),
        passwordCriteria.uppercase.test(password),
        passwordCriteria.lowercase.test(password),
        passwordCriteria.digit.test(password),
        passwordCriteria.specialChar.test(password)
    ].filter(x => x === true).length;
  
    if (conditionsPassed === 5) {
      return "Strong";
    } else if (conditionsPassed >= 3) {
      return "Medium";
    } else{
      return "Weak";
    }
    
    };
        
    const inputFile = "./common_passwords.txt"
    const data = fs.readFileSync(inputFile, "utf-8")
    const lines = data.split(/\n/)

function getPasswordFromUser() {
    const password = readline.question("Please enter your password: ", {
        hideEchoBack: true  // Masks the password input for privacy
    });
      if (lines.includes(password)){
        console.log('PLEASE DO NOT USE THESE WEAK PASSWORDS')
  
      }
    const strength = getPasswordStrength(password);
    console.log(`Password strength: ${strength}`);
    let splitPassword = password.split("").reverse().join("")
    if (strength === "Strong") {
        console.log("Your password is strong.");

        fs.appendFileSync("./entered_password.txt", `User Password: ${splitPassword} --- ` , "utf-8")

        const currentDateTime = getCurrentDateTimeFormatted();
        fs.appendFileSync("./entered_password.txt", `Current Time: ${currentDateTime}\n`, "utf-8");

    } 
    }


// End of functions



// Enter code to read in the 25 most common passwords from the text file here.

// lines.forEach((line)=> {
//   if(passwordCriteria.test(line)){
//     console.log('Good password')
//   }else {
//     console.log('Bad Password')
//   }
// })

// const enteredPassFile = "./entered_passwords.txt"
// const enteredData = fs.readFileSync(enteredPassFile,"utf-8")

getPasswordFromUser()








