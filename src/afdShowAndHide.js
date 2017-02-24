AngularForDesigners.directive( 'afdShow', function($compile) {
    return {
        restrict: 'A',
        compile: function(element, attrs) {
            return {
                pre: function preLink(scope, iElement, iAttrs) {
                    
                    var config=AngularForDesigners.extractConfiguration(scope, iElement, iAttrs);
                    
                    iElement.attr("ng-show",config.model+"."+iAttrs.afdShow);
                    iElement.removeAttr("afd-show");
                    
                    $compile(iElement)(scope);
                },  
                post: function postLink(scope, iElement, iAttrs, controller) { 
                }
            };
        }
    };

});

AngularForDesigners.directive( 'afdHide', function($compile) {
    return {
        restrict: 'A',
        compile: function(element, attrs) {
            return {
                pre: function preLink(scope, iElement, iAttrs) {
                    
                    var config=AngularForDesigners.extractConfiguration(scope, iElement, iAttrs);
                    
                    iElement.attr("ng-hide",config.model+"."+iAttrs.afdHide);
                    iElement.removeAttr("afd-hide");
                    
                    $compile(iElement)(scope);
                },  
                post: function postLink(scope, iElement, iAttrs, controller) { 
                }
            };
        }
    };

});