/* global AngularForDesigners */

AngularForDesigners.directive('afdRepeat', function($compile,$timeout) {
    return {
        restrict: 'A',
        compile: function(element, attrs) {
            return {
                pre: function preLink(scope, iElement, iAttrs) {
                    
                },  
                post: function postLink(scope, iElement, iAttrs, controller) { 
                    var field=iAttrs["afdRepeat"];
                    var model=AngularForDesigners.extractConfigurationModel(scope,iElement,iAttrs);
                    var list=AngularForDesigners.extractConfigurationNgModel({model:model,field:field});
                    
                    console.debug(list);
                    iElement.attr("ng-repeat","afdModel in "+list);
                    
                    //iElement.attr("ng-controller","afdRepeatController");
                    
                    iElement.removeAttr("afd-repeat");
                    $compile(iElement)(scope);
                }
            };
        }
    };
});


AngularForDesigners.controller("afdRepeatController", function($rootScope,$scope,$timeout,$http,$q,$attrs){
        this.$rootScope=$rootScope;
        this.$scope=$scope;
        this.$timeout=$timeout;
        this.$http=$http;
        this.$q=$q;
        
});
