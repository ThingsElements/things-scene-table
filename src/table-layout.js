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
    var layoutConfig = container.get('layoutConfig')

    var columns = (layoutConfig && layoutConfig.columns) || container.get('columns')
    var rows = (layoutConfig && layoutConfig.rows) || container.get('rows')
    var widths = (layoutConfig && layoutConfig.widths) || container.get('widths')
    var heights = (layoutConfig && layoutConfig.heights) || container.get('heights')

    var widths_sum = widths ? widths.filter((width, i) => i < columns).reduce((sum, width) => sum + width, 0) : columns;
    var heights_sum = heights ? heights.filter((height, i) => i < rows).reduce((sum, height) => sum + height, 0) : rows;

    var padding = parsePadding(container.get("padding"));

    var width_unit = (container.bounds.width - (padding.left + padding.right)) / widths_sum;
    var height_unit = (container.bounds.height - (padding.top + padding.bottom)) / heights_sum;

    var x = 0;
    var y = 0;

    container.components.forEach((component, idx) =>{
      let w = widths ? widths[idx % columns] : 1
      let h = heights ? heights[Math.floor(idx / columns)] : 1

      component.bounds = {
        left : padding.left + x,
        top : padding.top + y,
        width : width_unit * w,
        height : height_unit * h
      }
      component.set('rotation', 0)

      if(idx % columns == columns - 1) {
        x = 0
        y += h * height_unit
      } else {
        x += w * width_unit
      }
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
  },

  /*
   * 하위 컴포넌트를 영역으로 선택하는 경우에, 바운드에 join만 되어도 선택된 것으로 판단하도록 한다.
   * joinType이 false이거나, 정의되어있지 않으면, 바운드에 포함되어야 선택된 것으로 판단한다.
   */
  joinType: true
}

Layout.register('table', TableLayout)

export default TableLayout
