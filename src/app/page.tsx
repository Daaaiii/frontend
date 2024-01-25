import Login from './components/Login';
import Navbar from './components/NavBar';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<Navbar />
			<Login />
		</main>
	);
}
