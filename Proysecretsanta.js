import { html, css, LitElement } from 'lit-element';
import '@material/mwc-textfield';
import '@material/mwc-list';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-checkbox';
import '@material/mwc-button';
import '@material/mwc-icon-button'
import '@material/mwc-top-app-bar-fixed'
import './FCregalos'

class FSecretsanta extends LitElement {
    constructor() {
        super();
        this.todo = '';
        this.todos = [];
        this.intercambios = [];
    }

    static get styles() {
        return css`
        .container {
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            width: 50vw;
            max-width: 70vw;
          }

          mwc-button {
            --mdc-theme-primary: #ff6600;
          }

          mwc-top-app-bar-fixed {
            --mdc-theme-primary: #ff6600;
          }
        `;
    }

    static get properties() {
        return {
            todo: {
                type: String,
            },
            todos: {
                type: Array
            },
            intercambios: {
              type: Array
            }
        };
    }
    
    addTodo() {
        const todo = this.shadowRoot.querySelector('#current-todo');
        this.todos = [...this.todos, todo.value];
        
        todo.value = '';
    }
    
    deleteTodo(e) {
        this.todos = this.todos.filter(todo => todo !== e.target.id);
    }

    realizarSorteo() {
      this.contenido = this.shadowRoot.querySelector('#sorteo_realizado');

      for (let index = 0; index < this.todos.length; index++) {
        if (index === this.todos.length - 1) {
          this.intercambios[index] = this.todos[index] + " Secret santa a  " + this.todos[0]
        }
        else {
          this.intercambios[index] = this.todos[index] + " Secret santa a " + this.todos[index + 1]
        }
        
     }

     this.requestUpdate()
     this.contenido.display = 'block';
      
    }

    render() {
        return html`

        <mwc-top-app-bar-fixed centerTitle>
            <mwc-icon-button icon="menu" slot="navigationIcon"></mwc-icon-button>
            <div slot="title">Secret Santa</div>
            <mwc-icon-button icon="favorite" slot="actionItems"></mwc-icon-button>
            <div><!-- content --></div>
        </mwc-top-app-bar-fixed>

        <br>

        <div class="container">
          <mwc-textfield
            label="Participante"
            helper="Ingresa un participante"
            @change="${e => (this.todo = e.target.value)}"
            .value="${this.todo}"
            id="current-todo"
          ></mwc-textfield>

          <mwc-button
            raised
            @click="${this.addTodo}"
            label="Agregar"
            ?disabled="${this.todo === ''}"
          ></mwc-button>

          ${this.todos.length === 0
            ? html`
              <p>Vacío</p>
              `
            : html`
              <mwc-list>
              ${this.todos.map(
                  todo => html`
                    <slot>${todo}</slot>
                    <li divider role="separator"></li>
                    <Fregalos></Fregalos>
                  `
               )}
              </mwc-list>
              `
          }

          ${this.todos.length > 2
            ? html`
            <mwc-button
              raised
              @click="${this.realizarSorteo}"
              label="Hacer sorteo"
              ?disabled="${this.todo.length < 3}"
            ></mwc-button>
            <br>
            <div id="sorteo_realizado">

              ${this.intercambios.map(
                  intercambio => html`
                    
                    <slot>${intercambio}</slot>
                    <br>
                  `
               )}
            </div>
            `
            : console.log("Ejecutar prueba random")
          }
        </div>`;
    }

}

customElements.define('Fsecretsanta', FSecretsanta);
