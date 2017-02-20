
# angularForDesigners

This is a simplification of angular specially to designers and interact with developers 

## Quick Reference

### Inputs

```javascript
	<input name="fieldName">
```

Angular Equivalent

```javascript
	<input ng-model="afdModel.fieldName">
```

### Comboboxes

Afd:

```javascript
	<select afd name="contact.country" list="countries"></select> 
```

Angular Equivalent

```javascript
	<select ng-model="contact.country" ng-options="item.label for item in afdData.countries track by item.value></select>
```

You can define label and value of each element
```javascript
	<select afd name="contact.country" list="countries" label="label" value="value"></select> 
```


### Display values

```javascript
	<span name="fieldName"></span>
	<span>fieldName</span>
	<p>fieldName</p>
```

Angular Equivalent

```javascript
	<span>{{afdModel.fieldName}}</span>
	<span>{{afdModel.fieldName}}</span>
	<p>{{afdModel.fieldName}}</p>
```


### Translation

```javascript
	<span afd-translate>LITERAL</span>
```

Angular Equivalent

```javascript
	<span>{{'LITERAL'|translate}}</span>
```

### Loops

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

Angular Equivalent

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

## Setting up the enviromnet

