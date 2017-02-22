/* global AngularForDesigners */

AngularForDesigners.directive('afdContext', function($compile) {
    return {
        restrict: 'A',
        compile: function(element, attrs) {
            return {
                pre: function preLink(scope, iElement, iAttrs) {
                    iElement.attr("ng-controller","afdContextController");
                    iElement.removeAttr("afd-context");
                    $compile(iElement)(scope);
                },  
                post: function postLink(scope, iElement, iAttrs, controller) { 
                }
            };
        }
    };
});

AngularForDesigners.controller("afdContextController", function($rootScope,$scope,$timeout,$http,$q,$attrs){
        this.$rootScope=$rootScope;
        this.$scope=$scope;
        this.$timeout=$timeout;
        this.$http=$http;
        this.$q=$q;
        
        $scope.controller=this;
        
        if ($attrs["model"]!=undefined)
            $scope.afdModel=eval($attrs["model"]);
        
        if ($attrs["data"]!=undefined)
            $scope.afdData=eval($attrs["data"]);
});
