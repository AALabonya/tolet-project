import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";

const WishListDetails = () => {
    const [openModal, setOpenModal] = useState(false);
    const [flatImageOpenModal, setFlatImageOpenModal]= useState(false);
    const [allRoommateImages, setAllRoommateImages] = useState([]);
    const[allFlatImages, setAllFlatImages]= useState([])
    const [details, setDetails] =useState([])
    const { id } = useParams();
    console.log(id);
    const mapRef = useRef(null);

    const { data: wishListData } = useLoaderData();
    console.log("wishListData", wishListData);

    useEffect(() => {
        const getWishListDetails = async () => {
            try {
              const response = await axios.get(
                `http://localhost:5000/wish/${id}`
              );
              setDetails(response.data);
              if (response.data.roommateWishList?.roomateList?.images) {
                setAllRoommateImages(response.data.roommateWishList.roomateList.images);
              }
              if (response.data.flatWishList?.flatList?.images) {
                setAllFlatImages(response.data.flatWishList.flatList.images);
              }
            } catch (error) {
              console.error("Error fetching flat details:", error);
            }
          };
        getWishListDetails();
      }, [id]);


// console.log("details",details);
// console.log("details",allRoommateImages);
const [center, setCenter] = useState([23.8041, 90.4152]);

    useEffect(() => {
        setCenter([
            parseFloat(
              wishListData.roommateWishList?.roomateList?.description?.location
              ?.lat),
            parseFloat(
              wishListData.roommateWishList?.roomateList?.description?.location
              ?.lon),
        ]);
    }, [wishListData]);

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
             {   wishListData.roommateWishList?.roomateList?.description?.location
              ?.address}
                </Popup>
            </Marker>
        </MapContainer>
    );
//flat-----------------------------

useEffect(() => {
  setCenter([
      parseFloat(
        wishListData.flatWishList
        ?.flatList
        ?.description?.location
        ?.lat),
      parseFloat(
        wishListData.flatWishList
        ?.flatList
        ?.description?.location
        ?.lon),
  ]);
}, [wishListData]);

useEffect(() => {
  if (mapRef.current) {
      mapRef.current.setView(center, 13);
  }
}, [center]);

