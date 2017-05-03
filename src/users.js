import {bindable} from 'aurelia-framework';

export class UsersCustomElement {
  @bindable users = [];

  heading = 'Github Users';
}
