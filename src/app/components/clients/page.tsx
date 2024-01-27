'use client';
import axios from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import ClientUpdateForm from '../Cadastro/clientForm';

export interface Client {
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
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [editingClientId, setEditingClientId] = useState<Client | null>(null);
	const [sortField, setSortField] = useState<keyof Client | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [filter, setFilter] = useState('');
	const [filteredClients, setFilteredClients] = useState<Client[]>([]);

	const editClient = async (client: Client) => {
		setEditingClientId(client);
		setIsEditModalOpen(true);
	};
	const deleteClient = async (clientId: number) => {
		try {
			const apiUrl = `http://localhost:3001/client/${clientId}`;
			const authToken = localStorage.getItem('token');
			const headers = {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			};

			const response = await axios.delete(apiUrl, headers);

			if (response.status === 200) {
				fetchClients();
			}
		} catch (error) {
			setIsErrorModalOpen(true);
			setErrorMessage(
				'Erro ao processar a solicitação. Tente novamente mais tarde.'
			);
		}
	};

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
				setErrorMessage('Não há nenhum cliente cadastrado.');
			}

			setClients(response.data);
			setFilteredClients(response.data);
		} catch (error) {
			setIsErrorModalOpen(true);
			setErrorMessage(
				'Erro ao processar a solicitação. Tente novamente mais tarde.'
			);
		}
	};
	useEffect(() => {
		fetchClients();
	}, []);

	const createNewClient = () => {
		setEditingClientId(null);
		setIsEditModalOpen(true);
	}

	const onSortChange = (field: keyof Client) => {
		if (sortField === field) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortField(field);
			setSortDirection('asc');
		}

		setClients(sortClients(clients, field, sortDirection));
	};

	const sortClients = (
		clients: Client[],
		field: keyof Client,
		direction: 'asc' | 'desc'
	) => {
		return [...clients].sort((a, b) => {
			if (a[field] < b[field]) {
				return direction === 'asc' ? -1 : 1;
			}
			if (a[field] > b[field]) {
				return direction === 'asc' ? 1 : -1;
			}
			return 0;
		});
	};
	const applyFilter = () => {
		const filtered = clients.filter(
			(client) =>
				client.name.toLowerCase().includes(filter.toLowerCase()) ||
				client.id.toString().includes(filter)
		);
		setFilteredClients(filtered);
	};

	const handleFilterChange = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setFilter(event.target.value);
	};

	return (
		<div className='relative  flex flex-col h-screen w-full items-start justify-start p-4 m-4 rounded-md bg-base'>
			<h1 className='w-full flex items-start justify-center text-blue-500 text-2xl font-bold p-4 mb-2'>
				Clientes
			</h1>
			<div className='mb-4 flex justify-between items-center gap-6'>
				<div className=''>
					<button
						onClick={createNewClient}
						className='ml-2 bg-blue-500 text-white p-2 rounded-md'>
						Cadastrar Cliente
					</button>
				</div>
				<div className=''>
					<input
						type='text'
						placeholder='Filtrar por nome ou ID...'
						value={filter}
						onChange={handleFilterChange}
						className='p-2 border-2 border-gray-300 rounded-md'
					/>
					<button
						onClick={applyFilter}
						className='ml-2 bg-blue-500 text-white p-2 rounded-md'>
						Filtrar
					</button>
				</div>
			</div>

			<div className='w-full overflow-x-auto'>
				<table className='table-auto w-full'>
					<thead>
						<tr className='justify-evenly text-gray-500 pb-4 pt-4 text-center align-middle'>
							<th
								className='pb-2 pl-2'
								onClick={() => onSortChange('id')}>
								<div className='flex justify-between items-center'>
									<p>ID</p>
									<Image
										alt='icon'
										src={'/sort-solid.svg'}
										width={10}
										height={10}
									/>
								</div>
							</th>
							<th
								className='pb-2 pl-2'
								onClick={() => onSortChange('name')}>
								<div className='flex justify-between items-center'>
									<p>Nome</p>
									<Image
										alt='icon'
										src={'/sort-solid.svg'}
										width={10}
										height={10}
									/>
								</div>
							</th>
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
									<button onClick={() => editClient(client)}>
										<Image
											alt='icon'
											src='/pen-to-square-solid.svg'
											width={20}
											height={20}
										/>
									</button>
								</td>
								<td className='pb-2'>
									<button
										onClick={() => deleteClient(client.id)}>
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
			{isEditModalOpen && (
				<ClientUpdateForm
					client={editingClientId}
					isEditing={editingClientId !== null}
					closeModal={() => {
						setIsEditModalOpen(false);
						setEditingClientId(null);
					}}
					onClientUpdated={fetchClients}
				/>
			)}
		</div>
	);
}
