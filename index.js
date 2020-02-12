// Sliders
$('#fontSize, #strokeSize').slider({});

$('#fontSizeViewport, #horizontalMove, #verticalMove, #horizontalShrink, #verticalShrink').slider({});

$('input[type=number]').on('slide', function () {
  update();
});

// Colorpickers
$('#fontColor, #strokeColor').colorpicker().on('changeColor', function () {
  update();
});

// Other

$('#fontFamily').change(function () {
  update();
});

$('#fontTexture').change(function ($event) {
  let t = $event.target.value;

  if (t === 'Color') {
    $('.area').css(
      'background', `none`,
    ).css({
      'color': 'rgb(246, 214, 72)',
      '-webkit-text-fill-color': 'initial',
    })
  } else {
    $('.area').css({
        'background': `url(${t}.png) no-repeat center center`,
        '-webkit-text-fill-color': 'transparent',
      }
    )
  }

});

function updateTexture() {

}

window.addEventListener('resize', update);

// Functions
function update() {
  // get form values
  const fontFamily = $('#fontFamily').val();
  const fontSize = $('#fontSize').slider('getValue');
  const strokeSize = $('#strokeSize').slider('getValue');
  const xAxis = $('#horizontalMove').slider('getValue');
  const yAxis = $('#verticalMove').slider('getValue');
  const xShrink = $('#horizontalShrink').slider('getValue');
  const yShrink = $('#verticalShrink').slider('getValue');

  const fontColor = $('#fontColor').val();
  const strokeColor = $('#strokeColor').val();

  // update css
  const $preview = $('#preview');
  $preview.css('font-family', fontFamily);
  $preview.css('color', fontColor);

  let viewPortSize = $('#fontSizeViewport').slider('getValue');

  $('#preview1').css('font-size', viewPortSize + 'vmin');
  $preview.css('font-size', viewPortSize + 'vmin');

  $preview.css('text-shadow', '');

  let arr = [];
  let fontSizeCoeff = 0.5 + (viewPortSize / 20) / 2;
  let vmin = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
  let viewPortCoeff = 1 + Math.log2(vmin / 320);
  let step = (1 / (strokeSize * (7 / 0.5))) / fontSizeCoeff / viewPortCoeff;
  // console.log((2 * Math.PI) / step , viewPortSize);
  for (let angle = 0; strokeSize > 0 && angle < 2 * Math.PI; angle += step) {
    let nextShadow = appendShadow(
      strokeSize * (xAxis + Math.cos(angle) * xShrink),
      strokeSize * (yAxis + Math.sin(angle) * yShrink),
      strokeColor);
    arr.push(nextShadow);
  }

  $preview.css('text-shadow', arr.join(', '));
}

function appendShadow(x, y, col) {
  let coeff = 0.24;
  col = 'rgb(129, 39, 21)';
  return `${x * coeff}em ${y * coeff}em ${col}`;
}

update();