"use client"
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Image from "next/image";
import {useRouter} from "next/navigation";
import isTokenExpired from "../../service/authService/AuthServive";

const Login = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		formState: {errors},
	} = useForm();
	const password = watch("password", "");

	useEffect(() => {}, [password]);

	const validatePassword = (value: string) => {
		let hasUpperCase = /[A-Z]/.test(value);
		let hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
		let hasNumber = /\d/.test(value);

		return value.length >= 8 && hasUpperCase && hasSymbol && hasNumber;
	};
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

	const openSuccessModal = () => {
		setIsSuccessModalOpen(true);
	};

	const closeSuccessModal = () => {
		setIsSuccessModalOpen(false);
	};
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const openErrorModal = (message: string) => {
		setErrorMessage(message);
		setIsErrorModalOpen(true);
	};

	const closeErrorModal = () => {
		setIsErrorModalOpen(false);
		setErrorMessage("");
	};

	const onSubmit = async (data: unknown) => {
		

		try {
			const apiUrl = "http://localhost:3001/login";

			const response = await axios.post(apiUrl, data);
			console.log(response)

			const token = response.data.token;
			console.log(token)

			localStorage.setItem("token", token);

			openSuccessModal();
			setTimeout(() => {
				closeSuccessModal();
				router.push("/clients");
			}, 1000);
		} catch (error: any) {
			if (error.response) {
				if (error.response.data.statusCode === 401) {
					openErrorModal(`${error.response.data.message}`);
				} else {
					openErrorModal(
						"Erro ao processar a solicitação. Tente novamente mais tarde."
					);
				}
				setTimeout(() => {
					closeErrorModal();
				}, 1000);
			}
		}
	};
	

	useEffect(() => {
		if (isTokenExpired()) {
			router.push("/");
		}
	}, [router]);

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center space-x-7 bg-background-2 bg-no-repeat bg-cover" >

			<div className="w-3/12 ml-4">
				<h1 className="font-bold  text-5xl text-blue-800 mb-5">
					Bem-vindo ao Dev CleanUp!
				</h1>
				<p className=" text-blue-800 text-xl">
					Por meio da plataforma exclusiva do Facilita Dev, qualquer pessoa pode gerenciar seus clientes.
				</p>
			</div>
			<div className="p-8 rounded-md border-4 border-blue-600 size-80">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
					<label className="font-bold text-blue-600 text-lg ">Email</label>
					<input
						type="text"
						placeholder="Digite seu Email"
						{...register("email", {
							required: true,
						})}
						className="outline-blue-600 p-1 border-2 border-blue-600 rounded-md bg-amber-50"
					/>
					{errors?.login?.type === "required" && (
						<p className="error-message text-red-600 font-bold  text-sm">
							Login é obrigatório.
						</p>
					)}
					<label className="font-bold text-blue-600 text-lg ">Senha</label>
					<input
						type="password"
						placeholder="Digite sua Senha"
						{...register("password", {
							required: true,
							minLength: 8,
							validate: validatePassword,
						})}
						className="outline-blue-500 p-1 border-2 border-blue-600 rounded-md bg-amber-50"
					/>
					{errors.password?.type === "required" && (
						<p className="error-message text-red-600 font-bold text-sm">
							Senha obrigatória.
						</p>
					)}

					{errors.password?.type === "minLength" && (
						<p className="error-message text-red-600 font-bold text-sm">
							Senha deve ter no mínimo 8 caracteres.
						</p>
					)}
					{errors.password?.type === "validate" && (
						<p className="error-message text-red-600 font-bold text-sm">
							Senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1
							símbolo e 1 número.
						</p>
					)}
					<button
						className="bg-base-green px-4 py-2 rounded-md font-bold text-blue-600  border-2 border-blue-600 bg-amber-50 hover:bg-blue-600 hover:text-amber-50"
						onClick={() => handleSubmit(onSubmit)()}
					>
						Entrar
					</button>
				</form>
				{isSuccessModalOpen && (
					<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-blue-600 bg-opacity-50">
						<div className="bg-white p-8 rounded-md">
							<p className="text-base-green text-lg font-semibold">
								Dados enviados com sucesso!
							</p>
						</div>
					</div>
				)}

				{isErrorModalOpen && (
					<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
						<div className="bg-white p-8 rounded-md">
							<p className="text-red-500 text-lg font-semibold">
								{errorMessage}
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Login;

