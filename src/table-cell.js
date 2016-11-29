var {
  Component,
  Container,
  RectPath,
  Layout
} = scene;

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties : [{
    type: 'editor-table',
    label: '',
    name: '',
    property: {
    }
  }, {
    type: 'string',
    label: 'dataKey',
    name: 'dataKey',
    property: 'dataKey'
  }, {
    type: 'number',
    label: 'dataIndex',
    name: 'dataIndex',
    property: 'dataIndex'
  }]
}

const EMPTY_BORDER = {}

/**
 * 1. 스타일을 상속 받아야 함. (cascade-style)
 * 2. 스타일을 동적처리할 수 있음. (로직처리)
 * 3. 데이타를 받을 수 있음.
 */
 export default class TableCell extends RectPath(Component) {
 // export default class TableCell extends Container {

  // get layout() {
  //   return Layout.get(this.get('layout') || 'card')
  // }

  get nature() {
    return NATURE
  }

  get rowspan() {
    return this.get('rowspan')
  }

  get colspan() {
    return this.get('colspan')
  }

  get border() {
    var border = this.model.border || EMPTY_BORDER;
  }

  _drawBorder(context, x, y, to_x, to_y, style) {
    if(style && style.strokeStyle && style.lineWidth && style.lineDash) {
      context.beginPath();
      context.moveTo(x, y)
      context.lineTo(to_x, to_y);
      Component.drawStroke(context, style);
    }
  }

  _draw(context) {
    var {
      left,
      top,
      width,
      height
    } = this.model;

    var border = this.model.border || {};

    // Cell 채우기.
    context.beginPath();
    context.lineWidth = 0;
    context.rect(left, top, width, height);
    this.drawFill(context);

    // Border 그리기
    this._drawBorder(context, left, top, left + width, top, border.top);
    this._drawBorder(context, left + width, top, left + width, top + height, border.right);
    this._drawBorder(context, left + width, top + height, left, top + height, border.bottom);
    this._drawBorder(context, left, top + height, left, top, border.left);
  }

  // _post_draw(context) {
  //
  //   this.drawFill(context);
  //
  //   /* 자식 컴포넌트들 그리기 */
  //   var { top, left, scale } = this.model;
  //   context.translate(left, top);
  //
  //   this.layout.drawables(this).forEach(m => {
  //     m.draw(context);
  //   });
  //
  //   context.translate(-left, -top);
  //
  //   this.drawText(context);
  // }
}

["border"].forEach(getter => Component.memoize(TableCell.prototype, getter, false));

Component.register('table-cell', TableCell);
