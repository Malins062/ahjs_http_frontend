export default class RequestSender {
    constructor(urlServer) {
        this.url = urlServer;
        this.xhr = new XMLHttpRequest();
    }

    async sendRequest(method, body, formProcess=null) {
        console.log(formProcess.form, formProcess.hide);
        if (formProcess.form) {
            formProcess.form.classList.remove(formProcess.hide);
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
                res(this.xhr);
            }
        }

        // if (formProcess.form) {
        //     formProcess.form.classList.add(formProcess.hide);
        // }

        return p;
    }
}