import JobsId from "@/components/Job/jobId";

type tParams = Promise<{ id: string }>;

export default async function JobsIdPage({ params }: { params: tParams }) {
  const { id } = await params;

  return (
    <div className="mt-28 px-4 text-white">
      <JobsId id={id[0]} />
    </div>
  );
}
