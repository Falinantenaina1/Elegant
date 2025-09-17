import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Section } from "./Section";

const CollectionCard = ({
  title,
  image_path,
  className,
}: {
  title: string;
  image_path: string;
  className?: string;
}) => {
  return (
    <div
      className={`bg-grey relative w-full cursor-pointer transition-all duration-200 hover:-translate-y-1 ${className || ""}`}
    >
      <img src={image_path} alt="heaphone" className="" />
      <div className="absolute bottom-8 left-8">
        <h3 className="text-[1.75rem]/8 font-medium">{title}</h3>
        <Link
          to={""}
          className="border-black-07 flex w-max items-center gap-x-1 border-b"
        >
          <span>Collection</span>
          <ArrowRight strokeWidth={1} className="size-5" />
        </Link>
      </div>
    </div>
  );
};

export const Collection = () => {
  return (
    <Section className="px-6 py-6 md:px-10 lg:px-10 xl:px-24 2xl:px-40">
      <h2 className="h2">Shop Collection</h2>
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-x-6 gap-y-4 py-6 sm:grid-cols-2 sm:gap-y-6">
        <CollectionCard
          title="Headband"
          image_path="/headbands.webp"
          className="h-full w-full sm:row-span-2"
        />
        <CollectionCard title="Earbuds" image_path="/earbuds.webp" />
        <CollectionCard title="Accessories" image_path="/accessories.webp" />
      </div>
    </Section>
  );
};
