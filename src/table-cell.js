var {
  Component,
  Rect
} = scene;

const EMPTY_BORDER = {}

/**
 * 1. 스타일을 상속 받아야 함. (cascade-style)
 * 2. 스타일을 동적처리할 수 있음. (로직처리)
 * 3. 데이타를 받을 수 있음.
 */
export default class TableCell extends Rect {

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
      height
    } = this.bounds;

    var border = this.model.border || {};

    // 박스 그리기
    context.beginPath();

    context.moveTo(left, top);

    this._drawBorder(context, left + width, top, border.top);
    this._drawBorder(context, left + width, top + height, border.right);
    this._drawBorder(context, left, top + height, border.bottom);
    this._drawBorder(context, left, top, border.left);
  }

  _post_draw(context) {
    this.drawFill(context);
    this.drawText(context);
  }

  get controls() {}
}

["border"].forEach(getter => Component.memoize(TableCell.prototype, getter, false));

Component.register('table-cell', TableCell);
