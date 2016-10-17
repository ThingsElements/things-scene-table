var { Component, Rect } = scene;

const EMPTY_DATA = [[]];

export default class Table extends Rect {

  _drawCell(context, x, y, width, height, lines) {
    Component.drawText(
      context,
      {
        left: x,
        top: y,
        width: width,
        height: height
      },
      lines,
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
        let cell_data = (data[i] === undefined) ? '' : data[i][j];
        let lines = Component.textLines(context, cell_width, this.font, cell_data, true)

        this._drawCell(
          context,
          left + j * cell_width,
          top + i * cell_height,
          cell_width,
          cell_height,
          lines
        );
      }
    }

    super._draw(context);
  }

  get controls() {}
}

Component.register('table', Table);
