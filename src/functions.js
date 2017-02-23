/* global AngularForDesigners */

AngularForDesigners.configure=function($scope){
    AngularForDesigners.$scope=$scope;
}

AngularForDesigners.setModel=function(model){
    AngularForDesigners.$scope.afdModel=model;
}

AngularForDesigners.setData=function(data){
    AngularForDesigners.$scope.afdData=data;
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
    return config.model+"."+config.field;
    
};


AngularForDesigners.extractConfiguration=function(scope,iElement,iAttrs){
    var config={};
    
    //Extract field
    config.field=AngularForDesigners.extractConfigurationField(scope,iElement,iAttrs);
    
    //Extract model
    config.model=AngularForDesigners.extractConfigurationModel(scope,iElement,iAttrs);
    
    //Others
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
