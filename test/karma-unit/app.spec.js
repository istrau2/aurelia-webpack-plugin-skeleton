import {App} from '../../dev/app';

class RouterStub {
  configure(handler) {
    handler(this);
  }

  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut;
  var mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new App();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('Aurelia');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).toContain({ route: ['', 'welcome'], name: 'welcome',  moduleId: './welcome', nav: true, title: 'Welcome' });
  });

  it('should have a users route', () => {
    expect(sut.router.routes).toContain({ route: 'users', name: 'users', moduleId: './users', nav: true, title: 'Github Users' });
  });
});
