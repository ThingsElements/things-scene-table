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
          border: {
            left: {
              strokeStyle: DEFAULT_STROKE_STYLE,
              lineWidth: DEFAULT_LINE_WIDTH,
              lineDash: DEFAULT_LINE_DASH
            },
            right: {
              strokeStyle: DEFAULT_STROKE_STYLE,
              lineWidth: DEFAULT_LINE_WIDTH,
              lineDash: DEFAULT_LINE_DASH
            },
            top: {
              strokeStyle: DEFAULT_STROKE_STYLE,
              lineWidth: DEFAULT_LINE_WIDTH,
              lineDash: DEFAULT_LINE_DASH
            },
            bottom: {
              strokeStyle: DEFAULT_STROKE_STYLE,
              lineWidth: DEFAULT_LINE_WIDTH,
              lineDash: DEFAULT_LINE_DASH
            }
          }
        }));
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
