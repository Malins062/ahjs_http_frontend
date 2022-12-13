import './helpdesk.css';
import { v4 as uuidv4 } from 'uuid';


export default class HelpDeskWidget {
  constructor(parentEl, urlServer, tasksList = []) {
    this.parentEl = parentEl;
    this.urlServer = urlServer;
    this.tasksList = tasksList;
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
              <h5 class="item__name mb-0">${item.name}</h5>
            </div>
            <div class="col-md-3 d-flex justify-content-center">
              <h5 class="item__name mb-0">${item.created}</h5>
            </div>
            <div class="col-md-1 d-flex justify-content-end">
              <button class="item__edit btn btn-primary btn-sm" title="Редактировать задачу">&#9998;</button>
              <button class="item__delete btn btn-danger btn-sm ms-1"  data-bs-toggle="modal" 
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
    items.forEach((item) => {
      html += this.itemHTML(item).innerHTML;
    });
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
                <button class="tasks__add btn btn-success btn-sm" 
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

  static get overlayHTML() {
    return `<div class="hidden" id="overlay"></div>`;
  }

  static get formTicketDeleteHTML() {
    return `
      <form class="form-ticket-delete row g-3 hidden">
        <div class="col-12">
          <div class="d-flex justify-content-center">
            <h5>Удалить тикет</h5>
          </div>
          <p>Вы уверены, что хотите удалить тикет? Это действие не обратимо.</p>
        </div>
        <div class="col-12 d-flex justify-content-end">
          <button type="button" class="btn btn-secondary">Отмена</button>
          <button type="submit" class="btn btn-primary ms-2">ОК</button>
        </div>
      </form>
      `;
  }

  static get formTicketHTML() {
    return `
      <form class="form-ticket row g-3 hidden">
        <div class="col-12 d-flex justify-content-center">
          <h5>Изменить тикет</h5>
        </div>
        <div class="col-12">
          <label for="inputName" class="form-label">Краткое описание</label>
          <input type="text" class="form-control" id="inputName">
        </div>
        <div class="col-12">
          <label for="inputDescription" class="form-label">Подробное описание</label>
          <textarea class="form-control" id="inputDescription" type="text" rows="3"></textarea>
        </div>
        <div class="col-12 d-flex justify-content-end">
          <button type="button" class="btn btn-secondary">Отмена</button>
          <button type="submit" class="btn btn-primary ms-2">ОК</button>
        </div>
      </form>
      `;
  }

  static idSelector(id) {
    return `[data-id="${id}"]`;
  }

  static get showCardSelector() {
    return '.item__add';
  }

  static get itemSelector() {
    return '.tasks__item';
  }

  static get itemClass() {
    return 'tasks__item';
  }

  static get listItemsSelector() {
    return '.tasks__list';
  }

  static get listItemsClass() {
    return 'tasks__list';
  }

  static get delItemSelector() {
    return '.item__close';
  }

  static get descriptionItemSelector() {
    return '.item__description';
  }

  static get delItemClass() {
    return 'item__close';
  }

  static get cardSelector() {
    return '.tasks__card';
  }

  static get cardTitleSelector() {
    return '.tasks__title';
  }

  static get closeCardSelector() {
    return '.new__item__close';
  }

  static get addCardSelector() {
    return '.new__item__add';
  }

  static get cardDivSelector() {
    return '.item__card';
  }

  static get textNewItemSelector() {
    return '.new__item__text';
  }

  static get overlaySelector() {
    return `[data-id="overlay"]`;
  }

  static get formTicketSelector() {
    return '.form-ticket';
  }

  static get formTicketDeleteSelector() {
    return '.form-ticket-delete';
  }


  // Разметка HTML и отслеживание событий
  bindToDOM() {
    // Отрисовка HTML
    this.parentEl.innerHTML = '';
    if (!this.urlServer) {
      return;
    }

    this.parentEl.innerHTML += HelpDeskWidget.overlayHTML;
    this.parentEl.innerHTML += HelpDeskWidget.formTicketHTML;
    this.parentEl.innerHTML += HelpDeskWidget.formTicketDeleteHTML;
    this.tasksList.id = uuidv4();
    this.parentEl.innerHTML += HelpDeskWidget.tasksListHTML(this.tasksList);
  
    this.initEvents();
  }

  initEvents() {
    const tasksListItems = this.parentEl.querySelector(HelpDeskWidget.listItemsSelector);

    // // Отработка событий на добавлении новой карточки-задачи
    // const showCardItem = tasksCard.querySelector(TasksListWidget.showCardSelector);
    // const addNewItem = tasksCard.querySelector(TasksListWidget.addCardSelector);
    // const closeCardItem = tasksCard.querySelector(TasksListWidget.closeCardSelector);

    // showCardItem.addEventListener('click', (evt) => this.onClickShowCard(evt, tasksCard));
    // addNewItem.addEventListener('click', (evt) => this.onClickAddCard(evt, tasksCard, tasksListItems));
    // closeCardItem.addEventListener('click', (evt) => this.onClickCloseCard(evt, tasksCard));

    // this.onDragEnter = this.onDragEnter.bind(this);
    // this.onDragLeave = this.onDragLeave.bind(this);
    // this.onDrop = this.onDrop.bind(this);
    // this.onDragOver = this.onDragOver.bind(this);
    // tasksListItems.addEventListener('dragenter', this.onDragEnter);
    // tasksListItems.addEventListener('dragleave', this.onDragLeave);
    // tasksListItems.addEventListener('drop', this.onDrop);
    // tasksListItems.addEventListener('dragover', this.onDragOver);

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


    // // Событие удаления задачи
    // const closeButton = item.querySelector(TasksListWidget.delItemSelector);
    // closeButton.addEventListener('click', () => {
    //   item.remove();
    //   this.saveItems();
    // });

    // // Событие входа в зону наведения курсора на задачу
    // item.addEventListener('mouseover', (evt) => {
    //   evt.preventDefault();
    //   if (closeButton.classList.contains('hidden')) {
    //     closeButton.classList.remove('hidden');
    //   }
    // });

    // // Событие выхода из зоны наведения курсора на задачу
    // item.addEventListener('mouseout', (evt) => {
    //   evt.preventDefault();
    //   const delButtons = document.querySelectorAll(TasksListWidget.delItemSelector);
    //   delButtons.forEach((delButton) => {
    //     if (delButton && !delButton.classList.contains('hidden')) {
    //       delButton.classList.add('hidden');
    //     }
    //   });
    // });

    // this.onDrag = this.onDrag.bind(this);
    // this.onDragStart = this.onDragStart.bind(this);
    // this.onDragEnd = this.onDragEnd.bind(this);
    // item.addEventListener('dragstart', this.onDragStart);
    // item.addEventListener('dragend', this.onDragEnd);
  }

}
