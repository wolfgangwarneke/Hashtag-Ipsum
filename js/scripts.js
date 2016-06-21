var stockBanks = [];
var output;

function Theme(name, words, description) {
  this.bankIndex = stockBanks.length;
  this.name = name;
  this.bank = words.split(',');
  this.description = description;
}

var theme1 = new Theme('TrumpSum', 'Donald Trump,little hands,Wall Street,dump,Manhattan,lorem,hairpiece,"The Apprentice",build the wall,Make America Great Again,Ivanka,diet coke,ban,spray-can orange,rich,eeeyuuuuge,lawyers,Trump Steaks,taco bowl,pizza with a fork,small loan,million dollars,liquidate,you\'re fired, winning, Crooked Hillary', 'Make Lorem Ipsum Great Again.');
stockBanks.push(theme1);

var theme2 = new Theme('BioDipsum', 'Doyle,Bud,Biodome,paaaarty,buuuuuuuuuddy,babe,beer,save the environment,SHAVE THE POOCHIE POOCHIE! SHAVE THE POOCHIE POOCHIE!,wooooooooooo,WOOOOOO!', 'Greatest film of the nineties. A seminal American classic.');
stockBanks.push(theme2);


function loadThemeMenu() {
  $('#themes').empty();
  var themeList = "";
  themeList += "<option selected disabled>Load an Ipsum</option>";
  for (i = 0; i < stockBanks.length; i++) {
    themeList += "<option value='" + stockBanks[i].bankIndex + "'>" + stockBanks[i].name + "</option>";
  }
  $('#themes').append(themeList);
}

$('#themes').change(function() {
  $('#themeDescription p').text(stockBanks[$('#themes').val()].description);
});

$('#oneWord').on('click', function() {
  output = stockBanks[$('#themes').val()].bank[Math.floor(Math.random() * stockBanks[$('#themes').val()].bank.length)];
  $('#ipsumOutput').html('<h3>' + output + '</h3>');
});

loadThemeMenu();

function randoRange(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

var punctuationFlag = false;

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
      output += capitalizeFirstLetter(stockBanks[arrIndex].bank[Math.floor(Math.random() * stockBanks[arrIndex].bank.length)]);
      punctuationFlag = false;
    } else {
      if (firstWord) {
        output += capitalizeFirstLetter(stockBanks[arrIndex].bank[Math.floor(Math.random() * stockBanks[arrIndex].bank.length)]);
        firstWord = false;
      } else {
        output += stockBanks[arrIndex].bank[Math.floor(Math.random() * stockBanks[arrIndex].bank.length)];
        chanceOfFillerWord(23);
      }
    }
      output += " ";
      chanceOfPunctuation();
    }
    output += stockBanks[arrIndex].bank[Math.floor(Math.random() * stockBanks[arrIndex].bank.length)];
    totalOutput += output;
  }
  return totalOutput;
}

$('#ipsumForm').submit(function(event) {
  event.preventDefault();
  $('#ipsumOutput').html(ipsum($('#themes').val(), parseInt($('#paragraphs').val())));
});




/////////////////
///USER GENERATOR
/////////////////
var currentUserWordChoice = [];
var userBanks = {};

$('#userGenerator').submit(function(event) {
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
});
