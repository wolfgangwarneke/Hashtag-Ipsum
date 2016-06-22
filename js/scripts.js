var stockBanks = {};
var themeList = "";
var output;
var currentUserWordChoice = [];
var userBanks = {};
var punctuationFlag = false;

/////////////////////////////////////////////////
////////////// Stock Ipsum Banks ////////////////

stockBanks['TrumpSum'] = new Theme('TrumpSum', 'Donald Trump,little hands,Wall Street,dump,Manhattan,lorem,hairpiece,"The Apprentice",build the wall,Make America Great Again,Ivanka,diet coke,ban,spray-can orange,rich,eeeyuuuuge,lawyers,Trump Steaks,taco bowl,pizza with a fork,small loan,million dollars,liquidate,you\'re fired,winning, Crooked Hillary', 'Make Lorem Ipsum Great Again.');

stockBanks['BioDipsum'] = new Theme('BioDipsum', 'Doyle,Bud,Biodome,paaaarty,buuuuuuuuuddy,babe,beer,save the environment,SHAVE THE POOCHIE POOCHIE! SHAVE THE POOCHIE POOCHIE!,wooooooooooo,WOOOOOO!', 'Greatest film of the nineties. A seminal American classic.');

/////////////////////////////
/////////////////////////////

function bothBanks() {
  var bothBanks = {};
  for (var key in stockBanks) {
    bothBanks[key] = stockBanks[key];
  }
  for (var key in userBanks) {
    bothBanks[key] = userBanks[key];
  }
  return bothBanks;
}

function Theme(name, words, description) {
  this.bankIndex = stockBanks.length;
  this.name = name;
  this.bank = words.split(',');
  this.description = description;
}

Theme.prototype.randBankIndex = function() {
  return this.bank[Math.floor(Math.random() * this.bank.length)];
}

function loadThemeMenu() {
  $('#themes').empty();
  themeList = "";
  themeList += "<option selected disabled>Load an Ipsum</option>";
  Object.keys(userBanks).forEach(function(BankKey) {
    themeList += "<option val='" + userBanks[BankKey].name + "'>" + userBanks[BankKey].name + "</option>";
  });
  ///banks seperate, object keys does not guarantee order
  Object.keys(stockBanks).forEach(function(BankKey) {
    themeList += "<option val='" + stockBanks[BankKey].name + "'>" + stockBanks[BankKey].name + "</option>";
  });
  $('#themes').append(themeList);
}

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

function ipsum(objKey, paragraphs) {
  var bothIpsumBanks = bothBanks();
  var totalOutput = "";
  var i;
  for (i = 0; i < paragraphs; i++) {
    output = "<p>";
    var firstWord = true;
    while (output.length < randoRange(320, 550)) {
      if (punctuationFlag) {
      output += capitalizeFirstLetter(bothIpsumBanks[objKey].randBankIndex());
      punctuationFlag = false;
    } else {
      if (firstWord) {
        output += capitalizeFirstLetter(bothIpsumBanks[objKey].randBankIndex());
        firstWord = false;
      } else {
        output += bothIpsumBanks[objKey].randBankIndex();
        chanceOfFillerWord(23);
      }
    }
      output += " ";
      chanceOfPunctuation();
    }
    output += bothIpsumBanks[objKey].randBankIndex();
    output += ".</p>";
    totalOutput += output;
  }
  return totalOutput;
}

/////////////////////////////
//////// *on page load* /////

loadThemeMenu();

$('#themes').change(function() {
  $('#themeDescription p').text(bothBanks()[$('#themes').val()].description);
});

$('#oneWord').on('click', function() {
  output = bothBanks()[$('#themes').val()].randBankIndex();
  $('#ipsumOutput').html('<h3>' + output + '</h3>');
});

$('#ipsumForm').submit(function(event) {
  event.preventDefault();
  $('#ipsumOutput').html(ipsum($('#themes').val(), parseInt($('#paragraphs').val())));
});


/////////////////
///USER GENERATOR
/////////////////

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
    currentUserWordChoice.push(lexicalUnit);
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

$('#stagingArea ul').on('click', 'li', function() {
  currentUserWordChoice.splice(currentUserWordChoice.indexOf($(this).text()), 1);
  $(this).remove();
});
