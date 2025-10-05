import { useUserStore } from "@/stores/useUserStore";
import { LoaderCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { FormInput } from "../FormInput";
import { Section } from "../Section";
import { Button } from "../ui/button";

const AccountDetails = () => {
  const { user, updateUser, loading } = useUserStore();

  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmation, setNewConfirmation] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser(
      user?.id,
      firstname,
      lastname,
      oldPassword,
      newPassword,
      newConfirmation,
    );
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
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <FormInput
              name="lastname"
              label="LAST NAME *"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <FormInput
              name="EMAIL"
              type="email"
              label="EMAIL *"
              inputStyle="cursor-not-allowed focus:ring-0"
              disabled
              value={user?.email}
              onChange={() => {}}
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
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <FormInput
                name="newPassword"
                type="password"
                label="NEW PASSWORD"
                placeholder="New password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <FormInput
                name="newConfirmation"
                type="password"
                label="REPEAT NEW PASSWORD"
                placeholder="Repeat new password"
                onChange={(e) => setNewConfirmation(e.target.value)}
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
