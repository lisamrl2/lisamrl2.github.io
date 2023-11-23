const cells = 25;

function loadWords() {
	if (localStorage.getItem("cell"+0) !== null) {
		loadWordsFromStorage();
	}
	else {
		loadWordsClean();
	}
}

function loadWordsClean() {
	var bullshits = words.split("\n")
						 .filter(word => word.length > 0)
						 .map(word => word.trim());
	
	var randomizedWords = randomize(bullshits);
	
	for (let counter=0; counter<cells; counter++) {
		var actu_word = randomizedWords.pop();
		localStorage.setItem("cell"+counter,actu_word);
		localStorage.setItem("cell"+counter+"_clicked","0");
		document.getElementById('cell' + counter).className = "";
		document.getElementById('cell' + counter).innerHTML = actu_word; 
	}
}

function loadWordsFromStorage() {
	for (let counter=0; counter<cells; counter++) {
		var element = document.getElementById('cell' + counter);
		var actu_word = localStorage.getItem("cell"+counter);

		element.innerHTML = actu_word; 
		var already_clicked = "";
		var x = localStorage.getItem("cell"+counter+"_clicked");
		console.log(x)
		if (x!=="0") {
			element.className = "clicked";
		}
		
	}
	var first = document.getElementById('cell' + 0);
	first.click();
	first.click();
}





function randomize(words) {
	var randomizedWords = [];
	var tempWords = words.slice();
	
	for (var i=0; i<cells; i++) {
		var wordCount = tempWords.length;
		var randomIndex = Math.floor(Math.random() * wordCount);
		var randomWord = tempWords[randomIndex];
		randomizedWords.push(randomWord);
		tempWords.splice(randomIndex,1);

		if (tempWords.length==0) {
			tempWords = words.slice();
		}

	}

	return randomizedWords;
}
