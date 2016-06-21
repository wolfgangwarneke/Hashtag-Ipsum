var stockBanks = [];

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
  var output = stockBanks[$('#themes').val()].bank[Math.floor(Math.random() * stockBanks[$('#themes').val()].bank.length)];
  $('#ipsumOutput').html('<h3>' + output + '</h3>');
});

loadThemeMenu();
