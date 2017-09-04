angular.module('app.controllers', [])
  
.controller('homeCtrl', ['$scope', '$state', '$stateParams', '$ionicPopup', '$ionicListDelegate', 'FavoritesService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, $ionicPopup, $ionicListDelegate, FavoritesService) {
    
    $scope.devices = FavoritesService.model.devices;
    $scope.data = {
        address: '',
        port: ''
    };

    $scope.delete = function (index) {
        $ionicListDelegate.closeOptionButtons();
        $ionicPopup.confirm({
          title: 'Confirmation',
          template: 'Are you sure?'
        }).then(function (res) {
          if (res) FavoritesService.deleteDevice(index);
        });
    };
      
    $scope.edit = function(index) {
        $ionicListDelegate.closeOptionButtons();
        $state.go('menu.edit', {'index': index});
    } ;
}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('settingsCtrl', ['$scope', '$rootScope', '$stateParams', '$translate', 'SettingsService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $rootScope, $stateParams, $translate, SettingsService) {

    $scope.settings = $rootScope.settings = SettingsService.model;
    
    $scope.onUpdateIntervalChange = function() {
        SettingsService.setRefreshInterval($scope.settings.updateInterval);
    };
    
    $scope.onLanguageChange = function() {
        SettingsService.setLanguage($scope.settings.language);
		$translate.use($scope.settings.language);
    };
}])
   
.controller('controlCtrl', ['$scope', '$state', '$stateParams', 'DeviceService', 'FavoritesService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $state, $stateParams, DeviceService, FavoritesService) {
    
    var model = {
        name: null,
        address: $stateParams.address,
        port: $stateParams.port
    };
    
    $scope.fav = $stateParams.index > -1;
    
    $scope.device = DeviceService.model = $scope.fav ? FavoritesService.getDevice($stateParams.index) : model;
    
    $scope.move = DeviceService.move;
    
    $scope.stop = DeviceService.stop;
    
    $scope.toggleFavorites = function() {
        $scope.fav ? FavoritesService.deleteDevice($stateParams.index) : FavoritesService.addDevice($scope.device);
        $scope.fav = !$scope.fav;
    };
}])
   
.controller('editCtrl', ['$scope', '$stateParams', '$ionicHistory', 'FavoritesService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicHistory, FavoritesService) {

    $scope.data = FavoritesService.getDevice($stateParams.index);
    
    $scope.save = function() {
        FavoritesService.modifyDevice($stateParams.index, $scope.data);
        $ionicHistory.goBack();
    };
}])
 