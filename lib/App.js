class App {
  constructor(selector) {
    this.appElement = document.querySelector(selector);
    this.components = {};
  }

  addComponent(component) {
    this.components[component.name] = component;
  }

  showComponent(name) {
    this.currentComponent = this.components[name];
    this.updateView();
    if (this.currentComponent) {
      this.currentComponent.controller(this.currentComponent.model);
    }
  }

  updateView() {
    if (this.currentComponent) {
      this.appElement.innerHTML = this.currentComponent.view(
        this.currentComponent.model
      );
    }
  }

  clearView() {
    this.appElement.innerHTML = "";
  }
}

export default App;
