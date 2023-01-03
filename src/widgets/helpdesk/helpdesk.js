import './helpdesk.css';
import RequestSender from '../../js/requestsender';

// Наименование стиля для скрытия объекта
const STYLE_HIDDEN = 'hidden';

// Заголовок по умолчанию
const DEFAULT_TITLE = 'Список задач';

// Настройки форм диалога
const FORMS = {
  title: [
    'Добавить тикет',
    'Изменить тикет',
    'Удалить тикет',
  ],
  idInputName: 'inputName',
  idInputDescription: 'inputDescription',
};

export default class HelpDeskWidget {
  constructor(parentEl, urlServer, title = DEFAULT_TITLE) {
    this.parentEl = parentEl;
    
    this.urlServer = urlServer;

    this.tasksList = {
      title,
      items: [],
    };
  }

  static itemHTML(item) {
    const html = `
        <li class="tasks__item list-group-item mb-2" draggable="true" data-id="${item.id}">
          <div class="row d-flex">
            <div class="col-md-1">
              <div class="form-check">
                <input class="item__status form-check-input" type="checkbox" value="" id="flexCheckChecked" ${item.status ? 'checked' : ''}>
              </div>
            </div>
            <div class="col-md-7 d-flex justify-content-start">
              <h6 class="item__name mb-0">${item.name}</h6>
            </div>
            <div class="col-md-3 d-flex justify-content-center">
              <h6 class="item__name mb-0">${item.created}</h6>
            </div>
            <div class="col-md-1 d-flex justify-content-end">
              <button class="item__edit btn btn-primary btn-sm" title="Редактировать задачу">&#9998;</button>
              <button class="item__delete btn btn-danger btn-sm ms-1" data-bs-toggle="modal" 
                data-bs-target="#deleteTicketDialog" title="Удалить задачу">&#10005;</button>
          </div>         
          <div class="col-md-1"></div>
          <div class="item__description col-md-7 hidden">
            <p></p>
          </div>
        </li>`;
    return html;
  }

  static itemsHTML(items) {
    let html = '';
    if (items) {
      items.forEach((item) => {
        html += this.itemHTML(item);
      });
    }
    return html;
  }

  static tasksListHTML(tasksList) {
    return `
      <div class="col-md-12 h-100 p-2">        
        <div class="tasks__card card" data-id="${tasksList.id}">
          <div class="tasks__header card-header py-2">
            <div class="row d-flex">
              <div class="col-md-9 d-flex justify-content-start">
                <h5 class="tasks__title mb-0 align-items-left">${tasksList.title}</h5>
              </div>
              <div class="col-md-3 d-flex justify-content-end">
                <button class="item__add btn btn-success btn-sm" 
                  title="Добавить новую задачу">
                  &#10009; Добавить тикет
                </button>
              </div>
            </div>
          </div>

          <div class="tasks__body card-body h-100 p-2" data-mdb-perfect-scrollbar="true">
              <ul class="tasks__list list-group">
                  ${HelpDeskWidget.itemsHTML(tasksList.items)}
              </ul>
          </div>
        </div>
      </div>
    `;
  }

  static get loadingHTML() {
    return `
      <div class="form-processing ${STYLE_HIDDEN}">
      <div class="overlay" id="overlay"></div>
      <div class="loadingProcess" id="loadingProcess"></div>
      </div>
    `;
  }

  static get formTicketDeleteHTML() {
    return `
      <div class="dialog-delete ${STYLE_HIDDEN}">
        <div class="overlay" id="overlay"></div>
        <form class="form-ticket-delete row g-3">
          <div class="col-12">
            <div class="d-flex justify-content-center">
              <h5 class="form-title">Удалить тикет</h5>
            </div>
            <p>Вы уверены, что хотите удалить тикет? Это действие не обратимо.</p>
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button type="button" value="cancel" class="cancel-button btn btn-secondary">Отмена</button>
            <button type="submit" value="submit" class="submit-buttom btn btn-primary ms-2">ОК</button>
          </div>
        </form>
      </div>
      `;
  }

