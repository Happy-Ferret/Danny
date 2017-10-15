const html = require('choo/html');

const {selectOption, checkBox} = require('../util');


const elementStyleView = (state, emit) => {
  let elm = state.getEditedObject();
  let changeHandler = (event) => emit('propertyChange', event);

  return html`<form>
      <table>
        <tr>
            <td>${fieldFor('top','Top')}</td>
            <td>${fieldFor('left','Left')}</td>
        </tr>
        <tr>
            <td>${fieldFor('height','Height')}</td>
            <td>${fieldFor('width','Width')}</td>
        </tr>
        <tr>
            <td>
              <p><label for="color">Color</label><br />
              <input type="color"
                onchange=${changeHandler}
                name="color"
                value="${elm.color || '#333333'}" />
                <button onclick=${clearHandlerFor('color')}>
                  Clear
                </button>
              </p>
            </td>
            <td>
              <p><label for="textColor">Text Color</label><br />
              <input type="color"
                onchange=${changeHandler}
                name="textColor"
                value="${elm.textColor || '#000000'}" />
                <button onclick=${clearHandlerFor('textColor')}>
                   Clear
                 </button>
              </p>
            </td>
        </tr>
        <tr>
          <td>${fieldFor('font','Font')}</td>
          <td>${fieldFor('size','Font Size')}</td>
        </tr>
    </table>

      <p><label for="text">Text</label>
      (you can use most of <a target="_blank" href="http://commonmark.org/help/">Markdown</a>)<br />
      <textarea class="elmtext" wrap="virtual"
        onchange=${changeHandler}
        name="text">${elm.text || ''}</textarea>
      </p>

      ${checkBox('Hidden', elm.hidden,
        (e) => emit('propertyChange', {target:{name:'hidden',value: e.target.checked}}))}

      ${fieldFor('class','Class')}

      <div style="text-align:center">
        <button onclick=${deleteHandler}>Delete Element</button>
      </div>
    </form>`;

  function fieldFor(attName, displayName) {
    return html`<p><label for="${attName}">${displayName}</label><br />
    <input type="text"
      onchange=${changeHandler}
      name="${attName}"
      value="${elm[attName]}" />
    </p>`;
  }

  function clearHandlerFor(propName, buttony = true) {
    return function() {
      emit('propertyChange', {target: {name: propName, value: ''}});
      if (buttony) {
        return false;
      }
    }
  }

  function deleteHandler() {
      if (window.confirm("Seriously? (There's no Undo yet)")) {
          emit('deleteElement');
      }
      return false;
  }
};

module.exports = elementStyleView;
