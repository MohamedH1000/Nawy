import AddApartmentForm from "@/components/Apartment/AddApartmentForm";
import ListingCard from "@/components/Apartment/ListingCard";
import { getListings } from "@/lib/actions/listing.action";
import Image from "next/image";

export default async function Home() {
  const listings = await getListings();
  return (
    <section className="pt-[100px] px-5 md:px-[145px]">
      <div className="flex flex-col items-center w-full">
        <AddApartmentForm />
        <div className="flex justify-center items-center flex-wrap gap-5">
          {listings?.map((listing) => (
            <ListingCard data={listing} key={listing.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
