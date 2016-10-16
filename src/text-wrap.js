/*
 * text wrapper 제공 기능 리스트 및 명세
 *
 * 1. 주어진 문장이 주어진 폭에서 몇줄로 줄바꿈되는가 ? - textWrapLineCount
 * 2. 주어진 문장이 주어진 폭에서 줄바꿈될 때 각 라인의 텍스트는 ?
 * 3. 주어진 단어(공백이 포함되지 않은)가 줄바꿈될 때 각 라인의 텍스트는 ?
 *
 * 최종 결과는 각 라인의 배열로 제공되며, 각 라인은 공백으로 스플릿된 단어의 배열로 표현된다.
 * 이런 형식으로 반환하는 이유는 실제 텍스트를 그릴 때, align 성격에 따라서 편리하게 사용될 수 있기 때문이다.
 */

/**
 * 주어진 단어(공백이 없는 텍스트)를 주어진 폭에서 줄바꿈될 때 첫번째 라인에 몇개의 글자가 포함될 수 있는 지를 계산한다.
 *
 * @param  context object 사용될 폰트가 설정된 Context2D 레퍼런스
 * @param  word    string 줄바꿈 대상(공백이 없는 텍스트)
 * @param  width   number 줄바꿈 기준 폭
 * @return string         첫번째 줄에 그려질 수 있는 문자열
 */
function wrapWord(context, word, width) {
  if(word.length < 2)
    return word;

  var index = 2;
  for(;index < word.length;index++) {
    var substring = word.substring(0, index);
    if(context.measureText(substring).width < width)
      continue;

    break;
  }

  return word.substring(0, index - 1); //[, word.substring(index - 1)];
}

/**
 * 주어진 한줄의 문장을 주어진 폭(width)에 맞게 줄바꿈할 때, 각 라인별 word의 배열을 제공한다.
 *
 * @param  context object 사용될 폰트가 설정된 Context2D 레퍼런스
 * @param  line    string 줄바꿈 대상 한줄 문장(\n이 포함되지 않음)
 * @param  width   number 줄바꿈 기준 폭
 * @return array          각 라인별 word의 배열([[word1, word2, word3], [word4, word5]] 형식임)
 */
function wrapLine(context, line, width) {

  var words = line.split(' '); // 공백으로 단어를 분리함.
  var lines = [];

  var begin, end;
  var slice = [];

  for(begin = 0, end = 1; end <= words.length;end++) {
    slice = words.slice(begin, end); // 단어를 하나씩 추가하면서 계산을 시작함.

    if(context.measureText(slice.join(' ')).width > width) {

      if(end - begin == 1) {
        // 단어 하나만으로도 폭을 넘어간 경우
        // - 글자 하나하나를 계산해서 폭을 넘어간 경우에 라인을 추가하고,
        // - 단어를 분리해서 words 배열의 중간에 추가한 후 계속 계산해나간다.
        let line = wrapWord(context, slice[0], width);

        lines.push([line]);
        words.splice(begin, 1, line, slice[0].substring(line.length));

      } else {
        // 몇개 단어가 폭을 넘어선 경우
        // - 마지막에 포함된 단어를 제외한 slice를 라인에 추가한다.
        // - 마지막에 포함된 단어부터서 빈 단어가 있으면, 제거한다.
        while(words[end - 1] == '') // 한줄의 뒷부분이므로, 공백이면 스킵한다.
          end++;
        lines.push(words.slice(begin, --end));
      }

      begin = end;
    }
  }

  // 폭을 넘지않는 단어들이 남아있는 경우에, 마지막에 추가한다.
  if(end - begin > 1)
    lines.push(slice);

  // 한줄도 없었다면, 공백 한줄을 추가한다.
  if(lines.length == 0)
    lines.push(['']);

  return lines;
}

/**
 * 주어진 텍스트를 주어진 폭(width)에 맞게 줄바꿈할 때, 각 라인별 word의 배열을 제공한다.
 *
 * @param  context object  사용될 폰트가 설정된 Context2D 레퍼런스
 * @param  text    string  줄바꿈 대상 문장
 * @param  width   number  줄바꿈 기준 폭
 * @param  wrap    boolean 자동 줄바꿈 여부
 * @return array           각 라인별 word의 배열([[word1, word2, word3], [word4, word5]] 형식임)
 */
export default function splitTextToLines(context, text, width, wrap) {

  // 1. 문장을 먼저 라인별로 분리한다.
  var lines = String(text).split('\n');

  // 2. wrap 옵션이 있는 경우에 다시 총 라인수를 계산한다.
  //    - 바운드의 width에 textMetric을 계산하여 분해한다.
  //    - 각 라인은 ' '로 분해하여 word의 Array로 만든다.

  if(wrap) {
    return [].concat.apply([], lines.map(line => {
      return wrapLine(context, line, width);
    }));
  } else {
    return lines.map(line => {
      return line.split(' ');
    })
  }
}
