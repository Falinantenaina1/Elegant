import { useUserStore } from "@/stores/useUserStore";
import { LoaderCircle } from "lucide-react";
import { type FormEvent } from "react";
import { FormInput } from "../FormInput";
import { Section } from "../Section";
import { Button } from "../ui/button";

const Address = () => {
  const { user, updateAddress, loading } = useUserStore();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const street = form.get("street") as string;
    const city = form.get("city") as string;
    const postalCode = Number(form.get("postalCode"));
    const country = form.get("country") as string;

    updateAddress({ street, city, postalCode, country });
  };

  return (
    <Section>
      <div className="rounded-sm px-4 py-6 ring-1 ring-gray-400 lg:px-6 lg:py-10">
        <h3 className="font-poppins font-semibold lg:text-xl lg:font-medium">
          Shipping Address
        </h3>
        <form action="" className="mt-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <FormInput
              name="street"
              label="STREET ADDRESS*"
              placeholder="Strett address"
              required
              defaultValue={user?.address?.street}
            />
            <FormInput
              name="country"
              label="COUNTRY*"
              placeholder="Country"
              required
              defaultValue={user?.address?.country}
            />
            <FormInput
              name="city"
              label="TOWN/CITY*"
              placeholder="Town / City"
              required
              defaultValue={user?.address?.city}
            />
            <div className="grid grid-cols-2 gap-x-6">
              <FormInput name="state" label="STATE" placeholder="State" />
              <FormInput
                name="postalCode"
                label="ZIP CODE"
                placeholder="Zip code"
                defaultValue={String(user?.address?.postalCode)}
              />
            </div>
            <Button type="submit" size={"lg"} disabled={loading}>
              {loading ? (
                <div className="flex animate-pulse items-center gap-x-1">
                  <LoaderCircle className="animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <span>Save Changes</span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Section>
  );
};

export default Address;
