import { getListingById } from "@/lib/actions/listing.action";
import React, { Suspense } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import dynamic from "next/dynamic";

const ApartmentLocation = dynamic(
  () => import("../../../components/Apartment/ApartmentLocation"),
  {
    ssr: false,
  }
);
const page = async ({ params }: any) => {
  const { id } = params;
  const listing = await getListingById(id);
  // console.log(listing);
  const center = [
    listing?.locationValue?.lat,
    listing?.locationValue?.lng,
  ] as any;
  return (
    <div
      className="pt-[100px] min-h-screen 
    px-5 md:px-[145px] pb-20"
    >
      <ImageList
        cols={3}
        className="w-full rounded-[10px] 
        border-[1px] border-gray h-[300px]"
      >
        {/* @ts-ignore */}
        {listing?.imageSrc.map((image) => (
          <ImageListItem key={image}>
            <img
              srcSet={`${image}`}
              src={`${image}`}
              alt={"image"}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div className="mt-5">
        <h1 className="text-[#1e4164] text-xl font-bold">{listing?.title}</h1>
        <h1 className="text-xl font-bold mt-5">Description:</h1>
        <p className="text-[gray] text-sm font-semibold">
          {listing?.description}
        </p>
        <p className="text-[gray] text-xs font-semibold mt-5">
          Price start from
        </p>
        <p className="text-lg font-bold">{listing?.price} &nbsp;EGP</p>
      </div>
      {center[0] === undefined ? (
        ""
      ) : (
        <>
          <hr className="bg-[gray] h-[2px] w-full mt-2" />
          <ApartmentLocation center={center} />
        </>
      )}
    </div>
  );
};

export default page;
