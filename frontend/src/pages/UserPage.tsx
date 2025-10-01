import Loading from "@/components/Loading";
import { Section } from "@/components/Section";
import { useUserStore } from "@/stores/useUserStore";
import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountDetails = React.lazy(
  () => import("@/components/users/AccountDetails"),
);

const tabsMenu = ["Account", "Address", "Orders"];

const UserPage = () => {
  const { user, logout } = useUserStore();

  const navigate = useNavigate();

  const [tabs, setTabs] = useState("Account");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <Section className="section">
      <h2 className="h2">My Account</h2>
      <div className="flex gap-x-4">
        {/* User Card */}
        <div className="w-[16rem] bg-[#F3F5F7] p-4">
          <div className="flex flex-col items-center space-y-2">
            <div className="size-20 rounded-full bg-gray-900"></div>
            <h3>{user?.lastname}</h3>
          </div>
          {/* User Tabs */}
          <div>
            <ul>
              {tabsMenu.map((tab) => (
                <li
                  key={tab}
                  className={`${tabs === tab ? "border-black font-semibold" : "border-transparent hover:font-medium"} cursor-pointer border-b-2 py-2`}
                  onClick={() => setTabs(tab)}
                >
                  {tab}
                </li>
              ))}
              <li
                className="cursor-pointer hover:font-semibold"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
        {/*User Information*/}
        <div className="flex-1">
          {tabs === "Account" && (
            <Suspense fallback={<Loading />}>
              <AccountDetails />
            </Suspense>
          )}
        </div>
      </div>
    </Section>
  );
};

export default UserPage;
