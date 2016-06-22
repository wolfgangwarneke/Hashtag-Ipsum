var stockBanks = [];
var output;
var currentUserWordChoice = [];
var userBanks = {};
var punctuationFlag = false;

function Theme(name, words, description) {
  this.bankIndex = stockBanks.length;
  this.name = name;
  this.bank = words.split(',');
  this.description = description;
}

Theme.prototype.randBankIndex = function() {
  return this.bank[Math.floor(Math.random() * this.bank.length)];
}

var theme1 = new Theme('TrumpSum', 'Donald Trump,little hands,Wall Street,dump,Manhattan,lorem,hairpiece,"The Apprentice",build the wall,Make America Great Again,Ivanka,diet coke,ban,spray-can orange,rich,eeeyuuuuge,lawyers,Trump Steaks,taco bowl,pizza with a fork,small loan,million dollars,liquidate,you\'re fired,winning, Crooked Hillary', 'Make Lorem Ipsum Great Again.');
stockBanks.push(theme1);

var theme2 = new Theme('BioDipsum', 'Doyle,Bud,Biodome,paaaarty,buuuuuuuuuddy,babe,beer,save the environment,SHAVE THE POOCHIE POOCHIE! SHAVE THE POOCHIE POOCHIE!,wooooooooooo,WOOOOOO!', 'Greatest film of the nineties. A seminal American classic.');
stockBanks.push(theme2);
var themeList = "";

function loadThemeMenu() {
  $('#themes').empty();
  themeList = "";
  themeList += "<option selected disabled>Load an Ipsum</option>";
  //user bank
  Object.keys(userBanks).forEach(function(userBankKey) {
    themeList += "<option val='" + userBanks[userBankKey].name + "'>" + userBanks[userBankKey].name + "</option>";
  });

  //user bank end
  for (i = 0; i < stockBanks.length; i++) {
    themeList += "<option value='" + stockBanks[i].bankIndex + "'>" + stockBanks[i].name + "</option>";
  }
  $('#themes').append(themeList);
}

$('#themes').change(function() {
  if (!isNaN(parseInt($('#themes').val()))) {
    $('#themeDescription p').text(stockBanks[$('#themes').val()].description);
  } else {
    $('#themeDescription p').text('Sweet user bank, breh!');
  }
});

$('#oneWord').on('click', function() {
  if (!isNaN(parseInt($('#themes').val()))) {
  output = stockBanks[$('#themes').val()].randBankIndex();
  }
  $('#ipsumOutput').html('<h3>' + output + '</h3>');
});

loadThemeMenu();

function randoRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}



function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function chanceOfPunctuation() {
  if (randoRange(0, 100) < 15) {
    output = output.trimRight();
    if (randoRange(0, 100) < 25) {
      output += "! ";
    } else if (randoRange(0, 100) < 25) {
      output += "? ";
    } else {
      output += ". ";
    }
    punctuationFlag = true;
  }
}

function chanceOfFillerWord(percentage) {
  if (randoRange(0, 100) < percentage) {
    var fillerWords = ['the', 'or', 'and', 'what'];
    output += " " + fillerWords[Math.floor(Math.random() * fillerWords.length)];
  }
}

function ipsum(arrIndex, paragraphs) {
  var totalOutput = "";
  var i;
  for (i = 0; i < paragraphs; i++) {
    output = "<p>";
    var firstWord = true;
    while (output.length < randoRange(320, 550)) {
      if (punctuationFlag) {
      output += capitalizeFirstLetter(stockBanks[arrIndex].randBankIndex());
      punctuationFlag = false;
    } else {
      if (firstWord) {
        output += capitalizeFirstLetter(stockBanks[arrIndex].randBankIndex());
        firstWord = false;
      } else {
        output += stockBanks[arrIndex].randBankIndex();
        chanceOfFillerWord(23);
      }
    }
      output += " ";
      chanceOfPunctuation();
    }
    output += stockBanks[arrIndex].randBankIndex();
    output += ".</p>";
    totalOutput += output;
  }
  return totalOutput;
}

$('#ipsumForm').submit(function(event) {
  event.preventDefault();
  if (!isNaN(parseInt($('#themes').val()))) {
    $('#ipsumOutput').html(ipsum($('#themes').val(), parseInt($('#paragraphs').val())));
  } else {
    $('#ipsumOutput').html(userIpsum($('#themes').val(), parseInt($('#paragraphs').val())));
  }
});




/////////////////
///USER GENERATOR
/////////////////

function userIpsum(arrKey, paragraphs) {
  var totalOutput = "";
  var i;
  for (i = 0; i < paragraphs; i++) {
    output = "<p>";
    var firstWord = true;
    while (output.length < randoRange(320, 550)) {
      if (punctuationFlag) {
      output += capitalizeFirstLetter(userBanks[arrKey].randBankIndex());
      punctuationFlag = false;
    } else {
      if (firstWord) {
        output += capitalizeFirstLetter(userBanks[arrKey].randBankIndex());
        firstWord = false;
      } else {
        output += userBanks[arrKey].randBankIndex();
        chanceOfFillerWord(23);
      }
    }
      output += " ";
      chanceOfPunctuation();
    }
    output += userBanks[arrKey].randBankIndex();
    output += ".</p>";
    totalOutput += output;
  }
  return totalOutput;
}

function updateUserLoader() {
  var userOptionList = "";
  userOptionList += "<option selected disabled>Load yer Ipsum</option>";
  Object.keys(userBanks).forEach(function(userBankKey) {
    userOptionList += "<option val='" + userBanks[userBankKey].name + "'>" + userBanks[userBankKey].name + "</option>";
  });
  $('#userLoaderPicker').html(userOptionList);
}


$('#userLoader').submit(function(event) {
  event.preventDefault();
  $('#stagingArea ul').empty();
  var userBankAccessKey = $('#userLoaderPicker').val();
  var currentBank = userBanks[userBankAccessKey];
  $('#nameBank').val(currentBank.name);
  $('#stagingArea ul').empty();
  currentBank.bank.forEach(function(lexicalUnit) {
    $('#stagingArea ul').append("<li>" + lexicalUnit + "</li>");
  });
});


$('#addWords').submit(function(event) {
  event.preventDefault();
  if ($('#wordAdd').val() !== '') {
  $('#stagingArea ul').append("<li>" + $('#wordAdd').val() + "</li>");
  currentUserWordChoice.push($('#wordAdd').val());
  }
  $('#wordAdd').val('')
});

$('#saveUserBank').submit(function(event) {
  event.preventDefault();
  var userBankName = $('#nameBank').val();
  userBanks[userBankName] = new Theme(userBankName, currentUserWordChoice.join(), "no description, user bank");
  $('#nameBank').val('');
  updateUserLoader();
  loadThemeMenu();
  $('#stagingArea ul').empty();
  currentUserWordChoice = [];
});
