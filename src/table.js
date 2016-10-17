var { Component, Rect } = scene;

const EMPTY_DATA = [[]];

export default class Table extends Rect {

  _drawCell(context, x, y, width, height, lines) {
    var bounds = {
      left: x,
      top: y,
      width: width,
      height: height
    };

    context.rect(x, y, width, height);

    Component.drawStroke(context, this.model);

    Component.drawFill(context,
      bounds, {
        x: x + width / 2,
        y: y + height / 2
      }, this.model
    );

    Component.drawText(context, bounds, lines, this.model);
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

    context.beginPath();

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
  }

  _post_draw(context) {
    this.drawText(context);
  }

  get controls() {}
}

Component.register('table', Table);
