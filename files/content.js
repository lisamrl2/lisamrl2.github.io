const cells = 25;

function loadWords() {
  const full_list = localStorage.getItem("full_list");
  if (full_list !== null) {
    loadWordsFromStorage();
  } else {
    loadWordsClean();
  }
}

function loadWordsClean() {
  const randomizedWords = randomize();
  localStorage.setItem("full_list", JSON.stringify(randomizedWords));
  console.log(randomizedWords);
  var rWords = [];

  if (localStorage.getItem("language") === "en") {
    rWords = randomizedWords.en;
  } else {
    rWords = randomizedWords.de;
  }

  for (let counter = 0; counter < cells; counter++) {
    var actu_word = rWords[counter];
    //localStorage.setItem("cell" + counter, actu_word);
    localStorage.setItem("cell" + counter + "_clicked", "0");
    document.getElementById("cell" + counter).className = "";
    document.getElementById("cell" + counter).innerHTML = actu_word;
  }
}

function loadWordsFromStorage() {
  const randomizedWords = JSON.parse(localStorage.getItem("full_list"));
  const language = localStorage.getItem("language");

  for (let counter = 0; counter < cells; counter++) {
    var element = document.getElementById("cell" + counter);
    //var actu_word = localStorage.getItem("cell" + counter);

    element.innerHTML = randomizedWords[language][counter];
    var already_clicked = "";
    var x = localStorage.getItem("cell" + counter + "_clicked");
    console.log(x);
    if (x !== "0") {
      element.className = "clicked";
    }
  }
  var first = document.getElementById("cell" + 0);
  first.click();
  first.click();
}

function randomize() {
  var randomizedWords = { de: [], en: [] };
  var temp_index = 0;

  for (const key of Object.keys(words.de)) {
    var i = 0;
    while (i < 2) {
      temp_index = Math.floor(Math.random() * words.de[key].length);
      if (!randomizedWords.de.includes(words.de[key][temp_index])) {
        i++;
        randomizedWords.de.push(words.de[key][temp_index]);
        randomizedWords.en.push(words.en[key][temp_index]);
      }
    }
  }

  var length = randomizedWords.de.length;
  while (length < 25) {
    temp_index = Math.floor(Math.random() * allgemein.de.length);
    if (!randomizedWords.de.includes(allgemein.de[temp_index])) {
      length++;
      randomizedWords.de.push(allgemein.de[temp_index]);
      randomizedWords.en.push(allgemein.en[temp_index]);
    }
  }

  return randomizedWords;
}

function changeLang(event) {
  var lang = event.value; // decide which language to display using switch case. The rest is obvious (i think)
  console.log(lang)
  switch (lang) {
    case "en":
      localStorage.setItem("language", "en");
      $("[lang]").hide();
      $('[lang="en"]').show();
      break;
    case "de":
      localStorage.setItem("language", "de");
      $("[lang]").hide();
      $('[lang="de"]').show();
      break;
    default:
      localStorage.setItem("language", "de");
      $("[lang]").hide();
      $('[lang="de"]').show();
  }
  loadWordsFromStorage();
}
