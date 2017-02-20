var app = angular.module('app', ['il.DesignIndependence','pascalprecht.translate']);
var mc;

app.controller("MainController", function($rootScope,$scope,$timeout,$http,$q){
    mc=this;
    mc.$scope=$scope;
    
    $scope.afdData={
        countries:[{label:"Spain",value:1},{label:"France",value:2}]  
    };
    
    this.model={
        Id:1234,

        personalInfo:{
            Name:"Ivan"
        },
        contact:{
            country:undefined,
            $country:function(){
                return $scope.afdData.countries.getByField(this.country,"value");
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
   
    $scope.afdModel=this.model;
    
});

app.config(function ($translateProvider) {
    $translateProvider.translations('en', {
      TRANSLATE_THIS: 'This is a translation'
    });
    $translateProvider.preferredLanguage('en');
  });