import Sidebar from "../components/Sidebar/page";
import Client from "../components/clients/page";

export default function Clients() {
	return (
		<main className=" flex">
			<Sidebar/>
			<Client/>
		</main>
	);
}