class Navigation {

  constructor(selector, navigationCallback) {
    this.container = document.querySelector(selector)
    this.navigationCallback = navigationCallback
    this.buildMenu()
    this.initEvents()
  }

  buildMenu() {
    const ul = document.createElement('ul')
    this.container.appendChild(ul)

    const navitems = [
      { name: 'Home', slug: '' },
      { name: 'Open Fire!', slug: 'open-fire' },
      { name: 'Dank', slug: 'dank' }
    ]

    for (let i = 0; i < navitems.length; i++) {
      let li = document.createElement('li')
      if (window.location.pathname === '/' + navitems[i].slug) {
        li.classList.add('current')
      }
      let a = document.createElement('a')
      a.textContent = navitems[i].name
      a.href = '/' + navitems[i].slug
      li.appendChild(a)
      ul.appendChild(li)
    }
  }

  initEvents() {
    this.container.addEventListener('click', event => {
      if (event.target.localName === 'a') {
        this.itemClick(event)
      }
    })
    window.onpopstate = this.popState.bind(this)
  }

  itemClick(event) {
    event.preventDefault()
    window.history.pushState({}, event.target.textContent, event.target.href)
    const slug = event.target.href.split('/').pop()
    if (this.navigationCallback) {
      this.navigationCallback.call(this, slug)
    }
  }

  popState(event) {
    const slug = document.location.pathname.substr(1)
    if (this.navigationCallback) {
      this.navigationCallback.call(this, slug)
    }
  }
}