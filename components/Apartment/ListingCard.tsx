"use client";
import { Listing } from "@prisma/client";
import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Label } from "../ui/label";
import Link from "next/link";

interface ListingCardProps {
  data: Listing;
}
const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  // console.log(data);
  const router = useRouter();
  return (
    <motion.div
      className="col-span-1 cursor-default group mt-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className={
            "aspect-square relative overflow-hidden rounded-xl border-[1px] shadow-md h-full w-[300px] max-md:w-auto"
          }
        >
          <Suspense>
            <Carousel
              className="relative w-full h-full"
              opts={{
                loop: true,
              }}
              orientation="horizontal"
            >
              <CarouselContent className="flex-row">
                {data.imageSrc?.map((image: string, index: number) => (
                  <CarouselItem key={index} className="relative aspect-square">
                    <Image
                      src={image}
                      alt={`Listing Image ${index + 1}`}
                      className="object-cover group-hover:scale-110 transition"
                      fill
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {data.imageSrc.length > 1 && (
                <>
                  <CarouselPrevious className="absolute top-1/2 left-3 transform -translate-y-1/2 -z-1 bg-white p-2 rounded-full shadow-md cursor-pointer" />
                  <CarouselNext className="absolute top-1/2 right-3 transform -translate-y-1/2 -z-1 bg-white p-2 rounded-full shadow-md cursor-pointer" />
                </>
              )}
            </Carousel>
          </Suspense>
        </div>

        <div className="flex justify-center items-center font-bold text-[18px]">
          {data?.title}
        </div>

        <Button
          onClick={() => router.push(`/listings/${data.id}`)}
          className="bg-[#1e4164] text-white border-[#1e4164] rounded-[5px]
 hover:text-[#1e4164] hover:bg-[white] hover:border-[1px] transition duration-300 font-bold"
        >
          View Apartment Details
        </Button>
      </div>
    </motion.div>
  );
};

export default ListingCard;
