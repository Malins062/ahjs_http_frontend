export default class RequestSender {
    constructor(urlServer, formProcess=null) {
        this.url = urlServer;
        this.formProcess = formProcess;
        this.xhr = new XMLHttpRequest();
    }

    async sendRequest(method, query, body=undefined) {
        if (this.formProcess.form) {
            this.formProcess.form.classList.remove(this.formProcess.hide);
        }

        const requestText = `${this.url}?${query}`;
        this.xhr.open(method, requestText);
        this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        console.log(method, requestText, body);
        this.xhr.send(body);

        if (this.xhr.readyState === XMLHttpRequest.DONE) {
            return Http;
        }

        let res;
        const p = new Promise((r) => res = r);
        this.xhr.onreadystatechange = () => {
            if (this.xhr.readyState === XMLHttpRequest.DONE) {
            //     setTimeout(() => {
            //         res(this.xhr);            
            //         if (this.formProcess.form) {
            //             this.formProcess.form.classList.add(this.formProcess.hide);
            //     }
            //    }, 1000);
                res(this.xhr);            
                if (this.formProcess.form) {
                    this.formProcess.form.classList.add(this.formProcess.hide);
                }    
            }
        }

        return p;
    }
}