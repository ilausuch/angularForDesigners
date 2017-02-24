
# angularForDesigners

This is a simplification of angular specially to designers and interact with developers 

As designer you can organize, add clases, add styles with out restrictions. You only have to add some modifiers to some tags 

This example with a form with user language friendly to get its name, email and country and stores it in a javascript variable to be sended


```javascript
	<table class="table">
		<tr>
			<td>
				<b afd-translate>NAME</b>
			</td>
			<td>
				<input afd name="personalInfo.name" style="color:blue">
			</td>
		</tr>
		<tr>
			<td>
				<b afd-translate>EMAIL</b>
			</td>
			<td>
				<input afd type="email" name="contact.email">
			</td>
		</tr>
		<tr>
			<td>
				<b afd-translate>COUNTRY</b>
			</td>
			<td>
				<select afd name="contact.country" list="countries">
			</td>
		</tr>
	
```

## **Basic concepts**

### The Model

A model is a javascript object where all values of a form will be stored.  The variable name of AngularForDesigners is `afdModel`

```javascript
afdModel:{
	name:undefined,
	lastName:undefined,
	age:undefined,
	country:undefined,
	email:undefined
}
```
A model can be an estructure of objects with the purpose of organization

```javascript
afdModel:{
	personalInfo:{
		name:undefined,
		lastName:undefined,
		age:undefined,
	},
	contact:{
		country:undefined
		email:undefined
	}
}
```

### The Data object

A data object is a javascript object that contains lists of objects to use. For instance a list of countries for your comboboxes. The variable name of AngularForDesigners is `afdData`

```javascript
afdData:{
	countries:[
		{label:"Spain", value:"es"},
		{label:"France", value:"fr"},
		{label:"Germany", value:"ge"},
		{label:"United Kindom", value:"uk"},
	]
}
```

### The Operations

TODO

## **Setting up the enviromnet**

### Scope
First, you must set your scope

```javascript
AngularForDesigners.configure($scope);
```

### Model and data
 
```javascript
//Seting the model (In this case, it is get from current controller)
AngularForDesigners.setModel(this.model);

//Setting the data
AngularForDesigners.setData({
            countries:[{label:"Spain",value:1},{label:"France",value:2}]  
        });
```

Note: Yo can change Model every time you need	


## **HTML Elements**

### Inputs

Add `afd` as modifier and set the name of field

```javascript
<input afd name="fieldName">
```

**Checkboxes**

```javascript
<input afd type="checkbox" name="acepted"> 
I accept conditions
```

**Type ckeck**

You can use HTML check.

This check that input is an email. 

* If input value is not an email an ng-invalid class is activated, you can declare a style for that.
* If input value is an email it will stored on email variable of model

```javascript
	<input afd type="email" name="email">
```


### Comboboxes

```javascript
	<select afd name="country" list="countries"></select> 
```


If label and value are diferent in afdData, you can define your own of elements. For instance, in this case, the label is countryName and the value is id

```javascript
	<select afd 
		name="contact.country" 
		list="countries" 
		label="countryName" 
		value="id"></select> 
```


### Display model values 

You can display a model value wherever you want.

```javascript
	<p afd>fieldName</p>
```

or using modifier name

```javascript
	<span name="fieldName"></span>
```

### Repeats or loops

If you have a complex model with lists of objects, you can use repeats to show it. For instance, whe have a list of studies

```javascript
afdModel={
	studies:[
		{ name: "Study 1" },
		{ name: "Study 2" }
	]
}
```

You can show it in a list using `afd-repeat` suggesting model field of list

```javascript
	<ul afd-repeat="studies">
		<li>
			<span afd>name</span>
		</li>
	</ul>
```

You can simplify this

```javascript
	<ul afd-repeat="studies">
		<li afd>name</li>
	</ul>
```

#### Nested loops

It is possible you have lists inside other lists

```javascript
afdModel={
	studies:[
		{ 
			name: "Study 1",
			teachers: [
				name: "Teacher A",
				name: "Teacher B",
			]
		},
		{ 
			name: "Study 2",
			teachers: [
				name: "Teacher C",
				name: "Teacher D",
			]
		}
	]
}
```

This example resolves the problem:

```javascript
	<ul afd-repeat="studies">
		<li>
			
			<span afd>name</span>
			
			<ul afd-repeat="teachers">
				<li afd>name</li>
		    </ul>
		    
		</li>
	</ul>
```

#### Bootstrap panels in loops

In this case we are usign bootstrap pannels to show the studies. Title pannel will be name of study, and in the body you can change the name of study and its description

```javascript
<div afd-repeat="studies">
	<div class="panel panel-default" >
		
		<div afd class="panel-heading">name</div>
		
		<div class="panel-body">
			
			<input afd name="name">
			<textarea afd name="description"></textarea>
		</div> 
	</div>
</div>
```	

## **Modifiers**

### afd-show and afd-hide

You can show or hide parts of your HTML using `afd-show` and `afd-hide` than check if a model attribute is true or false.  An attribute can be a function too.

In the next example, user can check if is a foreign student. If it is the case a current center learning input will be showed

The model
```javascript
afdModel={
	foreignStudent:false,
	currentLearningCenter:undefined
}
```

The HTML

```HTML
<p><input afd type="checkbox" name="foreignStudent"> I am studing in other university</p>

<p afd-show="foreignStudent">
	Where: <input afd name="currentLearningCenter">
</p>
```

### Translation

A literal can be translated to user language using `afd-translate`. See Setup section for more information

```javascript
	<span afd-translate>LITERAL</span>
```

## **Angular equivalences**

### Inputs

```javascript
<input afd name="fieldName">
```

In angular is:

```javascript
<input ng-model="afdModel.fieldName">
```


### Comboboxes

```javascript
<select afd name="country" list="countries"></select> 
```

In angular is:

```javascript
	<select ng-model="contact.country" ng-options="item.label for item in afdData.countries track by item.value></select>
```


### Display values

```javascript
	<span afd name="fieldName"></span>
	<span afd>fieldName</span>
	<p afd>fieldName</p>
```

In angular is:

```javascript
	<span>{{afdModel.fieldName}}</span>
	<span>{{afdModel.fieldName}}</span>
	<p>{{afdModel.fieldName}}</p>
```


### Translation

```javascript
	<span afd-translate>LITERAL</span>
```

In angular is:

```javascript
	<span>{{'LITERAL'|translate}}</span>
```

### Repeats

```javascript
	<ul afd-repeat="studies">
		<li>
			<span afd>label</span>
			<ul afd-repeat="teachers">
				<li>
					<span afd>label</span>
		        </li>
		    </ul>
		</li>
	</ul>
```

In angular is:

```javascript
	<ul>
		<li ng-repeat="afdModel in afdModel.studies">
			<span>{{afdModel.label}}</span>
			<ul>
				<li ng-repeat="afdModel in afdModel.teachers>
					<span>{{afdModel.label}}</span>
				</li>
			</ul>
		</li>
	</ul>
```






