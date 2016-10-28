import TableCell from './table-cell'
import TableLayout from './table-layout'

var { Component,
      Container,
      Layout,
      Model
} = scene;

const DEFAULT_STROKE_STYLE = 'red'
const DEFAULT_LINE_WIDTH = 1
const DEFAULT_LINE_DASH = 'dash'

const SIDES = {
  all: ['top', 'left', 'bottom', 'right'],
  out: ['top', 'left', 'bottom', 'right'],
  left: ['left'],
  right: ['right'],
  top: ['top'],
  bottom: ['bottom'],
  leftright: ['left', 'right'],
  topbottom: ['top', 'bottom']
}

const TABLE_LAYOUT = Layout.get('table')

function hasAnyProperty(o, ...properties) {
  for(let p in properties) {
    if(o.hasOwnProperty(properties[p]))
      return true
  }
}

export default class TableX extends Container {

  constructor(model, context) {
    super(model, context);

    this.buildCells();
  }

  buildCells() {
    var oldsize = this.size();
    var newsize = this.rows * this.columns;

    if(newsize > oldsize) {
      let newbies = []

      for(var i = 0;i < newsize - oldsize;i++) {
        newbies.push(Model.compile({
          type: 'table-cell',
          strokeStyle: 'blue',
          left: 0,
          top: 0,
          width: 1,
          height: 1,
          fillStyle: 'lightgray',
          textWrap: true,
          border: this.buildBorderStyle({
            strokeStyle: DEFAULT_STROKE_STYLE,
            lineWidth: DEFAULT_LINE_WIDTH,
            lineDash: DEFAULT_LINE_DASH
          }, 'all')
        }, this.app));
      }
      this.add(newbies);
    } else {
      let removals = this._components.slice(newsize);
      this.remove(removals);
    }
  }

  get layout() {
    return TABLE_LAYOUT;
  }

  get rows() {
    return this.get('rows')
  }

  buildBorderStyle(style, where) {
    return (SIDES[where] || []).reduce((border, side) => {
      border[side] = style
      return border
    }, {})
  }

  setCellsStyle(cells, style, where) {
    cells.forEach(cell => {
      cell.set('border', Object.assign({}, cell.get('border') || {}, this.buildBorderStyle(style, where)))
    })
    // switch(where) {
    // case 'all':
    //   break;
    // case 'in':
    //   // 만일 모든 ins의 td 스타일 값이 같으면 그 값으로 app.border를 설정한다.
    //   break;
    // case 'out':
    //   // 만일 모든 out의 td 스타일 값이 같으면 그 값으로 app.border를 설정한다.
    //   break;
    // case 'left':
    //   // 만일 모든 left의 td 스타일 값이 같으면 그 값으로 app.border를 설정한다.
    //   break;
    // case 'right':
    //   // 만일 모든 right의 td 스타일 값이 같으면 그 값으로 app.border를 설정한다.
    //   break;
    // case 'center':
    //   // 만일 모든 center의 td 스타일 값이 같으면 그 값으로 app.border를 설정한다.
    //   break;
    // case 'middle':
    //   // 만일 모든 middle의 td 스타일 값이 같으면 그 값으로 app.border를 설정한다.
    //   break;
    // case 'top':
    //   // 만일 모든 top의 td 스타일 값이 같으면 그 값으로 app.border를 설정한다.
    //   break;
    // case 'bottom':
    //   // 만일 모든 bottom의 td 스타일 값이 같으면 그 값으로 app.border를 설정한다.
    //   break;
    // }
  }

  get columns() {
    return this.get('columns')
  }

  get lefts() {
    return this.components.filter((c, i) => {
      return !(i % this.columns)
    });
  }

  get centers() {
    return this.components.filter((c, i) => {
      return (i % this.columns) && ((i + 1) % this.columns)
    });
  }

  get rights() {
    return this.components.filter((c, i) => {
      return !((i + 1) % this.columns)
    });
  }

  get tops() {
    return this.components.slice(0, this.columns)
  }

  get middles() {
    return this.components.slice(this.columns, this.columns * (this.rows - 1))
  }

  get bottoms() {
    return this.components.slice(this.columns * (this.rows - 1))
  }

  get all() {
    return this.components
  }

  onchange(after, before) {
    if(hasAnyProperty(after, "rows", "columns")) {
      this.buildCells()
    }
  }
}

["rows", "columns"].forEach(getter => Component.memoize(TableX.prototype, getter, false));

Component.register('table-x', TableX);
