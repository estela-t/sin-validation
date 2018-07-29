// get user input 
var element = document.getElementById("submit-btn");
element.onclick = function(e) {
	e.preventDefault();
	var input = document.getElementById("sin").value;
	validateSin(input);
};

// validate user input
function validateSin(input) {
	// setup regular expressions
	let existSinPattern = /^[*]{6}[0-9]{3}$/.test(input);
	let newSinPattern = /^\d{9}$/.test(input);
	// set up arrays and total for Luhn validation
	let singleNumArray = [];
	let doubleNumArray = [];
	let total = 0;

	// check if input is blank 
	if (input === "") {
		alert("Please enter a valid SIN");
	}	// check if there is an existing SIN (first 6 numbers obfuscated) 
		else if (existSinPattern === true) {
			return true;
		}	// Luhn validation
			else if (newSinPattern === true){
			// turn input into an array and reverse order (to start from check digit)
			const inputArray = input.split('').reverse();
			// get even and odd indices and push values into arrays
			for (var i = inputArray.length-1; i >= 0; i--) {
				if (i % 2 !==0) {
					doubleNumArray.push(inputArray[i]);
				} else {
					singleNumArray.push(inputArray[i]);
				}
			}
			// double even values and split into individual numbers
			doubleNumArray = doubleNumArray.map((even) => {
				return even * 2;
			}).join('').split('');
			// concat the two (even/single) arrays, turn strings to nums 
			let concatArray = [...doubleNumArray, ...singleNumArray].map(Number);
			total = concatArray.reduce((a, b) => {
				return a + b;
			});
			// check if total is divisible by 10 
			if (total % 10 === 0) {
				alert("Nice!")
				return true;
			} else {
				alert("Please enter a valid SIN");
			}
		}
};