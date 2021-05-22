import { html, css, LitElement } from 'lit-element';
import '@material/mwc-textfield';
import '@material/mwc-list';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-checkbox';
import '@material/mwc-button';

class FRegalos extends LitElement {
    constructor() {
        super();
        this.regalo = '';
        this.regalos = [];
    }

    static get styles() {
        return css`
        .container {
            flex-direction: column;
            margin: 0 auto;
            width: 50vw;
            max-width: 70vw;
          }

        mwc-button {
            --mdc-theme-primary: #ff6600;
        }
        `;
    }

    static get properties() {
        return {
            regalo: {
              type: String,
            },
            regalos: {
              type: Array
            }
        };
    }

    addRegalo() {
      const regalo = this.shadowRoot.querySelector('#current-regalo');
      this.regalos = [...this.regalos, regalo.value];
      regalo.value = '';
  }

    render() {
        return html`
        <div class="container">
            <mwc-textfield
                label="Regalo"
                @change="${e => (this.regalo = e.target.value)}"
                .value="${this.regalo}"
                id="current-regalo"
            ></mwc-textfield>
            <mwc-button
                raised
                @click="${this.addRegalo}"
                label="Agregar"
                ?disabled="${this.regalo === ''}"
            ></mwc-button>


            ${this.regalos.length === 0
                ? html`
                    <p>Ingrese regalos</p>   `
                : html`
                    <mwc-list>
                        ${this.regalos.map(
                            regalo => html`
                                <slot>${regalo}</slot>
                                <br>
                                `
                        )}
                    <li divider role="separator"></li>
                    </mwc-list>
                `
            }
        </div>`;
    }
}

customElements.define('Fregalos', FRegalos);
