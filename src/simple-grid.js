/*
 * Copyright © HatioLab Inc. All rights reserved.
 */

import { Component, Container, HTMLOverlayContainer, Layout } from '@hatiolab/things-scene'
import {
  CLEAR_STYLE,
  buildNewCell,
  buildCopiedCell,
  setCellBorder,
  isLeftMost,
  isRightMost,
  isTopMost,
  isBottomMost,
  above,
  below,
  before,
  after,
  array,
  columnControlHandler,
  rowControlHandler
} from './helper-functions'
import './simple-grid-view'
import './simple-grid-field'
import './grid-layout'

const NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [
    {
      type: 'number',
      label: 'columns',
      name: 'columns',
      property: 'columns'
    }
  ],
  'value-property': 'data'
}

export default class SimpleGrid extends Container {
  created() {
    this.set('rows', 3)
    var rows = 2

    var tobeSize = rows * this.columns
    var gap = this.size() - tobeSize

    if (gap == 0) {
      return
    } else if (gap > 0) {
      let removals = this._components.slice(gap)
      this.remove(removals)
    } else {
      let newbies = []

      for (let i = 0; i < -gap; i++) newbies.push(buildNewCell('simple-grid-field', this.app))

      this.add(newbies)
    }

    var widths = this.get('widths')
    var heights = this.get('heights')

    if (!widths || widths.length < this.columns) this.set('widths', this.widths)
    if (!heights || heights.length < rows) this.set('heights', this.heights)
  }

  get layout() {
    if (this.app.isViewMode) {
      return Layout.get('html-absolute')
    } else {
      return Layout.get('grid')
    }
  }

  containable(component) {
    return component.get('type') == 'simple-grid-field'
  }

  get focusible() {
    /* 이 컨테이너에는 컴포넌트를 임의로 추가 및 삭제할 수 없도록 함 */
    return false
  }

  get tagName() {
    return 'simple-grid-view'
  }

  get widths_sum() {
    var widths = this.widths
    return widths ? widths.filter((width, i) => i < this.columns).reduce((sum, width) => sum + width, 0) : this.columns
  }

  get heights_sum() {
    var heights = this.heights
    return heights ? heights.filter((height, i) => i < this.rows).reduce((sum, height) => sum + height, 0) : this.rows
  }

  get widths() {
    var widths = this.get('widths')

    if (!widths) return array(1, this.columns)

    if (widths.length < this.columns) return widths.concat(array(1, this.columns - widths.length))
    else if (widths.length > this.columns) return widths.slice(0, this.columns)

    return widths
  }

  get heights() {
    var heights = this.get('heights')

    if (!heights) return array(1, this.rows)

    if (heights.length < this.rows) return heights.concat(array(1, this.rows - heights.length))
    else if (heights.length > this.rows) return heights.slice(0, this.rows)

    return heights
  }

  get columns() {
    return Number(this.get('columns'))
  }

  get rows() {
    /* 1 for header, 1 for first record fields, 1 for rest record fields */
    return 3
  }

  get headers() {
    return this.getCellsByRow(0)
  }

  get fields() {
    return this.getCellsByRow(1)
  }

  reposition() {
    if (this.app.isViewMode) {
      Component.reposition(this)
    } else {
      super.reposition()
    }
  }

  setElementProperties(grid) {
    if (this.app.isViewMode) {
      grid.data = this.data
      grid.widths = this.widths
      grid.heights = this.heights
      grid.headers = this.headers
      grid.fields = this.fields
    }
  }

  get nature() {
    return NATURE
  }

  get controls() {
    var widths = this.widths
    var heights = this.heights
    var inside = this.textBounds

    var width_unit = inside.width / this.widths_sum
    var height_unit = inside.height / this.heights_sum

    var x = inside.left
    var y = inside.top

    var controls = []

    widths.slice(0, this.columns - 1).forEach(width => {
      x += width * width_unit
      controls.push({
        x: x,
        y: inside.top,
        handler: columnControlHandler
      })
    })

    heights.slice(0, this.rows - 1).forEach(height => {
      y += height * height_unit
      controls.push({
        x: inside.left,
        y: y,
        handler: rowControlHandler
      })
    })

    return controls
  }

