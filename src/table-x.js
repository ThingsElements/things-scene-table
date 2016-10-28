import TableCell from './table-cell'
import TableLayout from './table-layout'

var {
  Component,
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

const CLEAR_STYLE = {
  strokeStyle: '',
  lineDash: 'solid',
  lineWidth: 0
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

  setCellBorder(cell, style, where) {
    if(!cell)
      return
    cell.set('border', Object.assign({}, cell.get('border') || {}, this.buildBorderStyle(style, where)))
  }

  isLeftMost(total, columns, indices, i) {
    return i == 0 || !(i % columns) || indices.indexOf(i - 1) == -1;
  }

  isRightMost(total, columns, indices, i) {
    return i == total - 1 || (i % columns == columns - 1) || indices.indexOf(i + 1) == -1;
  }

  isTopMost(total, columns, indices, i) {
    return i < columns || indices.indexOf(i - columns) == -1;
  }

  isBottomMost(total, columns, indices, i) {
    return i > (total - columns - 1) || indices.indexOf(i + columns) == -1;
  }

  isInnerCell(total, columns, indices, i) {
    return !this.isLeftMost(total, columns, indices, i) &&
           !this.isRightMost(total, columns, indices, i) &&
           !this.isTopMost(total, columns, indices, i) &&
           !this.isBottomMost(total, columns, indices, i)
  }

  above(columns, i) {
    return i - columns;
  }

  below(columns, i) {
    return i + columns;
  }

  before(columns, i) {
    return !(i % columns) ? -1 : i - 1;
  }

  after(columns, i) {
    return !((i + 1) % columns) ? -1 : i + 1;
  }

  setCellsStyle(cells, style, where) {
    var components = this.components;
    var total = components.length;
    var columns = this.get('columns');
    var indices = cells.map(cell => components.indexOf(cell));

    indices.forEach(i => {
      var cell = components[i];

      switch(where) {
      case 'all':
        this.setCellBorder(cell, style, where);

        if(this.isLeftMost(total, columns, indices, i))
          this.setCellBorder(components[this.before(columns, i)], style, 'right')
        if(this.isRightMost(total, columns, indices, i))
          this.setCellBorder(components[this.after(columns, i)], style, 'left')
        if(this.isTopMost(total, columns, indices, i))
          this.setCellBorder(components[this.above(columns, i)], style, 'bottom')
        if(this.isBottomMost(total, columns, indices, i))
          this.setCellBorder(components[this.below(columns, i)], style, 'top')
        break;
      case 'in':
        if(!this.isLeftMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'left')
        }
        if(!this.isRightMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'right')
        }
        if(!this.isTopMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'top')
        }
        if(!this.isBottomMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'bottom')
        }
        break;
      case 'out':
        if(this.isLeftMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'left')
          this.setCellBorder(components[this.before(columns, i)], style, 'right')
        }
        if(this.isRightMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'right')
          this.setCellBorder(components[this.after(columns, i)], style, 'left')
        }
        if(this.isTopMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'top')
          this.setCellBorder(components[this.above(columns, i)], style, 'bottom')
        }
        if(this.isBottomMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'bottom')
          this.setCellBorder(components[this.below(columns, i)], style, 'top')
        }
        break;
      case 'left':
        if(this.isLeftMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'left')
          this.setCellBorder(components[this.before(columns, i)], style, 'right')
        }
        break;
      case 'right':
        if(this.isRightMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'right')
          this.setCellBorder(components[this.after(columns, i)], style, 'left')
        }
        break;
      case 'center':
        if(!this.isLeftMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'left')
        }
        if(!this.isRightMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'right')
        }
        break;
      case 'middle':
        if(!this.isTopMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'top')
        }
        if(!this.isBottomMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'bottom')
        }
        break;
      case 'top':
        if(this.isTopMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'top')
          this.setCellBorder(components[this.above(columns, i)], style, 'bottom')
        }
        break;
      case 'bottom':
        if(this.isBottomMost(total, columns, indices, i)) {
          this.setCellBorder(cell, style, 'bottom')
          this.setCellBorder(components[this.below(columns, i)], style, 'top')
        }
        break;
      case 'clear':
        this.setCellBorder(cell, CLEAR_STYLE, 'all')
      }
    })
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
