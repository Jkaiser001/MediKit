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

  $scope.presentaciones=[
  {names:"Comprimido",namep:"Comprimidos"},
  {names:"Cucharada",namep:"Cucharadas"},
  {names:"Miligramos",namep:"Miligramos"}
  ],
  $scope.presentacion1=$scope.presentaciones[0]
  $scope.data= { dose: '1'}
  $scope.programacion=[
    {name:"Intervalo de Tiempo"
    },
    {name:"Dosis por Dias"}

  ]
  $scope.tiempohrs=1;
  $scope.progasel=$scope.programacion[0]

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
    
    if ($scope.progasel.name=="Intervalo de Tiempo") {
          $scope.tiempohrs=parseInt(document.getElementById("tiempohrs").value);    
    } else{
          $scope.tiempohrs=Math.round(parseInt(document.getElementById("dosisxdia").value)/24);
    };
     if ($scope.data.dose=='1') {
      var texdose=$scope.data.dose+" "+$scope.presentacion1.names

    } else{
      var texdose=$scope.data.dose+" "+$scope.presentacion1.namep

    };
    var ntotal= Math.floor(parseInt(document.getElementById("ntotal").value)/parseInt($scope.data.dose))
    console.log(ntotal)
    window.plugin.notification.local.add({

        id         : 'id'+name[index].text ,
        title      : 'MediKit Recordatorio',
        message    : "Tu remedio: "+ name[index].text +" Dosis:"+  texdose,
        sound      : 'TYPE_ALARM',
        repeat     : 'daily',
        autoCancel : false,
        date       : new Date(new Date().getTime() + $scope.tiempohrs*1000),
    

    });
    
    
    if ($scope.tiempohrs=='1') {
      var textime=$scope.tiempohrs+"h"
    } else{
      var textime=$scope.tiempohrs+"hrs"
    };
    console.log(ntotal)
    Reminders.add(name[index].text,textime,texdose,'id'+name[index].text,ntotal);
    


    window.plugin.notification.local.onclick = function (id, state, json) {
           var name="hola"
           var doseN="2"
           var time=2
           var nid=0;
          for(i in $scope.reminderlists){
            if($scope.reminderlists[i].notId==id){
              name=$scope.reminderlists[i].title
              doseN=$scope.reminderlists[i].dose
              time = parseInt($scope.reminderlists[i].time) 
              nid=$scope.reminderlists[i].id;
            }
          }
        if($scope.reminderlists[nid].total>5){
          $ionicPopup.show({

            template: 'Recuerde que debe tomar '+doseN+' de '+ name+'.' ,
            title: 'Recordatorio',
            scope: $scope,
            buttons: [
              { 
                text: 'Posponer', 
                onTap: function(e) {
                    window.plugin.notification.local.add({
                        id         : 'id'+name ,
                        title      : 'MediKit Recordatorio',
                        message    : "Tu remedio: "+name +" Dosis:"+ doseN,
                        sound      : 'TYPE_ALARM',
                        repeat     : 'daily',
                        autoCancel : false,
                        date       : new Date(new Date().getTime() + time*1000),
                    }) 
                  }
                },
              
              {
                text: '<b>OK</b>',
                type: 'button-positive',
                onTap: function(e) {
                    
                    $scope.reminderlists[nid].total=$scope.reminderlists[nid].total-1

                    window.plugin.notification.local.add({
                          id         : 'id'+name ,
                          title      : 'MediKit Recordatorio',
                          message    : "Tu remedio: "+name +" Dosis:"+ doseN,
                          sound      : 'TYPE_ALARM',
                          repeat     : 'daily',
                          autoCancel : false,
                          date       : new Date(new Date().getTime() + time*1000),
                    })
                    

                }
              },
            ]
          })
      }else
      {
        if ($scope.reminderlists[nid].total<=0) {
          $ionicPopup.show({

            template: 'Recuerde que debe tomar '+doseN+' de '+ name+'. No quedan dosis registradas' ,
            title: 'Recordatorio',
            scope: $scope,
            buttons: [
              { 
                text: 'Cancelar', 
                onTap:function(e){
                    window.plugin.notification.local.cancel('id'+name, function () {

                    }, $scope);

                    }
              },
              {
                text: '<font size=0.5> Ver Farmacia</font>',
                type: 'button-positive',
                onTap: function(e) {
                    window.location="#/app/farmacias"
                    $scope.reminderlists[nid].total=$scope.reminderlists[nid].total-1
                    window.plugin.notification.local.add({
                        id         : 'id'+name ,
                        title      : 'MediKit Recordatorio',
                        message    : "Tu remedio: "+name +" Dosis:"+ doseN,
                        sound      : 'TYPE_ALARM',
                        repeat     : 'daily',
                        autoCancel : false,
                        date       : new Date(new Date().getTime() + time*1000),
                    })
                }
              },
                
              
              {
                text: '<b>OK</b>',
                type: 'button-positive',
                onTap: function(e) {
                    window.plugin.notification.local.add({
                          id         : 'id'+name ,
                          title      : 'MediKit Recordatorio',
                          message    : "Tu remedio: "+name +" Dosis:"+ doseN,
                          sound      : 'TYPE_ALARM',
                          repeat     : 'daily',
                          autoCancel : false,
                          date       : new Date(new Date().getTime() + time*1000),
                    })
                }
              },
            ]
          })
        } else{
          $ionicPopup.show({

            template: 'Recuerde que debe tomar '+doseN+' de '+ name+'. Quedan solo '+$scope.reminderlists[nid].total+' dosis' ,
            title: 'Recordatorio',
            scope: $scope,
            buttons: [
              { 
                text: 'Posponer', 
                onTap: function(e) {
                    window.plugin.notification.local.add({
                        id         : 'id'+name ,
                        title      : 'MediKit Recordatorio',
                        message    : "Tu remedio: "+name +" Dosis:"+ doseN,
                        sound      : 'TYPE_ALARM',
                        repeat     : 'daily',
                        autoCancel : false,
                        date       : new Date(new Date().getTime() + time*1000),
                    }) 
                  }
                },
                {
                text: '<font size=0.5> Ver Farmacia</font>',
                type: 'button-positive',
                onTap: function(e) {
                    window.location="#/app/farmacias"
                    $scope.reminderlists[nid].total=$scope.reminderlists[nid].total-1
                    window.plugin.notification.local.add({
                        id         : 'id'+name ,
                        title      : 'MediKit Recordatorio',
                        message    : "Tu remedio: "+name +" Dosis:"+ doseN,
                        sound      : 'TYPE_ALARM',
                        repeat     : 'daily',
                        autoCancel : false,
                        date       : new Date(new Date().getTime() + time*1000),
                    })
                }
              },
              
              {
                text: '<b>OK</b>',
                type: 'button-positive',
                onTap: function(e) {
                  $scope.reminderlists[nid].total=$scope.reminderlists[nid].total-1
                    window.plugin.notification.local.add({
                          id         : 'id'+name ,
                          title      : 'MediKit Recordatorio',
                          message    : "Tu remedio: "+name +" Dosis:"+ doseN,
                          sound      : 'TYPE_ALARM',
                          repeat     : 'daily',
                          autoCancel : false,
                          date       : new Date(new Date().getTime() + time*1000),
                    })
                }
              },
            ]
          })
          
        }//ELSE
        
        
      }
    };
    $scope.modal.hide();
  };
  $scope.cancelAll=function(){
    window.plugin.notification.local.cancelAll(function () {
    // All notifications have been canceled
    }, scope);
  }
  $scope.ouputUpdate=function (vol) {
    $scope.querySelector('#volume').value = vol;  
  }
  $scope.selectpre=function(){
    //data.prentacion= document.getElementById("Programacion").options[document.getElementById("Programacion").selectedIndex];
    console.log("hola")
    //document.getElementById("demo").innerHTML = data.prentacion;
  }

})
.controller('FamiliaCtrl', function($scope, $stateParams, Familia) {
    $scope.familiaList = Familia.all();


})

