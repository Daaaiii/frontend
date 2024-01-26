'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Client {
	id: number;
	name: string;
	email: string;
	telephone: string;
	coord_x: number;
	coord_y: number;
}

export default function Client() {
	const [clients, setClients] = useState<Client[]>([]);
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const fetchClients = async () => {
			try {
				const apiUrl = 'http://localhost:3001/client';

				const authToken = localStorage.getItem('token');
				const headers = {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				};

				const response = await axios.get(apiUrl, headers);
				if (response.data.length === 0) {
					setIsErrorModalOpen(true);
					setErrorMessage('Não há nenhum pagável cadastrado.');
				}

				setClients(response.data);
			} catch (error) {
				setIsErrorModalOpen(true);
				setErrorMessage(
					'Erro ao processar a solicitação. Tente novamente mais tarde.'
				);
			}
		};

		fetchClients();
	}, []);

	return (
		<div className='relative  flex flex-col h-screen w-full items-start justify-start p-4 m-4 rounded-md bg-base'>
			<h1 className='w-full flex items-start justify-center text-blue-500 text-2xl font-bold p-4 mb-2'>
				Clientes
			</h1>
			<div className='w-full overflow-x-auto'>
				<table className='table-auto w-full '>
					<thead>
						<tr className='justify-evenly text-gray-500 pb-4 pt-4 text-center align-middle'>
							<th className='pb-2'>ID</th>
							<th className='pb-2'>Nome</th>
							<th className='pb-2'>Telefone</th>
							<th className='pb-2'>Coord X</th>
							<th className='pb-2'>Coord Y</th>
							<th className='pb-2'>Editar</th>
							<th className='pb-2'>Excluir</th>
						</tr>
					</thead>
					<tbody>
						{clients.map((client) => (
							<tr
								key={client.id}
								className='items-center text-gray-500 pb-4 pt-4 text-center align-middle'>
								<td className='pb-2'>{client.id}</td>
								<td className='pb-2'>{client.name}</td>
								<td className='pb-2'>{client.telephone}</td>
								<td className='pb-2'>{client.coord_x}</td>
								<td className='pb-2'>{client.coord_y}</td>
								<td className='pb-2'>
									<button>
										<Image
											alt='icon'
											src='/pen-to-square-solid.svg'
											width={20}
											height={20}
										/>
									</button>
								</td>
								<td className='pb-2'>
									<button>
										<Image
											alt='icon'
											src='/trash-can-solid.svg'
											width={20}
											height={20}
										/>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{isErrorModalOpen && (
				<div className='error-modal fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50'>
					<div className='flex flex-col bg-white font-bold p-8 rounded-md items-end '>
						<p className='text-gray-600 mb-4 font-bold text-2xl'>
							{errorMessage}
						</p>
						<button
							className='w-1/6 bg-gray-300 rounded-md px-3 py-2 mt-6'
							onClick={() => setIsErrorModalOpen(false)}>
							Fechar
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
