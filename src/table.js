var { Component, Rect } = scene;
const EMPTY_DATA = [[]];

export default class Table extends Rect {

  _drawCell(context, x, y, width, height, lines, cellStyle) {

    cellStyle = cellStyle || {}

    var bounds = {
      left: x,
      top: y,
      width: width,
      height: height
    };

    context.rect(x, y, width, height);

    Component.drawStroke(context, cellStyle);

    Component.drawFill(context,
      bounds, {
        x: x + width / 2,
        y: y + height / 2
      }, cellStyle
    );

    Component.drawText(context, bounds, lines, cellStyle);
  }

  _draw(context) {

    var {
      rows = 10,
      columns = 5,
      data = EMPTY_DATA,
      cellStyle
    } = this.model;

    var {
      left,
      top,
      width,
      height,
    } = this.bounds;

    var widthSum = 0;
    var heightSum = 0;

    // 테두리까지 합쳐서 셀이 정렬이 되기 위해 계산.
    if(this.model.headerCellStyle)
      var headerLineWidth = this.model.headerCellStyle.lineWidth / 2 || 0;

    var i, j;

    context.beginPath();

    for(var i = 0;i < columns;i++) {
      var bodyLineWidth
      var cell_width
      var cell_height
      var header_height = this.model.headerCellStyle.height || height / rows;

      if(cellStyle[i]){
        bodyLineWidth = cellStyle[i].lineWidth / 2 || 1;
        cell_width = cellStyle[i].width || (width - widthSum) / (columns - i);
        cell_height = (height - header_height) / (rows - 1);
      } else {
        bodyLineWidth = 1;
        cell_width = (width - widthSum) / (columns - i);
        cell_height = (height - header_height) / (rows - 1);
      }

      // drawCell
      this._drawBody(context, i, cellStyle, data, {
        cell_width : cell_width,
        cell_height : cell_height,
        lineWidth : bodyLineWidth,
        rows: rows,
        widthSum: widthSum,
        header_height: cell_height - header_height
      })

      // drawHeader
      this._drawHeader(context, i, data, {
        cell_width : cell_width,
        cell_height : header_height,
        lineWidth : headerLineWidth,
        widthSum: widthSum,
      })

      widthSum += cell_width
    }

    context.rect(left, top, width, height);
  }

  _drawHeader(context, i, data, cellProps) {

    var {
      left,
      top,
      width,
      height,
    } = this.bounds;

    let {
      cell_width,
      cell_height,
      lineWidth,
      widthSum
    } = cellProps

    let cell_data = (data[0] === undefined) ? '' : data[0][i];
    let lines = Component.textLines(context, cell_width, this.font, cell_data, true)

    this._drawCell(
      context,
      left + widthSum + lineWidth / 2,
      top + lineWidth / 2,
      cell_width - lineWidth,
      cell_height - lineWidth,
      lines,
      this.model.headerCellStyle
    );
  }

  _drawBody(context, i, cellStyle, data, cellProps) {

    var {
      left,
      top,
      width,
      height,
    } = this.bounds;

    let {
      cell_width,
      cell_height,
      lineWidth,
      rows,
      widthSum,
      header_height
    } = cellProps


    for(var j = 1;j < rows;j++) {
      let cell_data = (data[j] === undefined) ? '' : data[j][i];
      let lines = Component.textLines(context, cell_width, this.font, cell_data, true)

      this._drawCell(
        context,
        left + widthSum + lineWidth / 2,
        top + j * cell_height + lineWidth / 2 - header_height,
        cell_width - lineWidth,
        cell_height - lineWidth,
        lines,
        cellStyle[i]
      );
    }
  }

  _post_draw(context) {
    this.drawStroke(context);
    this.drawText(context);
  }

  get controls() {}
}

Component.register('table', Table);
