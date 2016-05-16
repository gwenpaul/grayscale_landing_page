var myApp = angular.module("myApp", ["readMore"]);

myApp.controller("AppCtrl", ['$scope', function($scope) {
    $scope.content = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit amet enim. Suspendisse id velit vitae ligula volutpat condimentum. Aliquam erat volutpat. Sed quis velit. Nulla facilisi. Nulla libero. Vivamus pharetra posuere sapien. Nam consectetuer. Sed aliquam, nunc eget euismod ullamcorper, lectus nunc ullamcorper orci, fermentum bibendum enim nibh eget ipsum. Donec porttitor ligula eu dolor. Maecenas vitae nulla consequat libero cursus venenatis. Nam magna enim, accumsan eu, blandit sed, blandit a, eros." +
        "Quisque facilisis erat a dui. Nam malesuada ornare dolor. Cras gravida, diam sit amet rhoncus ornare, erat elit consectetuer erat, id egestas pede nibh eget odio. Proin tincidunt, velit vel porta elementum, magna diam molestie sapien, non aliquet massa pede eu diam. Aliquam iaculis. Fusce et ipsum et nulla tristique facilisis. Donec eget sem sit amet ligula viverra gravida. Etiam vehicula urna vel turpis. Suspendisse sagittis ante a urna. Morbi a est quis orci consequat rutrum. Nullam egestas feugiat felis. Integer adipiscing semper ligula. Nunc molestie, nisl sit amet cursus convallis, sapien lectus pretium metus, vitae pretium enim wisi id lectus." +
        "Proin at eros non eros adipiscing mollis. Donec semper turpis sed diam. Sed consequat ligula nec tortor. Integer eget sem. Ut vitae enim eu est vehicula gravida. Morbi ipsum ipsum, porta nec, tempor id, auctor vitae, purus. Pellentesque neque. Nulla luctus erat vitae libero. Integer nec enim. Phasellus aliquam enim et tortor. Quisque aliquet, quam elementum condimentum feugiat, tellus odio consectetuer wisi, vel nonummy sem neque in elit. Curabitur eleifend wisi iaculis ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In non velit non ligula laoreet ultrices. Praesent ultricies facilisis nisl. Vivamus luctus elit sit amet mi.";

}]);

var readMore = angular.module('readMore', []);

readMore.directive('readMore', function() {
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            text: '=ngModel'
        },
        template:  "<p> {{text | readMoreFilter:[text, countingWords, textLength] }}" +
            "<a ng-show='showLinks' ng-click='changeLength()' class='color3'>" +
            "<strong ng-show='isExpanded'>  Show Less</strong>" +
            "<strong ng-show='!isExpanded'>  Show More</strong>" +
            "</a>" +
            "</p>",
        controller: ['$scope', '$attrs', '$element',
            function($scope, $attrs) {
                $scope.textLength = $attrs.length;
                $scope.isExpanded = false; // initialise extended status
                $scope.countingWords = $attrs.words !== undefined ? ($attrs.words === 'true') : true; //if this attr is not defined the we are counting words not characters

                if (!$scope.countingWords && $scope.text.length > $attrs.length) {
                    $scope.showLinks = true;
                } else if ($scope.countingWords && $scope.text.split(" ").length > $attrs.length) {
                    $scope.showLinks = true;
                } else {
                    $scope.showLinks = false;
                }

                $scope.changeLength = function (card) {
                    $scope.isExpanded = !$scope.isExpanded;
                    $scope.textLength = $scope.textLength !== $attrs.length ?  $attrs.length : $scope.text.length;
                };
            }]
    };
});

readMore.filter('readMoreFilter', function() {
    return function(str, args) {
        var strToReturn = str,
            length = str.length,
            foundWords = [],
            countingWords = (!!args[1]);

        if (!str || str === null) {
            // If no string is defined return the entire string and warn user of error
            console.log("Warning: Truncating text was not performed as no text was specified");
        }

        // Check length attribute
        if (!args[2] || args[2] === null) {
            // If no length is defined return the entire string and warn user of error
            console.log("Warning: Truncating text was not performed as no length was specified");
        } else if (typeof args[2] !== "number") { // if parameter is a string then cast it to a number
            length = Number(args[2]);
        }

        if (length <= 0) {
            return "";
        }


        if (str) {
            if (countingWords) { // Count words

                foundWords = str.split(/\s+/);

                if (foundWords.length > length) {
                    strToReturn = foundWords.slice(0, length).join(' ') + '...';
                }

            } else {  // Count characters

                if (str.length > length) {
                    strToReturn = str.slice(0, length) + '...';
                }

            }
        }

        return strToReturn;
    };
});
