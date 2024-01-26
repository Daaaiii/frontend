import Sidebar from "../components/Sidebar/page";
import ClientsDistance from "../components/clientsDistance/page";


export default function Distance() {
	return (
		<main className=" flex">
			<Sidebar/>
			<ClientsDistance/>
		</main>
	);
}