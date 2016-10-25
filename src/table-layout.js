var { Layout } = scene

function parsePadding(padding){

  if(!padding)
    padding = {
      top : 0,
      right : 0,
      bottom : 0,
      left : 0
    }

  if( typeof padding === 'number' )
    padding = String(padding)

  if( typeof padding === 'string' ) {
    var padArr = padding.split(' ');

    if( padArr.length === 1 ) {
      padding = {
        top : Number(padArr[0]),
        right : Number(padArr[0]),
        bottom : Number(padArr[0]),
        left : Number(padArr[0])
      }
    } else if ( padArr.length === 2 ) {
      padding = {
        top : Number(padArr[0]),
        right : Number(padArr[1]),
        bottom : Number(padArr[0]),
        left : Number(padArr[1])
      }
    } else if ( padArr.length === 4 ) {
      padding = {
        top : Number(padArr[0]),
        right : Number(padArr[1]),
        bottom : Number(padArr[2]),
        left : Number(padArr[3])
      }
    }
  }

  return padding;
}

var TableLayout = {

  reflow: function(container) {
    let layoutConfig = container.get('layoutConfig')
    let columns = (layoutConfig && layoutConfig.columns) || 3
    let rows = Math.ceil(container.components.length / columns);

    var padding = parsePadding(container.get("padding"));

    let componentWidth = (container.bounds.width - (padding.left + padding.right)) / columns;
    let componentHeight = (container.bounds.height - (padding.top + padding.bottom)) / rows;

    var colNum = 0;
    var rowNum = 0;

    container.components.forEach((component, idx) =>{
      colNum = idx % columns
      rowNum = Math.floor(idx / columns)
      component.bounds = {
        left : padding.left + colNum * componentWidth,
        top : padding.top + rowNum * componentHeight,
        width : componentWidth,
        height : componentHeight
      }

      component.set('rotation', 0)

    })

  },

  capturables: function(container) {
    return container.components
  },

  drawables: function(container) {
    return container.components
  },

  isStuck: function(component) {
    return true
  }
}

Layout.register('table', TableLayout)

export default TableLayout
