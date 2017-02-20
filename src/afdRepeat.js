/* global AngularForDesigners */

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