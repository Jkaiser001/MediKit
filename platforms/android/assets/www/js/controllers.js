angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);


    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ReminderlistsCtrl', function($scope,$state,$ionicPopup, $ionicModal,Medicines,Reminders) {
  
  $ionicModal.fromTemplateUrl('templates/addreminder.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
$scope.reminderlists =  Reminders.all();
$scope.medicinelist =  Medicines.all();

  $scope.data= { dose: '1' }
$scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  
  
$scope.onItemDelete = function(item) {
    $scope.reminderlists.splice(Reminders.get(item), 1);
  
  };
 
  $scope.aceptar=function(dose,repeat){
    var name=document.getElementById("smedicine").options;
     var index = document.getElementById("smedicine").selectedIndex;
    window.plugin.notification.local.add({
        id         : 'id'+name[index].text ,
        title      : 'MediKit Recordatorio',
        message    : "Tu remedio: "+ name[index].text +" Dosis:"+  $scope.data.dose ,
        sound      : 'TYPE_ALARM',
        repeat     : null,
        autoCancel : true,
        date       : new Date(new Date().getTime() + 10*1000),
    }),
    window.plugin.notification.local.onclick = function (id, state, json) {
     var name="hola"
    for(i in $scope.reminderlists){
      if($scope.reminderlists[i].notId==id){
        name=$scope.reminderlists[i].title
      }

    }

    $ionicPopup.show({

    template: 'Recuerde que debe tomar '+ name ,
    title: 'Recordatorio',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.wifi) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.wifi;
          }
        }
      },
    ]
  })
    };
  };
  $scope.cancelAll=function(){
    window.plugin.notification.local.cancelAll(function () {
    // All notifications have been canceled
    }, scope);
  }
  $scope.ouputUpdate=function (vol) {
    $scope.querySelector('#volume').value = vol;  
  }


})
.controller('FamiliaCtrl', function($scope, $stateParams, Familia) {
    $scope.familiaList = Familia.all();


})

.controller('ReminderCtrl', function($scope, $stateParams,$ionicModal , Reminders) {
/*$ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }*/
$scope.reminder = Reminders.get($stateParams.reminderId);

})
.controller('FarmaciaCtrl', function($scope, $stateParams,$ionicLoading) {
$scope.toggleBounce = function() {

      if ($scope.marker.getAnimation() != null) {
        $scope.marker.setAnimation(null);
      } else {
        $scope.marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    };
$scope.mapCreated = function(map) {
    $scope.map = map;
    console.log("hola");
     var image = 'img/pastillin-s.png'
     
    $scope.marker = new google.maps.Marker({
        position: new google.maps.LatLng(-33.448934, -70.682287),
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        icon:image,
        title: 'Holas!'
        
      
    },
    //google.maps.event.addListener($scope.marker, 'click', toggleBounce),
    
    function(err) {
        console.err(err);
    });
  };

  
  $scope.centerOnMe = function () {
    console.log("Centering");
    if (!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    },   
    function (error) {
      alert('Unable to get location: ' + error.message);
    })
    
  };
});


