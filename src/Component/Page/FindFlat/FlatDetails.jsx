import { message } from "antd";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useLoaderData } from "react-router-dom";

const FlatDetails = () => {
    const mapRef = useRef(null);

    const [openModal, setOpenModal] = useState(false);

    const [allFlatImages, setAllFlatImages] = useState([]);
    const [openReportModal, setOpenReportModal] = useState(false);
    const [reportMessage, setReportMessage] = useState("");

    const { data: flatData } = useLoaderData();
    console.log(flatData);
    const handleTextareaChange = (e) => {
        setReportMessage(e.target.value);
    };

    useEffect(() => {
        setAllFlatImages(flatData.flatList?.images);
    }, []);

    // add To reportList-----------------------
    const addToReportList = async (flatData) => {
        console.log("this", flatData.flatList);
        try {
            const report = {
                reportMessage: reportMessage,
                flatWishList: flatData,
                roommateWishList: "",
            };
            // console.log("hello", flatData);

            await axios.post(`http://localhost:5000/reportList`, report);
            message.success("Successfully Added reportList!");
            setOpenReportModal(false);
            console.log("Added to wishlist:", report);
        } catch (error) {
            console.error("Error adding to reportList:", error);
        }
    };

    const [center, setCenter] = useState([23.8041, 90.4152]);

    useEffect(() => {
        setCenter([
            parseFloat(
                flatData?.flatList?.description?.location?.lat),
            parseFloat(
                flatData?.flatList?.description?.location?.lon),
        ]);
    }, [flatData]);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setView(center, 13);
        }
    }, [center]);

    const map = (
        <MapContainer
            center={center}
            zoom={30}
            style={{
                height: "250px",
                width: "100%",
            }}
            ref={mapRef}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center}>
                <Popup>
                    {flatData?.flatList?.description?.location?.address}
                </Popup>
            </Marker>
        </MapContainer>
    );
    return (
        <>
            {/* details hero section  */}
            <div className="w-11/12 mx-auto lg:flex mt-3 rounded-lg gap-3">
                <div className="lg:w-[50%] relative ">
                    <img
                        src={`http://localhost:5000/images/${flatData?.flatList?.images[0]}`}
                        alt=""
                        className="lg:h-[500px] md:h-[400px] w-full rounded-l-2xl border border-gray-150"
                    />
                    <div className="absolute left-0  bottom-[5%] w-full flex justify-end  text-center md:hidden ">
                            <div className=" bg-white text-black rounded-lg shadow-lg border-2  mr-3">
                                <div>
                                    <button
                                        onClick={() => setOpenModal(true)}
                                        className="rounded-sm  px-5 py-[6px] text-black"
                                        id="_modal_NavigateUI"
                                    >
                                        Show All Photo
                                    </button>
                                    <div
                                        onClick={() => setOpenModal(false)}
                                        className={`fixed z-[100] flex items-center justify-center ${
                                            openModal
                                                ? "visible opacity-100"
                                                : "invisible opacity-0"
                                        } inset-0  backdrop-blur-sm duration-100 `}
                                    >
                                        <div
                                            onClick={(e_) =>
                                                e_.stopPropagation()
                                            }
                                            className={`text- absolute max-w-xl rounded-sm h-96 lg:w-[700px] overflow-y-auto bg-white p-6 drop-shadow-lg ${
                                                openModal
                                                    ? "scale-1 opacity-1 duration-300"
                                                    : "scale-0 opacity-0 duration-150"
                                            }`}
                                        >
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() =>
                                                        setOpenModal(false)
                                                    }
                                                    className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                                >
                                                    X
                                                </button>
                                            </div>
                                            <h1 className="mb-2 text-2xl font-semibold">
                                                All Flat Images!
                                            </h1>
                                            {allFlatImages.map(
                                                (image, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex-1 gap-2 "
                                                    >
                                                        <img
                                                            src={`http://localhost:5000/images/${image}`}
                                                            alt=""
                                                            className="lg:h-[500px] md:h-[400px] h-56 w-full mb-4 border border-gray-150 rounded-md"
                                                        />
                                                    </div>
                                                )
                                            )}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="lg:w-[50%] grid grid-cols-1 md:grid-cols-2  md:h-[500px] gap-3">
                    <div className="bg-cover overflow-hidden relative ">
                        <img
                            src={`http://localhost:5000/images/${flatData?.flatList?.images[1]}`}
                            alt=""
                            className="w-full h-full border border-gray-150 md:block hidden"
                        />
                    </div>
                    <div className="bg-cover overflow-hidden relative rounded-tr-2xl">
                        <img
                            src={`http://localhost:5000/images/${flatData?.flatList?.images[2]}`}
                            alt=""
                            className="w-full h-full border border-gray-150 md:block hidden"
                        />
                    </div>
                    <div className="bg-cover overflow-hidden relative">
                        <img
                            src={`http://localhost:5000/images/${flatData?.flatList?.images[3]}`}
                            alt=""
                            className="w-full h-full border border-gray-150 md:block hidden"
                        />
                    </div>
                    <div className="bg-cover overflow-hidden relative ">
                        <img
                            src={`http://localhost:5000/images/${flatData?.flatList?.images[4]}`}
                            alt=""
                            className="w-full h-full rounded-br-2xl border border-gray-150 md:block hidden"
                        />
                        <div className="absolute left-0  bottom-[5%] w-full flex justify-end  text-center ">
                            <div className=" bg-white px-3 py-2 text-black rounded-lg shadow-lg border-2  mr-3 md:block hidden">
                                <div>
                                    <button
                                        onClick={() => setOpenModal(true)}
                                        className="rounded-sm  px-5 py-[6px] text-black"
                                        id="_modal_NavigateUI"
                                    >
                                        Show All Photo
                                    </button>
                                    <div
                                        onClick={() => setOpenModal(false)}
                                        className={`fixed z-[100] flex items-center justify-center ${
                                            openModal
                                                ? "visible opacity-100"
                                                : "invisible opacity-0"
                                        } inset-0  backdrop-blur-sm duration-100 `}
                                    >
                                        <div
                                            onClick={(e_) =>
                                                e_.stopPropagation()
                                            }
                                            className={`text- absolute max-w-xl rounded-sm h-96 lg:w-[700px] overflow-y-auto bg-white p-6 drop-shadow-lg ${
                                                openModal
                                                    ? "scale-1 opacity-1 duration-300"
                                                    : "scale-0 opacity-0 duration-150"
                                            }`}
                                        >
                                            <h1 className="mb-2 text-2xl font-semibold">
                                                All Flat Images!
                                            </h1>
                                            {allFlatImages.map(
                                                (image, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex-1 gap-2 "
                                                    >
                                                        <img
                                                            src={`http://localhost:5000/images/${image}`}
                                                            alt=""
                                                            className="h-[500px] w-full mb-4"
                                                        />
                                                    </div>
                                                )
                                            )}
                                            <div className="flex justify-end">
                                                <button
                                                    onClick={() =>
                                                        setOpenModal(false)
                                                    }
                                                    className="rounded-sm border border-red-600 px-6 py-[6px] text-red-600 duration-150 hover:bg-red-600 hover:text-white"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* card details information  */}
            <div>
                {/* details sections starts */}
                <div className="mx-auto lg:mt-16 lg:px-16 ">
                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <div className=" md:px-0 md:w-3/4">
                            <div className=" px-5 md:px-0 md:w-3/4">
                                <div className="mb-16">
                                    <div className="mb-5">
                                        <h2 className="lg:text-xl text-sm md:text-base capitalize  font-medium text-black">
                                            Home Type: {" "}
                                            {
                                                flatData?.flatList?.description
                                                    ?.type
                                            }
                                        </h2>
                                        <p className="text-black   font-medium inline-block lg:text-xl text-sm md:text-base capitalize  mt-1">
                                            Location: {" "}
                                             {
                                                flatData?.flatList?.description
                                                    ?.location?.address
                                            }
                                            ,
                                            {
                                                flatData?.flatList?.description
                                                    ?.location?.city
                                            }
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-3 md:px-6">
                                  <div className="h-auto p-5 lg:w-[416px] md:w-[356px] w-[290px]  md:mt-3 rounded-lg shadow-lg border border-gray-150">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h2 className="lg:text-3xl font-bold md:my-5">
                                            $
                                            {
                                                flatData?.flatList?.description
                                                    ?.rent
                                            }
                                        </h2>
                                        <svg
                                            width={30}
                                            className="hover:fill-red-500 hover:stroke-red-500 stroke-2 fill-transparent stroke-black "
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ cursor: "pointer" }}
                                        >
                                            <g strokeWidth="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <button
                                        className="text-black px-2 py-2 mx-2 w-full border-2 mt-16 border-black rounded-lg bg-green-400  
                                  capitalize items-center flex justify-center gap-5"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="m19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07c.53 8.54 7.36 15.36 15.89 15.89c1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98"
                                            />
                                        </svg>
                                        +88{" "}
                                        {
                                            flatData?.flatList?.contact_person
                                                ?.phone
                                        }
                                    </button>
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={() => setOpenReportModal(true)}
                                    className="rounded-md  px-5 py-[6px]  text-black"
                                >
                                    <div className="md:w-[416px] max-w-[416px] h-fit p-5 underline flex justify-center items-center gap-5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464l-.003.001l-.006.003l-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35c-.816.252-1.879.523-2.71.523c-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007l.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255c-.81.252-1.872.523-2.734.523c-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21 21 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21 21 0 0 0 14 7.655V1.222z"
                                            />
                                        </svg>
                                        report this listing
                                    </div>
                                </button>
                                <div
                                    className={`fixed z-[100] flex items-center justify-center ${
                                        openReportModal
                                            ? "opacity-1 visible"
                                            : "invisible opacity-0"
                                    } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
                                >
                                    <div
                                        className={`absolute max-w-md rounded-lg bg-white p-3 pb-5 text-center drop-shadow-2xl  ${
                                            openReportModal
                                                ? "scale-1 opacity-1 duration-300"
                                                : "scale-0 opacity-0 duration-150"
                                        } `}
                                    >
                                        <svg
                                            onClick={() =>
                                                setOpenReportModal(false)
                                            }
                                            className="mx-auto mr-0 w-8 cursor-pointer fill-black "
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g strokeWidth="0"></g>
                                            <g
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></g>
                                            <g>
                                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                                            </g>
                                        </svg>
                                        <form>
                                            <div className="space-y-5">
                                                <label
                                                    htmlFor="email_navigate_ui_modal"
                                                    className="block"
                                                >
                                                    Report here
                                                </label>
                                                <div className="relative">
                                                    <textarea
                                                        id="reportMessage"
                                                        value={reportMessage}
                                                        onChange={
                                                            handleTextareaChange
                                                        }
                                                        placeholder="Enter your query..."
                                                        rows="4"
                                                        cols="50"
                                                        className="border"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                        <button
                                            onClick={() =>
                                                addToReportList(flatData)
                                            }
                                            className="rounded-md bg-indigo-600 hover:bg-indigo-700 px-6 py-1.5 text-white"
                                        >
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            </div>
                                    </div>
                               
                               
                                    <div className="border-t-2 border-b-2">
                                        <h1 className="mt-8 lg:text-3xl  mb-[12px] font-semibold text-black">
                                            {" "}
                                            Basic Information
                                        </h1>
                                        <ul className="md:mb-8 mb-3 lg:text-xl text-sm md:text-base capitalize  text-black">
                                            <li>
                                                {" "}
                                                - Location:{" "}
                                                {
                                                    flatData?.flatList
                                                        ?.description?.location
                                                        ?.city
                                                }
                                            </li>
                                            <li>
                                                {" "}
                                                - Bed:{" "}
                                                {
                                                    flatData?.flatList
                                                        ?.description?.bedroom
                                                }{" "}
                                                bedroom
                                            </li>
                                            <li>
                                                {" "}
                                                - Bath:{" "}
                                                {
                                                    flatData?.flatList
                                                        ?.description?.bedroom
                                                }{" "}
                                                bedroom
                                            </li>
                                            <li>
                                                {" "}
                                                - Size:{" "}
                                                {
                                                    flatData?.flatList
                                                        ?.description?.size
                                                }{" "}
                                                size
                                            </li>
                                        </ul>
                                    </div>

                                   
                                </div>
                            </div>
                        </div>
                        {/* div for right side */}
                        <div className="flex flex-col gap-3 px-6 ">
                            <div className="h-auto p-5 lg:w-[416px] md:w-[356px] md:block hidden  md:mt-3 rounded-lg shadow-lg border border-gray-150">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-3xl font-bold md:my-5">
                                            $
                                            {
                                                flatData?.flatList?.description
                                                    ?.rent
                                            }
                                        </h2>
                                        <svg
                                            width={30}
                                            className="hover:fill-red-500 hover:stroke-red-500 stroke-2 fill-transparent stroke-black "
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            style={{ cursor: "pointer" }}
                                        >
                                            <g strokeWidth="0"></g>
                                            <g
                                                id="SVGRepo_tracerCarrier"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <button
                                        className="text-black px-4 py-3 mx-2 w-full border-2 mt-16 border-black rounded-lg bg-green-400  
                                  capitalize items-center flex justify-center gap-5"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="m19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.045 15.045 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2.001 2.001 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07c.53 8.54 7.36 15.36 15.89 15.89c1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98"
                                            />
                                        </svg>
                                        +88{" "}
                                        {
                                            flatData?.flatList?.contact_person
                                                ?.phone
                                        }
                                    </button>
                                </div>
                            </div>

                            <div className="md:block hidden">
                                <button
                                    onClick={() => setOpenReportModal(true)}
                                    className="rounded-md  px-5 py-[6px]  text-black"
                                >
                                    <div className="md:w-[416px] max-w-[416px] h-fit p-5 underline flex justify-center items-center gap-5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="1em"
                                            height="1em"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464l-.003.001l-.006.003l-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35c-.816.252-1.879.523-2.71.523c-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007l.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255c-.81.252-1.872.523-2.734.523c-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21 21 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21 21 0 0 0 14 7.655V1.222z"
                                            />
                                        </svg>
                                        report this listing
                                    </div>
                                </button>
                                <div
                                    className={`fixed z-[100] flex items-center justify-center ${
                                        openReportModal
                                            ? "opacity-1 visible"
                                            : "invisible opacity-0"
                                    } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
                                >
                                    <div
                                        className={`absolute max-w-md rounded-lg bg-white p-3 pb-5 text-center drop-shadow-2xl  ${
                                            openReportModal
                                                ? "scale-1 opacity-1 duration-300"
                                                : "scale-0 opacity-0 duration-150"
                                        } `}
                                    >
                                        <svg
                                            onClick={() =>
                                                setOpenReportModal(false)
                                            }
                                            className="mx-auto mr-0 w-8 cursor-pointer fill-black "
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g strokeWidth="0"></g>
                                            <g
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></g>
                                            <g>
                                                <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path>
                                            </g>
                                        </svg>
                                        <form>
                                            <div className="space-y-5">
                                                <label
                                                    htmlFor="email_navigate_ui_modal"
                                                    className="block"
                                                >
                                                    Report here
                                                </label>
                                                <div className="relative">
                                                    <textarea
                                                        id="reportMessage"
                                                        value={reportMessage}
                                                        onChange={
                                                            handleTextareaChange
                                                        }
                                                        placeholder="Enter your query..."
                                                        rows="4"
                                                        cols="50"
                                                        className="border"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                        <button
                                            onClick={() =>
                                                addToReportList(flatData)
                                            }
                                            className="rounded-md bg-indigo-600 hover:bg-indigo-700 px-6 py-1.5 text-white"
                                        >
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="relative h-full max-md:min-h-[450px] mt-16 px-3">
                                        {map}
                     </div>
                </div>
            </div>
        </>
    );
};

export default FlatDetails;
