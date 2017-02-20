/* global AngularForDesigners */

AngularForDesigners.directive('afd-context', function($compile) {
    return {
        restrict: 'A',
        compile: function(element, attrs) {
            return {
                pre: function preLink(scope, iElement, iAttrs) {
                    iElement.attr("ng-controller","afdContextController");
                    iElement.attr("context",iAttrs["afd-context"]);
                    
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
        
        this.$scope=$scope;
        this.$parentScope=$scope.$parent;
        
        $scope.isAfdContextController=true;
        
        var ancestor=AngularForDesigners.getAncestorAfdScope($scope);
        
        console.debug("*****",$scope);
        
        if ($attrs.context!==undefined)
            $scope.afdContext=eval($attrs.context);
        else{
            if (ancestor)
                $scope.afdContext=ancestor.afdContext;
        }
        
        if ($scope.afdContext===undefined)
            throw "afdContextController: context field required because this context controller doesn't have any context controller ancestor"; 
});