const maps = (
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
       {  wishListData.flatWishList?.flatList?.description?.location
        ?.address}
          </Popup>
      </Marker>
  </MapContainer>
);
  return (
 <>
      {/* Render roommate wishlist */}
      {details.roommateWishList && (
        <div>

        <div className="w-11/12 mx-auto lg:flex mt-3 rounded-lg gap-3">
        <div className="lg:w-[50%]">
          <img
            src={`http://localhost:5000/images/${details.roommateWishList?.roomateList?.images[0]}`}
            alt=""
            className=" h-[500px] w-full rounded-l-2xl"
          />
        </div>
        <div className="lg:w-[50%] grid grid-cols-1 md:grid-cols-2  h-[500px] gap-3">
          <div className="bg-cover overflow-hidden relative ">
            <img
              src={`http://localhost:5000/images/${details.roommateWishList?.roomateList?.images[1]}`}
              alt=""
              className="w-full h-full "
            />
          </div>
          <div className="bg-cover overflow-hidden relative rounded-tr-2xl">
            <img
              src={`http://localhost:5000/images/${details.roommateWishList?.roomateList?.images[2]}`}
              alt=""
              className="w-full h-full "
            />
          </div>
          <div className="bg-cover overflow-hidden relative">
            <img
              src={`http://localhost:5000/images/${details.roommateWishList?.roomateList?.images[3]}`}
              alt=""
              className="w-full h-full "
            />
          </div>
          <div className="bg-cover overflow-hidden relative rounded-br-2xl">
            <img
              src={`http://localhost:5000/images/${details.roommateWishList?.roomateList?.images[4]}`}
              alt=""
              className="w-full h-full "
            />
            <div className="absolute left-0  bottom-[5%] w-full flex justify-end  text-center ">
              <div className=" bg-white px-3 py-2 text-black rounded-lg shadow-lg border-2 border-black mr-3">
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
                      openModal ? "visible opacity-100" : "invisible opacity-0"
                    } inset-0 bg-black/20 backdrop-blur-sm duration-100 `}
                  >
                    <div
                      onClick={(e_) => e_.stopPropagation()}
                      className={`text- absolute max-w-xl rounded-sm h-96 overflow-y-auto bg-white p-6 drop-shadow-lg  ${
                        openModal
                          ? "scale-1 opacity-1 duration-300"
                          : "scale-0 opacity-0 duration-150"
                      }`}
                    >
                      <h1 className="mb-2 text-2xl font-semibold">
                        All Room Images!
                      </h1>
                      {allRoommateImages.map((image, index) => (
                        <div key={index} className="flex-1 gap-2 ">
                          <img
                            src={`http://localhost:5000/images/${image}`}
                            alt=""
                            className="h-[500px] w-full mb-4"
                          />
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <button
                          onClick={() => setOpenModal(false)}
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
  {/* details sections starts */}
  <div className="mx-auto mt-16 md:px-16 ">
         <div className="flex flex-col md:flex-row gap-6">
           <div className="main_details px-5 md:px-0 md:w-3/4">
             <div className=" px-5 md:px-0 md:w-3/4">
               <div className="mb-16">
                 <div className="mb-5 flex justify-start gap-10">
                   <div>
                     {" "}
                     <img
                       src={`http://localhost:5000/images/${details.roommateWishList?.roomateList?.contact_person?.image}`}
                       alt=""
                       className="w-16 h-16 rounded-lg"
                     />
                   </div>
                   <div>
                     <h2 className="lg:text-xl font-medium text-black">
                       User Name:{" "}
                       {
                         details.roommateWishList?.roomateList?.contact_person
                           ?.firstName
                       }{" "}
                       {details.roommateWishList?.roomateList?.contact_person?.lastName}
                     </h2>
                     <h2 className="lg:text-xl font-medium text-black">
                       Home type:{" "}
                       {details.roommateWishList?.roomateList?.description?.bedroomType}
                     </h2>
                     <p className="text-black  font-medium inline-block md:text-lg mt-1">
                       Location:{" "}
                       {
                         details.roommateWishList?.roomateList?.description?.location
                           ?.address
                       }
                       ,{" "}
                       {
                         details.roommateWishList?.roomateList?.description?.location
                           ?.city
                       }
                     </p>
                   </div>
                 </div>
                 <div className="border-t-2 border-b-2">
                   <h1 className="mt-8 lg:text-3xl  mb-[12px] font-semibold text-black">
                     Personal Information
                   </h1>
                   <ul className="mb-8 lg:text-lg  text-black">
                     <li>
                       - Name :{" "}
                       {
                         details.roommateWishList?.roomateList?.contact_person
                           ?.firstName
                       }
                     </li>
                     <li>- Available From : {
                         details.roommateWishList?.roomateList?.description
                           ?.availableFrom
                       }</li>
                     <li className="">
                       - Age and Gender :{" "}
                       {
                         details.roommateWishList?.roomateList?.contact_person
                           ?.userGender
                       }{" "}
                     </li>
                     <li>
                       - Employment :{" "}
                       {
                         details.roommateWishList?.roomateList?.contact_person
                           ?.userEmploymentStatus
                       }
                     </li>
                   </ul>
                   <h1 className="mt-8 lg:text-3xl  mb-[12px] font-semibold text-black">
                     Match Preferences
                   </h1>
                   <h1 className="mt-8 lg:text-3xl  mb-[12px] font-semibold text-black">
                     Home Details
                   </h1>
                   <ul className="mb-8 lg:text-xl  text-black">
                     <li>
                       - Bedroom Type :{" "}
                       {details.roommateWishList?.roomateList?.description?.bedroomType}
                     </li>
                   </ul>

                   <h1 className="mt-8 lg:text-3xl  mb-[12px] font-semibold text-black">
                     Flatmate Preferences
                   </h1>
                   <ul className="mb-8 lg:text-lg  text-black">
                     <li>
                       - Gender :{" "}
                       {
                         details.roommateWishList?.roomateList?.roomatePreferences
                           ?.gender
                       }{" "}
                     </li>
                     <li>
                       - Smoking at Home :{" "}
                       {
                        details.roommateWishList?.roomateList?.roomatePreferences
                           ?.smoking
                       }
                     </li>
                     <li>
                       - Pets :{" "}
                       {details.roommateWishList?.roomateList?.roomatePreferences?.pets}
                     </li>
                     <li>
                       - Employment :{" "}
                       {
                         details.roommateWishList?.roomateList?.roomatePreferences
                           ?.employmentStatus
                       }
                     </li>
                   </ul>
                 </div>

                 {/* map */}
                 <div className="relative h-full max-md:min-h-[350px] mt-16">
                   {/* <iframe
                     src="https://maps.google.com/maps?q=Dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
                     className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                     allowFullScreen
                   ></iframe> */}
                   {map}
                 </div>
               </div>
             </div>
           </div>
           {/* div for right side */}
           <div className="flex flex-col gap-3 px-6">
             <div className="h-auto p-5 md:w-[416px] max-w-[416px] mt-3 shadow-lg border border-gray-150 rounded-lg">
               <div>
                 <div className="flex items-center justify-between">
                   <h2 className="text-3xl font-bold my-5">
                     ${details.roommateWishList?.roomateList?.description?.rent}
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
                                transition-all duration-500 capitalize items-center flex justify-center gap-5"
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
                   +88 {details.roommateWishList?.roomateList?.contact_person?.phone}
                 </button>
               </div>
             </div>
             {/* <div className="md:w-[416px] max-w-[416px] h-fit p-5 underline flex justify-center items-center gap-5">
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
             </div> */}
           </div>
         </div>
       </div>
   </div>
      )}

      {/* Render flat wishlist */}
      {details.flatWishList && (
        // <div>
        //   <h2>Flat Wishlist</h2>
        //   <p>User Email: {details?.flatWishList?.flatList?.description.type}</p>
        //   {/* Render other details */}
        // </div>
        <div>

        <div className="w-11/12 mx-auto lg:flex mt-3 rounded-lg gap-3">
        <div className="lg:w-[50%]">
          <img
            src={`http://localhost:5000/images/${details.flatWishList?.flatList?.images[0]}`}
            alt=""
            className=" h-[500px] w-full rounded-l-2xl"
          />
        </div>
        <div className="lg:w-[50%] grid grid-cols-1 md:grid-cols-2  h-[500px] gap-3">
          <div className="bg-cover overflow-hidden relative ">
            <img
              src={`http://localhost:5000/images/${details?.flatWishList?.flatList?.images[1]}`}
              alt=""
              className="w-full h-full "
            />
          </div>
          <div className="bg-cover overflow-hidden relative rounded-tr-2xl">
            <img
              src={`http://localhost:5000/images/${details?.flatWishList?.flatList?.images[2]}`}
              alt=""
              className="w-full h-full "
            />
          </div>
          <div className="bg-cover overflow-hidden relative">
            <img
              src={`http://localhost:5000/images/${details?.flatWishList?.flatList?.images[3]}`}
              alt=""
              className="w-full h-full "
            />
          </div>
          <div className="bg-cover overflow-hidden relative rounded-br-2xl">
            <img
              src={`http://localhost:5000/images/${details?.flatWishList?.flatList?.images[4]}`}
              alt=""
              className="w-full h-full "
            />
            <div className="absolute left-0  bottom-[5%] w-full flex justify-end  text-center ">
              <div className=" bg-white px-3 py-2 text-black rounded-lg shadow-lg border-2 border-black mr-3">
                <div>
                  <button
                    onClick={() => setFlatImageOpenModal(true)}
                    className="rounded-sm  px-5 py-[6px] text-black"
                    id="_modal_NavigateUI"
                  >
                    Show All Photo
                  </button>
                  <div
                    onClick={() => setFlatImageOpenModal(false)}
                    className={`fixed z-[100] flex items-center justify-center ${
                      flatImageOpenModal ? "visible opacity-100" : "invisible opacity-0"
                    } inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-white/10`}
                  >
                    <div
                      onClick={(e_) => e_.stopPropagation()}
                      className={`text- absolute max-w-xl rounded-sm h-96 overflow-y-auto bg-white p-6 drop-shadow-lg dark:bg-black dark:text-white ${
                        flatImageOpenModal
                          ? "scale-1 opacity-1 duration-300"
                          : "scale-0 opacity-0 duration-150"
                      }`}
                    >
                      <h1 className="mb-2 text-2xl font-semibold">
                        All Room Images!
                      </h1>
                      {allFlatImages.map((image, index) => (
                        <div key={index} className="flex-1 gap-2 ">
                          <img
                            src={`http://localhost:5000/images/${image}`}
                            alt=""
                            className="h-[500px] w-full mb-4"
                          />
                        </div>
                      ))}
                      <div className="flex justify-end">
                        <button
                          onClick={() => setFlatImageOpenModal(false)}
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
  {/* details sections starts */}
  <div className="mx-auto mt-16 md:px-16 ">
         <div className="flex flex-col md:flex-row gap-6">
           <div className="main_details px-5 md:px-0 md:w-3/4">
             <div className=" px-5 md:px-0 md:w-3/4">
               <div className="mb-16">
                 <div className="mb-5 flex justify-start gap-10">
                   <div>
                     {" "}
                     <img
                       src="https://i.postimg.cc/6prP9jW9/pexels-pixabay-271795.jpg"
                       alt=""
                       className="w-16 h-16 rounded-lg"
                     />
                   </div>
                   <div>
                     <h2 className="lg:text-xl font-medium text-black">
                       User Name:{" "}
                       {
                         details?.flatWishList?.flatList?.contact_person
                           ?.firstName
                       }{" "}
                       {details?.flatWishList?.flatList?.contact_person?.lastName}
                     </h2>
                     <h2 className="lg:text-xl font-medium text-black">
                       Home type:{" "}
                       {details?.flatWishList?.flatList?.description?.type}
                     </h2>
                     <p className="text-black  font-medium inline-block md:text-lg mt-1">
                       Location:{" "}
                       {
                         details?.flatWishList?.flatList?.description?.location
                           ?.address
                       }
                       ,{" "}
                       {
                         details?.flatWishList?.flatList?.description?.location
                           ?.city
                       }
                     </p>
                   </div>
                 </div>
                 <div className="border-t-2 border-b-2">
                   <h1 className="mt-8 lg:text-3xl  mb-[12px] font-semibold text-black">
                     Personal Information
                   </h1>
                   <ul className="mb-8 lg:text-lg  text-black">
                     <li>
                       - Name :{" "}
                       {
                         details?.flatWishList?.flatList?.contact_person
                           ?.firstName
                       }{" "}{
                        details?.flatWishList?.flatList?.contact_person
                          ?.lastName
                      }
                     </li>
                     <li>- Available From : {
                         details?.flatWishList?.flatList?.description
                           ?.availableFrom
                       }</li>
                     <li className="">
                       - City :{" "}
                       {
                         details?.flatWishList?.flatList?.contact_person
                           ?.userCity
                       }{" "}
                     </li>
                     <li>
                       - Postal Code:{" "}
                       {
                        details?.flatWishList?.flatList?.contact_person
                           ?.userPostalCode
                       }
                     </li>
                   </ul>
                   <h1 className="mt-8 lg:text-3xl  mb-[12px] font-semibold text-black">
                     Match Preferences
                   </h1>
                   <h1 className="mt-8 lg:text-3xl  mb-[12px] font-semibold text-black">
                     Home Details
                   </h1>
                   <ul className="mb-8 lg:text-xl  text-black">
                     <li>
                       - Bedroom Type :{" "}
                       {details?.flatWishList?.flatList?.description?.type}
                     </li>
                   </ul>
                 </div>

                 {/* map */}
                 <div className="relative h-full max-md:min-h-[350px] mt-16">
                   {/* <iframe
                     src="https://maps.google.com/maps?q=Dhaka&t=&z=13&ie=UTF8&iwloc=&output=embed"
                     className="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
                     allowFullScreen
                   ></iframe> */}
                   {maps}
                 </div>
               </div>
             </div>
           </div>
           {/* div for right side */}
           <div className="flex flex-col gap-3 px-6">
             <div className="h-auto p-5 md:w-[416px] max-w-[416px] mt-3 shadow-lg border border-gray-150 rounded-lg">
               <div>
                 <div className="flex items-center justify-between">
                   <h2 className="text-3xl font-bold my-5">
                     ${details?.flatWishList?.flatList?.description?.rent}
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
                                transition-all duration-500 capitalize items-center flex justify-center gap-5"
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
                   +88 {details?.flatWishList?.flatList?.contact_person?.phone}
                 </button>
               </div>
             </div>
             {/* <div className="md:w-[416px] max-w-[416px] h-fit p-5 underline flex justify-center items-center gap-5">
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
             </div> */}
           </div>
         </div>
       </div>
   </div>
      )}
    </>
  );
};

  
export default WishListDetails