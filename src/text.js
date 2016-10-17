import splitTextToLines from './text-wrapper'

const DEFAULT = {
  ALPHA : 1,
  FONT_SIZE : 15,
  FONT_FAMILY : 'serif',
  FONT_COLOR : 'black',
  TEXT_ALIGN : 'center',
  TEXT_BASELINE : 'middle'
}

function textLines(context, data, width) {
  if(!data)
    return [];

  var lines = splitTextToLines(
    context,
    data,
    width,
    true
  );

  return lines;
}

function font(style) {
  var {
    fontFamily = DEFAULT.FONT_FAMILY,
    bold = false,
    italic = false,
    fontSize = DEFAULT.FONT_SIZE
  } = style;

  var fonts = []

  bold && fonts.push('bold');
  italic && fonts.push('italic');
  fonts.push(fontSize + 'px');
  fonts.push(fontFamily);

  return fonts.join(' ')
}

export default function text(context, bounds, data, style) {

  var {
    alpha = DEFAULT.FONT_COLOR,
    fontColor = DEFAULT.FONT_COLOR,
    textAlign = DEFAULT.TEXT_ALIGN,   // left, right, center, justify
    textBaseline = DEFAULT.TEXT_BASELINE,
    fontSize = DEFAULT.FONT_SIZE,
    lineHeight = fontSize * 1.2
  } = style;

  // 1. context를 준비.
  context.save();
  context.beginPath();

  // 2. TODO 스타일을 이용해서 텍스트 바운드를 구해야 함.
  var {
    left,
    top,
    width,
    height
  } = bounds;

  // 3. context의 font를 설정
  context.font = font(style);

  // 4. 총 텍스트 라인을 계산한다.
  var lines = textLines(context, String((data === undefined) ? '' : data), width);

  // 5. 전체 높이를 계산한다.
  //    - 라인수 * lineHeight
  var textsHeight = lines.length * lineHeight;

  // 6. 텍스트를 적어나갈 시작점(Y) 값을 구한다.
  //    - textBaseline 속성을 감안한다.
  //    - case TOP : 시작 위치는 바운드의 top이 된다. (context의 textBaseline은 Top이 된다.)
  //    - case MIDDLE : 시작위치는 전체 높이의 1/2이 된다. (context의 textBaseline은 Middle이 된다.)
  //    - case BOTTOM : 시작 위치는 바운드의 (top + height) - 전체높이가 된다. (context의 textBaseline은 Bottom이 된다.)
  var baseY;

  switch(textBaseline) {
  case 'top':
    baseY = top;
    context.textBaseline = 'top';
    break;
  case 'bottom':
    baseY = top + height - textsHeight + lineHeight;
    context.textBaseline = 'bottom';
    break;
  case 'middle':
  default:
    baseY = top + (height / 2) - (textsHeight / 2) + (lineHeight / 2);
    context.textBaseline = 'middle';
  }

  // 7. 모든 라인을 반복하면서 context에 텍스트를 그려나간다.
  // 7-1. textAlign 속성을 감안하여 기준점 X 값을 구한다.
  //      - case LEFT : 기준위치는 left값이 된다. (context의 textAlign은 Left가 된다.)
  //      - case CENTER : 기준위치는 left + width / 2가 된다. (context의 textAlign은 Center가 된다.)
  //      - case RIGHT : 기준위치는 left + width가 된다. (context의 textAlign은 Right가 된다.)
  //      - case JUSTIFY : 기준위치는 left값이 된다. (context의 textAlign은 Left가 된다.)
  //        -- if. 라인피드로 끝나거나, 마지막 라인인 경우 그리고 한단어만 있는 경우에는 LEFT와 동일하게 한다.
  //        -- else.
  //           --- 각 라인의 텍스트 만으로 textMetric width을 구해서 값을 array에 넣어둔다.
  //           --- (width - textMetric 총 width) / (words count - 1) 로 word간 스페이스의 넓이를 구한다.
  //           --- 각 word를 그려나가면서, textMetric width array 값 + 스페이스 넓이값을 더하면서, 그려나간다.
  var baseX;

  switch(textAlign) {
  case 'left':
    baseX = left;
    context.textAlign = 'left';
    break;
  case 'right':
    baseX = left + width;
    context.textAlign = 'right';
    break;
  case 'justify':
    baseX = left;
    context.textAlign = 'left';
    break;
  case 'center':
  default:
    baseX = left + width / 2;
    context.textAlign = 'center';
  }

  context.globalAlpha = alpha;
  context.fillStyle = fontColor;

  if(textAlign != 'justify') {
    lines.forEach((line, i) => {
      context.fillText(line.join(' '), baseX, baseY + i * lineHeight);
    });
  } else {
    lines.forEach((line, i) => {
      let y = baseY + i * lineHeight;

      if(line.length == 1) {

        context.fillText(line[0], baseX, y);
      } else {

        let widths = line.map(word => {
          return context.measureText(word).width;
        });

        let totalWidth = widths.reduce((a,b) => {
          return a + b;
        }, 0);

        let spaceGap = (width - totalWidth) / (line.length - 1);
        let x = baseX;

        line.forEach((word, i) => {
          context.fillText(word, x, y);
          x += widths[i] + spaceGap;
        })
      }
    });
  }

  context.restore();
}