.controller('ReminderCtrl', function($scope, $stateParams,$ionicModal , Reminders,Medicines) {

    $scope.reminder = Reminders.get($stateParams.reminderId);
    var name=$scope.reminder.title;
    $scope.Medicineslist=Medicines.all();
    $scope.medicinere=$scope.Medicineslist[0]
    for (medicine in $scope.Medicineslist) {
      if ($scope.Medicineslist[medicine].title==name) {
           $scope.medicinere =$scope.Medicineslist[medicine];
      };
    };



})
.controller('ReminderlistfamilyCtrl', function($scope, $stateParams,$ionicModal,Familia) {
/*$ionicModal.fromTemplateUrl('modal.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }*/
$scope.familiar = Familia.get($stateParams.familiarId);
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
     var image = 'img/pastillin-m.png'
     
    /*$scope.marker = new google.maps.Marker({
        position: new google.maps.LatLng(-33.448934, -70.682287),
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        icon:image,
        title: 'Holas!'     
      
    }),*/
$scope.marker1 = new google.maps.Marker({ position: new google.maps.LatLng(-33.457041,-70.70509), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'AHUMADA'}),
$scope.marker2 = new google.maps.Marker({ position: new google.maps.LatLng(-33.452695,-70.69151), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'AHUMADA'}),
$scope.marker3 = new google.maps.Marker({ position: new google.maps.LatLng(-33.463246,-70.722774), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'AHUMADA'}),
$scope.marker4 = new google.maps.Marker({ position: new google.maps.LatLng(-33.453984,-70.69209), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'AHUMADA'}),
$scope.marker5 = new google.maps.Marker({ position: new google.maps.LatLng(-33.453930,-70.687752), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'BELGO CHILENA'}),
$scope.marker6 = new google.maps.Marker({ position: new google.maps.LatLng(-33.471008,-70.692411), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'CARRERA'}),
$scope.marker7 = new google.maps.Marker({ position: new google.maps.LatLng(-33.457573,-70.706486), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'CENTRO DE SALUD LAS REJAS'}),
$scope.marker8 = new google.maps.Marker({ position: new google.maps.LatLng(-33.451139,-70.679883), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'CRUZ VERDE'}),
$scope.marker9 = new google.maps.Marker({ position: new google.maps.LatLng(-33.451929,-70.682047), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'CRUZ VERDE'}),
$scope.marker10 = new google.maps.Marker({ position: new google.maps.LatLng(-33.453339,-70.687819), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'CRUZ VERDE'}),
$scope.marker11 = new google.maps.Marker({ position: new google.maps.LatLng(-33.467564,-70.729965), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'CRUZ VERDE'}),
$scope.marker12 = new google.maps.Marker({ position: new google.maps.LatLng(-33.453006,-70.680365), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'CRUZ VERDE'}),
$scope.marker13 = new google.maps.Marker({ position: new google.maps.LatLng(-33.454199,-70.692347), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'DEL DR. SIMI'}),
$scope.marker14 = new google.maps.Marker({ position: new google.maps.LatLng(-33.448949,-70.679158), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'DEL DR. SIMI'}),
$scope.marker15 = new google.maps.Marker({ position: new google.maps.LatLng(-33.465727,-70.708569), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'ELENA'}),
$scope.marker16 = new google.maps.Marker({ position: new google.maps.LatLng(-33.467524,-70.730906), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'ESPOZ'}),
$scope.marker17 = new google.maps.Marker({ position: new google.maps.LatLng(-33.45794,-70.707389), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'ESPOZ'}),
$scope.marker18 = new google.maps.Marker({ position: new google.maps.LatLng(-33.461825,-70.698417), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'NUEVA LEO'}),
$scope.marker19 = new google.maps.Marker({ position: new google.maps.LatLng(-33.458083,-70.720113), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'OLIVER'}),
$scope.marker20 = new google.maps.Marker({ position: new google.maps.LatLng(-33.450672,-70.677606), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'PUDAHUEL'}),
$scope.marker21 = new google.maps.Marker({ position: new google.maps.LatLng(-33.464421,-70.70544), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'SAINT GERMAIN'}),
$scope.marker22 = new google.maps.Marker({ position: new google.maps.LatLng(-33.450755,-70.679185), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'SALCOBRAND'}),
$scope.marker23 = new google.maps.Marker({ position: new google.maps.LatLng(-33.451979,-70.682283), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'SALCOBRAND'}),
$scope.marker24 = new google.maps.Marker({ position: new google.maps.LatLng(-33.453151,-70.687245), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'SALCOBRAND'}),
$scope.marker25 = new google.maps.Marker({ position: new google.maps.LatLng(-33.456732,-70.70273), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'SALCOBRAND'}),
$scope.marker26 = new google.maps.Marker({ position: new google.maps.LatLng(-33.453167,-70.68039), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'SALCOBRAND'}),
$scope.marker27 = new google.maps.Marker({ position: new google.maps.LatLng(-33.451101,-70.679644), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'SALCOBRAND'}),
$scope.marker28 = new google.maps.Marker({ position: new google.maps.LatLng(-33.451639,-70.677906), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'AHUMADA'}),
$scope.marker29 = new google.maps.Marker({ position: new google.maps.LatLng(-33.451621,-70.677885), map: $scope.map, animation: google.maps.Animation.DROP, icon:image, title: 'AHUMADA'});
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


