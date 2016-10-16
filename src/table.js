import text from './text'

var { Component, Rect } = scene;

const EMPTY_DATA = [[]];

export default class Table extends Rect {

  _drawCell(context, x, y, width, height, data) {
    text(
      context,
      {
        left: x,
        top: y,
        width: width,
        height: height
      },
      data,
      {}
    );
  }

  _draw(context) {

    var {
      rows = 10,
      columns = 5,
      data = EMPTY_DATA
    } = this.model;

    var {
      left,
      top,
      width,
      height
    } = this.bounds;

    // 박스 그리기
    context.beginPath();

    context.rect(left, top, width, height);

    var i, j;
    var cell_width = width / columns;
    var cell_height = height / rows;

    for(i = 0;i < rows;i++) {
      for(j = 0;j < columns;j++) {
        let cell_data = (data[i] === undefined) ? undefined : data[i][j];

        this._drawCell(
          context,
          left + j * cell_width,
          top + i * cell_height,
          cell_width,
          cell_height,
          cell_data
        );
      }
    }
  }

  get controls() {}
}

// Component.memoize(Table.prototype, 'controls', false);

Component.register('table', Table);
