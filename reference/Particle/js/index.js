var c = document.getElementById("canv");
var $ = c.getContext('2d');
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var st = 1 / 90, t = 0;
function draw() {  
  $.globalCompositeOperation = "source-over";
  $.fillStyle = 'hsla(0, 0%, 0%, 1)';
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = "lighter";
  Math.seed = 4;
  for (var j = 0; j < 1500; j++) {
    var x = 4 * rnd() - 2 - Math.cos(3.14 * t);
    var y = 4 * rnd() - 2 - Math.sin(3.14 * t);
    if (x * x + y * y < 1) {
      var d = Math.pow(x * x + y * y, 1 / 4);
      x /= d; y /= d;
      var s = (2 + Math.sin(t * 2.2)) / 3;
      x *= s; y *= s;
      x = x * 100 + w / 2;
      y = y * 100 + h / 2;
      $.fillStyle = 'hsla(228, 100%, 85%, 1)';
      $.beginPath();
      $.arc(x, y, 1, 0, 2*Math.PI);
      $.fill();
    }
  }
  var cnt = 2.0;
  for (var i = 0; i < cnt; i++) {
    var val = cnt - 1 - i;
    noise($, c, w, h, Math.pow(1.8, 1.8 / Math.pow(1, val / 6)));}
  t += st;
  window.requestAnimationFrame(draw);
};
draw();
function noise($, c, w, h, sc) {
  $.save();
  $.translate(w / 2, h / 2);
  $.scale(sc, sc);
  $.translate(-w / 2, -h / 2);
  $.drawImage(c, 0,0);
  $.restore();
}
function rnd() {
  Math.seed = (Math.seed * 108013 + 2531011) & 0xffffffff;
  return Math.abs(Math.seed >> 16) / 32869;
}
window.addEventListener('resize',function(){
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
});