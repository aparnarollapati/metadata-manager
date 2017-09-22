//= wrapped
//= require_self
//= require /mms/secondlevel/mms.secondlevel
//= require_tree services
//= require_tree controllers
//= require_tree directives
//= require_tree templates
//= require /angular/ui-bootstrap-tpls

angular.module("mms.toplevel", [
  "mms.core",
  "mms.secondlevel",
  "ui.bootstrap.dropdown",
  "ui.bootstrap.collapse",
]);
