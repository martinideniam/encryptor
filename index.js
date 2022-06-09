document.getElementById("encrypt-btn").addEventListener("click", function(event){
    event.preventDefault()
});

function modifyKey(inputKey, inputPhrase) {
    // here we make the length of key equal to the lenth of the phrase we want to encrypt
    // will give an error with empty key & so on || need to make it error prompt
    let properKey = inputKey.value
    let phrase = inputPhrase.value
    if (properKey.length != 0 && properKey.length < phrase.length) {
        let coefficient = Math.floor(phrase.length/properKey.length) + 1
        properKey = properKey.repeat(coefficient)
    }
    return properKey.slice(0, phrase.length)
}

function sumElementsOfTwoArrays(array1, array2) {
    let newArray = array1.map(function (num, idx) {
        return num + array2[idx]
    })
    return newArray
}

function difElementsOfTwoArrays(array1, array2) {
    let newArray = array1.map(function (num, idx) {
        return array2[idx]-num
    })
    return newArray
}

function cutNumber(number) {
    let newNumber = number 
    if (number > 126) {
        newNumber = newNumber - 94
        newNumber = cutNumber(newNumber)
    }
    if (number < 32) {
        newNumber = newNumber + 94
        newNumber = cutNumber(newNumber)
    }
    return newNumber
}

function stringToArrayOfInt(someString) {
    let arrayOfInt = []
    for (let i = 0; i < someString.length; i++) {
        arrayOfInt.push(someString[i].charCodeAt(0))
    }
    return arrayOfInt
}

function arrayOfIntToString(someArray) {
    let someString = ""
    for (let i = 0; i < someArray.length; i++) {
        let newNumber = cutNumber(someArray[i])
        someString += String.fromCharCode(newNumber) 
    }
    return someString
}

function encryptFunction() {
    let inputKeyEl = document.getElementById("input-key")
    let inputPhraseEl = document.getElementById("input-phrase")
    let outputEl = document.getElementById("output")
    let newKey = modifyKey(inputKeyEl, inputPhraseEl)
    let keyArray = stringToArrayOfInt(newKey)
    let wordArray = stringToArrayOfInt(inputPhraseEl.value)
    var checkedValue = ""
    try {
        checkedValue = document.querySelector('.encrypt:checked').value;
        } catch (error) {
        checkedValue = "false"
    }
    let encryptedWordArray = []
    if (checkedValue === "true") {
        encryptedWordArray = sumElementsOfTwoArrays(keyArray, wordArray)
    } else {
        encryptedWordArray = difElementsOfTwoArrays(keyArray, wordArray)
    }
    outputEl.textContent = arrayOfIntToString(encryptedWordArray)
}


