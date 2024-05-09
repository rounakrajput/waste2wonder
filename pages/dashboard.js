import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [description, setDescription] = useState("");
  const [coordinate, setCoordinate] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [router.pathname]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setCoordinate(null);
    }
  };

  const showPosition = (position) => {
    setCoordinate(
      `Latitude: ${position.coords.latitude} \n Longitude: ${position.coords.longitude}`
    );
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);

    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => {
      // Set the preview image src
      document.getElementById("imagePreview").src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const convertToBase64 = async (file, callback) => {
    if (file) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var base64String = e.target.result.split("base64,")[1];
        callback(base64String);
      };

      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("location", coordinate);

      // Convert uploaded image to base64
      if (imgFile) {
        await convertToBase64(imgFile, async (base64String) => {
          setImgFile(base64String);
          formData.append("img_background", base64String);

          console.log("Uploading data");
          setDisableSubmit(true);
          const data = {};
          for (const [key, value] of formData.entries()) {
            data[key] = value;
          }
          console.log(data);
          // Requesting backend
          const response = await axios.post(`/api/upload`, data, {
            headers: {
              "Content-Type": `application/json`,
            },
          });

          toast.success(response?.data.message);
          setImgFile(null);
          // Optionally close the modal after successful submission
          toggleModal();
        });
      } else {
        console.log("No image file uploaded");
      }
    } catch (error) {
      setDisableSubmit(false);
      toast.error(error.response?.data.message || "Error uploading file");
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    getLocation();
    setCoordinate;
  }, []);

  return (
    <div className="relative overflow-hidden bg-white">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
      />
      {/* Decorative background image and gradient */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 mx-auto overflow-hidden xl:px-8">
          <Image
            src="/images/background.png"
            alt=""
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-white bg-opacity-75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white"></div>
      </div>

      {/* Callout */}
      <section className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Waste2Wonder
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
            Let's write the story of India with the ink of sustainability, where
            each chapter celebrates the triumphs of a green and clean nation,
            preserving our heritage for generations to come.
          </p>
          <button
            onClick={toggleModal}
            className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-cyan-800 sm:w-auto"
          >
            Upload Details
          </button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Provide Image Details
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                <form
                  className="space-y-4"
                  onSubmit={(e) => handleSubmit(e)}
                  encType="multipart/form-data"
                >
                  <div>
                    <label
                      htmlFor="img"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-950"
                    >
                      Your Image
                    </label>
                    <input
                      type="file"
                      name="img_background"
                      id="img"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-400 dark:border-gray-500 dark:text-white"
                      required
                    />
                    <br />
                    {/* Preview image */}
                    {imgFile && (
                      <img
                        id="imagePreview"
                        alt="Preview"
                        style={{ maxWidth: "100%", maxHeight: "200px" }}
                      />
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-950"
                    >
                      Description
                    </label>
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-400 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-950"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={
                        coordinate ||
                        "Geolocation is not supported by this browser."
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-slate-400 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                      readOnly
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={disableSubmit}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            What are people saying?
          </h2>

          <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            <blockquote className="sm:flex lg:block">
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                aria-hidden="true"
                className="flex-shrink-0 text-gray-300"
              >
                <path
                  d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                  fill="currentColor"
                />
              </svg>
              <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                <p className="text-lg text-gray-600">
                  "I'm amazed by the transformative power of waste2wonder!
                  Seeing the before-and-after images truly highlights the impact
                  we can make on our environment. Count me in for future cleanup
                  events!"
                </p>
                <cite className="mt-4 block font-semibold not-italic text-gray-900">
                  Shehab , England
                </cite>
              </div>
            </blockquote>
            <blockquote className="sm:flex lg:block">
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                aria-hidden="true"
                className="flex-shrink-0 text-gray-300"
              >
                <path
                  d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                  fill="currentColor"
                />
              </svg>
              <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                <p className="text-lg text-gray-600">
                  "waste2wonder is a game-changer in environmental activism. The
                  platform makes it easy for anyone to get involved in restoring
                  our planet. I've already shared it with all my friends and
                  family!"
                </p>
                <cite className="mt-4 block font-semibold not-italic text-gray-900">
                  Najib, Malaysia
                </cite>
              </div>
            </blockquote>
            <blockquote className="sm:flex lg:block">
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                aria-hidden="true"
                className="flex-shrink-0 text-gray-300"
              >
                <path
                  d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                  fill="currentColor"
                />
              </svg>
              <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                <p className="text-lg text-gray-600">
                  "The concept behind waste2wonder is inspiring, and the
                  execution is flawless. I love how the platform brings people
                  together for a common cause. Keep up the amazing work!"
                </p>
                <cite className="mt-4 block font-semibold not-italic text-gray-900">
                  Yousef, New York
                </cite>
              </div>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