  static get formTicketHTML() {
    return `
    <div class="dialog-add-edit ${STYLE_HIDDEN}">
      <div class="overlay" id="overlay"></div>
      <form class="form-ticket row g-3">
        <div class="col-12 d-flex justify-content-center">
          <h5 class="form-title">Изменить тикет</h5>
        </div>
        <div class="col-12">
          <label for="inputName" class="form-label">Краткое описание</label>
          <input type="text" class="form-control" required data-id="${FORMS.idInputName}">
        </div>
        <div class="col-12">
          <label for="inputDescription" class="form-label">Подробное описание</label>
          <textarea class="form-control" required data-id="${FORMS.idInputDescription}" type="text" rows="3"></textarea>
        </div>
        <div class="col-12 d-flex justify-content-end">
          <button type="button" value="cancel" class="cancel-button btn btn-secondary">Отмена</button>
          <button type="submit" value="submit" class="submit-buttom btn btn-primary ms-2">ОК</button>
        </div>
      </form>
    </div>
    `;
  }

  static idSelector(id) {
    return `[data-id="${id}"]`;
  }

  static get itemAddSelector() {
    return '.item__add';
  }

  static get itemSelector() {
    return '.tasks__item';
  }

  static get listItemsSelector() {
    return '.tasks__list';
  }

  static get delItemSelector() {
    return '.item__delete';
  }

  static get editItemSelector() {
    return '.item__edit';
  }

  static get loadingSelector() {
    return '.form-processing';
  }

  static get descriptionItemSelector() {
    return '.item__description';
  }

  static get nameItemSelector() {
    return '.item__name';
  }

  static get statusItemSelector() {
    return '.item__status';
  }

  static get formTicketSelector() {
    return '.form-ticket';
  }

  static get formTicketDeleteSelector() {
    return '.form-ticket-delete';
  }

  static get formTitleSelector() {
    return '.form-title';
  }

  static get dialogLoadingSelector() {
    return '.dialog-loading';
  }

  static get dialogDeleteSelector() {
    return '.dialog-delete';
  }

  static get dialogAddEditSelector() {
    return '.dialog-add-edit';
  }

  static get cancelButtonSelector() {
    return '.cancel-button';
  }

  static get submitButtonSelector() {
    return '.submit-button';
  }

  // Разметка HTML и отслеживание событий
  async bindToDOM() {
    // Отрисовка HTML
    this.parentEl.innerHTML = '';
    if (!this.urlServer) {
      return;
    }

    this.parentEl.innerHTML += HelpDeskWidget.loadingHTML;
    this.parentEl.innerHTML += HelpDeskWidget.formTicketHTML;
    this.parentEl.innerHTML += HelpDeskWidget.formTicketDeleteHTML;

    const formProcess = this.parentEl.querySelector(HelpDeskWidget.loadingSelector);
    this.XHR = new RequestSender(this.urlServer, {
      form: formProcess, 
      hide: STYLE_HIDDEN
    });

    this.tasksList.items = await this.getAllTickets();

    this.parentEl.innerHTML += HelpDeskWidget.tasksListHTML(this.tasksList);

    this.initEvents();
  }

  initEvents() {
    // Обработка событий по нажатию на кнопку добавить Тикет
    const buttonItemAdd = this.parentEl.querySelector(HelpDeskWidget.itemAddSelector);
    // this.onClickItemAdd = this.onClickItemAdd.bind(this);
    buttonItemAdd.addEventListener('click', () => {
      const dialogAddEdit = this.parentEl.querySelector(HelpDeskWidget.dialogAddEditSelector);
      this.showFormDialog(dialogAddEdit, 0);
    });

    // Обработка событий на каждой задаче и списка
    const tasksListItems = this.parentEl.querySelector(HelpDeskWidget.listItemsSelector);
    this.initItemsEvents(tasksListItems);
  }

  initItemsEvents(ul) {
    // Отработка событий на каждой задаче из списка
    const items = ul.querySelectorAll(HelpDeskWidget.itemSelector);
    items.forEach((item) => this.initItemEvents(item));
  }

  initItemEvents(item) {
    const idItem = item.dataset.id;

    // Событие по клику задачу
    item.addEventListener('click', async (evt) => {
      const divDescription = item.querySelector(HelpDeskWidget.descriptionItemSelector);

      if (!divDescription) {
        return;
      }
      
      if (divDescription.classList.contains(STYLE_HIDDEN)) {
        const pDescription = divDescription.querySelector('p');
        const itemData = await this.getItemData(idItem);
        pDescription.innerText = itemData ? itemData.description : '';  
      }

      divDescription.classList.toggle(STYLE_HIDDEN);
    });

    // Событие изменения статуса задачи
    const statusItem = item.querySelector(HelpDeskWidget.statusItemSelector);
    statusItem.addEventListener('click', (evt) => {
      evt.stopPropagation();
    });

    // Событие удаления задачи
    const deleteItem = item.querySelector(HelpDeskWidget.delItemSelector);
    deleteItem.addEventListener('click', async (evt) => {
      evt.stopPropagation();
      const dialogDelete = this.parentEl.querySelector(HelpDeskWidget.dialogDeleteSelector);
      const itemData = await this.getItemData(idItem);
      this.showFormDialog(dialogDelete, 2, itemData);
    });

    // Событие редактирования задачи
    const editItem = item.querySelector(HelpDeskWidget.editItemSelector);
    editItem.addEventListener('click', async (evt) => {
      evt.stopPropagation();
      const dialogAddEdit = this.parentEl.querySelector(HelpDeskWidget.dialogAddEditSelector);
      const itemData = await this.getItemData(idItem);
      this.showFormDialog(dialogAddEdit, 1, itemData);
    });
  }

