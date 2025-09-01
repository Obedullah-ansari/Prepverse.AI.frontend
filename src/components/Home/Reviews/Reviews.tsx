import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ReviewCard from "./ReviewCard";
import { useMediaQuery } from "react-responsive";

const testimonials = [
  {
    name: "Jane Cooper",
    avatar:
      "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    testimonial:
      "The online courses completely transformed my career! The instructors were knowledgeable and the platform was so easy to use. I've already recommended it to all my colleagues.",
  },
  {
    name: "John Alex",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4,
    testimonial:
      "Great learning experience overall. The content was well structured and practical. The only reason I'm not giving 5 stars is that I wish there were more advanced topics available.",
  },
  {
    name: "Cody Roods",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    testimonial:
      "Absolutely phenomenal! The interactive exercises and real world projects made all the difference. I went from beginner to job-ready in just three months thanks to this program.",
  },
  {
    name: "Cody Roods",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 5,
    testimonial:
      "Absolutely phenomenal! The interactive exercises and real world projects made all the difference. I went from beginner to job-ready in just three months thanks to this program.",
  },
  
];

function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const risponsive = useMediaQuery({
    query: "(max-width: 1030px)",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  // Smooth transition: from 100% (below) to 0% (aligned) as user scrolls
  const x = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const yy = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full  overflow-hidden max-sm:h-auto  sm:h-auto lg:h-[100vh] gap-5 flex flex-col justify-center items-center bg-[url('src/assets/slabs.jpg')] bg-cover bg-center bg-no-repeat bg-fixed"
    >
      <motion.div
        style={{ y: yy }}
        className="  h-auto sm:!pb-4 lg:!pb-8  flex flex-col !pt-5 justify-center  items-center "
      >
        <h1 className="text-5xl text-neutral-100 font-medium  max-sm:text-4xl ">
          Our Users Love Us
        </h1>
        <p className="text-neutral-200 font-medium ">
          we speak through our users
        </p>
      </motion.div>
      <motion.div style={risponsive ? { y } : { x }} className="!p-4">
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-sm:gap-4 sm:gap-4 lg:gap-8 md:gap-4">
          {testimonials.map((testimonial, index) => (
            <ReviewCard
              key={index}
              name={testimonial.name}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Reviews;
