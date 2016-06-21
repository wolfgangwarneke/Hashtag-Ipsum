var stockBanks = [];

function Theme(variable, name, words, description) {
  this.varName = variable;
  this.name = name;
  this.bank = words.split(',');
  this.description = description;
}

var theme1 = new Theme('theme1', 'TrumpSum', 'Donald Trump,barley,rye,wall,ipsum,lorem,oink,orange,build the wall,Make America Great Again,Ivanka,Youtube,memes,OMG,rich,eeeyuuuuge', 'this is our template description');
stockBanks.push(theme1);

var theme2 = new Theme('theme2', 'Clinton Ipsum', 'Stand with her,barley,rye,wall,ipsum,lorem,oink,orange,build the wall,Make America Great Again,Ivanka,Youtube,memes,OMG,rich,eeeyuuuuge', 'this is OTHER template');
stockBanks.push(theme2);


function loadThemeMenu() {
  $('#themes').empty();
  var themeList = "";
  themeList += "<option selected disabled>Load an Ipsum</option>";
  for (i = 0; i < stockBanks.length; i++) {
    themeList += "<option value='" + stockBanks[i].varName + "'>" + stockBanks[i].name + "</option>";
  }
  $('#themes').append(themeList);
}

$('#themes').change(function() {
  $('#themeDescription p').text(window[$('#themes').val()].description);
});

loadThemeMenu();
