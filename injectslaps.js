'use strict';

function getSlapCount(fbId, cb){
  console.log('FB-SLAP: getting slap count for ID:', fbId);
  if (!fbId) return;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      cb(xhr.responseText, fbId);
    }
  };
  xhr.open("GET", "https://fb-backend.herokuapp.com/api/1/slaps/get/" + fbId, true);
  xhr.send();
}

function sendAddSlap(fbId, cb){
  console.log('FB-SLAP: sending slap for ID', fbId);
  if (!fbId) return;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      cb(xhr.responseText);
    }
  };
  xhr.open("GET", "https://fb-backend.herokuapp.com/api/1/slaps/add/" + fbId, true);
  xhr.send();
}

var baseUrl = 'http://static.zpc.dk/facebook-slap/';

var audioElem = document.createElement('audio');
audioElem.id = 'slap';
audioElem.preload = true;

var audioMp3 = document.createElement('source');
audioMp3.type = 'audio/mpeg';
audioMp3.src = baseUrl + 'slap.mp3';
audioElem.appendChild(audioMp3);

var audioOgg = document.createElement('source');
audioOgg.type = 'audio/ogg';
audioOgg.src = baseUrl + 'slap.ogg';
audioElem.appendChild(audioOgg);

document.head.appendChild(audioElem);

function buildBtn(fbId) {
  var btn = document.createElement('span');
  btn.innerHTML = ' · <a class="slaps' + fbId + '" href="javascript:slap.play()">SLAP</a>';
  return btn;
}

function updateElementsCount(fbId, count) {
  console.log('FB-SLAP: updating element count for ID:', fbId);
  var elements = document.getElementsByClassName('slaps' + fbId);
  for (var i in elements){
    if (typeof elements[i] != 'object') continue;
    elements[i].innerHTML = 'SLAPS (' + count + ')';
  }
}

function addListener(btn, fbId){
  btn.onclick = function(){
    sendAddSlap(fbId, function(count){
      updateElementsCount(fbId, count);
    });
  };
}

function getFacebookId(elem){
  var pattern = /_[^\s]+_/;
  return elem.className.match(pattern)[0].slice(1, -1);
}

function appendBtn(elem, btn){
  elem.childNodes[4].childNodes[0].appendChild(btn);
  elem.classList.add('processed');
}

function addSlaps(elements){
  for (var i in elements) {
    var elem = elements[i];
    if (typeof elem === 'object' && elem.className.indexOf('processed') === -1) {
      var fbId = getFacebookId(elem);
      var slapBtn = buildBtn(fbId);
      appendBtn(elem, slapBtn);
      addListener(slapBtn, fbId);
      getSlapCount(fbId, function(count, fbId){
        updateElementsCount(fbId, count);
      });
    }
  }
}

var addInitial = function(){
  addSlaps(document.getElementsByClassName('commentable_item'));
};
addInitial();

// Handle elements inserted via ajax
document.addEventListener('DOMNodeInserted',
  function(event){
    if (event.srcElement.children && event.srcElement.children.length > 0) {
      addSlaps(event.srcElement.getElementsByClassName('commentable_item'));
    }
  }, false);
