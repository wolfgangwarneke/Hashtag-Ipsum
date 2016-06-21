var stockBanks = [];
var output;

function Theme(name, words, description) {
  this.bankIndex = stockBanks.length;
  this.name = name;
  this.bank = words.split(',');
  this.description = description;
}

var theme1 = new Theme('TrumpSum', 'Donald Trump,barley,rye,wall,ipsum,lorem,oink,orange,build the wall,Make America Great Again,Ivanka,Youtube,memes,OMG,rich,eeeyuuuuge', 'this is our template description');
stockBanks.push(theme1);

var theme2 = new Theme('Clinton Ipsum', 'Stand with her,barley,rye,wall,ipsum,lorem,oink,orange,build the wall,Make America Great Again,Ivanka,Youtube,memes,OMG,rich,eeeyuuuuge', 'this is OTHER template');
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
    output += ". ";
    punctuationFlag = true;
  }
}

function ipsum(arrIndex, paragraphs) {
  var totalOutput = "";
  for (i = 0; i < paragraphs; i++) {
    output = "<p>";
    while (output.length < randoRange(320, 550)) {
      if (punctuationFlag) {
      output += capitalizeFirstLetter(stockBanks[arrIndex].bank[Math.floor(Math.random() * stockBanks[arrIndex].bank.length)]);
      punctuationFlag = false;
    } else {
      output += stockBanks[arrIndex].bank[Math.floor(Math.random() * stockBanks[arrIndex].bank.length)];
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
