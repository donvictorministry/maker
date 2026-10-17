function enc(d){return ((d*7+13)^90);}
function toast(m){var t=document.getElementById('t');t.textContent=m;t.className='toast show';setTimeout(function(){t.className='toast';},2200);}
document.getElementById('go').onclick=function(){
  var lines=document.getElementById('in').value.split('\n').map(function(l){return l.trim();}).filter(Boolean);
  var warn=document.getElementById('warn'),used={},out=[],names=[],err='';
  if(lines.length>20)err='Maximum is 20 people.';
  lines.slice(0,20).forEach(function(l,i){
    var p=l.lastIndexOf(','),name=(p<0?'':l.slice(0,p)).trim().replace(/['"\\<>]/g,''),pin=(p<0?l:l.slice(p+1)).trim();
    if(!/^\d{4}$/.test(pin)){err='Line '+(i+1)+': PIN must be exactly 4 digits.';return;}
    if(used[pin]){err='Line '+(i+1)+': PIN '+pin+' is already used.';return;}
    used[pin]=1;
    var id='U'+('0'+(i+1)).slice(-2);
    out.push("        { id: '"+id+"', name: '"+(name||id)+"', pin: ["+pin.split('').map(function(c){return enc(+c);}).join(', ')+"], blocked: false }");
    names.push(name||id);
  });
  warn.textContent=err;
  if(err)return;
  document.getElementById('o1').textContent='    var USERS = [\n'+out.join(',\n')+'\n    ];';
  document.getElementById('o2').textContent=names.join('\n');
};
[].forEach.call(document.querySelectorAll('.cp'),function(b){b.onclick=function(){
  var t=document.getElementById(b.getAttribute('data-t')).textContent;
  if(!t){toast('Generate first.');return;}
  (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){toast('Copied');},function(){toast('Press and hold the text to copy.');});
};});