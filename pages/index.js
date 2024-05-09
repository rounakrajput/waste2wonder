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
    "/images/planting1.jpg",
    "/images/planting2.jpg",
    "/images/planting3.jpg",
    "/images/planting4.jpg",
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

      <section className="event-section flex flex-col md:flex-row my-10 justify-between items-center gap-1 bg-purple-400 rounded-lg h-64 w-[80%] mx-auto overflow-auto ">
        <img
          src="https://source.unsplash.com/400x300/?event"
          alt="Event Image"
          className="event-image h-48 ml-8"
        />
        <div className={styles.event_text}>
          <p className="font-bold text-xl mx-4 text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget
            nibh nec nisi hendrerit finibus a a turpis. Mauris aliquet vehicula
            massa at sollicitudin. Suspendisse nec nisi auctor, ultricies turpis
            eu, consequat ex. Nullam nec purus id ipsum convallis aliquet.
          </p>
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
