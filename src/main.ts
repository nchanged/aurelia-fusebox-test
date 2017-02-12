
// add custom loader for fuse
import './fuse-aurelia-loader'

// start aurelia bootstrapper
 import 'aurelia-bootstrapper';

// aurelia configuration
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()

  aurelia.start().then(() => aurelia.setRoot());
}