  async getItemData(id) {
    const data = await this.getTicket(id);
    if (data.length <= 0) {
      return;
    }

    return data[0];
  }

  showFormDialog(dialog, typeDialog, item = null) {
    // console.log(dialog, typeDialog, item);
    if (typeDialog < 0 || typeDialog > 2) return;

    dialog.classList.remove(STYLE_HIDDEN);

    // Заголовок формы
    const titleForm = dialog.querySelector(HelpDeskWidget.formTitleSelector);
    titleForm.innerText = FORMS.title[typeDialog];

    // Отработка кнопки "Отмена"
    const cancelButton = dialog.querySelector(HelpDeskWidget.cancelButtonSelector);
    cancelButton.addEventListener('click', () => dialog.classList.add(STYLE_HIDDEN));


    switch (typeDialog) {
      // Диалог добавления нового тикета
      case 0: {
        const inputName = dialog.querySelector(HelpDeskWidget.idSelector(FORMS.idInputName));
        inputName.value = '';

        const inputDescription = dialog.querySelector(
          HelpDeskWidget.idSelector(FORMS.idInputDescription),
        );
        inputDescription.value = '';

        // Отработка подтверждения формы
        dialog.addEventListener('submit', async (evt) => {
          evt.preventDefault();

          // const body = {
          //   name: inputName.value,
          //   desciption: inputDescription.value,
          // }

          const body = new FormData(dialog.querySelector(HelpDeskWidget.formTicketSelector));

          console.log('Add submit: ' + body);

          const result = await this.addTicket(body);

          console.log(result);
          dialog.classList.add(STYLE_HIDDEN);
        });
      }

      // Диалог редактирования тикета
      case 1: {
        // const textInputName = item.querySelector(HelpDeskWidget.nameItemSelector);
        const inputName = dialog.querySelector(HelpDeskWidget.idSelector(FORMS.idInputName));
        // console.log(inputName, textInputName);
        // inputName.value = textInputName.innerText;
        inputName.value = item ? item.name : '';

        // const textInputDescription = item.querySelector(HelpDeskWidget.textInputDescription);
        const inputDescription = dialog.querySelector(
          HelpDeskWidget.idSelector(FORMS.idInputDescription),
        );
        // inputDescription.value = textInputDescription.innerText;
        inputDescription.value = item ? item.description : '';
        return;
      }

      // Диалог удаления тикета
      case 2: {
        // Отработка подтверждения формы
        dialog.addEventListener('submit', (evt) => {
          evt.preventDefault();
          console.log('Delete submit');
          dialog.classList.add(STYLE_HIDDEN);
        });
      }

      default:
        return;
    }
  }

  async getAllTickets() {
    const responseText = await this.XHR.sendRequest('GET', 'method=allTickets'); 
    return HelpDeskWidget.responseAnswer(responseText);
  }

  async getTicket(id) {
    if (!id) {
      return;
    }

    const responseText = await this.XHR.sendRequest('GET', `method=ticketById&id=${id}`); 
    return HelpDeskWidget.responseAnswer(responseText);
  }

  async addTicket(body) {
    if (!body) {
      return;
    }

    const responseText = await this.XHR.sendRequest('POST', 'method=createTicket', body); 
    return HelpDeskWidget.responseAnswer(responseText);
  }

  static responseAnswer(a) {
    let rAnswer = null;

    if (!(a.status >= 200 && a.status < 300)) {
      console.error(`Ошибка обращения к серверу (${a.body}): ${a.status}.`);
    }   

    if (a.status === 202) {
      try {
        rAnswer = JSON.parse(a.responseText);
      } catch (e) {
        console.error(`${e} Статус: ${a.status}. Тело: ${a.responseText}.`);
      }
    }

    return rAnswer;
  }

}
