angular.module('redditDIY.common.navbar', [
    'ui.router',
    'ui.bootstrap'
])
.config(function config() {
})
.directive('redditdiyNavBar', function ($compile, $rootScope) {
    return {
        restrict: "E",
        replace: true,
        controller: function Ctrl($scope) {
            // nothing yet
        },
        template: '<div ng-include src="\'common/navbar/navbar.tpl.html\'"></div>',
        link: function(scope, element, attrs) {
            scope.curpage = attrs.curpage;
        }
    };
});