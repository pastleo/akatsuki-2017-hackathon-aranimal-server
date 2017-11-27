import { html, render } from '../jslib/lit-html.js'

const buildingTypeMapper = {
  "0": html`<img src="/img/tree.png" />`,
  "1": html`<img src="/img/pond.png" />`,
  "2": html`<img src="/img/cube.png" />`,
  "3": html`<img src="/img/castel.png" />`,
}

class FrenzuGallery extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.scenes = []
    this.fetchScenes()
    this.render()
  }

  async fetchScenes() {
    this.scenes =
      (
        await (await fetch('/scenes')).json()
      ).map(
        scene => ({
          ...scene,
          contents: JSON.parse(scene.contents),
        })
      )
    this.render()
  }

  render() {
    render(html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.1/css/bulma.min.css">
      <style>
        .buildings img {
          width: 40px;
        }
				.card {
          transition: all 0.5s;
        }
				.card:hover {
          box-shadow: 0px 0px 10px #888888;
        }
      </style>
      <div class="columns is-multiline">
        ${this.scenes.map((scene) => html`
          <div class="column is-half is-desktop">
            <div class="card">
              <div class="card-image">
                <figure class="image">
                  <img src="${scene.screenshot.url}" alt="${scene.owner}">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-1">[${scene.id}] ${scene.owner}</p>
                  </div>
                </div>

                <div class="content buildings">
                  ${
                    _.uniq(scene.contents.buildings.map(({type}) => type)).map(type => buildingTypeMapper[type])
                  }
                  <br>
                  <time datetime="${scene.created_at}">shared at ${scene.created_at}</time>
                </div>
              </div>
            </div>
          </div>`
        )}
      </div>
    `, this.shadowRoot);
  }
}

customElements.define('frenzu-gallery', FrenzuGallery);
export default FrenzuGallery
