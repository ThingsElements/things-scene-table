var {
  Component,
  RectPath
} = scene;

const EMPTY_BORDER = {}

/**
 * 1. 스타일을 상속 받아야 함. (cascade-style)
 * 2. 스타일을 동적처리할 수 있음. (로직처리)
 * 3. 데이타를 받을 수 있음.
 */
export default class TableCell extends RectPath(Component) {

  get border() {
    var border = this.model.border || EMPTY_BORDER;
  }

  _drawBorder(context, x, y, style) {
    if(style) {
      context.lineTo(x, y);
      Component.drawStroke(context, style);
    } else {
      context.moveTo(x, y)
    }
  }

  _draw(context) {
    var {
      left,
      top,
      width,
      height,
      fillStyle
    } = this.model;

    var border = this.model.border || {};

    // Cell 채우기.
    context.fillStyle = fillStyle;
    context.fillRect(left, top, width, height);

    // Border 그리기
    context.beginPath();

    context.moveTo(left, top);

    this._drawBorder(context, left + width, top, border.top);
    this._drawBorder(context, left + width, top + height, border.right);
    this._drawBorder(context, left, top + height, border.bottom);
    this._drawBorder(context, left, top, border.left);
  }
}

["border"].forEach(getter => Component.memoize(TableCell.prototype, getter, false));

Component.register('table-cell', TableCell);
