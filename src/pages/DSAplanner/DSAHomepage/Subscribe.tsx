import { Diamond } from "lucide-react";

function Subscribe() {
  return (
    <div className="w-full h-full bg-neutral-100 overflow-hidden rounded-lg shadow-sm border border-neutral-200">
      {/* Header */}
      <div className="bg-neutral-200 text-neutral-800 !p-4 ">
        <h2 className="text-lg font-semibold !ml-2">Subscription Plan</h2>
        <p className="text-sm  !ml-2">Upgrade for premium features</p>
      </div>

      {/* Content */}
      <div className="!p-6">
        {/* Current Plan */}
        <div className="flex items-center justify-between !mb-6">
          <div>
            <span className="text-sm font-medium text-neutral-500">Current Plan</span>
            <div className="flex items-center gap-3 !mt-2">
              <span className="!px-4 !py-1 rounded-full bg-green-200 text-green-800 text-xs font-semibold">
                FREE
              </span>
              <h3 className="font-semibold text-black">Base Plan</h3>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-bold text-black">$0</span>
            <span className="text-xs text-neutral-500">per month</span>
          </div>
        </div>

        {/* Button & Footer */}
        <div className="w-full !pt-10 flex-col flex justify-end items-center">
          <button className="relative w-full !px-6 !py-3 bg-neutral-900 text-white font-medium rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 group overflow-hidden">
            <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors duration-300 pointer-events-none" />
            <div className="flex items-center justify-center gap-2 relative z-10">
              <Diamond fill="white" className="w-4 h-4  text-white" />
              <span>Subscribe Now</span>
            </div>
            {/* Animated stripe effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
          </button>

          <p className="!mt-1 text-xs text-center text-neutral-500">
            Cancel anytime. No hidden fees.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Subscribe;
