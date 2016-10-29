import TableCell from './table-cell'
import TableLayout from './table-layout'

var {
  Component,
  Container,
  Layout,
  Model
} = scene;

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

const DEFAULT_STYLE = {
  strokeStyle: 'red',
  lineDash: 'solid',
  lineWidth: 1
}

const TABLE_LAYOUT = Layout.get('table')

function hasAnyProperty(o, ...properties) {
  for(let p in properties) {
    if(o.hasOwnProperty(properties[p]))
      return true
  }
}

function buildNewCell(app) {
  return Model.compile({
    type: 'table-cell',
    strokeStyle: 'blue',
    left: 0,
    top: 0,
    width: 1,
    height: 1,
    fillStyle: 'lightgray',
    textWrap: true,
    border: buildBorderStyle(DEFAULT_STYLE, 'all')
  }, app)
}

function buildBorderStyle(style, where) {
  return (SIDES[where] || []).reduce((border, side) => {
    border[side] = style
    return border
  }, {})
}

function setCellBorder(cell, style, where) {
  if(!cell)
    return
  cell.set('border', Object.assign({}, cell.get('border') || {}, buildBorderStyle(style, where)))
}

function isLeftMost(total, columns, indices, i) {
  return i == 0 || !(i % columns) || indices.indexOf(i - 1) == -1;
}

function isRightMost(total, columns, indices, i) {
  return i == total - 1 || (i % columns == columns - 1) || indices.indexOf(i + 1) == -1;
}

function isTopMost(total, columns, indices, i) {
  return i < columns || indices.indexOf(i - columns) == -1;
}

function isBottomMost(total, columns, indices, i) {
  return i > (total - columns - 1) || indices.indexOf(i + columns) == -1;
}

function above(columns, i) {
  return i - columns;
}

function below(columns, i) {
  return i + columns;
}

function before(columns, i) {
  return !(i % columns) ? -1 : i - 1;
}

function after(columns, i) {
  return !((i + 1) % columns) ? -1 : i + 1;
}

function array(value, size) {
  var arr = []
  for(let i = 0;i < size;i++)
    arr.push(0.5 + Math.random(value) / 2)
  return arr
}

export default class TableX extends Container {

  constructor(model, context) {
    super(model, context);

    if(this.size() == 0)
      this.buildCells(model.rows, model.columns, 0, 0);
  }

  get widths() {
    var widths = this.get('widths')

    if(!widths)
      return array(1, this.columns)

    if(widths.length < this.columns)
      return widths.concat(array(1, this.columns - widths.length))

    return widths
  }

  get heights() {
    var heights = this.get('heights')

    if(!heights)
      return array(1, this.rows)

    if(heights.length < this.rows)
      return heights.concat(array(1, this.rows - heights.length))

    return heights
  }

  buildCells(newrows, newcolumns, oldrows, oldcolumns) {

    if(newrows < oldrows) {
      let removals = this._components.slice(oldcolumns * newrows);
      this.remove(removals);
    }

    var minrows = Math.min(newrows, oldrows)

    if(newcolumns > oldcolumns) {
      for(let r = 0;r < minrows;r++) {
        for(let c = oldcolumns;c < newcolumns;c++) {
          this.insertComponentAt(buildNewCell(this.app), r * newcolumns + c);
        }
      }
    } else if(newcolumns < oldcolumns) {
      let removals = []

      for(let r = 0;r < minrows;r++) {
        for(let c = newcolumns;c < oldcolumns;c++) {
          removals.push(this.components[r * oldcolumns + c])
        }
      }
      this.remove(removals);
    }

    if(newrows > oldrows) {
      let newbies = []

      for(let r = oldrows;r < newrows;r++) {
        for(let i = 0;i < newcolumns;i++) {
          newbies.push(buildNewCell(this.app));
        }
      }
      this.add(newbies);
    }

    this.set({
      widths: this.widths,
      heights: this.heights
    });
  }

  get layout() {
    return TABLE_LAYOUT;
  }

  get rows() {
    return this.get('rows')
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
        setCellBorder(cell, style, where);

        if(isLeftMost(total, columns, indices, i))
          setCellBorder(components[before(columns, i)], style, 'right')
        if(isRightMost(total, columns, indices, i))
          setCellBorder(components[after(columns, i)], style, 'left')
        if(isTopMost(total, columns, indices, i))
          setCellBorder(components[above(columns, i)], style, 'bottom')
        if(isBottomMost(total, columns, indices, i))
          setCellBorder(components[below(columns, i)], style, 'top')
        break;
      case 'in':
        if(!isLeftMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'left')
        }
        if(!isRightMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'right')
        }
        if(!isTopMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'top')
        }
        if(!isBottomMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'bottom')
        }
        break;
      case 'out':
        if(isLeftMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'left')
          setCellBorder(components[before(columns, i)], style, 'right')
        }
        if(isRightMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'right')
          setCellBorder(components[after(columns, i)], style, 'left')
        }
        if(isTopMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'top')
          setCellBorder(components[above(columns, i)], style, 'bottom')
        }
        if(isBottomMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'bottom')
          setCellBorder(components[below(columns, i)], style, 'top')
        }
        break;
      case 'left':
        if(isLeftMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'left')
          setCellBorder(components[before(columns, i)], style, 'right')
        }
        break;
      case 'right':
        if(isRightMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'right')
          setCellBorder(components[after(columns, i)], style, 'left')
        }
        break;
      case 'center':
        if(!isLeftMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'left')
        }
        if(!isRightMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'right')
        }
        break;
      case 'middle':
        if(!isTopMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'top')
        }
        if(!isBottomMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'bottom')
        }
        break;
      case 'top':
        if(isTopMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'top')
          setCellBorder(components[above(columns, i)], style, 'bottom')
        }
        break;
      case 'bottom':
        if(isBottomMost(total, columns, indices, i)) {
          setCellBorder(cell, style, 'bottom')
          setCellBorder(components[below(columns, i)], style, 'top')
        }
        break;
      case 'clear':
        setCellBorder(cell, CLEAR_STYLE, 'all')

        if(isLeftMost(total, columns, indices, i))
          setCellBorder(components[before(columns, i)], CLEAR_STYLE, 'right')
        if(isRightMost(total, columns, indices, i))
          setCellBorder(components[after(columns, i)], CLEAR_STYLE, 'left')
        if(isTopMost(total, columns, indices, i))
          setCellBorder(components[above(columns, i)], CLEAR_STYLE, 'bottom')
        if(isBottomMost(total, columns, indices, i))
          setCellBorder(components[below(columns, i)], CLEAR_STYLE, 'top')
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
      this.buildCells(
        this.get('rows'),
        this.get('columns'),
        before.rows === undefined ? this.get('rows') : before.rows,
        before.columns === undefined ? this.get('columns') : before.columns
      )
    }
  }
}

// ["rows", "columns"].forEach(getter => Component.memoize(TableX.prototype, getter, false));

Component.register('table-x', TableX);
