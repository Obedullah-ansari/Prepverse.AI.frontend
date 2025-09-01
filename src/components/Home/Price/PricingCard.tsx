import React from "react";
import { Button } from "../../ui/button";
import { Check, X } from "lucide-react";
import { cn } from "../../../lib/utils";

type PlanFeature = {
  name: string;
  included: boolean;
};

interface PricingCardProps {
  name: string;
  price: number;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  ctaText?: string;
  className?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  description,
  features,
  popular = false,
  ctaText = "Get Started",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col h-auto md:w-auto sm:w-full max-sm:w-full rounded-2xl !p-6 shadow-lg transition-all duration-200",
        popular
          ? " border   border-[#F3C623] max-sm:scale-100 sm:scale-100 md:scale-110 shadow-xl "
          : "bg-neutral-200 border   hover:shadow-xl",
        className
      )}
    >
      {popular && (
        <div className="bg-[#F3C623] text-white text-xs font-medium !px-3 !py-1 rounded-full self-start !mb-4">
          Most Popular
        </div>
      )}

      <h3 className={cn("text-xl  font-bold", popular ? "text-[#F3C623]" : "text-gray-900")}>
        {name}
      </h3>
      
      <div className="sm:!mt-2  lg:!mt-4 flex items-baseline">
        <span className="sm:text-3xl lg:text-4xl font-extrabold">${price}</span>
        {price > 0 && <span className="text-gray-500 !ml-1">/month</span>}
      </div>
      
      <p className="!mt-2 text-gray-500 sm:!text-[0.9rem] ">{description}</p>
      
      <Button
        className={cn(
          "!mt-6 !mb-6",
          popular ? "bg-[#F3C623] hover:bg-amber-400" : "bg-gray-900 hover:bg-gray-800"
        )}
      >
        {ctaText}
      </Button>
      
      <div className="max-sm:!space-y-2 sm:!space-y-2 sm:text-[1rem] lg:!space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            {feature.included ? (
              <Check className="h-5 w-5 text-green-500 !mr-2 flex-shrink-0" />
            ) : (
              <X className="h-5 w-5 text-gray-500 !mr-2 flex-shrink-0" />
            )}
            <span
              className={cn(
                "text-sm",
                feature.included ? "text-gray-700" : "text-gray-500"
              )}
            >
              {feature.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
