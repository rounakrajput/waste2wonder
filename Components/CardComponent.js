import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/modal";

const CardComponent = () => {
  const [cards, setCards] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getCard");
        if (!response.ok) {
          throw new Error("Failed to fetch card");
        }
        const data = await response.json();
        // console.log(data)
        setCards(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (error) {
        console.error("Error fetching card:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {cards.map((card, index) => {
        return (
          <div
            key={index}
            className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
          >
            <div className="relative h-72 mx-4 -mt-6 overflow-hidden text-white rounded-xl bg-blue-gray-500 ">
              <Image
                src={`data:image/png;base64,${card.base64Image}`}
                alt={card.filename}
                // width={240}
                // height={240}
                layout="fill" // Set layout to "fill" to maintain aspect ratio
                objectFit="cover" // Ensure the image covers the container
                className="align-middle border-none mx-auto max-w-full h-auto rounded-md"
              />
            </div>
            <div className="p-6">
              {/* <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                UI/UX Review Check
              </h5> */}
              <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                {card.description}
              </p>
            </div>
            <div className="p-6 pt-0">
              <button
                className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                type="button"
              >
                {card.location}
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CardComponent;
