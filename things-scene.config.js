import locales from './locales';

import icon from './assets/table.png';

var templates = [{
  type: 'table',
  description: 'table',
  group: 'table',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon,
  model: {
    type: 'table',
    top: 100,
    left: 100,
    width: 500,
    height: 200,
    strokeStyle: '#999',
    fillStyle: 'white',
    lineWidth: 2,
    rows: 5,
    columns: 5,
    data: [
      ['header1', 'header2', 'header3'],
      [100, 200, 300],
      [1000, 2000, 3000]
    ]
  }
}];

module.exports = {
  templates,
  locales
};
