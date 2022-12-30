export default class RequestSender {
    constructor(urlServer, formProcess=null) {
        this.url = urlServer;
        this.formProcess = formProcess;
        this.xhr = new XMLHttpRequest();
    }

    async sendRequest(method, body) {
        if (this.formProcess.form) {
            this.formProcess.form.classList.remove(this.formProcess.hide);
        }

        const query = `${this.url}?method=${body}`;
        this.xhr.open(method, query);
        this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
        this.xhr.send();

        if (this.xhr.readyState === XMLHttpRequest.DONE) {
            return Http;
        }

        let res;
        const p = new Promise((r) => res = r);
        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === XMLHttpRequest.DONE) {
                setTimeout(() => {
                    res(this.xhr);            
                    if (this.formProcess.form) {
                        this.formProcess.form.classList.add(this.formProcess.hide);
                }
               }, 1000);
                
            }
        }

        return p;
    }
}