const html = require("choo/html");

const {selectOption} = require('./util');


const editBarView = (state, emit) => {
    const isBg = state.editingBackground();
    const ecks = html`<a href="#" onclick=${() => emit('turnOffEditMode')}></a>`;
    ecks.innerHTML = '&times;';

    return html`<nav id="editbar">
      <aside class="readout">
        Danny 0.1 👦🏾<br />
        ${isBg
            ? html`<span>Bg ${state.getCurrentBackgroundIndex()} of ${state.getBackgroundCount()}</span>`
            : html`<span>Card ${state.getCurrentCardIndex()} of ${state.getCardCount()}</span>`
        }
      </aside>

      <ul>
        <li>Create new:
        <button onclick=${() => {emit('newElement');return false}}>Element</button>
        <button onclick=${() => {emit('newImage');return false}}>Image</button>
        <button onclick=${() => {emit('newField');return false}}>Field</button>
        <button onclick=${() => {emit('newBg');return false}}>Background</button>
        <button onclick=${() => {emit('newCard');return false}}>Card</button></li>
        <li class="bgmode"><a href="#" onclick=${() => emit("editBgMode")}>
            ${isBg ? 'Card' : 'Background'} mode
        </a></li>
        <li><a href="#" onclick=${() => emit(isBg ? 'editBg' :'editCard')}>
            Edit ${isBg ? 'background' : 'card'}
        </a></li>
        <li><a href="#" onclick=${() => emit("editStack")}>Edit stack</a></li>
        <li class="close">${ecks}</li>
      </ul>
      ${state.addingImage ? dropImage() : ""}
    </nav>`;

    function dropImage() {
        emit('ensureStaticFileLists');
        return html`<form id="addimage">
            Choose or drop: <input type="file"
              onchange=${e => emit("addImage", e)}
              class="${state.hoveringImage ? "drophover" : ""}" />
            Or select existing:
            <select name="existingImage" onchange=${(e) => emit("addImage", e)}>
                ${selectOption(null, '-', null)}
                ${state.staticFiles && state.staticFiles.map((file) => selectOption(file))}
            </select>
            <a href="#" onclick=${cancelImage} style="padding-left:12rem;color:red;">Cancel</a>
        </form>`;
    }

    function cancelImage() {
        state.addingImage = false;
        setTimeout(() => emit("render"), 1);
    }
};

module.exports = editBarView;
