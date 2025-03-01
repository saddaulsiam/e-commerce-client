import Image, { StaticImageData } from "next/image";
import { cash, sslcommerz, stripe } from "../../../../public/logo";

interface TProps {
  payWith: string;
  setPayWith: (value: string) => void;
}

interface PaymentOption {
  id: string;
  value: string;
  label: string;
  img: string | StaticImageData;
  width: number;
}

const paymentOptions: PaymentOption[] = [
  { id: "stripe", value: "stripe", label: "Stripe", img: stripe, width: 30 },
  {
    id: "sslCommerz",
    value: "sslCommerz",
    label: "SSLCommerz",
    img: sslcommerz,
    width: 100,
  },
  {
    id: "cash",
    value: "cashOnDelivery",
    label: "Cash On Delivery",
    img: cash,
    width: 40,
  },
];

const SelectPaymentOption = ({ payWith, setPayWith }: TProps) => {
  return (
    <div className="flex w-full flex-wrap gap-5 text-base">
      {paymentOptions.map(({ id, value, label, img, width }) => (
        <div key={id} className="flex items-center gap-2">
          <input
            onChange={(e) => setPayWith(e.target.value)}
            type="radio"
            name="payOption"
            value={value}
            id={id}
            checked={payWith === value}
          />
          <label
            htmlFor={id}
            className="flex cursor-pointer items-center gap-2"
          >
            <Image
              src={img}
              alt={`${label} Payment Logo`}
              height={30}
              width={width}
              priority
            />
            <span>{label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default SelectPaymentOption;
