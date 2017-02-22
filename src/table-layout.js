var { Layout } = scene

var TableLayout = {

  reflow: function(container) {
    var layoutConfig = container.get('layoutConfig')

    var columns = (layoutConfig && layoutConfig.columns) || container.get('columns')
    var rows = (layoutConfig && layoutConfig.rows) || container.get('rows')
    var widths = (layoutConfig && layoutConfig.widths) || container.get('widths')
    var heights = (layoutConfig && layoutConfig.heights) || container.get('heights')

    var widths_sum = widths ? widths.filter((width, i) => i < columns).reduce((sum, width) => sum + width, 0) : columns;
    var heights_sum = heights ? heights.filter((height, i) => i < rows).reduce((sum, height) => sum + height, 0) : rows;

    var inside = container.textBounds;
    var paddingLeft = container.get('paddingLeft') || 0;
    var paddingTop = container.get('paddingTop') || 0;

    var width_unit = inside.width / widths_sum;
    var height_unit = inside.height / heights_sum;

    var x = 0;
    var y = 0;

    container.components.forEach((component, idx) =>{
      let w = widths ? widths[idx % columns] : 1
      let h = heights ? heights[Math.floor(idx / columns)] : 1

      component.bounds = {
        left : paddingLeft + x,
        top : paddingTop + y,
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

  keyNavigate: function(container, component, e) {
    var layoutConfig = container.get('layoutConfig')

    var columns = (layoutConfig && layoutConfig.columns) || container.get('columns')
    var rows = (layoutConfig && layoutConfig.rows) || container.get('rows')

    var { row, column } = container.getRowColumn(component)

    switch(e.code) {
    case 'ArrowUp':
    if(row > 0)
      return container.getAt((row - 1) * columns + column)
    break;
    case 'ArrowDown':
    if(row < rows - 1)
      return container.getAt((row + 1) * columns + column)
    break;
    case 'ArrowRight':
    if(column < columns - 1)
      return container.getAt(row * columns + column + 1)
    break;
    case 'ArrowLeft':
    if(column > 0)
      return container.getAt(row * columns + column - 1)
    break;
    default:
      return component
    }
  },

  /*
   * 하위 컴포넌트를 영역으로 선택하는 경우에, 바운드에 join만 되어도 선택된 것으로 판단하도록 한다.
   * joinType이 false이거나, 정의되어있지 않으면, 바운드에 포함되어야 선택된 것으로 판단한다.
   */
  joinType: true
}

Layout.register('table', TableLayout)

export default TableLayout
