import './helpdesk.css';
import { v4 as uuidv4 } from 'uuid';

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
    const id = uuidv4();
    const html = `
        <li class="tasks__item list-group-item mb-2" draggable="true" data-id="${id}">
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
            <p>${item.description}</p>
          </div>
        </li>`;
    return {
      innerHTML: html,
      id,
    };
  }

  static itemsHTML(items) {
    let html = '';
    if (items) {
      items.forEach((item) => {
        html += this.itemHTML(item).innerHTML;
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
      <div class="dialog-loading ${STYLE_HIDDEN}">
        <div class="loading-process" id="loadingProcess"></div>
      </div>
    `;
    // return `<div class="" id="loadingProcess"></div>`;
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

  // static get itemClass() {
  //   return 'tasks__item';
  // }

  static get listItemsSelector() {
    return '.tasks__list';
  }

  // static get listItemsClass() {
  //   return 'tasks__list';
  // }

  static get delItemSelector() {
    return '.item__delete';
  }

  static get editItemSelector() {
    return '.item__edit';
  }

  // static get delItemClass() {
  //   return 'item__close';
  // }

  // static get cardSelector() {
  //   return '.tasks__card';
  // }

  // static get cardTitleSelector() {
  //   return '.tasks__title';
  // }

  // static get closeCardSelector() {
  //   return '.new__item__close';
  // }

  // static get addCardSelector() {
  //   return '.new__item__add';
  // }

  // static get cardDivSelector() {
  //   return '.item__card';
  // }

  // static get textNewItemSelector() {
  //   return '.new__item__text';
  // }

  static get loadingSelector() {
    return '.loadingProcess';
  }

  static get descriptionItemSelector() {
    return '.item__description';
  }

  static get nameItemSelector() {
    return '.item__name';
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
  bindToDOM() {
    // Отрисовка HTML
    this.parentEl.innerHTML = '';
    if (!this.urlServer) {
      return;
    }

    this.getAllTickets();
    console.log(this.tasksList);
    this.parentEl.innerHTML += HelpDeskWidget.loadingHTML;
    this.parentEl.innerHTML += HelpDeskWidget.formTicketHTML;
    this.parentEl.innerHTML += HelpDeskWidget.formTicketDeleteHTML;
    // this.tasksList.id = uuidv4();
    this.parentEl.innerHTML += HelpDeskWidget.tasksListHTML(this.tasksList);

    this.initEvents();
  }

  initEvents() {
    // Обработка событий по нажатию на кнопку добавить Тикет
    const buttonItemAdd = this.parentEl.querySelector(HelpDeskWidget.itemAddSelector);
    // this.onClickItemAdd = this.onClickItemAdd.bind(this);
    buttonItemAdd.addEventListener('click', () => {
      const dialogAddEdit = this.parentEl.querySelector(HelpDeskWidget.dialogAddEditSelector);
      HelpDeskWidget.showFormDialog(dialogAddEdit, 0);
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
    const descritpion = item.querySelector(HelpDeskWidget.descriptionItemSelector);
    // Событие по клику задачу
    item.addEventListener('click', (evt) => {
      if (!descritpion) {
        return;
      }
      descritpion.classList.toggle('hidden');
    });

    // Событие удаления задачи
    const deleteItem = item.querySelector(HelpDeskWidget.delItemSelector);
    deleteItem.addEventListener('click', (evt) => {
      evt.stopPropagation();
      const dialogDelete = this.parentEl.querySelector(HelpDeskWidget.dialogDeleteSelector);
      HelpDeskWidget.showFormDialog(dialogDelete, 2);
    });

    // Событие редактирования задачи
    const editItem = item.querySelector(HelpDeskWidget.editItemSelector);
    editItem.addEventListener('click', (evt) => {
      evt.stopPropagation();
      const dialogAddEdit = this.parentEl.querySelector(HelpDeskWidget.dialogAddEditSelector);
      HelpDeskWidget.showFormDialog(dialogAddEdit, 1, item);
    });
  }

  // onClickItemAdd() {
  //   const formDialog = this.parentEl.querySelector(HelpDeskWidget.formTicketSelector);
  //   HelpDeskWidget.showFormDialog(formDialog );

  //   formDialog.querySelector(HelpDeskWidget.cancelButtonSelector).
  //     addEventListener('click', (evt) => {
  //       evt.preventDefault();
  //       HelpDeskWidget.showFormDialog(formDialog, this.overlay, true);
  //     });

  //   formDialog.addEventListener('submit', (evt) =>{
  //     evt.preventDefault();
  //     HelpDeskWidget.showFormDialog(formDialog, this.overlay, true);
  //   });
  // }

  static showFormDialog(dialog, typeDialog, item = null) {
    console.log(dialog, typeDialog, item);
    if (typeDialog < 0 || typeDialog > 2) return;

    dialog.classList.remove(STYLE_HIDDEN);
    // Отработка кнопки "Отмена"
    const cancelButton = dialog.querySelector(HelpDeskWidget.cancelButtonSelector);
    cancelButton.addEventListener('click', () => dialog.classList.add(STYLE_HIDDEN));

    // Заголовок формы
    const titleForm = dialog.querySelector(HelpDeskWidget.formTitleSelector);
    titleForm.innerText = FORMS.title[typeDialog];

    switch (typeDialog) {
      // Диалог добавления нового тикета
      case 0: {
        const inputName = dialog.querySelector(HelpDeskWidget.idSelector(FORMS.idInputName));
        inputName.value = '';

        const inputDescription = dialog.querySelector(
          HelpDeskWidget.idSelector(FORMS.idInputDescription),
        );
        inputDescription.value = '';
        return;
      }

      // Диалог редактирования тикета
      case 1: {
        const textInputName = item.querySelector(HelpDeskWidget.nameItemSelector);
        const inputName = dialog.querySelector(HelpDeskWidget.idSelector(FORMS.idInputName));
        console.log(inputName, textInputName);
        inputName.value = textInputName.innerText;

        const textInputDescription = item.querySelector(HelpDeskWidget.textInputDescription);
        const inputDescription = dialog.querySelector(
          HelpDeskWidget.idSelector(FORMS.idInputDescription),
        );
        inputDescription.value = textInputDescription.innerText;
        return;
      }

      // Диалог удаления тикета
      case 2:
        return;

      default:
        return;
    }

    const submitButton = dialog.querySelector(HelpDeskWidget.submitButtonSelector);
  }

  getAllTickets() {
    const formLoading = this.parentEl.querySelector(HelpDeskWidget.dialogLoadingSelector);
    console.log(this.parentEl, HelpDeskWidget.dialogLoadingSelector, formLoading);
    // const answer = HelpDeskWidget.sendGetRequest('GET', this.urlServer, 'allTickets', formLoading);

    const method = 'GET';
    const body = 'allTickets';
    const paramString = `${this.urlServer}?method=${body}`;
    const tasksList = this.tasksList;
    
    const xhr = new XMLHttpRequest();
    xhr.open(method, paramString);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        // formLoading.classList.remove(STYLE_HIDDEN);
        return;
      } 

      // console.log('XHR: ', xhr.responseText, xhr.status);
      if (xhr.status == 202) {
        console.log('TasksList: ', tasksList);
        tasksList.items = xhr.responseText; 
        console.log('Response text: ' + xhr.responseText);
      }
      
      // formLoading.classList.add(STYLE_HIDDEN);
    }
    
    console.log(`Send request: ${paramString}`);
    xhr.send();
  }

  static sendGetRequest(method, url, body, formLoading) {
    const xhr = new XMLHttpRequest();
    // console.log(formLoading);


    xhr.onreadystatechange = function() {
      if (xhr.readyState !== 4) {
        // formLoading.classList.remove(STYLE_HIDDEN);
        return;
      } 
      
      // formLoading.classList.add(STYLE_HIDDEN);
      console.log('Response text: ' + xhr.responseText);
    }
    
    const paramString = `${url}?method=${body}`;
    xhr.open(method, paramString);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    console.log(`Send request: ${paramString}`);
    xhr.send();

    return xhr.responseText;
  }
}
