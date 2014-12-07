angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Reminders', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var reminders = [
    { title: 'ATENOLOL',time:"2m",dose:"1 cucharada",notId:"idATENOLOL" , id: 0 },
    { title: 'TAPSIN',time:"1h",dose:"1 1/2 pastilla" ,id: 1 },
    { title: 'CALORO',time:"3h",dose:"3 pastillas" ,id: 2 },
    { title: 'tapsin', time:"5h",dose:"1/2 pastilla" ,id: 3 },
    { title: 'aspirina', time:"4h", dose:"3 pastillas"  ,id: 4 },
    { title: 'listerin', time:"5h", dose:"2 pastillas" ,id: 5 }

  ];
  

  return {
    all: function() {
      return reminders;
    },
    get: function(reminderId) {
      // Simple index lookup
      return reminders[reminderId];
    }
  }
})


.factory('Medicines', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var medicines = [
    { title: 'ATENOLOL',dose:"cucharada" , id: 0 },
    { title: 'TAPSIN',dose:"pastilla" ,id: 1 },
    { title: 'CALORO',dose:"pastillas" ,id: 2 },
    { title: 'tapsin',dose:"pastilla" ,id: 3 },
    { title: 'aspirina', dose:"pastillas"  ,id: 4 },
    { title: 'listerin', dose:"pastillas" ,id: 5 }

  ];

  return {
    all: function() {
      return medicines;
    },
    get: function(medicineId) {
      // Simple index lookup
      return medicines[medicineId];
    }
  }
})
.factory('Familia', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var familiares = [
    { nick: 'Claudia',nombre:'Claudia Pardo',Medicamentos:['TAPSIN','plas','das'],imagen:"img/ionic.png" , id: 0 },
    { nick: 'Javierita',nombre:'Javiera Osorio',Medicamentos:'TAPSIN',imagen:"img/ionic.png" ,id: 1 },
    { nick: 'Pablo',nombre:'Pablo Osorio',Medicamentos:'TAPSIN',imagen:"img/ionic.png" ,id: 2 },
    { nick: 'Mamá',nombre:'Elisa Ulloa',Medicamentos:'TAPSIN',imagen:"img/ionic.png",id: 3 },
    { nick: 'Papá', nombre:'Luis Osorio',Medicamentos:'TAPSIN',imagen:"img/ionic.png",id: 4 },
    { nick: 'Jesica',nombre:'Jesica Osorio',Medicamentos:'TAPSIN',imagen:"img/ionic.png" ,id: 5 }
  ];

  return {
    all: function() {
      return familiares;
    },
    get: function(familiaId) {
      // Simple index lookup
      return familiares[familiaId];
    }
  }
});
