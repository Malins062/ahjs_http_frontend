export default class RequestSender {
    constructor(method, url, body) {
        this.method = method;
        this.url = url;
        this.query = `${this.urlServer}?method=${body}`;
        this.answer = {
            status: undefined,
            response: undefined
        };

        this.xhr = new XMLHttpRequest();
        this.xhr.open(method, query);
        this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        this.xhr.addEventListener('readystatechange', this.onReadyStateChange);
    }

    static get answer() {
        return this.answer;
    }

    onReadyStateChange() {
        if (xhr.readyState !== 4) {
            // formLoading.classList.remove(STYLE_HIDDEN);
            return;
          } 
    
          // console.log('XHR: ', xhr.responseText, xhr.status);

        this.answer.status = this.xhr.status;
        if (xhr.status == 202) {
            this.answer.response = JSON.parse(xhr.responseText);
            console.log('Answer: ', this.answer);
        }
          
          // formLoading.classList.add(STYLE_HIDDEN);    
    }

    send() {
        console.log(`Send request: ${this.query}`);
        this.xhr.send();    
    }
}