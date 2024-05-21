// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

// Purpose: To return true when an array contains digits of a valid credit card number and false when it is invalid.
const validateCred = nums => {
    // Creates a new array to place the new credit card number calculations.
    let arrayOfNums = [];
    // Accounts for every odd (1, 3, 5, etc.) numbered position of an array of credit card numbers. 
    for (let i = nums.length - 1; i >= 0; i--) {
        if ((nums.length - 1 - i) % 2 === 0) {
            arrayOfNums.push(nums[i]);
        }
        // Accounts for every even (0, 2, 4, etc.) numbered position of an array of credit card numbers. 
        if ((nums.length - 1 - i) % 2 === 1) {
            const doubledDigit = nums[i] * 2;
            if (doubledDigit > 9) {
                const newDigit = doubledDigit - 9;
                arrayOfNums.push(newDigit);
            }
            else {
                arrayOfNums.push(doubledDigit);
            }
        }
    }
    // Finds the total sum of the credit card numbers. 
    let sumOfNums = arrayOfNums.reduce((sum, value) => sum + value, 0);
    // If the total sum of credit card numbers is divisible by 10, it is a valid credit card, otherwise it is not.
    if (sumOfNums % 10 === 0) {
        return true;
    }
    else {
        return false;
    }
}
// console.log(validateCred(valid3));

// Purpose: To check through the nested array for which numbers are invalid, and return another nested array of invalid cards.
let invalidCardNums = [];
const findInvalidCards = batch => {
    for (let i = 0; i < batch.length; i++) {
        if (validateCred(batch[i]) === false) {
            invalidCardNums.push(i);
        }
    }
    return invalidCardNums;
}
// console.log(findInvalidCards(batch));
// console.log(invalidCardNums);

// Purpose: To identify the credit card companies that have possibly issued these faulty numbers.
const idInvalidCardCompanies = invalidCardNums => {
    let cardCompanies = [];
    for (let i = 0; i < invalidCardNums.length; i++) {
        // Finds to first number of for each invalid credit card.
        const invalidCardIndex = invalidCardNums[i];
        const invalidCardNumbers = batch[invalidCardIndex];
        const firstDigit = invalidCardNumbers[0];
        if (firstDigit === 3) {
            cardCompanies.push("Amex (American Express)");
        }
        else if (firstDigit === 4) {
            cardCompanies.push("Visa");
        }
        else if (firstDigit === 5) {
            cardCompanies.push("Mastercard");
        }
        else if (firstDigit === 6) {
            cardCompanies.push("Discover");
        }
        else {
            cardCompanies.push("Company not found");
        }
    }
    // Adds credit card companies only once to an empty array.
    let memory = [];
    for (let i = 0; i < cardCompanies.length; i++) {
        const company = cardCompanies[i];
         if (!memory.includes(company)) {
            memory.push(company);
         }
    }
    return memory;
}
// console.log(idInvalidCardCompanies(invalidCardNums))