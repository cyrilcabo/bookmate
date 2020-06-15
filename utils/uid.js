const uniqueID = () => {
	const n1 = Date.now();
	const n2 = n1.toString(16);
	let n3 = [...n1.toString(), ...n2];
	let n4 = [...n3];
	let n5 = [];
	
	for (let i = 0; i < n3.length; i++) {
		n5.push(n4.splice(Math.floor(Math.abs(Math.random()*n4.length)), 1)[0]);
	}
	
	return n5.join("");
}

export default uniqueID;