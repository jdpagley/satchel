'use strict';

/**
 * Get oneKeys form object
 */
function _keys(obj){
  return Object.keys(obj);
};

/**
 * Check if value is an Object
 */
function _isObject(obj){
  var type = typeof obj;
  return type === 'object' && !!obj;
};

/**
 * Check if value is Array
 */
function _isArray(val){
  return toString.call(val) === '[object Array]';
};

var locals = {
  user: {name: 'josh'},
  charges: ['$10', '$20'],
  age: 19
};

var model = {
  infoArray: [{userInfo: 'user', age2: 'age'}, ['age', 'age'], 'age'],
  infoObj: {
    josh: ['user','age'],
    joshObj: {
      age: 'age',
      userInfo: 'user'
    },
    joshInfo: 'user'
  }, 
  age: 'age'
};

var pack = {};

module.exports = function(model){
  return function(req, res, next){
    res.satchel = {
      finish: function(){
        return function(req, res, next){
        };
      },  
    };
  }
};

function fillPack(){
   _keys(model).forEach(function(keyOne, i){

     /**
     * Level One Array 
     */
     if (toString.call(model[keyOne]) === '[object Array]'){
       if (toString.call(pack[keyOne]) !== '[object Array]') pack[keyOne] = [];
      /*
       * Loop through each element in the level 2 array
       */
       model[keyOne].forEach(function(keyTwo, indexTwo){
         
        /**
         * Level Two Array 
         */
         if (toString.call(model[keyOne][indexTwo]) === '[object Array]'){
           if (toString.call(pack[keyOne][indexTwo]) !== '[object Array]') pack[keyOne][indexTwo] = [];
           /**
            * Loop through each element in the level two array
            */
           model[keyOne][indexTwo].forEach(function(keyThree, i){
             pack[keyOne][indexTwo].push(locals[keyThree]);
           });
         }

          /**
           * Level Two Object 
           */
          if (toString.call(model[keyOne][indexTwo]) == '[object Object]' && !!model[keyOne][indexTwo]){
            if (typeof pack[keyOne][indexTwo] !== 'object') pack[keyOne][indexTwo] = {};
            /**
             * Loop throught each key in level two nested Object 
             */
            _keys(model[keyOne][indexTwo]).forEach(function(keyThree, i){
              var localsKey = model[keyOne][indexTwo][keyThree];
              pack[keyOne][indexTwo][keyThree] = locals[localsKey];
            });
          }

          /**
           * Level Two String/Number 
           */
          if (typeof model[keyOne][indexTwo] == 'string' || typeof model[keyOne][indexTwo] == 'number'){
            pack[keyOne][indexTwo] = locals[model[keyOne][indexTwo]];
          }

       });
     }

    /**
     * Level One Object 
     */
    if (toString.call(model[keyOne]) == '[object Object]' && !!model[keyOne]){
      if (typeof pack[keyOne] !== 'object') pack[keyOne] = {};

      /**
       * Loop through each oneKey in nested object
       */
      _keys(model[keyOne]).forEach(function(keyTwo, indexTwo){
        /**
         * Level Two Array 
         */
         if (toString.call(model[keyOne][keyTwo]) === '[object Array]'){
           if (toString.call(pack[keyOne][keyTwo]) !== '[object Array]') pack[keyOne][keyTwo] = [];
           /**
            * Loop through each element in the level two array
            */
           model[keyOne][keyTwo].forEach(function(keyThree, i){
             pack[keyOne][keyTwo].push(locals[keyThree]);
           });
         }

          /**
           * Level Two Object 
           */
          if (toString.call(model[keyOne][keyTwo]) == '[object Object]' && !!model[keyOne][keyTwo]){
            if (typeof pack[keyOne][keyTwo] !== 'object') pack[keyOne][keyTwo] = {};
            /**
             * Loop throught each key in level two nested Object 
             */
            _keys(model[keyOne][keyTwo]).forEach(function(keyThree, i){
              var localsKey = model[keyOne][keyTwo][keyThree];
              pack[keyOne][keyTwo][keyThree] = locals[localsKey];
            });
          }

          /**
           * Level Two String/Number 
           */
          if (typeof model[keyOne][keyTwo] == 'string' || typeof model[keyOne][keyTwo] == 'number'){
            pack[keyOne][keyTwo] = locals[model[keyOne][keyTwo]];
          }

        
//        var localsKey = model[keyOne][keyTwo];
 //       pack[keyOne][keyTwo] = locals[localsKey];
      });
    }

    /**
     * Key contains a string or number
     */
    if (typeof model[keyOne] == 'string' || typeof model[keyOne] == 'number'){
      pack[keyOne] = locals[model[keyOne]];
    }
  });
}

fillPack();

console.log(pack);
