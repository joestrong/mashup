class Loader {

  load(slug) {
    this.removeExistingVideo()
    this.loadVideo(slug)
  }
  
  setReady() {
    this.ready = true
    if (this.queuedSlug) {
      this.loadVideo(this.queuedSlug)
    }
  }
  
  removeExistingVideo() {
    document.querySelector('#players').innerHTML = ''
  }
  
  loadVideo(slug) {
    if (!this.ready) {
      this.queuedSlug = slug
      return
    }
    
    if (slug === 'open-fire') {
      let pirates = new Player('QrOTgZz2TYM', _ => {
        let kids = new Player('xUMUEaaqlWA', _ => {
          kids.buffer()
          pirates.playSegment(45000, 55000, () => {
            window.setTimeout(_ => {
              kids.play()
            }, 6900)
          })
        })
      })
    }
  }
}