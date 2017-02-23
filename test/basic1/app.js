var app = angular.module('app', ['angularForDesigners','pascalprecht.translate']);
var mc;

app.controller("MainController", function($rootScope,$scope,$timeout,$http,$q){
    mc=this;
    mc.$scope=$scope;
    
    this.model={
        Id:1234,

        personalInfo:{
            Name:"Ivan"
        },
        contact:{
            country:undefined,
            $country:function(){
                var found=undefined;
                var $this=this;
                
                $scope.afdData.countries.some(function(country){
                    if (country.value==$this.country){
                        found=country;
                        return true;
                    }     
                });
                
                return found;
            }
        },
        studies:[
            {
                label:"Study 1",
                teachers:[
                    {label:"teacher 1"},
                    {label:"teacher 2"}
                ]
            },{
                label:"Study 2",
                teachers:[
                    {label:"teacher 3"},
                    {label:"teacher 4"}
                ]
            }
        ],
        
    }
   
    AngularForDesigners.configure($scope);
    AngularForDesigners.setData({
        countries:[{label:"Spain",value:1},{label:"France",value:2}]  
    });
    AngularForDesigners.setModel(this.model);
    
});

app.config(function ($translateProvider) {
    $translateProvider.translations('en', {
      TRANSLATE_THIS: 'This is a translation'
    });
    $translateProvider.preferredLanguage('en');
  });