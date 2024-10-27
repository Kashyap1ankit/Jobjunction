"use client";

import { CreateJob } from "@/app/actions/posts/jobs";
import { Button } from "@/components/ui/button";
import { createJobSchema, createJobSchemaType } from "@/schema/jobs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Briefcase, Building, IndianRupee, Link } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { PiOfficeChair } from "react-icons/pi";
import { toast } from "sonner";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Tiptap from "@/components/Job/Create/TipTap";
import { fraunces, roboto_slab } from "@/utils/fonts/font";

export default function CreateForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<createJobSchemaType>({
    resolver: zodResolver(createJobSchema),
  });

  const session: any = useSession();
  const router = useRouter();

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<{
    status: boolean;
    message: string;
  }>({
    status: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    setLoading(true);
    try {
      const response = await CreateJob(data);

      if (response.status !== 200) throw new Error(response.message);

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1500);

      router.push("/jobs");
    } catch (error) {
      setError({
        status: true,
        message: (error as Error).message,
      });

      setTimeout(() => {
        setError({
          status: false,
          message: "",
        });
      }, 1500);
    } finally {
      reset();
      setLoading(false);
    }
  }

  return (
    <div className=" bg-tranparent">
      <div className="p-4 md:p-8 w-11/12 md:w-3/4 mx-auto">
        {success ? toast("Successfully created") : ""}

        {error.status ? toast(error.message) : ""}

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
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                <PiOfficeChair className=" text-gray-400 size-5" />
                <input
                  className="outline-none w-full bg-inputBg text-white"
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
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                <Building className=" text-gray-400 size-5" />
                <input
                  className="outline-none w-full bg-inputBg text-white"
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
                className="rounded-md w-full p-4 font-kanit mt-2 min-h-80 max-h-80 overflow-y-scroll overflow-x-hidden outline-none w-full bg-inputBg no-scrollbar z-20"
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

            <div>
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                <select
                  id="location"
                  className="outline-none w-full bg-inputBg text-white"
                  {...register("location")}
                >
                  <option value="Remote">Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              {errors.location?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.location?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                <select
                  id="job_type"
                  className="outline-none w-full bg-inputBg text-white"
                  {...register("job_type")}
                >
                  <option value="Fulltime">Fulltime</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              {errors.job_type?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.job_type?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                <Briefcase className=" text-gray-400 size-5" />
                <input
                  className="outline-none w-full bg-inputBg text-white"
                  placeholder="Role Name"
                  {...register("role_name")}
                  id="role_name"
                />
              </div>
              {errors.role_name?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.role_name?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                <select
                  id="experience_level"
                  className="outline-none w-full bg-inputBg text-white"
                  {...register("experience_level")}
                >
                  <option value="Fresher">Fresher</option>
                  <option value="0-1y">0-1</option>
                  <option value="1y">1+ years</option>
                  <option value="3y">3+ years</option>
                  <option value="5y">5+ years</option>
                </select>
              </div>
              {errors.experience_level?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.experience_level?.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                <IndianRupee className=" text-gray-400 size-5" />
                <input
                  type="number"
                  className="outline-none w-full bg-inputBg text-white"
                  placeholder="Min Salary"
                  {...register("salary_min", { valueAsNumber: true })}
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
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                <IndianRupee className=" text-gray-400 size-5" />
                <input
                  type="number"
                  className="outline-none w-full bg-inputBg text-white"
                  placeholder="Max Salary"
                  {...register("salary_max", { valueAsNumber: true })}
                  id="salary_max"
                />
              </div>
              {errors.salary_max?.message && (
                <p className="mt-2 font-bold text-red-500 text-sm">
                  {errors.salary_max.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex gap-2 items-center p-4 rounded-md  w-full bg-inputBg">
                <Link
                  className=" text-gray-400 size-5"
                  aria-label="apply_link_form"
                />
                <input
                  className="outline-none w-full bg-inputBg text-white"
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
