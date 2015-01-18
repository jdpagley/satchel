satchel
=======

**Thoughts**

* Place an object that has a getter and setter closure function on res.satchel. This function would handle building the final response object for you. 
* In order to populate the object that you just defined you would do something like the following:
* For all the properties that are defined on the satchel model but are not contained in `res.locals` will be assigned a value of null.
* If you set a property on satchel that was not defined on the original response schema object you will still be able to access it using `res.satchel.get('whatever')` but it will not be on the final object when you call `res.satchel.final()`.

```
res.satchel.set('user', data);
res.satchel.get('user');

//Return final object
res.satchel.final()
```

**Debugging:**

`res.satchel.view()` will show you what the satchel final object looks like populated with the properties from `res.locals` at the current time it is called.


Organizes the process of handing data between middlwares

**Quick Start**

```
//Route > Get User Purchases

var purchasesSchema = {
	user: 'user.id', //id property of user object on res.locals
	purchases: 'purchases', //purchases property on res.locals
}

app.get('/purchases/:userId', satchel.start(purchasesSchema), cards.get(satchel), purchases.getAll(satchel), misc.end);
```

```
//Satchel Start

exports.finish = function(req, res, next){
	function finish(schema){
		
	}
}

```

**Success:**

* Add the middleware data to the res.locals object under the property name of the middleware that was hit.

```
//Passing through the permisions middlware
//res.locals
{
	permissions: {permissionObj}
}
```

**Error Occurred**

* Add error message to res.error if an error occurrs at anytime in the middleware chain.

**Passing Data Between Middlewares**

* Construct object model (What you want the response object to look like)
	* Keys in model object will be the keys in the response object.
	* Values for the model object keys will pull the correlating property off the `res.locals` object.
	* If the res.locals property is empty or undefined that the model object is looking for then it will add an empty array.


```	
** Model Object For Response

	{
		userData: {
			accessLevel: "permissions" //This will pull the data off of res.locals.permissions 
		}	
	}
```
