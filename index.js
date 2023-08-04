(function () {
  var pre = document.querySelector("#donut");

  var A = 1, B = 1, R1 = 1,
    R2 = 1, K1 = 150, K2 = 5;

  function renderFrame() {
    var b = [], z = [];
    var width = 280, height = 160;

    A += 0.07;
    B += 0.03;

    var sinA = Math.sin(A), cosA = Math.cos(A),
      sinB = Math.sin(B), cosB = Math.cos(B);

    for (var j = 0; j < width * height; j++) {
      b[j] = j % width == width - 1 ? '\n' : ' ';
      z[j] = 0;
    }

    for (var k = 0; k < 6.28; k += 0.07) {
      var sK = Math.sin(k), cK = Math.cos(k);

      for (var i = 0; i < 6.28; i += 0.02) {
        var sI = Math.sin(i), cI = Math.cos(i),
          h = cK + 2, D = 1 / (sI * h * sinA + sK * cosA + 5),
          t = sI * h * cosA - sK * sinA;

        var x = Math.floor(width / 2 + (width / 4) * D * (cI * h * cosB - t * sinB)),
          y = Math.floor(height / 2 +(height / 4) * D * (cI * h * sinB + t * cosB));

        var o = x + width * y,
          N = Math.floor(8 * ((sK * sinA - sI * cK * cosA) * cosB - sI * cK * sinA - sK * cosA - cI * cK * sinB));

        if (height > y && y >= 0 && x >= 0 && width > x && D > z[o]) {
          z[o] = D;
          b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
        }
      }
    }

    pre.innerHTML = b.join('');
  }

  function startAnimation() {
    window.asciiIntervalId = setInterval(renderFrame, 50);
  }

  startAnimation();

  if (document.all) window.attachEvent('onload', startAnimation);
  else window.addEventListener('load', startAnimation, false);

  window.addEventListener('resize', renderFrame, false);
})();
