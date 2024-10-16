"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation } from "@tanstack/react-query";
import { BookingType } from "@/types/booking.types";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface BookingFormProps {
  roomId: string;
  userId: string;
  pricePerNight: number;
  closeModal?: () => void;
}

const FormSchema = z.object({
  checkInDate: z.date({
    required_error: "Check in date is required.",
  }),
  checkOutDate: z.date({
    required_error: "Check out date is required.",
  }),
});

const BookingForm = ({ roomId, userId, pricePerNight, closeModal }: BookingFormProps) => {
  const { mutate: bookRoom, isPending } = useMutation({
    mutationKey: ["book-room", roomId],
    mutationFn: async (values: BookingType) => {
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_URL + "/api/bookings",
        { ...values }
      );

      return data
    },
  });

  const router = useRouter();
  const auth = useAuth()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const numberOfDays = differenceInDays(data.checkOutDate, data.checkInDate);

    const validDays = numberOfDays > 0 ? numberOfDays : 1;

    const totalPrice = validDays * pricePerNight;

    bookRoom(
      {
        ...data,
        paymentStatus: "pending",
        room: roomId as any,
        status: "confirmed",
        totalPrice,
        userId: auth.userId!
      },
      {
        onSuccess: () => {
          toast.success("Room booked successfully.");
          router.refresh();
          closeModal?.();
          form.reset();
        },
        onError: (err) => {
          toast.error(err.message);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col gap-y-4">
        <FormField
          control={form.control}
          name="checkInDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Check-In Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkOutDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Check-Out Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="!w-full rounded-full z-10 flex-1">
          {isPending ? "Booking..." : "Book"}
        </Button>
      </form>
    </Form>
  );
};

export default BookingForm;
