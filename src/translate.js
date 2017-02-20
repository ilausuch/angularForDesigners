/* global AngularForDesigners */

AngularForDesigners.directive('afdTranslate', function($compile) {
    return {
        restrict: 'A',
        compile: function(element, attrs) {
            return {
                pre: function preLink(scope, iElement, iAttrs, controller) {
                        iElement.removeAttr("afd-translate");
                        iElement.html("{{'"+iElement[0].textContent+"'|translate}}");
                        
                        $compile(iElement)(scope);
                },  
                post: function postLink(scope, iElement, iAttrs, controller) { 
                }
            };
        }
        
    };
});
