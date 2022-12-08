import HelpDeskWidget from "../widgets/helpdesk/helpdesk";

// Адрес сервера
const URL_SERVER = 'localhost:7070';

// Ticket {
//   id // идентификатор (уникальный в пределах системы)
//   name // краткое описание
//   status // boolean - сделано или нет
//   created // дата создания (timestamp)
// }

// TicketFull {
//   id // идентификатор (уникальный в пределах системы)
//   name // краткое описание
//   description // полное описание
//   status // boolean - сделано или нет
//   created // дата создания (timestamp)
// }

// Пример локального списка задач
const tasksList = {
  title: 'Список текущих задач',
  items: [
    {
      name: 'Поменять краску в принтере, каб.404',
      description: 'Закончилась краска в принтере, модель Epson-CJ300',
      status: true,
      created: '10.03.2022 08:40'
    },
    {
      name: 'Переустановить OC Linux, каб.204',
      description: 'Слетела операционная система, требуется переустановка',
      status: true,
      created: '22.11.2022 13:10'
    },
    {
      name: 'Установить обновление KB-32565, каб.6',
      description: 'Вышло критическое обновление Windows-10, требуется установка обновления',
      status: false,
      created: '08.12.2022 10:00'
    },
  ]
};


const helpDeskWidget = new HelpDeskWidget(document.querySelector('#widget-container'), null, tasksList);
helpDeskWidget.bindToDOM();

// const subscribeWidget = document.querySelector('[data-widget=subscribe]');
// const subscribeForm = subscribeWidget.querySelector('[data-id=subscribe-form]');
// const nameInput = subscribeWidget.querySelector('[data-id=name]');
// const phoneInput = subscribeWidget.querySelector('[data-id=phone]');

// subscribeForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
// });
