'use strict';

module.exports = function(model){
  return function(req, res, next){
    res.satchel = {
      /**
       * Pockets is the object that is used like res.this.pockets
       */
      pockets: {},

      /**
       * Get Pocket Value
       */
      get: function(key){
        return this.pockets[key];
      },

      /**
       * Get All Pockets
       */
      getAll: {
        return this.pockets;
      },

      /**
       * Get Pocket Keys
       */
      getKeys: {
        return _keys(this.pockets);
      },

      /**
       * Set the value of a pocket
       */
      set: function(key, val){
        this.pockets[key] = val;
        return this.pockets[key];
      },

      /**
       * Return formated object for response
       */ 
      finish: function(){
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
                 pack[keyOne][indexTwo].push(this.pockets[keyThree]);
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
                  var this.pocketsKey = model[keyOne][indexTwo][keyThree];
                  pack[keyOne][indexTwo][keyThree] = this.pockets[this.pocketsKey];
                });
              }

              /**
               * Level Two String/Number 
               */
              if (typeof model[keyOne][indexTwo] == 'string' || typeof model[keyOne][indexTwo] == 'number'){
                pack[keyOne][indexTwo] = this.pockets[model[keyOne][indexTwo]];
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
                   pack[keyOne][keyTwo].push(this.pockets[keyThree]);
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
                    var this.pocketsKey = model[keyOne][keyTwo][keyThree];
                    pack[keyOne][keyTwo][keyThree] = this.pockets[this.pocketsKey];
                  });
                }

                /**
                 * Level Two String/Number 
                 */
                if (typeof model[keyOne][keyTwo] == 'string' || typeof model[keyOne][keyTwo] == 'number'){
                  pack[keyOne][keyTwo] = this.pockets[model[keyOne][keyTwo]];
                }

            });
          }

          /**
           * Key contains a string or number
           */
          if (typeof model[keyOne] == 'string' || typeof model[keyOne] == 'number'){
            pack[keyOne] = this.pockets[model[keyOne]];
          }
        });               
      }
    }
    
    return next();
  }
};

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

