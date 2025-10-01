import { useUserStore } from "@/stores/useUserStore";
import { FormInput } from "../FormInput";
import { Section } from "../Section";

const AccountDetails = () => {
  const { user } = useUserStore();

  console.log(user);
  return (
    <Section>
      <h3>Account Details</h3>
      <div className="w-full">
        <form action="w-full">
          <div className="space-y-4">
            <FormInput
              name="firstname"
              label="FIRST NAME *"
              value={user?.firstname}
            />
            <FormInput
              name="lastname"
              label="LAST NAME *"
              value={user?.lastname}
            />
            <FormInput
              name="displayname"
              label="DISPLAY NAME*"
              value={user?.firstname}
            />
            <FormInput
              name="EMAIL"
              type="email"
              label="EMAIL *"
              value={user?.email}
            />
          </div>
        </form>
      </div>
    </Section>
  );
};

export default AccountDetails;
