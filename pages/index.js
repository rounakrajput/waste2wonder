import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Head from "next/head";
import styles from "@/styles/Index.module.css";
import CardComponent from "../Components/CardComponent";
import { useSession } from "next-auth/react";

const Index = () => {
  const { data: session } = useSession();

  const slides = [
    "https://images.fastcompany.com/image/upload/f_auto,q_auto,c_fit/fc/3062853-poster-p-1-these-maps-show-how-many-landfills-cover-the-us.jpg",
    "/images/landfill1.jpg",
    "/images/landfill2.jpg",
    "/images/landfill3.jpg",
  ];
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300&family=Ubuntu+Sans+Mono:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="main flex flex-col justify-between">
        <div className="frame">
          <img
            src="/images/frame.png"
            alt=""
            style={{ maxWidth: "100%", height: "auto", overflow: "hidden" }}
          />
        </div>
        <p className="mx-auto max-w-xl text-xl text-gray-600">
            Let's write the story of India with the ink of sustainability, where
            each chapter celebrates the triumphs of a green and clean nation,
            preserving our heritage for generations to come.
          </p>
      </main>

      <Carousel
        autoPlay
        showStatus={false}
        showThumbs={false}
        className=" w-[80%] mx-auto"
        // className="mx-36"
      >
        <div>
          <img src={slides[0]} className="h-96" />
        </div>
        <div>
          <img src={slides[1]} className="h-96" />
        </div>
        <div>
          <img src={slides[2]} className="h-96" />
        </div>
        <div>
          <img src={slides[3]} className="h-96" />
        </div>
      </Carousel>

      <section className="event-section flex flex-col md:flex-row my-10 justify-between items-center gap-1 bg-slate-200 rounded-lg h-64 w-[80%] mx-auto overflow-auto ">
        <img
          src="/images/captionImg.jpg"
          alt="Event Image"
          className="event-image h-48 ml-8"
        />
        <div className={styles.event_text}>
          <p className="font-semibold text-m mx-4 text-justify">
          The total quantity of Solid waste generated in the country is 160038.9 TPD .The planet loses 24 billion tonnes of topsoil each year because of land pollution. Cities all over the country produce tons of waste that often goes to landfills, further polluting the environment. According to a CNN news report, India is home to over 3,100 landfills scattered throughout the country.Every year India is filling the land with waste and pollutatnts covering 1580 acre of land.</p>
        </div>
      </section>

        <h5 className="mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 w-screen flex justify-center items-center">
                PLACES
              </h5>
      <section className="container flex flex-row justify-center items-center my-10 gap-6">
        {/* Cards will be dynamically added here */}
          <CardComponent />
      </section>
    </>
  );
};

export default Index;
