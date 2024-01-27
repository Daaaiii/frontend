'use client'

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CadastroModal from "../Cadastro/userForm";


export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
	return (
		<nav className="fixed z-50 flex flex-row justify-between py-6 px-12 w-full top-[20px] shadow-gray-400 shadow-md selection:text-blue-80 ">
            <div>
                <Link href={''} target="_blank">
                <Image alt="Logo" src='/logo-devclean.png' width={70} height={70}/>
                </Link>
            </div>
            <div className=" flex align-center justify-center rounded border-solid border-2 border-blue-600 bg-base-green">
                <button className="px-9 py-3 text-2xl text-blue-600 font-bold rounded-md" onClick={openModal}>Cadastre-se</button>
            </div>				
			{isModalOpen && <CadastroModal closeModal={closeModal} />}
		</nav>
	);
}