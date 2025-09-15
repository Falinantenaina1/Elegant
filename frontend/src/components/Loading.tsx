import { LoaderCircleIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <LoaderCircleIcon className="size-25 animate-spin" />
    </div>
  );
};

export default Loading;
