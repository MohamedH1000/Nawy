"use client";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ImageUpload from "./ImageUpload";
import dynamic from "next/dynamic";
import { createListing } from "@/lib/actions/listing.action";
const Map = dynamic(() => import("./Map"), { ssr: false });

const AddApartmentForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [apartmentDetails, setApartmentDetails] = useState<any>({
    bathroomCount: null,
    price: null,
    roomCount: null,
    imageSrc: [],
    description: "",
    locationValue: {},
    title: "",
  });
  //   console.log(apartmentDetails);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await createListing(apartmentDetails);
      if (response) {
        toast({
          title: "Apartment added successfully",
          className: "bg-white",
        });
      }
      clear();
      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const clear = useCallback(() => {
    setOpen(false);
    setApartmentDetails({
      bathroomCount: null,
      price: null,
      roomCount: null,
      imageSrc: [],
      description: "",
      locationValue: {},
      title: "",
    });
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 100, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2 }}
      >
        <Button
          className=" bg-[#1e4164] text-white text-md
        hover:bg-[#3498db]  transition duration-300
        rounded-[10px] px-8 py-6 font-medium"
          onClick={() => setOpen((prev: any) => !prev)}
        >
          Add Apartment
        </Button>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 100, scale: 1 }}
            transition={{ duration: 0.2 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={` ${
              open
                ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                : "hidden"
            }`}
          >
            <div
              className="relative bg-white rounded-[10px] py-5 border-[1px]
          border-[#1e4164] shadow-lg w-[500px] max-w-[90%]
          mx-auto overflow-y-auto h-[500px] px-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <h1 className="text-center font-bold text-xl text-[#1e4164]">
                  Add Apartment
                </h1>
                <Image
                  src={"/assets/close.png"}
                  alt="close"
                  width={10}
                  height={10}
                  className="cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </div>
              <Separator />
              <div className="flex flex-col gap-5 mt-10">
                <div className="flex justify-between items-center text-[#1e4164]">
                  <p>Number of Rooms</p>
                  <Input
                    type="number"
                    className="w-[100px] rounded-[5px] border-[#1e4164]"
                    value={apartmentDetails?.roomCount}
                    onChange={(e) =>
                      setApartmentDetails({
                        ...apartmentDetails,
                        roomCount: e.target.value,
                      })
                    }
                    disabled={isLoading ? true : false}
                  />
                </div>
                <div className="flex justify-between items-center text-[#1e4164]">
                  <p>Number of Bathrooms</p>
                  <Input
                    type="number"
                    className="w-[100px] rounded-[5px] border-[#1e4164]"
                    value={apartmentDetails?.bathroomCount}
                    onChange={(e) =>
                      setApartmentDetails({
                        ...apartmentDetails,
                        bathroomCount: e.target.value,
                      })
                    }
                    disabled={isLoading ? true : false}
                  />
                </div>
                <h1 className="mt-10 text-[#1e4164] font-bold">Add images</h1>
                <p className="opacity-60">
                  Show to the client how the place looks like
                </p>
                <ImageUpload
                  value={apartmentDetails?.imageSrc}
                  onChange={(value) =>
                    setApartmentDetails({
                      ...apartmentDetails,
                      imageSrc: value,
                    })
                  }
                />
                <h1 className="mt-5 text-[#1e4164] font-bold">
                  Specify the location of apartment in map
                </h1>
                <Map
                  setApartmentDetails={setApartmentDetails}
                  apartmentDetails={apartmentDetails}
                />
                <h1 className="mt-5 text-[#1e4164] font-bold">
                  How do you love to describe the place?
                </h1>
                <Input
                  type="text"
                  placeholder="Address"
                  className="w-full placeholder:opacity-50
                  placeholder:text-[#1e4164]
                  border-[#1e4164] rounded-[5px]"
                  value={apartmentDetails?.title || ""}
                  onChange={(e) =>
                    setApartmentDetails({
                      ...apartmentDetails,
                      title: e.target.value,
                    })
                  }
                  required
                  disabled={isLoading ? true : false}
                />
                <Separator />
                <Input
                  type="text"
                  placeholder="describe the place"
                  className="w-full placeholder:opacity-50
                  placeholder:text-[#1e4164]
                  border-[#1e4164] rounded-[5px]"
                  value={apartmentDetails?.description}
                  onChange={(e) =>
                    setApartmentDetails({
                      ...apartmentDetails,
                      description: e.target.value,
                    })
                  }
                  required
                  disabled={isLoading ? true : false}
                />
                <h1 className="font-bold mt-5 text-[#1e4164]">
                  Now, price the apartment
                </h1>
                <p className="opacity-85 text-[#1e4164]">
                  What is the price of apartment?
                </p>
                <Input
                  type="number"
                  className="w-full border-[#1e4164] rounded-[5px]"
                  value={apartmentDetails?.price}
                  onChange={(e) =>
                    setApartmentDetails({
                      ...apartmentDetails,
                      price: e.target.value,
                    })
                  }
                  required
                  disabled={isLoading ? true : false}
                />
                <Button
                  className="w-full rounded-[5px] bg-[#1e4164] text-white
              border-[#1e4164] hover:border-[1px] hover:bg-white hover:text-[#1e4164]
              transition duration-300 font-bold"
                  onClick={handleSubmit}
                  disabled={isLoading ? true : false}
                >
                  {isLoading ? "Loading" : "Add Apartment"}
                </Button>
                <Button
                  onClick={clear}
                  disabled={isLoading ? true : false}
                  className="text-[#1e4164] border-[#1e4164] border-[1px] rounded-[5px]"
                >
                  Clear the fields
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddApartmentForm;
