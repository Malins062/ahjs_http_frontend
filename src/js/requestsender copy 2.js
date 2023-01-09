export default class RequestSender {
  constructor(urlServer) {
    this.url = urlServer;
    this.xhr = new XMLHttpRequest();
  }

  sendRequest(method, query, body = null) {
    const requestText = `${this.url}?${query}`;
    this.xhr.open(method, requestText, false);
    this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    this.xhr.send(body);
    console.log('sendRequest: ', this.xhr.response);
    return this.xhr;
  }
}
