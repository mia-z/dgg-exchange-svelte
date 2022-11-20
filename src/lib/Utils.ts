  //https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
export const stringToColour = (str: string): string => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	var colour = '#';
	for (let i = 0; i < 3; i++) {
		var value = (hash >> (i * 8)) & 0xFF;
		colour += ('00' + value.toString(16)).substr(-2);
	}
	return colour;
}

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const getRandomIntInclusive = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getStoredValue<T> (key: string): T | null {
	try {
		const itemToGet = localStorage.getItem(key);
		if (!itemToGet) {
			return null;
		}
		const parsedItemToGet = JSON.parse(itemToGet) as T;
		return parsedItemToGet;
	} catch (e) {
		console.log("couldnt get item with key " + key + ", got error: " + e);
	}
}

export function setStoredValue(key: string, value: any): void {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		console.log("couldnt set item with key " + key + ", and value " + value + ", got error: " + e);
	}
}

export function updateStoredValue (key: string, value: any) {
	try {
		const itemExists = localStorage.getItem(key);
		if (itemExists) {
			const itemExistsParsed = JSON.parse(itemExists);
			if (itemExistsParsed.constructor === Array) {
				localStorage.setItem(key, JSON.stringify([ ...itemExistsParsed, ...value ]))
			} else {
				localStorage.setItem(key, JSON.stringify({ ...itemExistsParsed, ...value }))
			}
		} else {
			localStorage.setItem(key, JSON.stringify(value));
		}
	} catch (e) {
		console.log("couldnt update item with key " + key + ", and value " + value + ", got error: " + e);
	}
}