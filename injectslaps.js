/*
 * Author: Mikkel Madsen - m@madsn.net
 * 2013-05-19
 */
'use strict';

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

function buildBtn() {
  var btn = document.createElement('span');
  btn.innerHTML = ' · <a href="javascript:slap.play()">SLAP</a>';
  return btn;
}

function addSlaps(elements){
  for (var i in elements) {
    if (typeof elements[i] === 'object' && elements[i].innerHTML.indexOf('SLAP') < 0) {
      var parent = elements[i].parentNode;
      if (parent == undefined) return;
      var slapBtn = buildBtn();
      parent.appendChild(slapBtn);
    }
  }
}

var addInitial = function(){
  var elements = document.getElementsByClassName('uiLinkButton');
  addSlaps(elements);
};

addInitial();

// Handle elements inserted via ajax
document.addEventListener('DOMNodeInserted',
  function(event){
    if (event.srcElement.children && event.srcElement.children.length > 0) {
      var elements = event.srcElement.getElementsByClassName('uiLinkButton');
      addSlaps(elements);
    }
  }, false);