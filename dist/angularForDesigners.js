/*
    MIT LICENSE @2017 Ivan Lausuch <ilausuch@gmail.com>
    Developed at CEU University
*/

var AngularForDesigners=angular.module("angularForDesigners", []);

AngularForDesigners.directive('afd', function($compile) {
    return {
        restrict: 'A',
        compile: function(element, attrs) {
            return {
                pre: function preLink(scope, iElement, iAttrs) {

                                        var config=AngularForDesigners.extractConfiguration(scope, iElement, iAttrs);

                                        iElement.attr("field",config.field);

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
            $scope.$parent.$watch("afdModel."+field,function(){
                try{
                    $scope.list=eval("$scope.$parent.afdModel."+field);
                }catch(e){
                    $scope.list=[];
                }
            })

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
AngularForDesigners.config={
    directives:{
        INPUT:{
            preCompiler:function(iElement,iAttrs,config){
                iElement.attr("ng-model",config.ngModel);
            }
        },
        SELECT:{
            defaults:{
                label:"label",
                value:"value"
            },
            attrRequired:["list"],
            preCompiler:function(iElement,iAttrs,config){
                iElement.attr("ng-model",config.ngModel);

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
        A:{
            attrRequired:["href"],
            preCompiler:function(iElement,iAttrs,config){
                iElement.attr("href","{{afdModel."+iAttrs.href+"}}");

                            }
        },
        DEFAULT:{
            preCompiler:function(iElement,iAttrs,config){
                iElement.html("{{"+config.ngModel+"}}");
            }
        }
    }
};

AngularForDesigners.configure=function($scope){
    AngularForDesigners.$scope=$scope;
}

AngularForDesigners.setModel=function(model){
    AngularForDesigners.$scope.afdModel=model;
}

AngularForDesigners.getModel=function(){
    return AngularForDesigners.$scope.afdModel;
}

AngularForDesigners.setData=function(data){
    AngularForDesigners.$scope.afdData=data;
}

AngularForDesigners.getData=function(){
    return AngularForDesigners.$scope.afdData;
}

AngularForDesigners.setOperations=function(operations){
    AngularForDesigners.$scope.afdOperations=operations;
}

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
    if (config.field!=undefined)
        return config.model+"."+config.field;
    else
        return "";
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
