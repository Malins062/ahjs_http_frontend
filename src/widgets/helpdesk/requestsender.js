export default class RequestSender {
  constructor(urlServer, formProcess = null) {
    this.url = urlServer;
    this.formProcess = formProcess;
    this.xhr = new XMLHttpRequest();
  }

  // sendRequest(method, query, body = undefined) {
  //   if (this.formProcess.form) {
  //     this.formProcess.form.classList.remove(this.formProcess.hide);
  //   }

  //   const requestText = `${this.url}?${query}`;
  //   this.xhr.open(method, requestText);
  //   this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  //   this.xhr.send(body);

  //   if (this.xhr.readyState === XMLHttpRequest.DONE) {
  //     return this.xhr;
  //   }

  //   let res;
  //   const p = new Promise((r) => { res = r; });

  //   this.xhr.addEventListener('readystatechange', () => {
  //     if (this.xhr.readyState === XMLHttpRequest.DONE) {
  //       res(this.xhr);
  //       if (this.formProcess.form) {
  //         this.formProcess.form.classList.add(this.formProcess.hide);
  //       }
  //     }
  //   });

  //   return p;
  // }

  getAsync(method, query, body) {
    return new Promise((resolve, reject) => {
      const requestText = `${this.url}?${query}`;
      this.xhr.open(method, requestText);
      this.xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      this.xhr.onload = () => {
        resolve(this.xhr);
        // if (this.xhr.status === 202) {
        //   resolve(this.xhr.response);
        // } else {
        //   reject(new Error(`${this.xhr.status}: ${this.xhr.statusText}`));
        // }
      };

      this.xhr.onerror = () => {
        reject(new Error('Ошибка сети. Сервер не отдал код ошибки.'));
      };

      this.xhr.send(body);
    });
  }

  async sendRequest(method, query, body = undefined) {
    if (this.formProcess.form) {
      this.formProcess.form.classList.remove(this.formProcess.hide);
    }

    const result = await this.getAsync(method, query, body);

    if (this.formProcess.form) {
      this.formProcess.form.classList.add(this.formProcess.hide);
    }

    return result;
  }
}
