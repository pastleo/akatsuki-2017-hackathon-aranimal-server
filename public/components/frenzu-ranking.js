import { html, render } from '../jslib/lit-html.js'

class FrenzuRanking extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.users = []
    this.fetchUsers()
    this.render()
  }

  async fetchUsers() {
    this.users = await (await fetch('/users')).json()
    this.render()
  }

  render() {
    render(html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.1/css/bulma.min.css">
      <style>
        .rank-0 {
          background: #fbd779;
        }
        .rank-1 {
          background: #fbd778a3;
        }
        .rank-2 {
          background: #fbd77859;
        }
      </style>
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody>
          ${this.users.map((user, i) => html`
            <tr class="rank-${i}">
              <td>${i + 1}</td>
              <td>${user.name}</td>
              <td>${user.point}</td>
            </tr>`
          )}
        </tbody>
      </table>
    `, this.shadowRoot);
  }
}

customElements.define('frenzu-ranking', FrenzuRanking);
export default FrenzuRanking
