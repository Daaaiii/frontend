import { jwtDecode } from 'jwt-decode';


export function login(token: string) {
	localStorage.setItem('token', token);
}

export function logout() {
	localStorage.removeItem('token');
}

export function getToken() {
	
		return localStorage.getItem('token');
	  
}

export function isAuthenticated() {
	const token = getToken();

	return token && !isTokenExpired();
}

export default function isTokenExpired() {
	const token = getToken();
	if (token) {
		interface DecodedToken {
			exp: number;
		}

		const decodedToken: DecodedToken = jwtDecode(token);
		const currentTimestamp = Math.floor(Date.now() / 10000);
		return decodedToken.exp < currentTimestamp;
	}

	return true;
}

export function getIdByToken() {
	const token = getToken();
	if (token) {
		interface DecodedTokenID {
			id: string;
		}
		localStorage.getItem('token');

		const decodedToken: DecodedTokenID = jwtDecode(token);

		return decodedToken.id;
	}
	return null;
}
export function getNameByToken() {
	const token = getToken();
	if (token) {
		interface DecodedTokenID {
			name: string;
		}
		localStorage.getItem('token');

		const decodedToken: DecodedTokenID = jwtDecode(token);

		return decodedToken.name;
	}
	return null;
}
