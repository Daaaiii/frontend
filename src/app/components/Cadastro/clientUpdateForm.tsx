'use client'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Client } from '../clients/page';

interface CadastroModalProps {
	closeModal: () => void;    
	client: Client;
	onClientUpdated?: () => void;
}

const ClientUpdateForm: React.FC<CadastroModalProps> = ({ closeModal, client, onClientUpdated}) => {
	const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: client.name,
            email: client.email,
            telephone: client.telephone,
            coord_x: client.coord_x,
            coord_y: client.coord_y,
        }
    });
		
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

	const openSuccessModal = () => {
		setIsSuccessModalOpen(true);
	};

	const closeSuccessModal = () => {
		setIsSuccessModalOpen(false);
	};
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const openErrorModal = (message: string) => {
		setErrorMessage(message);
		setIsErrorModalOpen(true);
	};

	const closeErrorModal = () => {
		setIsErrorModalOpen(false);
		setErrorMessage('');
	};

	const onSubmit = async (data: unknown) => {

			try {
			const apiUrl = `http://localhost:3001/client/${client.id}`;

			const authToken = localStorage.getItem('token');
				const headers = {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				};

				const response = await axios.put(apiUrl, data, headers);
			if (response.status === 201 || response.status === 200) {
				openSuccessModal();
				setTimeout(() => {
					closeSuccessModal();
					closeModal();
					if (onClientUpdated) {
                        onClientUpdated();
                    }
				}, 1000);
				
			} else {
				openErrorModal(
					`Erro ao processar a solicitação: Status ${response.status}. Tente novamente mais tarde.`
				);
				setTimeout(() => {
					closeErrorModal();
				}, 2000);
			}
			
			return;
		} catch (error: any) {
			console.error(error.message);
			let errorMessage =
				error.response?.data?.mensagem ||
				'Erro ao processar a solicitação. Tente novamente mais tarde.';
			openErrorModal(errorMessage);
			setTimeout(() => {
				closeErrorModal();
				
			}, 3000);
		}
		
	};

	return (
		<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white p-8 rounded-md'>
				<div className='flex justify-between items-center mb-3'>
					<h2 className='text-2xl font-bold text-blue-500'>
						Editar Client
					</h2>
					<button
						className='text-white bg-blue-500 px-3 py-1 rounded-md'
						onClick={closeModal}>
						X
					</button>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-3'>
					<label className='font-bold text-gray-700 text-lg '>
						Nome
					</label>
					<input
						type='text'
						{...register('name', {
							required: true,
						})}
						className='outline-blue-500 p-1'
					/>
					{errors?.name?.type === 'required' && (
						<p className='error-message text-red-600 text-sm'>
							Nome é obrigatório.
						</p>
					)}

					<label className='font-bold text-gray-700 text-lg '>
						Email
					</label>
					<input
						type='text'
						{...register('email', {
							required: true,
						})}
						className='outline-blue-500 p-1'
					/>
					{errors?.email?.type === 'required' && (
						<p className='error-message text-red-600 text-sm'>
							email é obrigatório.
						</p>
					)}									
					<label className='font-bold text-gray-700 text-lg '>
						Telefone
					</label>
					<input
						type='text'
						{...register('telephone', {
							required: true,
						})}
						className='outline-blue-500 p-1'
					/>
					{errors.telephone?.type === 'required' && (
						<p className='error-message text-red-600 text-sm'>
							Senha obrigatória.
						</p>
					)}					
					<label className='font-bold text-gray-700 text-lg '>
						Coordenadas X
					</label>
					<input
						type='text'
						{...register('coord_x', {
							required: true,
						})}
						className='outline-blue-500 p-1'
					/>
					{errors.coord_x?.type === 'required' && (
						<p className='error-message text-red-600 text-sm'>
							Informe a Coordenada X.
						</p>
					)}					
					<label className='font-bold text-gray-700 text-lg '>
						Coordenadas Y
					</label>
					<input
						type='text'
						{...register('coord_y', {
							required: true,
						})}
						className='outline-blue-500 p-1'
					/>
					{errors.coord_y?.type === 'required' && (
						<p className='error-message text-red-600 text-sm'>
							Informe a Coordenada Y.
						</p>
					)}					
					
					<button
						className='bg-base-green px-4 py-2 rounded-md font-bold text-blue-600 '
						onClick={() => handleSubmit(onSubmit)()}>
						Enviar
					</button>
				</form>
				{isSuccessModalOpen && (
					<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
						<div className='bg-white p-8 rounded-md'>
							<p className='text-green-500 text-lg font-semibold'>
								Dados enviados com sucesso!
							</p>
						</div>
					</div>
				)}

				{isErrorModalOpen && (
					<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
						<div className='bg-white p-8 rounded-md'>
							<p className='text-red-500 text-lg font-semibold'>
								{errorMessage}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ClientUpdateForm;
