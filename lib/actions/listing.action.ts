"use server";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
interface listingProps {
  bathroomCount: string;
  price: string;
  roomCount: string;
  imageSrc: String[] | any;
  description: String | any;
  locationValue: Object | any;
  title: String | any;
}
export async function createListing(listingData: listingProps) {
  const {
    bathroomCount,
    price,
    roomCount,
    imageSrc = [],
    description,
    locationValue,
    title,
  } = listingData;
  try {
    const listing = await prisma.listing.create({
      data: {
        bathroomCount: parseInt(bathroomCount),
        price: parseInt(price),
        roomCount: parseInt(price),
        imageSrc,
        description,
        locationValue,
        title,
      },
    });
    revalidatePath("/");

    return listing;
  } catch (error) {
    console.log(error);
  }
}

export async function getListings() {
  try {
    const listings = await prisma.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    revalidatePath("/");
    return listings;
  } catch (error) {
    console.log(error);
  }
}

export async function getListingById(id: string) {
  try {
    const listings = await prisma.listing.findUnique({
      where: {
        id: id,
      },
    });
    revalidatePath(`/listings/${id}`);
    return listings;
  } catch (error) {
    console.log(error);
  }
}
