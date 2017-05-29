import {Pipe} from '@angular/core';
 
@Pipe({
	name: 'objectToArray'
})
export class ObjectToArray {
	transform(arg) {
		const newArray = Object.keys(arg).map(key => arg[key]);
		return newArray;
	}
}