'use strict';

function getSlapCount(fbId, cb){
  if (!fbId) return;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      cb(xhr.responseText, fbId);
    }
  };
  xhr.open("GET", "https://localhost.com/api/1/slaps/get/" + fbId, true);
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
  xhr.open("GET", "https://localhost.com/api/1/slaps/add/" + fbId, true);
  xhr.send();
}

function getFacebookId(node){
  var child = node.parentNode.parentNode.parentNode.childNodes[2];
  if (child){
    var x = JSON.parse(child.value);
    return x.target_fbid;
  } else {
    var href = (node.childNodes[4]) ? node.childNodes[4].href : null;
    if (href) {
      console.log(href);
      return href.substring(href.indexOf('&id=') + 4);
    }
    return null;
  }
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
  btn.innerHTML = ' · <a id="slaps' + fbId + '" href="javascript:slap.play()">SLAP</a>';
  return btn;
}

function addListener(btn, fbId){
  btn.onclick = function(){
    sendAddSlap(fbId, function(count){
      document.getElementById('slaps' + fbId).innerHTML = 'SLAPS (' + count + ')';
    });
  };
}

function addSlaps(elements){
  for (var i in elements) {
    var elem = elements[i];
    if (typeof elem === 'object') {
      var parent = (elem.className == 'share_action_link') ? elem.parentNode : elem;
      if (parent == undefined) continue;
      console.log('getting fbid for: ', parent);
      var fbId = getFacebookId(parent);
      var slapBtn = buildBtn(fbId);
      parent.appendChild(slapBtn);
      addListener(slapBtn, fbId);
      getSlapCount(fbId, function(count, fbId){
        document.getElementById('slaps' + fbId).innerHTML = 'SLAPS (' + count + ')';
      });
    }
  }
}

var addInitial = function(){
  addSlaps(document.getElementsByClassName('UIActionLinks'));
  addSlaps(document.getElementsByClassName('share_action_link'))
};
addInitial();

// Handle elements inserted via ajax
document.addEventListener('DOMNodeInserted',
  function(event){
    if (event.srcElement.children && event.srcElement.children.length > 0) {
      addSlaps(event.srcElement.getElementsByClassName('share_action_link'))
    }
  }, false);
