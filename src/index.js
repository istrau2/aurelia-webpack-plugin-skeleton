/**
 * Created by istrauss on 5/3/2017.
 */

import {PLATFORM} from 'aurelia-pal';

export function configure(config) {
  config.globalResources(
    PLATFORM.moduleName('./welcome'),
    PLATFORM.moduleName('./users')
  );
}
