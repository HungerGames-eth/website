export class MenuHamburger {
  constructor(selector) {
    this.$element = this.findElement(selector);
    this.$element.addEventListener('click', this.handleMenuClick);
  }

  findElement(selector, $container = document) {
    const $element = $container.querySelector(selector);
    if (!$element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return $element;
  }

  handleMenuClick() {
    document.documentElement.classList.toggle('menu-opened');
  }
}
