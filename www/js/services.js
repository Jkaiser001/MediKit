angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Reminders', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var contid=5;
  var reminders = [
    { title: 'ATENOLOL',time:"2m",dose:"1 cucharada",notId:"idATENOLOL", total:"3" , id: 0 },
    { title: 'TAPSIN',time:"1h",dose:"1 1/2 pastilla" , total:"6",id: 1 },
    { title: 'CALORO',time:"3h",dose:"3 pastillas", total:"16" ,id: 2 },
    { title: 'tapsin', time:"5h",dose:"1/2 pastilla", total:"20" ,id: 3 },
    { title: 'aspirina', time:"4h", dose:"3 pastillas", total:"3"  ,id: 4 },
    { title: 'listerin', time:"5h", dose:"2 pastillas", total:"3" ,id: 5 }

  ];
  

  return {
    all: function() {
      return reminders;
    },
    get: function(reminderId) {
      // Simple index lookup
      return reminders[reminderId];
    },
    add: function(ntitle,ntime,ndose,notid,ntotal){
      contid++,
      reminders.push({title:ntitle,time:ntime,dose:ndose,notId:notid,total:ntotal,id:contid});
    }
  }
})


.factory('Medicines', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var medicines = [
    { title: 'ATENOLOL',dose:"cucharada",descripcion:"El atenolol se usa sólo o en combinación con otros medicamentos para tratar la hipertensión. También se usa para prevenir la angina (dolor en el tórax) y para el tratamiento de los ataques cardíacos. El atenolol pertenece a en una clase de medicamentos llamados betabloqueadores. Funciona al relajar los vasos sanguíneos y la disminución de la frecuencia cardíaca para mejorar el flujo sanguíneo y disminuir la presión arterial.", Efecto:"El atenolol puede provocar efectos secundarios. Dígale a su doctor si cualquiera de estos síntomas se vuelve severo o si no desaparece: mareos, náuseas, cansancio, somnolencia (sueño), depresión, malestar estomacal, diarrea." , id: 0 },
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
    },


  }
})
.factory('Familia', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var familiares = [
    { nick: 'Claudia',nombre:'Claudia Pardo',Medicamentos:[{ title: 'ATENOLOL',time:"2m",dose:"1 cucharada",notId:"idATENOLOL", total:"3" , id: 0 },
    { title: 'TAPSIN',time:"1h",dose:"1 1/2 pastilla" , total:"6",id: 1 },
    { title: 'CALORO',time:"3h",dose:"3 pastillas", total:"16" ,id: 2 },
    { title: 'tapsin', time:"5h",dose:"1/2 pastilla", total:"20" ,id: 3 },
    { title: 'aspirina', time:"4h", dose:"3 pastillas", total:"3"  ,id: 4 },
    { title: 'listerin', time:"5h", dose:"2 pastillas", total:"3" ,id: 5 }],imagen:"img/avatares/mama3.png" , id: 0 },
    { nick: 'Javierita',nombre:'Javiera Osorio',Medicamentos:[{ title: 'ATENOLOL',time:"2m",dose:"1 cucharada",notId:"idATENOLOL", total:"3" , id: 0 },
    { title: 'TAPSIN',time:"1h",dose:"1 1/2 pastilla" , total:"6",id: 1 },
    { title: 'CALORO',time:"3h",dose:"3 pastillas", total:"16" ,id: 2 },
    { title: 'tapsin', time:"5h",dose:"1/2 pastilla", total:"20" ,id: 3 },
    { title: 'aspirina', time:"4h", dose:"3 pastillas", total:"3"  ,id: 4 },
    { title: 'listerin', time:"5h", dose:"2 pastillas", total:"3" ,id: 5 }],imagen:"img/avatares/nina.png" ,id: 1 },
    { nick: 'Pablo',nombre:'Pablo Osorio',Medicamentos:[{ title: 'ATENOLOL',time:"2m",dose:"1 cucharada",notId:"idATENOLOL", total:"3" , id: 0 },
    { title: 'TAPSIN',time:"1h",dose:"1 1/2 pastilla" , total:"6",id: 1 },
    { title: 'CALORO',time:"3h",dose:"3 pastillas", total:"16" ,id: 2 },
    { title: 'tapsin', time:"5h",dose:"1/2 pastilla", total:"20" ,id: 3 },
    { title: 'aspirina', time:"4h", dose:"3 pastillas", total:"3"  ,id: 4 },
    { title: 'listerin', time:"5h", dose:"2 pastillas", total:"3" ,id: 5 }],imagen:"img/avatares/nerd.png" ,id: 2 },
    { nick: 'Mamá',nombre:'Elisa Ulloa',Medicamentos:[{ title: 'ATENOLOL',time:"2m",dose:"1 cucharada",notId:"idATENOLOL", total:"3" , id: 0 },
    { title: 'TAPSIN',time:"1h",dose:"1 1/2 pastilla" , total:"6",id: 1 },
    { title: 'CALORO',time:"3h",dose:"3 pastillas", total:"16" ,id: 2 },
    { title: 'tapsin', time:"5h",dose:"1/2 pastilla", total:"20" ,id: 3 },
    { title: 'aspirina', time:"4h", dose:"3 pastillas", total:"3"  ,id: 4 },
    { title: 'listerin', time:"5h", dose:"2 pastillas", total:"3" ,id: 5 }],imagen:"img/avatares/abuela1.png",id: 3 },
    { nick: 'Papá', nombre:'Luis Osorio',Medicamentos:[{ title: 'ATENOLOL',time:"2m",dose:"1 cucharada",notId:"idATENOLOL", total:"3" , id: 0 },
    { title: 'TAPSIN',time:"1h",dose:"1 1/2 pastilla" , total:"6",id: 1 },
    { title: 'CALORO',time:"3h",dose:"3 pastillas", total:"16" ,id: 2 },
    { title: 'tapsin', time:"5h",dose:"1/2 pastilla", total:"20" ,id: 3 },
    { title: 'aspirina', time:"4h", dose:"3 pastillas", total:"3"  ,id: 4 },
    { title: 'listerin', time:"5h", dose:"2 pastillas", total:"3" ,id: 5 }],imagen:"img/avatares/abuelo2.png",id: 4 },
    { nick: 'Jesica',nombre:'Jesica Osorio',Medicamentos:[{ title: 'ATENOLOL',time:"2m",dose:"1 cucharada",notId:"idATENOLOL", total:"3" , id: 0 },
    { title: 'TAPSIN',time:"1h",dose:"1 1/2 pastilla" , total:"6",id: 1 },
    { title: 'CALORO',time:"3h",dose:"3 pastillas", total:"16" ,id: 2 },
    { title: 'tapsin', time:"5h",dose:"1/2 pastilla", total:"20" ,id: 3 },
    { title: 'aspirina', time:"4h", dose:"3 pastillas", total:"3"  ,id: 4 },
    { title: 'listerin', time:"5h", dose:"2 pastillas", total:"3" ,id: 5 }],imagen:"img/avatares/mama6.png" ,id: 5 }
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
