/*
 * Author: Mikkel Madsen - m@madsn.net
 * 2013-05-19
 */
'use strict';
var audioElem = document.createElement('audio');
audioElem.id = 'slap';
audioElem.preload = true;
var audioMp3 = document.createElement('source');
audioMp3.type = 'audio/mpeg';
audioMp3.src = 'http://madsn.net/files/slap.mp3';
audioElem.appendChild(audioMp3);
var audioOgg = document.createElement('source');
audioOgg.type = 'audio/ogg';
audioOgg.src = 'http://madsn.net/files/slap.ogg';
audioElem.appendChild(audioOgg);
document.head.appendChild(audioElem);

var addSlaps = function(){
  var posts = document.getElementsByClassName('UIActionLinks_bottom');
  for (var p in posts){
    if (typeof posts[p] === 'object' && posts[p].innerHTML.indexOf('SLAP') < 0){
      var slapBtn = document.createElement('span');
      if (posts[p].parentElement.className.indexOf('Timeline') > -1 ||
        posts[p].parentElement.className.indexOf('Photos') > -1 ||
        posts[p].parentElement.className.indexOf('comment') > -1){
        // Placement for timelines/profiles/theater view
        slapBtn.innerHTML = ' · <a href="javascript:slap.play()">SLAP</a>';
      }else{
        // placement for main page
        slapBtn.innerHTML = '<a href="javascript:slap.play()">SLAP</a> · ';
      }
      posts[p].appendChild(slapBtn);
    }
  }
};
addSlaps();
document.addEventListener('DOMNodeInserted', addSlaps, false);
