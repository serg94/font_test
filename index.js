// Sliders
$('#fontSize, #strokeSize').slider({
  formatter: function (value) {
    return value + 'px';
  }
});

$('#horizontalMove, #verticalMove, #horizontalShrink, #verticalShrink').slider({});

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
  $preview.css('font-size', fontSize);

  $('#preview1').css('font-size', fontSize);

  $preview.css('text-shadow', '');

  for (let angle = 0; angle < 2 * Math.PI; angle += 1 / strokeSize) {
    appendShadow($preview,
      strokeSize * xAxis + Math.cos(angle) * xShrink * strokeSize,
      strokeSize * yAxis + Math.sin(angle) * yShrink * strokeSize,
      strokeColor);
  }

  // update code preview
  $('pre').html('text-shadow: ' + $preview.css('text-shadow') + ';');
}

function appendShadow(item, x, y, col) {
  col = 'rgb(129, 39, 21)';
  // compute new text-shadow property
  let textShadow = '';
  if (item.css('text-shadow') !== 'none') {
    textShadow = item.css('text-shadow') + ', ';
  }
  textShadow = textShadow + x + 'px ' + y + 'px ' + col;

  // apply new text-shadow property
  item.css('text-shadow', textShadow);
}

update();