  onchange(after, before) {
    if (this.app.isViewMode && ('widths' in after || 'heights' in after)) {
      this.element.widths = this.widths
      this.element.heights = this.heights
      this.element.headers = this.headers
      this.element.fields = this.fields
    }

    if ('data' in after) {
      if (this.app.isViewMode) {
        this.element.data = this.data
      } else {
        this.setCellsData()
      }
    }

    if ('columns' in after) {
      let { columns } = this

      this.buildCells(columns, Number(before.columns))
    }
  }

  get eventMap() {
    return {
      '(self)': {
        '(descendant)': {
          change: this.oncellchanged
        }
      }
    }
  }

  oncellchanged(after, before) {
    if ('dataKey' in after) {
      this.setCellsData()
    }
  }

  setCellsData() {
    var data = this.data

    if (!data) return

    var cells = this.getCellsByRow(1)

    cells.forEach(cell => {
      var dataKey = cell.model.dataKey
      if (dataKey) cell.data = (data[0] || {})[dataKey]
    })
  }

  setCellsStyle(cells, style, where) {
    var components = this.components
    var total = components.length
    var columns = this.get('columns')

    // 병합된 셀도 포함시킨다.
    var _cells = []
    cells.forEach(c => {
      _cells.push(c)
      if (c.colspan || c.rowspan) {
        let col = this.getRowColumn(c).column
        let row = this.getRowColumn(c).row
        for (let i = row; i < row + c.rowspan; i++)
          for (let j = col; j < col + c.colspan; j++)
            if (i != row || j != col) _cells.push(this.components[i * this.columns + j])
      }
    })
    var indices = _cells.map(cell => components.indexOf(cell))
    indices.forEach(i => {
      var cell = components[i]

      switch (where) {
        case 'all':
          setCellBorder(cell, style, where)

          if (isLeftMost(total, columns, indices, i)) setCellBorder(components[before(columns, i)], style, 'right')
          if (isRightMost(total, columns, indices, i)) setCellBorder(components[after(columns, i)], style, 'left')
          if (isTopMost(total, columns, indices, i)) setCellBorder(components[above(columns, i)], style, 'bottom')
          if (isBottomMost(total, columns, indices, i)) setCellBorder(components[below(columns, i)], style, 'top')
          break
        case 'in':
          if (!isLeftMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'left')
          }
          if (!isRightMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'right')
          }
          if (!isTopMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'top')
          }
          if (!isBottomMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'bottom')
          }
          break
        case 'out':
          if (isLeftMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'left')
            setCellBorder(components[before(columns, i)], style, 'right')
          }
          if (isRightMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'right')
            setCellBorder(components[after(columns, i)], style, 'left')
          }
          if (isTopMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'top')
            setCellBorder(components[above(columns, i)], style, 'bottom')
          }
          if (isBottomMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'bottom')
            setCellBorder(components[below(columns, i)], style, 'top')
          }
          break
        case 'left':
          if (isLeftMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'left')
            setCellBorder(components[before(columns, i)], style, 'right')
          }
          break
        case 'right':
          if (isRightMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'right')
            setCellBorder(components[after(columns, i)], style, 'left')
          }
          break
        case 'center':
          if (!isLeftMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'left')
          }
          if (!isRightMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'right')
          }
          break
        case 'middle':
          if (!isTopMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'top')
          }
          if (!isBottomMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'bottom')
          }
          break
        case 'top':
          if (isTopMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'top')
            setCellBorder(components[above(columns, i)], style, 'bottom')
          }
          break
        case 'bottom':
          if (isBottomMost(total, columns, indices, i)) {
            setCellBorder(cell, style, 'bottom')
            setCellBorder(components[below(columns, i)], style, 'top')
          }
          break
        case 'clear':
          setCellBorder(cell, CLEAR_STYLE, 'all')

          if (isLeftMost(total, columns, indices, i))
            setCellBorder(components[before(columns, i)], CLEAR_STYLE, 'right')
          if (isRightMost(total, columns, indices, i)) setCellBorder(components[after(columns, i)], CLEAR_STYLE, 'left')
          if (isTopMost(total, columns, indices, i)) setCellBorder(components[above(columns, i)], CLEAR_STYLE, 'bottom')
          if (isBottomMost(total, columns, indices, i)) setCellBorder(components[below(columns, i)], CLEAR_STYLE, 'top')
      }
    })
  }

  buildCells(newcolumns, oldcolumns) {
    var minrows = 2

    if (newcolumns > oldcolumns) {
      for (let r = 0; r < minrows; r++) {
        for (let c = oldcolumns; c < newcolumns; c++) {
          this.insertComponentAt(buildNewCell('simple-grid-field', this.app), r * newcolumns + c)
        }
      }
    } else if (newcolumns < oldcolumns) {
      let removals = []

      for (let r = 0; r < minrows; r++) {
        for (let c = newcolumns; c < oldcolumns; c++) {
          removals.push(this.components[r * oldcolumns + c])
        }
      }

      this.remove(removals)
    }

    this.set({
      widths: this.widths,
      heights: this.heights
    })
  }

  getRowColumn(cell) {
    var idx = this.components.indexOf(cell)

    return {
      column: idx % this.columns,
      row: Math.floor(idx / this.columns)
    }
  }

  getCellsByRow(row) {
    return this.components.slice(row * this.columns, (row + 1) * this.columns)
  }

  getCellsByColumn(column) {
    var cells = []
    for (let i = 0; i < this.rows; i++) cells.push(this.components[this.columns * i + column])

    return cells
  }

  mergeCells(cells) {}

  splitCells(cells) {}

  deleteRows(cells) {}

  deleteColumns(cells) {
    // 만약 선택한 셀이 병합된 셀이라면 삭제하지 않는다.
    if (cells[0].merged == true) return false
    // 먼저 cells 위치의 열을 구한다.
    let columns = []
    cells.forEach(cell => {
      let column = this.getRowColumn(cell).column
      if (-1 == columns.indexOf(column)) columns.push(column)
    })
    columns.sort((a, b) => {
      return a - b
    })
    columns.reverse()

    columns.forEach(column => {
      var widths = this.widths.slice()
      // columns에서 세로 방향으로 이동하면서 병합된 셀을 찾는다.
      let mergedCells = this.findMergedCellByY(column)
      // mergedCells.length가 0이면 일반적으로 열을 지운다.
      if (mergedCells.length === 0) {
        this.remove(this.getCellsByColumn(column))
      }
      // mergedCells.length가 0이 아니면 병합된 셀을 고려하여 열을 지워야 한다.
      else {
        // 삭제할 열에서 병합된 셀을 삭제할 때 해당 셀을 임시로 저장
        let temp = []
        // 부모 셀을 저장
        let superCells = []
        // 부모 셀의 인덱스를 저장
        let superCellIndexes = []
        mergedCells.forEach(cell => {
          let col, row, index
          col = this.getRowColumn(cell).column
          row = this.getRowColumn(cell).row
          index = row * this.columns + col + 1
          while (index) {
            --index
            let component = this.components[index]
            // 슈퍼셀을 찾고 슈퍼셀의 위치에서 rowspan, colspan 거리만큼 이동하면서 cell이 있는지 검증해야함
            if (component.rowspan > 1 || component.colspan > 1) {
              let spColStart = this.getRowColumn(component).column
              let spColEnd = this.getRowColumn(component).column + component.colspan
              let spRowStart = this.getRowColumn(component).row
              let spRowEnd = this.getRowColumn(component).row + component.rowspan
              // 슈퍼셀 영역 안에 자식 셀이 있으면 superCells에 부모셀을 추가
              if (col >= spColStart && col < spColEnd && (row >= spRowStart && row < spRowEnd)) {
                if (-1 == superCellIndexes.indexOf(index)) {
                  superCellIndexes.push(index)
                  superCells.push(component)
                }
              }
            }
          }
        })
        superCellIndexes.forEach(index => {
          let superCellColumn = index % this.columns
          // 지우려는 열이 슈퍼셀을 포함한 경우이면서 슈퍼셀이 마지막 열의 셀이 아닌 경우
          // 그리고 슈퍼셀의 colspan이 1보다 큰 경우
          if (
            column === superCellColumn &&
            superCellColumn !== this.columns - 1 &&
            this.components[index].colspan > 1
          ) {
            this.components[index + 1].rowspan = this.components[index].rowspan
            this.components[index + 1].colspan = this.components[index].colspan - 1
            this.components[index + 1].merged = false
            this.components[index + 1].set('text', this.components[index].get('text'))
          } else {
            this.components[index].colspan -= 1
          }
        })
        this.remove(this.getCellsByColumn(column))
      }
      widths.splice(column, 1)
      this.model.columns -= 1 // 고의적으로, change 이벤트가 발생하지 않도록 set(..)을 사용하지 않음.
      this.set('widths', widths)
    })
  }

  insertCellsAbove(cells) {}

  insertCellsBelow(cells) {}

  insertCellsLeft(cells) {
    // 먼저 cells 위치의 열을 구한다.
    let columns = []
    cells.forEach(cell => {
      let column = this.getRowColumn(cell).column
      if (-1 == columns.indexOf(column)) columns.push(column)
    })
    columns.sort((a, b) => {
      return a - b
    })
    columns.reverse()
    // 열 2개 이상은 추가 안함. 임시로 막아놓음
    if (columns.length >= 2) return false
    let insertionColumnPosition = columns[0]
    let newbieColumnWidths = []
    let newbieCells = []
    columns.forEach(column => {
      // columns에서 세로 방향으로 이동하면서 병합된 셀을 찾는다.
      let mergedCells = this.findMergedCellByY(column)
      // mergedCells.length가 0이면 일반적으로 열을 왼쪽에 추가한다.
      if (mergedCells.length === 0) {
        for (let i = 0; i < this.rows; i++)
          newbieCells.push(buildCopiedCell(this.components[column + this.columns * i].model, this.app))
        newbieColumnWidths.push(this.widths[column])

        let increasedColumns = this.columns
        let index = this.rows
        newbieCells.reverse().forEach(cell => {
          if (index == 0) {
            index = this.rows
            increasedColumns++
          }

          index--
          this.insertComponentAt(cell, insertionColumnPosition + index * increasedColumns)
        })

        let widths = this.widths.slice()
        this.model.columns += columns.length // 고의적으로, change 이벤트가 발생하지 않도록 set(..)을 사용하지 않음.

        widths.splice(insertionColumnPosition, 0, ...newbieColumnWidths)

        this.set('widths', widths)
      }
      // mergedCells.length가 0이 아니면 병합된 셀을 고려하여 열을 추가해야 한다.
      else {
        // 부모 셀을 저장
        let superCells = []
        // 부모 셀의 인덱스 값을 저장
        let superCellIndexes = []
        mergedCells.forEach(cell => {
          let col, row, index
          col = this.getRowColumn(cell).column
          row = this.getRowColumn(cell).row
          index = row * this.columns + col + 1
          while (index) {
            --index
            let component = this.components[index]
            // 슈퍼셀을 찾고 슈퍼셀의 위치에서 rowspan, colspan 거리만큼 이동하면서 cell이 있는지 검증해야함
            if (component.rowspan > 1 || component.colspan > 1) {
              let spColStart = this.getRowColumn(component).column
              let spColEnd = this.getRowColumn(component).column + component.colspan
              let spRowStart = this.getRowColumn(component).row
              let spRowEnd = this.getRowColumn(component).row + component.rowspan
              // 슈퍼셀 영역 안에 자식 셀이 있으면 superCells에 부모셀을 추가
              if (col >= spColStart && col < spColEnd && (row >= spRowStart && row < spRowEnd)) {
                if (-1 == superCellIndexes.indexOf(index)) {
                  superCellIndexes.push(index)
                  superCells.push(component)
                }
              }
            }
          }
        })
        superCellIndexes.forEach(index => {
          // 추가하려는 셀은 일반 셀인데 그 위치에 다른 병합된 셀이 있는 문제로 임시로 막아 놓음. 수정해야함
          if (superCellIndexes.length >= 2) return false
          let superCellColumn = index % this.columns
          let superCellObj = {
            rowspan: this.components[index].rowspan,
            colspan: this.components[index].colspan,
            text: this.components[index].get('text'),
            merged: this.components[index].merged
          }
          // 추가하려는 열이 슈퍼셀을 포함한 경우
          if (superCellColumn === column) {
            for (let i = 0; i < this.rows; i++) newbieCells.push(buildNewCell('simple-grid-field', this.app))
            newbieColumnWidths.push(this.widths[column])

            let increasedColumns = this.columns
            let rowIndex = this.rows
            newbieCells.reverse().forEach(cell => {
              if (rowIndex == 0) {
                rowIndex = this.rows
                increasedColumns++
              }

              rowIndex--
              this.insertComponentAt(cell, insertionColumnPosition + rowIndex * increasedColumns)
            })
          } else {
            this.components[index].colspan += 1
            for (let i = 0; i < this.rows; i++)
              newbieCells.push(buildCopiedCell(this.components[column + this.columns * i].model, this.app))
            newbieColumnWidths.push(this.widths[column])

            let increasedColumns = this.columns
            let rowIndex = this.rows
            newbieCells.reverse().forEach(cell => {
              if (rowIndex == 0) {
                rowIndex = this.rows
                increasedColumns++
              }

              rowIndex--
              this.insertComponentAt(cell, insertionColumnPosition + rowIndex * increasedColumns)
            })
          }
          let widths = this.widths.slice()
          this.model.columns += columns.length // 고의적으로, change 이벤트가 발생하지 않도록 set(..)을 사용하지 않음.

          widths.splice(insertionColumnPosition, 0, ...newbieColumnWidths)

          this.set('widths', widths)
        })
      }
    })
  }

  insertCellsRight(cells) {
    // 먼저 cells 위치의 열을 구한다.
    let columns = []
    cells.forEach(cell => {
      let column = this.getRowColumn(cell).column
      if (-1 == columns.indexOf(column)) columns.push(column)
    })
    columns.sort((a, b) => {
      return a - b
    })
    columns.reverse()
    // 열 2개 이상은 추가 안함. 임시로 막아놓음
    if (columns.length >= 2) return false
    let insertionColumnPosition = columns[columns.length - 1] + 1
    let newbieColumnWidths = []
    let newbieCells = []
    columns.forEach(column => {
      // columns에서 세로 방향으로 이동하면서 병합된 셀을 찾는다.
      let mergedCells = this.findMergedCellByY(column)
      // mergedCells.length가 0이면 일반적으로 열을 오른쪽에 추가한다.
      if (mergedCells.length === 0) {
        for (let i = 0; i < this.rows; i++)
          newbieCells.push(buildCopiedCell(this.components[column + this.columns * i].model, this.app))
        newbieColumnWidths.push(this.widths[column])

        let increasedColumns = this.columns
        let index = this.rows
        newbieCells.reverse().forEach(cell => {
          if (index == 0) {
            index = this.rows
            increasedColumns++
          }

          index--
          this.insertComponentAt(cell, insertionColumnPosition + index * increasedColumns)
        })

        let widths = this.widths.slice()
        this.model.columns += columns.length // 고의적으로, change 이벤트가 발생하지 않도록 set(..)을 사용하지 않음.

        widths.splice(insertionColumnPosition, 0, ...newbieColumnWidths)

        this.set('widths', widths)
      }
      // mergedCells.length가 0이 아니면 병합된 셀을 고려하여 열을 추가해야 한다.
      else {
        // 부모 셀을 저장
        let superCells = []
        // 부모 셀의 인덱스 값을 저장
        let superCellIndexes = []
        mergedCells.forEach(cell => {
          let col, row, index
          col = this.getRowColumn(cell).column
          row = this.getRowColumn(cell).row
          index = row * this.columns + col + 1
          while (index) {
            --index
            let component = this.components[index]
            // 슈퍼셀을 찾고 슈퍼셀의 위치에서 rowspan, colspan 거리만큼 이동하면서 cell이 있는지 검증해야함
            if (component.rowspan > 1 || component.colspan > 1) {
              let spColStart = this.getRowColumn(component).column
              let spColEnd = this.getRowColumn(component).column + component.colspan
              let spRowStart = this.getRowColumn(component).row
              let spRowEnd = this.getRowColumn(component).row + component.rowspan
              // 슈퍼셀 영역 안에 자식 셀이 있으면 superCells에 부모셀을 추가
              if (col >= spColStart && col < spColEnd && (row >= spRowStart && row < spRowEnd)) {
                if (-1 == superCellIndexes.indexOf(index)) {
                  superCellIndexes.push(index)
                  superCells.push(component)
                }
              }
            }
          }
        })
        superCellIndexes.forEach(index => {
          // 추가하려는 셀은 일반 셀인데 그 위치에 다른 병합된 셀이 있는 문제로 임시로 막아 놓음. 수정해야함
          if (superCellIndexes.length >= 2) return false
          let superCellRow = Math.floor(index / this.columns)
          let superCellColumn = index % this.columns
          let superCellObj = {
            rowspan: this.components[index].rowspan,
            colspan: this.components[index].colspan,
            text: this.components[index].get('text'),
            merged: this.components[index].merged
          }
          // 추가하려는 열이 병합된 셀중 마지막 열인 경우
          if (superCellColumn + superCellObj.colspan - 1 === column) {
            for (let i = 0; i < this.rows; i++) newbieCells.push(buildNewCell('simple-grid-field', this.app))
            newbieColumnWidths.push(this.widths[column])

            let increasedColumns = this.columns
            let rowIndex = this.rows
            newbieCells.reverse().forEach(cell => {
              if (rowIndex == 0) {
                rowIndex = this.rows
                increasedColumns++
              }

              rowIndex--
              this.insertComponentAt(cell, insertionColumnPosition + rowIndex * increasedColumns)
            })
          } else if (superCellColumn === column) {
            this.components[index].colspan += 1
            for (let i = 0; i < this.rows; i++)
              newbieCells.push(buildCopiedCell(this.components[column + this.columns * i].model, this.app))
            newbieColumnWidths.push(this.widths[column])

            let increasedColumns = this.columns
            let rowIndex = this.rows
            newbieCells.reverse().forEach(cell => {
              if (rowIndex == 0) {
                rowIndex = this.rows
                increasedColumns++
              }

              rowIndex--
              this.insertComponentAt(cell, insertionColumnPosition + rowIndex * increasedColumns)
            })
            // 슈퍼셀이 복사됐으므로 그 해당 셀을 병합된 셀로 설정한다.
            this.components[index + superCellRow + 1].rowspan = 1
            this.components[index + superCellRow + 1].colspan = 1
            this.components[index + superCellRow + 1].merged = true
            this.components[index + superCellRow + 1].set('text', '')
          } else {
            this.components[index].colspan += 1
            for (let i = 0; i < this.rows; i++)
              newbieCells.push(buildCopiedCell(this.components[column + this.columns * i].model, this.app))
            newbieColumnWidths.push(this.widths[column])

            let increasedColumns = this.columns
            let rowIndex = this.rows
            newbieCells.reverse().forEach(cell => {
              if (rowIndex == 0) {
                rowIndex = this.rows
                increasedColumns++
              }

              rowIndex--
              this.insertComponentAt(cell, insertionColumnPosition + rowIndex * increasedColumns)
            })
          }
          let widths = this.widths.slice()
          this.model.columns += columns.length // 고의적으로, change 이벤트가 발생하지 않도록 set(..)을 사용하지 않음.

          widths.splice(insertionColumnPosition, 0, ...newbieColumnWidths)

          this.set('widths', widths)
        })
      }
    })
  }

  distributeHorizontal(cells) {
    var columns = []

    cells.forEach(cell => {
      let rowcolumn = this.getRowColumn(cell)

      if (-1 == columns.indexOf(rowcolumn.column)) columns.push(rowcolumn.column)
    })

    var sum = columns.reduce((sum, column) => {
      return sum + this.widths[column]
    }, 0)

    var newval = Math.round((sum / columns.length) * 100) / 100
    var widths = this.widths.slice()
    columns.forEach(column => {
      widths[column] = newval
    })

    this.set('widths', widths)
  }

  distributeVertical(cells) {
    var rows = []

    cells.forEach(cell => {
      let rowcolumn = this.getRowColumn(cell)

      if (-1 == rows.indexOf(rowcolumn.row)) rows.push(rowcolumn.row)
    })

    var sum = rows.reduce((sum, row) => {
      return sum + this.heights[row]
    }, 0)

    var newval = Math.round((sum / rows.length) * 100) / 100
    var heights = this.heights.slice()
    rows.forEach(row => {
      heights[row] = newval
    })

    this.set('heights', heights)
  }
}

Component.register('simple-grid', SimpleGrid)
