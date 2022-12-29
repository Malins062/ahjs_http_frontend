export default class RequestSender {
    constructor(method, url, body, formProcess=null) {
        this.method = method;
        this.url = url;
        this.query = `${this.url}?method=${body}`;
        this.formProcess = formProcess;

        this.answer = {
            status: 0,
            response: undefined
        };

        console.log(method, url, body, formProcess);

        this.xhr = new XMLHttpRequest();
        this.xhr.open(this.method, this.query);
        this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        
        // this.onReadyStateChange = this.onReadyStateChange.bind(this);
        // this.xhr.addEventListener('readystatechange', this.onReadyStateChange);
    }

    // onReadyStateChange() {
    //     console.log('XHR: ', this.xhr.readyState, this.xhr.status);
    //     console.log('this.answer: ', this.answer);

    //     if (this.xhr.readyState !== 4) {
    //         return;
    //       } 

    //     this.answer.status = this.xhr.status;
    //     if (this.xhr.status == 202) {
    //         this.answer.response = JSON.parse(this.xhr.responseText);
    //     }
    // }

    async sendRequest() {
        if (this.formProcess.form) {
            formProcess.form.classList.remove(formProcess.style);
        }
    
        this.send();

        if (this.xhr.readyState === XMLHttpRequest.DONE) {
            return Http;
        }

        let res;
        const p = new Promise((r) => res = r);
        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === XMLHttpRequest.DONE) {
                res(this.xhr);
            }
        }

        if (this.formProcess.form) {
            formProcess.form.classList.add(this.formProcess.style);
        }

        return p;
    }

    send() {
        console.log(`Send request: ${this.query}`);
        this.xhr.send();
        this.answer.status = 0;
    }

    // async sendRequest() {
    //     const Http = new XMLHttpRequest();
    //     const url='http://localhost:8000/';
    //     Http.open("GET", url);
    //     Http.send();

    //     if (Http.readyState === XMLHttpRequest.DONE) {
    //         return Http;
    //     }

    //     let res;
    //     const p = new Promise((r) => res = r);
    //     Http.onreadystatechange = () => {
    //         if (Http.readyState === XMLHttpRequest.DONE) {
    //             res(Http);
    //         }
    //     }
    //     return p;
    // }
}