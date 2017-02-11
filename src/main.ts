
// need to have these imports to make it work atm...
import "./app"
import "aurelia-framework"
import "./fuse-aurelia-loader"
import 'aurelia-bootstrapper';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()

  aurelia.start().then(() => aurelia.setRoot());
}
