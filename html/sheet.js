$().ready( function() {
    init();
});

var abilities = {
  Brawn:['Shield', 'Brawl', 'Carry', 'Weapon', 'Athletics'],
  Agility:['Shoot','Subterfuge','Dodge', 'Acrobatics', 'Drive', 'Legerdemain', 'Blue Collar'],
  Brains:['Knowledge', 'Medicine', 'Science' ,'Academics', 'Language', 'Survival', 'White Collar'],
  Social:['Act', 'Manipulate', 'Meet', 'Scrutinize', 'Culture', 'Etiquette', 'Command'],
//  Magic:['Earth','Air','Fire','Water'],
}

//these need padding...
var info = [
  ['Name', 'Player'], 
  ['Age', 'Race', 'Description'],
  ['Other']
]; //should this be nested arrays per line?

var ranks = [2,4];

function getRanks() {
  var txt = '<table class="ranks">';
  for (var i = 0; i < ranks[0] ; i++) {
    txt += '  <tr>';
    for (var j = 0; j < ranks[1] ; j++) {
      txt += '    <td>.&nbsp;</td>';
    }
    txt += '  </tr>';
  }
  txt += '</table>';
  return txt;
}

function mkRanks(rows, cols) {
  var txt = '<ul class="rks">';
  for (var i=0 ; i<rows ; i++) {
    for (var j=0 ; j<cols ; j++) {
      txt += '<li> </li>';
    }
    txt += '<br />';
  }
  return txt;
}

function input(s) {
  txt = '<input type="textfield" id="'+s+'" />';
  //txt = '<textarea></textarea>';
  return txt;
}


function init() {
  //info
  var txt = '';
  for (line in info) {
    txt += '<table><tr>'
    for (field in info[line]) {
      var i = info[line][field];
      txt += '<td class=field>' + input(i) + '<label for="'+i+'">'+i+'</label>' + '</td>';
    }
    txt += '</tr></table>';
    //txt += '<br />';
  }
  txt += '<div style="clear:both"> </div>';
  $('#character').html(txt);

  // create stat/skill lists (nomenclature: stat+skills = ability block)
  var txt = '';
  for (stat in abilities) {
    txt += '<div class="ability">'
    txt += '<div class="stat"><span class="stat-label">' + stat + '</span>' + getRanks() + '</div>'
    txt += '<ul class="skills">';
    for (skill in abilities[stat]) {
      var s = abilities[stat][skill]
      txt += '<li>&nbsp;<label for="'+s+'">' + s + '</label>' + getRanks() + input(s) + '</li>';
    }
    txt += '</ul>';
    txt += 'Chips: 0 / 3*stat</br >';
    txt += '</div>';
  }
  txt += '<div style="clear:both"> </div>';
  $('#abilities').html(txt);

  // health block
  var txt = '';
  txt = '<div class="ability">Health' + getRanks();
  txt += 'Armor' + getRanks();
  txt += '<br />(+HP) (+AR)(+HP) (+AR)(+HP) (+AR)(+HP) (+AR)(+HP) (+AR)';
  txt += '<br />HP ___ + equipped AR / MAX AR';
  txt += 'wound threshold = HP + E_AR        ruined threshold = 2xwound';
  txt += '<ul><li>Head</li><li>Torso</li><li>L. Arm</li><li>R. Arm</li><li>L. Leg</li><li>R. Leg</li></ul>';
  txt += '</div>';
  txt += mkRanks(1,5);
  $('#healthandmagic').html(txt);
  $('#healthandmagic td:even').html('+AR');
  $('#healthandmagic td:odd').html('+HP');

  //magic

  //event handlers
  $('.ranks').click(function() {
    var added = $(this).find('td:not(.check)').first().addClass('check');
    if (added.length < 1) {
      $(this).find('td').removeClass('check');
    }
    //can checked class be used to set red border for unset specialties?
  });
}

