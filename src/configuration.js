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