import { html } from '../jslib/lit-html.js'
import { render } from '../jslib/lit-html/lit-extended.js'
import FrenzuGallery from './frenzu-gallery.js'

class FrenzuApp extends HTMLElement {

  constructor() {
    super();
    this.switchShowing = this.switchShowing.bind(this)
    document.getElementById('remove-if-support').remove();
    this.attachShadow({mode: 'open'});
    this.showing = 'gallery'
    this.render()
  }

  switchShowing() {
    if(this.showing == 'gallery')
      this.showing = 'ranking'
    else 
      this.showing = 'gallery'

    this.render()
  }

  render() {
    render(html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.1/css/bulma.min.css">
      <style>
        .pixel.title {
					font-family: SubwayTicket;
				}
				.hero {
					background: rgba(255,255,255,1);
					background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(244,244,244,1) 58%, rgba(237,237,237,0) 100%);
					background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(255,255,255,1)), color-stop(47%, rgba(246,246,246,1)), color-stop(58%, rgba(244,244,244,1)), color-stop(100%, rgba(237,237,237,0)));
					background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(244,244,244,1) 58%, rgba(237,237,237,0) 100%);
					background: -o-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(244,244,244,1) 58%, rgba(237,237,237,0) 100%);
					background: -ms-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(244,244,244,1) 58%, rgba(237,237,237,0) 100%);
					background: linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(244,244,244,1) 58%, rgba(237,237,237,0) 100%);
					filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#ededed', GradientType=0 );
        }
      </style>
      <section class="hero">
        <div class="hero-body">
          <h1 class="title pixel">
            Pixel Frenzu ${this.showing === 'gallery' ? 'Gallery' : 'Ranking'}
            <a id="switch-btn" class="button" on-click=${this.switchShowing}>改看${this.showing === 'gallery' ? '排行榜' : '展示間'}</a>
          </h1>
          <p class="subtitle">
          <strong>像素朋友${this.showing === 'gallery' ? '展示間' : '排行榜'}</strong>
          </p>
        </div>
      </section>
      <section class="section">
        <div class="container">
          ${this.showing === 'gallery' ?
            html`<frenzu-gallery></frenzu-gallery>` :
            html`<frenzu-ranking></frenzu-ranking>`
          }
        </div>
      </section>
    `, this.shadowRoot);
  }
}

customElements.define('frenzu-app', FrenzuApp);
