"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "KES",
});

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <span className="font-semibold text-sm sm:text-base">
      {formatter.format(Number(value))}
    </span>
  );
};

export default Currency;