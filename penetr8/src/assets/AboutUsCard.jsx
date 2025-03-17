import React from "react";

function AboutUsCard({ icon, title, description }) {
  return (
    <div className="relative mt-6 flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="p-6">
        <div className="mb-4 h-12 w-12 text-Fuchsia_pink_5">{icon}</div>
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {title}
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {description}
        </p>
      </div>
      <div className="p-6 pt-0"></div>
      <div className="w-full pt-5 px-4 mb-8 mx-auto"></div>
    </div>
  );
}

function AboutUsSection() {
  return (
    <div className="flex flex-wrap gap-6 justify-center w-full max-w-7xl mx-auto pb-24">
      {cardsData().map((card, index) => (
        <AboutUsCard
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
}

export default AboutUsCard;
