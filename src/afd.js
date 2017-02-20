/* global AngularForDesigners */

AngularForDesigners.directive('afd', function($compile) {
    return {
        restrict: 'A',
        compile: function(element, attrs) {
            return {
                pre: function preLink(scope, iElement, iAttrs) {
                    
                    var config=AngularForDesigners.extractConfiguration(scope, iElement, iAttrs);
                    
                    iElement.attr("field",config.field);
                    iElement.attr("context",config.context);
                    iElement.attr("ng-model",config.ngModel);
                    
                    iElement.removeAttr("afd");
                    
                    config.directive.preCompiler(iElement,iAttrs,config);
                    
                    $compile(iElement)(scope);
                },  
                post: function postLink(scope, iElement, iAttrs, controller) { 
                }
            };
        }
    };
});

AngularForDesigners.directive('afdDebug', function($compile) {
    return {
        restrict: 'A',
        compile: function(element, attrs) {
            return {
                pre: function preLink(scope, iElement, iAttrs) {
                    
                    console.debug(scope,iElement,iAttrs);
                    
                    iElement.removeAttr("afd-debug");
                    $compile(iElement)(scope);
                },  
                post: function postLink(scope, iElement, iAttrs, controller) { 
                }
            };
        }
    };
});