import React, { useEffect, useState } from "react";
import NavBar from "../assets/NavBar.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import webSecurity from '/home.png'
import axios from "axios";
import ProgressItem from "../assets/chart/ProgressItem.jsx";
import CustomButton from "../assets/CustomButton.jsx";
import UploadButton from "../assets/UploadButton.jsx";
import AboutUsCard from "../assets/AboutUsCard.jsx";
import Footer from "../assets/Footer.jsx";
import NotificationPopup from "../assets/NotificationPopup.jsx";
import { KeyFeatures, HowItWorks } from "../database/Mockdata.jsx";
import purplepattern from "../assets/Purpleneon.jpg";
import { getApiURL } from "../libs/apiRoute.js";

const allowedFormats = [
  "application/x-python",
  "text/x-python",
  "application/javascript",
  "text/javascript",
  "application/java",
  "application/x-csharp",
  "text/x-c",
  "text/typescript",
  "application/x-php",
  "text/ruby",
  "application/kotlin",
  "application/zip",
  "application/x-zip-compressed",
];

const Desktop = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (uploadedFiles.length > 0) {
        const currentFile = uploadedFiles[uploadedFiles.length - 1];
        const mimeType = currentFile.file.type;

        if (allowedFormats.includes(mimeType)) {
            try {
                const formData = new FormData();
                formData.append("file", currentFile.file);
                // Get userId from localStorage and append it
                const userId = localStorage.getItem("userId");
                
                if (!userId) {
                    alert("User not authenticated! Please log in again!");
                    return;
                }
                formData.append(
                    "data",
                    JSON.stringify({ title: currentFile.file.name, userId })
                );
                console.log("Uploading file:", currentFile.file.name);
                console.log("formData:", formData);
                console.log("userId:", userId);
              
                // Send the file to the server
                const response = await axios.post(
                    getApiURL() + "/upload",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                        onUploadProgress: (progressEvent) => {
                            const progress = Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            );
                            setUploadedFiles((prevFiles) =>
                                prevFiles.map((file) =>
                                    file.file === currentFile.file
                                        ? { ...file, progress }
                                        : file
                                )
                            );
                        },
                    }
                );

                const data = response.data;
                if (response.status == 200) {
                    console.log("File uploaded successfully", data);
                    const fileId = data.fileId;
                    navigate("/va/" + fileId);
                } else {
                    alert("Failed to upload the file. Please try again.");
                }
            } catch (error) {
                console.error("Error uploading the file:", error);
                alert("An error occurred while uploading the file.");
            }
        } else {
            alert("Invalid file format. Please upload a valid file.");
        }
    } else {
        alert("Please select a file to upload.");
    }
};

  const handleFileChange = (files) => {
    const newFiles = Array.from(files);
    let hasDuplicate = false;

    newFiles.forEach((file) => {
      const isDuplicate = uploadedFiles.some(
        (uploadedFile) => uploadedFile.file.name === file.name
      );

      if (isDuplicate) {
        hasDuplicate = true;
      } else {
        // Add file to the list with initial progress
        const newFile = { file, progress: 0 };
        setUploadedFiles((prevFiles) => [...prevFiles, newFile]);

        // Simulate upload progress
        simulateUploadProgress(newFile);
      }
    });

    if (hasDuplicate) {
      setShowNotification(true); // Show the notification
    }
  };

  const simulateUploadProgress = (fileData) => {
    const interval = setInterval(() => {
      setUploadedFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.file === fileData.file && file.progress < 100
            ? { ...file, progress: file.progress + 10 }
            : file
        )
      );
    }, 300); // Increment every 300ms

    // Clear interval when upload is complete
    setTimeout(() => {
      clearInterval(interval);
    }, 3000); // Simulate a 3-second upload
  };

  const handleFileRemove = (fileToRemove) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.file !== fileToRemove.file)
    );
  };

  //Notification
  const handleCloseNotification = () => {
    setShowNotification(false);
  };
  // Navbar color
  const [bgColor, setBgColor] = useState("bg-white"); // Default navbar background

  useEffect(() => {
    // List of sections
    const sections = document.querySelectorAll(".scroll-section");

    // Callback for IntersectionObserver
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Fetch color from the section, fallback to default if not specified
          const color =
            entry.target.getAttribute("data-bg-color") || "bg-white";
          setBgColor(color);
        }
      });
    };

    // Observer options
    const observerOptions = {
      root: null, // Use the viewport
      threshold: 0.7, // 60% of the section is in view
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe each section
    sections.forEach((section) => observer.observe(section));

    // Cleanup
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
  return (
    <div className="h-screen w-screen overflow-x-hidden bg-white grid grid-rows-layout ">
      <NavBar className="fixed top-0 w-full" bgColor={bgColor} />

      {/*landing page */}
      <div
        className="row-start-1 row-end-2 h-screen scroll-section max-w-full py-10 items-center justify-center"
        data-bg-color="bg-Fuchsia_pink_1"
      >
        <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-Fuchsia_pink_1 to-white">
          {/* Content Wrapper */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8   flex flex-col md:flex-row items-center justify-between sm:gap-16 md:gap-20 lg:gap-56">
            {/* Text Content */}
            <div className="text-black_text_7 text-center md:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Secure Your Website,
                <br />
                Empower Your Future.
              </h1>
              <p className="my-4 max-w-md sm:max-w-lg md:max-w-xl text-base sm:text-lg md:text-xl mx-auto md:mx-0">
                Identify vulnerabilities in your website with{" "}
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#A3346B] to-[#632C61]">
                  Penetr8!
                </span>{" "}
                Protect your site, secure users, and stay ahead of threats with
                powerful tools.
              </p>

              <a href="#Vuln">
                <div className="relative inline-flex items-center cursor-pointer text-xl text-Black_text_5 font-semibold before:bg-dark_purple_5 before:absolute before:-bottom-1 before:block before:h-[2px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100">
                  <span>Initiate Scan</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-narrow-right pl-1"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                    <path d="M15 16l4 -4" />
                    <path d="M15 8l4 4" />
                  </svg>
                </div>
              </a>
            </div>
            {/* Image */}
            <div className="flex items-center justify-center">
              <img
                src={webSecurity}
                alt="Image"
                className="h-40 w-40 sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-96 lg:w-96 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      {/* About Us */}
      <div className="row-start-2 row-end-3 min-h-auto scroll-section bg-white py-16 bg-cover bg-center">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          <div className="max-w-3xl mx-auto bg-gray-50 bg-opacity-90 shadow-xl rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              <span className="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-[#A3346B] to-[#632C61]">
                Penetr8!
              </span>{" "}
              is a platform for web developers and cybersecurity enthusiasts to
              detect and fix website vulnerabilities. Our mission is to create a
              safer digital world.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works*/}
      <div
        className="row-start-3 row-end-4 min-h-auto scroll-section bg-gradient-to-t from-blue_0 to-white"
        data-bg-color="bg-blue_0"
      >
        <div className="pt-16 md:pt-24 lg:pt-20 w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
            How It Works
          </h1>
          <h2 className="text-base text-center py-2 sm:text-xl">
            Secure code, safer web—empowering cybersecurity for all.
          </h2>
          <div className="mt-6 px-4 sm:px-6 md:px-8 lg:px-16">
            <div className="flex flex-wrap gap-6 justify-center w-full max-w-7xl mx-auto pb-24">
              {KeyFeatures().map((card, index) => (
                <AboutUsCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Key Features */}
      <div
        className="row-start-4 row-end-5 min-h-auto py-32 scroll-section bg-gradient-to-b from-blue_0 via-Fuchsia_pink_5 to-white"
        data-bg-color="bg-blue_0"
      >
        <div className="pt-16 md:pt-24 lg:pt-20 w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-grey_2 ">
            Key Features
          </h1>
          <h2 className="text-base text-center py-2 sm:text-xl text-grey_2">
            Secure code, safer web—empowering cybersecurity for all.
          </h2>
          <div className="mt-6 px-4 sm:px-6 md:px-8 lg:px-16">
            <div className="flex flex-wrap gap-6 justify-center w-full max-w-7xl mx-auto pb-24">
              {HowItWorks().map((card, index) => (
                <AboutUsCard
                  key={index}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vulnerability Assessment */}
      <section
        id="Vuln"
        className="grid grid-cols-12 gap-4 scroll-section row-start-6 row-end-7 mx-8  my-24"
      >
        <img
          className="col-span-2 w-full h-full object-cover"
          src={purplepattern}
          alt="Decorative Pattern"
        />

        <div className="col-span-8 py-16 md:py-24 lg:py-20">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">
            Vulnerability Assessment
          </h1>

          <h2 className="text-base text-center py-2 sm:text-xl max-w-3xl mx-auto">
            Identify the cracks before they become breaches—Vulnerability
            Assessment is the first line of defense.
          </h2>

          <div className="mt-10 px-4 sm:px-8 md:px-12 lg:px-16">
            <form className="w-full max-w-3xl mx-auto" onSubmit={handleSubmit}>
              {/* <label htmlFor="url" className="mb-4 text-sm">
                Enter the URL of the public GitHub repository:
              </label> */}

              {/* <input
                type="text"
                id="url"
                className="border border-gray-300 py-2 px-2 w-full rounded-lg shadow-md mt-1 text-sm sm:text-base md:text-lg"
              /> */}
              <div className="flex items-center justify-center my-6 bg-white">
                <div className="w-3/12 h-0.5 bg-Black_test_3"></div>
                {/* <p className="text-gray-500 font-semibold px-2 text-sm md:text-base">
                  or
                </p> */}
                <div className="w-3/12 h-0.5 bg-Black_test_3 ml-2"></div>
              </div>

              <NotificationPopup
                message="Duplicate File"
                description="This file has already been uploaded."
                show={showNotification}
                onClose={handleCloseNotification}
              />

              <UploadButton setSelectedFiles={handleFileChange} />
              {uploadedFiles.map((fileData, index) => (
                <ProgressItem
                  key={index}
                  fileName={fileData.file.name}
                  fileSize={`Size: ${(fileData.file.size / 1024).toFixed(
                    2
                  )} KB`}
                  progress={fileData.progress}
                  onRemove={() => handleFileRemove(fileData)}
                />
              ))}

              <CustomButton
                text="Submit"
                className="mt-6"
                onClick={() => setUploadedFiles((files) => [...files])}
              />
            </form>
          </div>
        </div>
        <div className="col-span-2 bg-blue_4 my-2 "></div>
      </section>

      <div className="row-start-7 row-end-8">
        <Footer />
      </div>
    </div>
  );
};

export default Desktop;
