"use client";
import Image from "next/image";
import {redirect, useRouter} from "next/navigation";
import {useEffect} from "react";
import {isAuthenticated} from "../../service/authService/AuthServive";
import Link from "next/link";

export default function Sidebar() {
	const router = useRouter();

	useEffect(() => {
		if (!isAuthenticated()) {
			router.push("/");
		}
	}, [router]);

	const redirectClients = () => {
		router.push("/clients");
	};
	const redirectDistance = () => {
		router.push("/distance");
	};

	

	const onClickLogout = () => {
		localStorage.clear();
		router.push("/");
	};

	return isAuthenticated() ? (
		<nav className="relative h-screen left-0 top-0 w-1/5 z-50 flex flex-col justify-around px-8 bg-base shadow-gray-400 shadow-md selection:text-blue-80">
			
			<div className="mb-6 flex justify-center">
				<Link href={"/"}>
					<Image src="/logo-devclean.png" className="rounded-md" priority={false}  alt="b logo" width={100} height={100} />
				</Link>
			</div>
			 <button onClick={redirectClients}
				className="mb-2 p-5 flex items-center justify-start rounded-md bg-gray-300 hover:bg-blue-600 shadow-gray-400 shadow-md"
				
			>
				<Image
					alt="icon"
					src="/pen-to-square-solid.svg"
					width={20}
					height={20}
				/>
				<span className="ml-2">Clientes</span>
			</button>
			 <button onClick={redirectDistance}
				className="mb-2 p-5 flex items-center justify-start rounded-md bg-gray-300 hover:bg-blue-600 shadow-gray-400 shadow-md"				
			>
				<Image
					alt="icon"
					src="/map-location-dot-solid.svg"
					width={20}
					height={20}
				/>
				<span className="ml-2">Distância</span>
			</button>
			
			<button
				className="mb-2 p-5 flex items-center justify-start rounded-md bg-gray-300 hover:bg-blue-600 shadow-gray-400 shadow-md"
				onClick={onClickLogout}
			>
				<Image
					alt="icon"
					src="/arrow-right-from-bracket-solid.svg"
					width={20}
					height={20}
				/>
				<span className="ml-2">Logout</span>
			</button>
		</nav>
	) : null;
}
