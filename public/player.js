class Player {
  
  constructor(youtubeId, readyCallback) {
    this.ready = false
    this.playingCallback = null
    this.bufferingCallback = null

    this.element = document.createElement('div')
    this.element.id = youtubeId
    document.querySelector('#players').appendChild(this.element)
    
    this.player = new YT.Player(this.element.id, {
      height: '195',
      width: '320',
      videoId: youtubeId,
      events: {
        'onReady': event => {
          this.ready = true
          readyCallback.call(event)
        },
        'onStateChange': event => {
          if (event.data === YT.PlayerState.PLAYING) {
            if (this.playingCallback) {
              this.playingCallback.call()
            }
          }
          if (event.data === YT.PlayerState.BUFFERING) {
            if (this.bufferingCallback) {
              this.bufferingCallback.call()
            }
          }
        }
      }
    })
  }
  
  playSegment(start, stop, playingCallback, finishedCallback) {
    this.player.seekTo(start / 1000)
    this.play(() => {
      if (playingCallback) {
        playingCallback.call()
      }
      window.setTimeout(_ => {
        this.stop()
        if (finishedCallback) {
          finishedCallback.call()
        }
      }, stop - start)
    })
  }

  play(playingCallback) {
    this.playingCallback = playingCallback ? playingCallback : null
    this.player.playVideo()
  }

  stop() {
    this.player.stopVideo()
  }

  bufferAt(timecode) {
    this.player.seekTo(timecode / 1000)
    this.buffer()
  }

  buffer() {
    this.bufferingCallback = _ => {
      this.player.pauseVideo()
    }
    this.play()
  }
  
  playAt(timecode, playingCallback) {
    this.player.seekTo(timecode / 1000)
    this.play(playingCallback)
  }
}