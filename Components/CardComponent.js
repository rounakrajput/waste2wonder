import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import Image from "next/image";
import { Button } from "@nextui-org/react";

const CardComponent = () => {
  const [cards, setCards] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Rename onOpenChange to onClose
  const [activeSrc, setActiveSrc] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getCard");
        if (!response.ok) {
          throw new Error("Failed to fetch card");
        }
        const data = await response.json();
        setCards(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = () => {
    onOpen(); // Open the modal
  };

  return (
    <>
      {cards.map((card, index) => (
        <div
          key={index}
          className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
        >
          <div className="relative h-72 mx-4 -mt-6 overflow-hidden text-white rounded-xl bg-blue-gray-500">
            <Image
              src={`data:image/png;base64,${card.base64Image}`}
              alt={card.filename}
              layout="fill"
              objectFit="cover"
              className="align-middle border-none mx-auto max-w-full h-auto rounded-md overflow-auto m-12 hover:scale-105 transition ease-in-out duration-500"
            />
          </div>
          <div className="p-6 flex flex-col justify-between">
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit text-left">
              {card.description}
            </p>
            <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit text-left">
              {card.location}
            </p>
          </div>
          <div className="p-6 pt-0">
            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              onClick={()=>{
                setActiveSrc(`data:image/png;base64,${card.base64Image}`)
                handleOpenModal()
              }} // Open modal when this button is clicked
            >
              full image
            </button>
          </div>
          <Modal isOpen={isOpen} onClose={onClose}>
            {" "}
            {/* Controlled by isOpen and onClose */}
            <ModalContent>
              <ModalBody
              className="min-w-screen"
              >
                <Image
                src={activeSrc}
                fill="layout"
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      ))}
    </>
  );
};

export default CardComponent;
