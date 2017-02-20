/*
    MIT LICENSE @2017 Ivan Lausuch <ilausuch@gmail.com>
    Developed at CEU University
*/

var AngularForDesigners=angular.module("il.DesignIndependence", []);

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


AngularForDesigners.directive( 'afdRepeat', function() {
    var getTemplate=function(){
        return '<div ng-repeat="afdModel in list" afd-transcope></div>';
    };

    return {
        restrict: 'A',
        scope:{
        },
        controller:function($scope,$attrs){
            var field=$attrs["afdRepeat"];
            $scope.list=eval("$scope.$parent.afdModel."+field);
            $scope.afdModelParent=$scope.$parent.afdModel;
            $scope.afdData=$scope.$parent.afdData;
        },
        transclude: true,
        template: getTemplate()
    };

});



AngularForDesigners.directive( 'afdTranscope', function() {
    return {
        link: function( $scope, $element, $attrs, controller, $transclude ) {
            if ( !$transclude ) {
                throw minErr( 'ngTransclude' )( 'orphan',
                    'Illegal use of ngTransclude directive in the template! ' +
                    'No parent directive that requires a transclusion found. ' +
                    'Element: {0}',
                    startingTag( $element ));
            }
            var innerScope = $scope.$new();

            $transclude( innerScope, function( clone ) {
                $element.empty();
                $element.append( clone );
                $element.on( '$destroy', function() {
                    innerScope.$destroy();
                });
            });
        }
    };
}); 
AngularForDesigners.config={
    directives:{
        INPUT:{
            preCompiler:function(iElement,iAttrs,config){
            }
        },
        SELECT:{
            defaults:{
                label:"label",
                value:"value"
            },
            attrRequired:["list"],
            preCompiler:function(iElement,iAttrs,config){
                var label=iAttrs.label;
                if (label===undefined)
                    label=this.defaults.label;

                                        var value=iAttrs.value;
                if (value===undefined)
                    value=this.defaults.value;

                                iElement.attr("ng-options",
                    "item."+label+" for item in afdData."+iAttrs.list+" track by item."+value);

                            }
        },
        DEFAULT:{
            preCompiler:function(iElement,iAttrs,config){
                iElement.html("{{"+config.ngModel+"}}");
            }
        }
    }
};


AngularForDesigners.getAttribute=function(iElement,attribute){
    if (Array.isArray(iElement))
        iElement=iElement[0];    

                var attr=iElement.attr(attribute);
    if (attr===undefined)
        return undefined;
    else
        return attr;
};


AngularForDesigners.extractConfigurationField=function(scope,iElement,iAttrs){
    var field=AngularForDesigners.getAttribute(iElement,"field");
    if (field===undefined){
        var name=AngularForDesigners.getAttribute(iElement,"name");
        if (name!==undefined)
            field=name;
        else
            field=iElement[0].textContent;
    };

        return field;
};

AngularForDesigners.extractConfigurationModel=function(scope,iElement,iAttrs){
    var model=AngularForDesigners.getAttribute(iElement,"model");
    if (model===undefined)
        model='afdModel'; 

        return model;
};

AngularForDesigners.extractConfigurationNgModel=function(config){
    return config.model+"."+config.field;

    };


AngularForDesigners.extractConfiguration=function(scope,iElement,iAttrs){
    var config={};

    config.field=AngularForDesigners.extractConfigurationField(scope,iElement,iAttrs);

    config.model=AngularForDesigners.extractConfigurationModel(scope,iElement,iAttrs);

    config.ngModel=AngularForDesigners.extractConfigurationNgModel(config);
    config.scope=scope;
    config.iElement=iElement;
    config.iAttrs=iAttrs;
    config.elementName=iElement[0].nodeName;


            if (AngularForDesigners.config.directives[config.elementName]===undefined)
        config.configurationName="DEFAULT";
    else
        config.configurationName=config.elementName;

        config.directive=AngularForDesigners.config.directives[config.configurationName];

        if (config.directive.preCompiler===undefined)
        throw "Precompiled configuration required on "+config.elementName;

    if (config.directive.attrRequired!==undefined){
        config.directive.attrRequired.forEach(function(attr){
            if (iElement.attr(attr)===undefined)
                throw "Attribute "+attr+" is required but don't found on "+config.elementName;
        });
    }

                return config;
};


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
