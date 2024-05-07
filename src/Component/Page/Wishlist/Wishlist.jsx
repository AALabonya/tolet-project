import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { message } from "antd";

const Wishlist = () => {
  const { auths } = useContext(AuthContext);
  const user = auths?.user;
  const [listData, setListData] = useState([]);

  useEffect(() => {
 
    getWishList();
  }, [user?.email]);
  const getWishList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/wishlist/${user?.email}`
      );
      setListData(response.data);
    } catch (error) {
      console.error("Error fetching flat details:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/wishlists/${id}`);
      setListData((prevData) => prevData.filter((item) => item._id !== id));
      getWishList()
      message.success("Delete successfully!");
      
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="flex-1 justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:px-14 px-6">
        {/*  Cart  map */}
        {listData?.map((item, index) => (
        <Link key={index} to={`/listDetails/${item._id}`}>
          <div  className="pb-6">
            <div className="max-w-[350px] font-sans rounded-2xl my-5 mx-auto bg-white">
              <div className="flex justify-center w-full relative">
                <div className="flex justify-end items-center left-4 right-4 top-4 absolute">
                  <button className="flex items-center">
                    <svg
                      width={30}
                      className="hover:fill-red-500 hover:stroke-red-500 stroke-2 fill-transparent stroke-white"
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
                  </button>
                </div>
                <img
                  className="rounded-xl bg-black/40 w-full h-[309px] border"
                  src={`http://localhost:5000/images/${
                    item.flatWishList
                      ? item.flatWishList.flatList.images[0]
                      : item.roommateWishList.roomateList.images[0]
                  }`}
                  alt="Flat Image"
                />
              </div>
              <div className="flex-1 text-sm mt-4 gap-3">
                <div className="h-36">
                  <div className="">
                    <h3 className="text-gray-900">Location</h3>
                    <p className="mt-1.5 text-pretty text-xs text-gray-500">
                      Address: {" "}
                      <span>
                        {item.flatWishList
                          ? item.flatWishList.flatList.description.location
                              .address
                          : item.roommateWishList.roomateList.description
                              .location.address}
                      </span>
                    </p>
                    <p className="mt-1.5 text-pretty text-xs text-gray-500">
                      City:{" "}
                      <span>
                        {item.flatWishList
                          ? item.flatWishList.flatList.description.location.city
                          : item.roommateWishList.roomateList.description
                              .location.city}
                      </span>
                    </p>
                    <p className="mt-1.5 text-pretty text-xs text-gray-500">
                      Postal Code:{" "}
                      <span>
                        {item.flatWishList
                          ? item.flatWishList.flatList.description.location
                              .postalCode
                          : item.roommateWishList.roomateList.description
                              .location.postalCode}
                      </span>
                    </p>
                  </div>
                  <p className="mt-1.5 text-pretty text-xs text-gray-500">
                    HomeType:
                    <span className="uppercase">
                       {item.flatWishList
                        ? item.flatWishList.flatList.description.type
                        : item.roommateWishList.roomateList.description
                            .bedroomType}
                    </span>
                  </p>
                  <p className="mt-1.5 text-pretty text-xs text-gray-500">
                    Bedroom: {" "}
                    {item.flatWishList
                      ? item.flatWishList.flatList.description.bedroom
                      : item.roommateWishList.roomateList.description
                          .bedroom}{" "}
                    bedroom Flat
                  </p>
                </div>
                <p className="text-gray-900 font-bold text-lg">
                  ${" "}
                  {item.flatWishList
                    ? item.flatWishList.flatList.description.rent
                    : item.roommateWishList.roomateList.description.rent}
                </p>
              </div>
              {/* item increase decrees  */}
            <div className="flex flex-wrap items-center justify-between gap-4 md:gap-10 mt-4">
              <div className=" bg-green-500 font-medium  hover:scale-110 scale-100 transition-all duration-100 text-white py-1 px-4 rounded-md">
                {item.flatWishList ? (
                  item.flatWishList.flatList.description.type === "flat" ? (
                    <Link to={`/flatDetails/${item?.flatWishList._id}`}>
                      FlatData
                  
                    </Link>
                  ) : (
                    <Link to={`/subletDetails/${item?.flatWishList._id}`}>
                      Sublet
                    </Link>
                  )
                ) : (
                  <Link to={`/roommateDetails/${item?.roommateWishList?._id}`}>
                    Roommate
                  </Link>
                )}
              </div>
              <div className="">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 hover:scale-110 scale-100 transition-all duration-100 text-white py-1 px-4 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
            </div>

            
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
