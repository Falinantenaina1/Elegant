import { FormInput } from "@/components/FormInput";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CreditCardIcon,
  House,
  LockKeyhole,
  Mail,
  Phone,
  Truck,
} from "lucide-react";

const contacts = [
  {
    title: "Adress",
    content: "234 Hai Trieu, Ho Chi Minh City, Viet Nam",
    icon: <House className="size-8 font-bold text-black" strokeWidth={1} />,
  },
  {
    title: "Contact Us",
    content: "+84 234 567 890",
    icon: <Phone className="size-8 text-black" strokeWidth={1} />,
  },
  {
    title: "Email",
    content: "hello@3legant.com",
    icon: <Mail className="size-8 text-black" strokeWidth={1} />,
  },
];

const services = [
  {
    title: "Free Shipping",
    text: "Order above $200",
    icon: <Truck className="size-12" strokeWidth={1.5} />,
  },
  {
    title: "Money-back",
    text: "30 days guarantee",
    icon: <CreditCardIcon className="size-12" strokeWidth={1.5} />,
  },
  {
    title: "Secure Payments",
    text: "Secured by Stripe",
    icon: <LockKeyhole className="size-12" strokeWidth={1.5} />,
  },
  {
    title: "24/7 Support",
    text: "Phone and Email support",
    icon: <Phone className="size-12" strokeWidth={1.5} />,
  },
];

const ContactPage = () => {
  return (
    <>
      <Section className="section space-y-10 lg:space-y-12 2xl:px-40">
        <div className="max-w-[80%] lg:max-w-[60%]">
          <h2 className="font-poppins mb-4 text-left text-2xl font-medium">
            We believe in trends. We’re passionate about headbands & earbuds.
          </h2>
          <p>
            Our products showcase timeless design — natural materials, sleek
            lines, and classic aesthetics. Crafted to integrate seamlessly into
            any lifestyle, they captivate with their understated elegance,
            enduring quality, and a subtle nod to contemporary trends.
          </p>
        </div>

        <h2 className="h2">Contact Us</h2>
        <div className="grid grid-cols-1 gap-x-2 gap-y-4 text-center md:grid-cols-3">
          {/* Contact Info */}
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-y-4 bg-[#F3F5F7] px-2 py-4 lg:px-16"
            >
              {contact.icon}
              <div className="space-y-2">
                <h3 className="font-bold text-[#6C7275] uppercase">
                  {contact.title}
                </h3>
                <p className="text-base/5 font-semibold">{contact.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 xl:gap-x-7">
          <div className="md:order-last">
            <img src="./map.webp" className="size-full" alt="map" />
          </div>
          <div>
            {/* Contact Form */}
            <form action="" className="h-full">
              <div className="grid h-full grid-rows-[auto_auto_1fr_auto] space-y-4 xl:space-y-6">
                <FormInput
                  labelStyle="uppercase font-bold text-[0.75rem] text-[#6C7275]"
                  name="name"
                  label="Full name"
                  placeholder="Your Name"
                />
                <FormInput
                  labelStyle="uppercase font-bold text-[0.75rem] text-[#6C7275]"
                  name="email"
                  label="Email address"
                  placeholder="Your Email"
                />
                <div>
                  <label
                    htmlFor="message"
                    className="text-[0.75rem] font-bold text-[#6C7275] uppercase"
                  >
                    Message
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Your message"
                    className="h-full"
                  ></Textarea>
                </div>
                <Button type="submit" className="mt-4">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Section>
      <div className="bg-[#F3F5F7]">
        <div className="section grid grid-cols-2 sm:grid-cols-4 2xl:px-40">
          {services.map((service, index) => (
            <div key={index} className="px-4 py-8">
              {service.icon}
              <div className="mt-4 space-y-1 text-[0.875rem]">
                <h3 className="font-semibold">{service.title}</h3>
                <p className="text-[#6C7275]">{service.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactPage;
