import { useUserStore } from "@/stores/useUserStore";
import { LoaderCircle } from "lucide-react";
import { type FormEvent } from "react";
import { FormInput } from "../FormInput";
import { Section } from "../Section";
import { Button } from "../ui/button";

const AccountDetails = () => {
  const { user, updateUser, loading } = useUserStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const firstname = form.get("firstname") as string;
    const lastname = form.get("lastname") as string;
    const oldPassword = form.get("oldPassword") as string;
    const newPassword = form.get("newPassword") as string;
    const newConfirmation = form.get("newConfirmation") as string;

    updateUser({
      firstname,
      lastname,
      oldPassword,
      newPassword,
      newConfirmation,
    });
  };
  return (
    <Section>
      <h3 className="my-4 text-xl font-semibold">Account Details</h3>
      <div className="w-full">
        <form action="w-full" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormInput
              name="firstname"
              label="FIRST NAME *"
              defaultValue={user?.firstname || ""}
            />
            <FormInput
              name="lastname"
              label="LAST NAME *"
              defaultValue={user?.lastname || ""}
            />
            <FormInput
              name="EMAIL"
              type="email"
              label="EMAIL *"
              disabled
              defaultValue={user?.email || ""}
            />
          </div>
          <h3 className="my-4 text-xl font-semibold">Password</h3>
          <div>
            <div className="space-y-4">
              <FormInput
                name="oldPassword"
                type="password"
                label="OLD PASSWORD"
                placeholder="Old password"
              />
              <FormInput
                name="newPassword"
                type="password"
                label="NEW PASSWORD"
                placeholder="New password"
              />
              <FormInput
                name="newConfirmation"
                type="password"
                label="REPEAT NEW PASSWORD"
                placeholder="Repeat new password"
              />
            </div>
          </div>
          <Button className="mt-4 cursor-pointer">
            {loading ? (
              <div className="flex animate-pulse items-center gap-x-1">
                <LoaderCircle className="animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <span>Save Changes </span>
            )}
          </Button>
        </form>
      </div>
    </Section>
  );
};

export default AccountDetails;
