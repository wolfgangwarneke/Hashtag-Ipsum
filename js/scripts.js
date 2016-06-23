var stockBanks = {};
var output;
var themeList = '';
var currentUserWordChoice = [];
var userBanks = {};
var punctuationFlag = false;


////// COOKIE ///////
function writeCookie() {
  var d = new Date();
  d.setTime(d.getTime() + (1234*24*60*60*1000));//firstvalueisdays
  var expires = "expires="+d.toUTCString();
  document.cookie = "stored=" + JSON.stringify(userBanks) + ";" + expires;
}
function readCookie() {

  var name = "stored=";
  var ca = document.cookie.split(';');
  for (i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      userBanks = JSON.parse(c.substring(name.length, c.length));
    }
  }
}

function themeifyStoredBanks() {
  for (var key in userBanks) {
    userBanks[key] = new Theme(userBanks[key].name, userBanks[key].bank.join(), userBanks[key].description);
  }
}

readCookie();
themeifyStoredBanks();

//////////////


/////////////////////////////////////////////////
////////////// Stock Ipsum Banks ////////////////

stockBanks['TrumpSum'] = new Theme('TrumpSum', 'Donald Trump,little hands,Wall Street,dump,Manhattan,lorem,hairpiece,"The Apprentice",build the wall,Make America Great Again,Ivanka,diet coke,ban,spray-can orange,rich,eeeyuuuuge,lawyers,Trump Steaks,taco bowl,pizza with a fork,small loan,million dollars,liquidate,you\'re fired,winning,Crooked Hillary,beautiful,apocalyptic,tremendous,Lyin\' Ted,Little Marco', 'Build your own wall of filler text');

stockBanks['YeezIpsum'] = new Theme('YeezIpsum', 'Kanye West,Yeezus,the life of Pablo,create art,dark twisted fantasy,my beautiful,Kardashians,Kim,watch the throne,emotional over fonts,Wicked is my story,fur pillows,hobo couture,leatherpants,mic drop,king,lamborgini mercy,bank-rupt,motorcycle,Imma let you finish', 'The Ipsum of a Generation');

stockBanks['Bi-Winning-Ipsum'] = new Theme('Bi-Winning-Ipsum', 'Charlie Sheen,winning,I am on a drug called Charlie Sheen,rock star from Mars,rolling out Magic,bro,sober,dying is for fools,I\'m not dangerous insane,boom,Vatican assassin warlocks,seven gram rocks,party,partying,drinking,breakfast,heavy drinking,bi-winning,duh,I\'m still alive,breakfast martini', 'Boom. Winning Ipsum. Duh!');
/////////////////////////////
/////////////////////////////

function fontChanger() {

}

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

function Theme(name, words, description, themePic, themeColor) {
  this.bankIndex = stockBanks.length;
  this.name = name;
  this.bank = words.split(',');
  this.description = description;
  this.themePic = themePic;
  this.themeColor = themeColor;
}

Theme.prototype.randBankIndex = function() {
  return this.bank[Math.floor(Math.random() * this.bank.length)];
}

function addKeysToThemelist(bank) {
  Object.keys(bank).forEach(function(BankKey) {
    themeList += "<option val='" + bank[BankKey].name + "'>" + bank[BankKey].name + "</option>";
  });
}

function loadThemeMenu() {
  $('#themes').empty();
  themeList = "<option selected disabled>Load an Ipsum</option>";
  addKeysToThemelist(userBanks);
  addKeysToThemelist(stockBanks);
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
updateUserLoader();

function themeIdValue() {
  return $('#themes').val();
}

function setThemeColor(targetElement) {
  targetElement.style.backgroundColor = "" + bothBanks()[themeIdValue()].themeColor + "";
}

$('#themes').change(function() {
  $('#themeDescription').text(bothBanks()[themeIdValue()].description);
  $('#nameDisplay').text(bothBanks()[themeIdValue()].name);
  $('body').attr('id', bothBanks()[themeIdValue()].name);
  if (bothBanks()[themeIdValue()].name === 'YeezIpsum') {
    $('.hero').html('<img src="img/' + bothBanks()[themeIdValue()].name + '.jpg">');
  } else if (bothBanks()[themeIdValue()].name === 'TrumpSum' || bothBanks()[themeIdValue()].name === 'Bi-Winning-Ipsum') {
    $('.hero').html('<img src="img/' + bothBanks()[themeIdValue()].name + '.png">');
  } else {
    $('.hero').html('<img src="' + bothBanks()[themeIdValue()].themePic + '">');
    $(".header-background").each(function() {
      setThemeColor(this);
    });
  }
});

$('#oneWord').on('click', function() {
  output = bothBanks()[themeIdValue()].randBankIndex();
  $('#ipsumOutput').html('<h3>' + output + '</h3>');
});

$('#ipsumForm').submit(function(event) {
  event.preventDefault();
  $('#ipsumOutput').html(ipsum(themeIdValue(), parseInt($('#paragraphs').val())));
});

///USER GENERATOR

function updateUserLoader() {
  var userOptionList = '';
  userOptionList = "<option selected disabled>Load yer Ipsum</option>";
  Object.keys(userBanks).forEach(function(userBankKey) {
    userOptionList += "<option val='" + userBanks[userBankKey].name + "'>" + userBanks[userBankKey].name + "</option>";
  });
  $('#userLoaderPicker').html(userOptionList);
}
$('#saveUserBank').submit(function(event) {
  event.preventDefault();
  var userBankDescription = $('#bankDescription').val();
  var userBankThemePic = $('#bankThemePic').val();
  var userBankThemeColor = $('#bankThemeColor').val();
  var userBankName = $('#nameBank').val();
  userBanks[userBankName] = new Theme(userBankName, currentUserWordChoice.join(), userBankDescription, userBankThemePic, userBankThemeColor);
  $('#nameBank, #bankDescription, #bankThemePic, #bankThemeColor').val('');
  updateUserLoader();
  loadThemeMenu();
  writeCookie();
  $('#stagingArea ul').empty();
  currentUserWordChoice = [];
});
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
$('#userDelete').click(function() {
  if (confirm('Arey you sure you would like to delete this bank?')) {
    delete userBanks[$('#userLoaderPicker').val()];
    updateUserLoader();
    loadThemeMenu();
    writeCookie();
    $('#nameBank, #bankDescription').val('');
    $('#stagingArea ul').empty();
  }
});
$('#addWords').submit(function(event) {
  event.preventDefault();
  if ($('#wordAdd').val() !== '') {
  $('#stagingArea ul').append("<li>" + $('#wordAdd').val() + "</li>");
  currentUserWordChoice.push($('#wordAdd').val());
  }
  $('#wordAdd').val('');
});
$('#stagingArea ul').on('click', 'li', function() {
  currentUserWordChoice.splice(currentUserWordChoice.indexOf($(this).text()), 1);
  $(this).remove();
});
