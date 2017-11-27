class Pastate {
  constructor(state, config = {}) {
    this.config = {
      ttl: 1000,
      ...config,
    }

    this.handlers = {}
    this.listeners = []
    this.records = [{
      t: 0,
      type: 'init', // or 'listen', 'emit'
      event: 'init',
      handlers: [],
      state: state || {},
    }]
  }

  _bump(i) {
    const { type, event } = this.records[i]
    const { state, handlers } = this.records[i-1]
    switch (type) {
      case 'emit': {
        this.records[i].handlers = handlers
        this.records[i].state = handlers.reduce(
          async (s, h) => {
            try {
              if(s) await s
              return await this.handlers[h](s, event)
            } catch (e) {
              console.error(`Error in handler '${h}':`, {e, state: s, event})
              return s
            }
          },
          state
        )
        break
      }
      case 'listen': {
        this.records[i].state = state
        this.records[i].handlers =
          [...handlers, event.handlerId]
        break
      }
    }
  }

  _commit({ type, event, t }) {
    const timestamp = t || Date.now()
    let i = this.records.length
    while(i > 0 && timestamp < this.records[i-1].t) { i--; }

    const head = this.records[this.records.length - 1].t
    let lengthToClear = this.records.findIndex(
      ({ t }) => t + this.config.ttl > head
    ) - 1

    if (lengthToClear > 0) {
      this.records.splice(0, lengthToClear)
    }
    else if (lengthToClear < 0) {
      lengthToClear = 0
    }

    if (i > lengthToClear) {
      i -= lengthToClear
      this.records.splice(i, 0, {
        type,
        event,
        t: timestamp,
      })
      while(i < this.records.length) {
        this._bump(i)
        i++;
      }
      debugger
      const calculatedState = this.records[i-1].state
      this.listeners.forEach(listener => listener(calculatedState))
    }
    else {
      console.warn('commit too late to come:', { event, t })
    }
  }

  listen(id, handler, t) {
    if (this.handlers[id]) {
      console.error(`handler '${id}' is already registered`)
      return
    }
    this.handlers[id] = handler
    this._commit({
      type: 'listen',
      event: {
        handlerId: id,
      },
      t,
    })
  }
  listen_init(id, handler) {
    this.listen(id, handler, 1)
  }

  emit(event, t) {
    this._commit({
      type: 'emit',
      event,
      t,
    })
  }

  state() {
    return this.records[this.records.length - 1].state
  }

  addListener(callback) {
    this.listeners.push(callback)
  }
}

const pastate = new Pastate({
  viewing: 'gallery',
  users: [],
  scenes: [],
})

pastate.listen_init('refreshScenes', async (state, { type }) => {
  if (type === 'refreshScenes') {
    return {
      ...state,
      scenes: (await (await fetch('/scenes')).json()).map(
        scene => ({
          ...scene,
          contents: JSON.parse(scene.contents),
        })
      )
    }
  }
  return state
})

export default pastate
