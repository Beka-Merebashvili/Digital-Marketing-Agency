"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import * as z from "zod";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { useToast } from "@/components/ui/use-toast";

import { Textarea } from "@/components/ui/textarea";
import { PiCheckLight, PiSmiley } from "react-icons/pi";
import PricingNavbar from "@/components/pricing-navbar";

const FormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  job_title: z.string(),
  company_name: z.string(),
  help: z.enum([
    "Evaluate Bird for my company",
    "Learn More",
    "Get a Quote",
    "Other",
  ]),
  services: z.enum([
    "Mobile App Develoment",
    "Social Media Marketing",
    "UI/UX Design",
    "Branding",
    "Website Development",
  ]),
  info: z.string(),
});

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  company_name: string;
  help: "Evaluate Bird for my company" | "Learn More" | "Get a Quote" | "Other";
  services:
    | "Mobile App Develoment"
    | "Social Media Marketing"
    | "UI/UX Design"
    | "Branding"
    | "Website Development";
  info: string;
  terms: boolean;
};

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      job_title: "",
      company_name: "",
      help: "Learn More",
      services: "Mobile App Develoment",
      info: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      setSubmitted(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" w-full   md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden ">
      <PricingNavbar />
      <div className="md:flex items-start justify-center md:py-20 px-6">
        <div className="">
          <div className="text-5xl font-medium  w-full md:w-2/3  pb-5 md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Contact our sales team
          </div>
          <div className=" py-4 text-gray-300 ">
            Let&apos;s talk about how Bird can help your team work better.
          </div>

          <div className="bg-[#f6f5f4] md:w-4/5 space-y-6 p-4 rounded-2xl my-4 hidden md:flex md:flex-col">
            <div className="flex gap-4 border-b ">
              <div className=" font-normal pb-4 ">
                One flexible agency for your entire company to share knowledge,
                ship projects, and collaborate.
              </div>
            </div>

            <div className="flex gap-4 border-b ">
              <div className=" font-normal pb-4 ">
                Enterprise features to securely manage user access and security.
              </div>
            </div>

            <div className="flex gap-4  ">
              <div className=" font-normal pb-4 ">
                Dedicated support to work with you on your setup and help you
                build the best plan for your company.
              </div>
            </div>
          </div>
        </div>

        {/* <div className="bg-white py-4 px-3"></div> */}

        <Form {...form}>
          {!submitted ? (
             <form
             onSubmit={form.handleSubmit(onSubmit)}
             className="space-y-4 h-full border rounded-3xl p-10 md:w-1/3"
           >
             <div className="md:flex items-center gap-6 ">
               <FormField
                 control={form.control}
                 name="first_name"
                 render={({ field }) => (
                   <FormItem className="items-center justify-center  w-full">
                     <FormLabel className="text-sm ">First name *</FormLabel>
                     <FormControl>
                       <Input {...field} required />
                     </FormControl>
                   </FormItem>
                 )}
               />
           
               <FormField
                 control={form.control}
                 name="last_name"
                 render={({ field }) => (
                   <FormItem className="items-center justify-center  w-full">
                     <FormLabel className="w-60 text-sm ">Last name *</FormLabel>
                     <FormControl>
                       <Input {...field} required />
                     </FormControl>
                   </FormItem>
                 )}
               />
             </div>
           
             <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                 <FormItem className="items-center justify-center  w-full">
                   <FormLabel className=" text-sm   ">Work email *</FormLabel>
                   <FormControl>
                     <Input {...field}/>
                   </FormControl>
                 </FormItem>
               )}
             />
           
             <FormField
               control={form.control}
               name="company_name"
               render={({ field }) => (
                 <FormItem className="items-center justify-center  w-full">
                   <FormLabel className="w-60 text-sm">Company name *</FormLabel>
                   <FormControl>
                     <Input {...field} required />
                   </FormControl>
                 </FormItem>
               )}
             />
           
             <FormField
               control={form.control}
               name="job_title"
               render={({ field }) => (
                 <FormItem className="items-center justify-center w-full">
                   <FormLabel className="w-60 text-sm ">Services you are interested in*</FormLabel>
                   <Select onValueChange={field.onChange}>
                     <FormControl>
                       <SelectTrigger>
                         <SelectValue placeholder="Select an option" />
                       </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                       <div className="flex gap-4">
                         <SelectItem value="Mobile app development">Mobile app development</SelectItem>
                       </div>
                       <SelectItem value="Web development">Web development</SelectItem>
                       <SelectItem value="Social media marketing">Social media marketing</SelectItem>
                       <SelectItem value="Marketing">Marketing</SelectItem>
                       <SelectItem value="Project managment">Project managment</SelectItem>
                     </SelectContent>
                   </Select>
                 </FormItem>
               )}
             />
           
             <FormField
               control={form.control}
               name="help"
               render={({ field }) => (
                 <FormItem className="items-center justify-center  w-full">
                   <FormLabel className="w-60 text-sm   ">
                     How can we help ?
                   </FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value} required>
                     <FormControl>
                       <SelectTrigger>
                         <SelectValue placeholder="Select an option" />
                       </SelectTrigger>
                     </FormControl>
                     <SelectContent>
                       <div className="flex gap-4">
                         <SelectItem value="Evaluate app for my company">
                           Evaluate app for my company
                         </SelectItem>
                       </div>
                       <SelectItem value="Learn More">Learn More</SelectItem>
                       <SelectItem value="Get a Quote">Get a Quote</SelectItem>
                       <SelectItem value="How to use">
                         How to use
                       </SelectItem>
                       <SelectItem value="Other">Other</SelectItem>
                     </SelectContent>
                   </Select>
                 </FormItem>
               )}
             />
           
             <FormField
               control={form.control}
               name="info"
               render={({ field }) => (
                 <FormItem className="items-center justify-center w-full">
                   <FormLabel className="w-60 text-sm   ">
                     Anything else ?
                   </FormLabel>
                   <FormControl>
                     <Textarea style={{ height: "100px" }} {...field}/>
                   </FormControl>
                 </FormItem>
               )}
             />
           
             <div className="flex gap-4 items-center">
               <div>
                 <Checkbox className="text-[#6c6684]" required />
               </div>
               <div className="text-white font-light  md:w-3/4 mb-1">
                 I agree to Bird&apos; sending marketing communications related
                 to bird
               </div>
             </div>
           
             <div className="flex items-center gap-4">
               <Button
                 type="submit"
                 className="bg-white text-sm font-light"
                 disabled={loading}
                 variant="secondary"
                 onClick={() => form.handleSubmit(onSubmit)}
               >
                 Submit
               </Button>
             </div>
           </form>
           
          ) : (
            <>
              <div className="text-xl  md:text-2xl  flex  items-center justify-center flex-col px-8">
                <div className="w-80 py-20">
                  <PiSmiley className="text-6xl text-[#6c6684] mx-auto" />

                  <div className="text-gray-500 font-light  text-center justify-center mx-auto py-10 h-screen">
                    We&apos;ve received your inquiry and will be contacting you
                    via email shortly.
                  </div>
                </div>
              </div>
            </>
          )}
        </Form>

        
      </div>
    </div>
  );
}
