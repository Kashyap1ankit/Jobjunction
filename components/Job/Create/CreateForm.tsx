"use client";

import { CreateJob, UploadImage } from "@/app/actions/posts/jobs";
import { Button } from "@/components/ui/button";
import { createJobSchema, createJobSchemaType } from "@/schema/jobs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, IndianRupee, Link, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { PiOfficeChair } from "react-icons/pi";
import { toast } from "sonner";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Tiptap from "@/components/Job/Create/TipTap";
import { fraunces, roboto_slab } from "@/utils/fonts/font";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function CreateForm() {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<createJobSchemaType>({
    resolver: zodResolver(createJobSchema),
  });

  const router = useRouter();

  const watchSalaryToggle = watch("salary_disclosed");

  useEffect(() => {
    setValue("salary_disclosed", true); //To make undefined to true intially
  }, []);

  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);

  async function handleLogoChange(e: ChangeEvent<HTMLInputElement>) {
    let selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile === undefined) return; //if user opens the model to select the file but came back without choosing an thing so holding prev val
    setLogo(selectedFile);
  }

  async function handleImageUpload() {
    const formData = new FormData();
    if (logo) {
      formData.append("image", logo);
    }
    const imageUrl = logo
      ? await UploadImage(formData)
      : {
          status: 200,
          message: "File unot ploaded",
          public_id: null,
          secure_url: "/Images/jj-logo.png",
        }; // handling the logo "null" condition
    return imageUrl;
  }

  async function onSubmit(data: createJobSchemaType) {
    setLoading(true);
    try {
      const uploadedImageUrl = await handleImageUpload();
      data.company_logo = uploadedImageUrl.secure_url;
      const response = await CreateJob(data);
      if (response.status !== 200) throw new Error(response.message);
      toast("Successfully created");
      router.push("/jobs");
    } catch (error) {
      toast((error as Error).message);
    } finally {
      reset();
      setLoading(false);
    }
  }

  return (
    <div className=" bg-tranparent">
      <div className="p-4 md:p-8 w-11/12 md:w-3/4 mx-auto">
        <IoChevronBackCircleOutline
          className="mb-4 size-6 text-gray-400 cursor-pointer hover:text-white"
          onClick={() => router.push("/jobs")}
        />

        <p
          className={`${roboto_slab.className} text-3xl md:text-4xl  font-bold text-center text-white`}
        >
          Create New Job !
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-8  mt-8">
            <div>
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-[#161f2d]">
                <PiOfficeChair className=" text-gray-400 size-5" />
                <input
                  className="outline-none w-full bg-[#161f2d] text-white"
                  placeholder="Position"
                  {...register("position")}
                  id="position"
                />
              </div>
              {errors.position?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.position?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-[#161f2d]">
                <Building className=" text-gray-400 size-5" />
                <input
                  className="outline-none w-full bg-[#161f2d] text-white"
                  placeholder="Company"
                  {...register("company")}
                  id="company"
                />
              </div>
              {errors.company?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.company?.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2  rounded-md w-full ">
              <Tiptap
                className="rounded-md w-full p-4 font-kanit mt-2 min-h-80 max-h-80 overflow-y-scroll overflow-x-hidden outline-none w-full bg-[#161f2d] no-scrollbar z-20"
                register={register}
                name="role_description"
                setValue={setValue}
                edit={true}
              />

              {errors.role_description?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.role_description?.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2  rounded-md w-full ">
              <label className="text-gray-500 text-lg ">
                Company&apos;s Logo
              </label>

              <input
                type="file"
                className="bg-tranparent sr-only"
                {...register("company_logo")}
                id="company_logo"
                accept="image/*"
                onChange={handleLogoChange}
              />

              <div>
                <label
                  htmlFor="company_logo"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-[#161f2d] mx-auto px-8"
                >
                  <Upload className="size-12 text-gray-400 text-center w-full" />
                  <p className="text-gray-400 text-xs mt-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    PNG , JPG or JPEG
                  </p>
                </label>
              </div>
              {errors.company_logo?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.company_logo.message.toString()}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-[#161f2d]">
                <Building className=" text-gray-400 size-5" />
                <input
                  className="outline-none w-full bg-[#161f2d] text-white"
                  placeholder="Company's Website"
                  {...register("company_website")}
                  id="company"
                />
              </div>
              {errors.company_website?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.company_website?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2 items-center p-2 rounded-md  w-full bg-[#161f2d]">
                <Select
                  {...register("location")}
                  onValueChange={(value: "Remote" | "Hybrid" | "Onsite") =>
                    setValue("location", value)
                  }
                >
                  <SelectTrigger className="outline-none w-full bg-[#161f2d] text-white border-none ">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="outline-none w-full bg-inputBg text-white border-none p-0">
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Onsite">Onsite</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.location?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.location?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2 items-center p-2 rounded-md  w-full bg-[#161f2d]">
                <Select
                  {...register("job_type")}
                  onValueChange={(
                    value: "Fulltime" | "Internship" | "Contract" | "Freelance",
                  ) => setValue("job_type", value)}
                >
                  <SelectTrigger className="outline-none w-full bg-[#161f2d] text-white border-none ">
                    <SelectValue placeholder="Employment Type" />
                  </SelectTrigger>
                  <SelectContent className="outline-none w-full bg-inputBg text-white border-none p-0">
                    <SelectItem value="Fulltime">Fulltime</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.job_type?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.job_type?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2 items-center p-2 rounded-md  w-full bg-[#161f2d]">
                <Select
                  {...register("experience_level")}
                  onValueChange={(
                    value: "Fresher" | "0-1y" | "1-3y" | "3-5y" | "5y",
                  ) => setValue("experience_level", value)}
                >
                  <SelectTrigger className="outline-none w-full bg-[#161f2d] text-white border-none ">
                    <SelectValue placeholder="Experience Level" />
                  </SelectTrigger>
                  <SelectContent className="outline-none w-full bg-inputBg text-white border-none p-0">
                    <SelectItem value="Fresher">Fresher</SelectItem>
                    <SelectItem value="0-1y">0-1</SelectItem>
                    <SelectItem value="1-3y">1-3</SelectItem>
                    <SelectItem value="3-5y">3-5</SelectItem>
                    <SelectItem value="5y">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {errors.experience_level?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.experience_level?.message}
                </p>
              )}
            </div>

            {watchSalaryToggle ? (
              <>
                <div>
                  <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-[#161f2d]">
                    <IndianRupee className=" text-gray-400 size-5" />
                    <input
                      type="text"
                      className="outline-none w-full bg-[#161f2d] text-white"
                      placeholder="Min Salary (per month)"
                      {...register("salary_min")}
                      id="salary_min"
                    />
                  </div>
                  {errors.salary_min?.message && (
                    <p className="mt-2 font-bold text-red-500 text-sm">
                      {errors.salary_min?.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-[#161f2d]">
                    <IndianRupee className=" text-gray-400 size-5" />
                    <input
                      type="text"
                      className="outline-none w-full bg-[#161f2d] text-white"
                      placeholder="Max Salary (per month)"
                      {...register("salary_max")}
                      id="salary_max"
                    />
                  </div>
                  {errors.salary_max?.message && (
                    <p className="mt-2 font-bold text-red-500 text-sm">
                      {errors.salary_max.message}
                    </p>
                  )}
                </div>
              </>
            ) : null}

            <div className="md:col-span-2 flex flex-row gap-4 ">
              <Switch
                defaultChecked={true}
                {...register("salary_disclosed")}
                onClick={() => {
                  const currentValue = getValues("salary_disclosed");
                  setValue("salary_disclosed", !currentValue);
                }}
                className="data-[state=checked]:bg-secondarySkyBlue"
              />
              <label className="text-gray-500 text-md ">
                Want to Disclose Salary
              </label>
            </div>

            <div>
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-[#161f2d]">
                <Link
                  className=" text-gray-400 size-5"
                  aria-label="apply_link_form"
                />
                <input
                  className="outline-none w-full bg-[#161f2d] text-white"
                  placeholder="Apply Link"
                  {...register("apply_link")}
                  id="apply_link"
                />
              </div>
              {errors.apply_link?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.apply_link?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className={`${fraunces.className} bg-gradient-to-r from-primarySkyBlue to-secondarySkyBlue hover:bg-gradient-to-r hover:to-primarySkyBlue hover:from-secondarySkyBlue  mt-6`}
              disabled={loading}
              aria-label="create-job-submit"
            >
              {loading ? <FaSpinner className="animate-spin" /> : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
