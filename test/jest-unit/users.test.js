import {HttpClient} from 'aurelia-fetch-client';
import {UsersVm} from '../../dev/users';

class HttpStub extends HttpClient {
  url;
  itemStub;
  
  fetch(url) {
    var response = this.itemStub;
    this.url = url;
    return new Promise((resolve) => {
      resolve({ json: () => response });
    });
  }

  configure(config) {
    return this;
  }
}

describe('the Users module', () => {
  it('sets fetch response to users', async () => {
    var itemStubs = [1];
    var itemFake = [2];

    var getHttp = () => {
      var http = new HttpStub();
      http.itemStub = itemStubs;
      return http;
    };

    var sut = new UsersVm(getHttp);

    await sut.activate()
    expect(sut.users).toBe(itemStubs);
    expect(sut.users).not.toBe(itemFake);
  });
});
