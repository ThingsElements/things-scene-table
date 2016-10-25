var {
  Component,
  Container,
  Layout
} = scene;

export default class TableColumn extends Container {

  get layout() {
    return Layout.get('linear-vertical');
  }
}

Component.register('table-column', TableColumn);
