import React, { useEffect, useState } from 'react';

const CardComponent = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/api/getCard');
          if (!response.ok) {
            throw new Error('Failed to fetch card');
          }
          const data = await response.json();
          // console.log(data)
          setCards(Array.isArray(data) ? data : []); // Ensure data is an array
        } catch (error) {
          console.error('Error fetching card:', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div className="container mx-auto">
      {/* <h1 className="text-3xl font-bold my-8">Card Details</h1> */}
      <div className="grid grid-cols-3 gap-8">
        {/* Loop through card details and generate cards */}
        {/* Assuming card details are available as 'cards' array */}
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            {/* Assuming 'base64Image' is the base64 representation of the image */}
            {/* You might need to adjust the image display accordingly if it's not base64 */}
            <img src={`data:image/png;base64,${card.base64Image}`} alt={card.filename} className="w-full h-32 object-cover mb-4" />
            <h2 className="text-xl font-semibold mb-2">{card.description}</h2>
            <p className="text-gray-700">{card.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponent;
