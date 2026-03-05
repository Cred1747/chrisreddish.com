import { useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    testimonial: "It's fast, collaborative, and iterative—the closest thing to an applied analytics shop I've experienced at school. Beyond modeling, we emphasize validation, reproducibility, and communication. That cadence—ship, critique, refine—leveled up my data cleaning, modeling, and dashboarding skills far more than one-and-done class projects.",
    author: "Chris Reddish, FLAIRS Conference Q&A",
    subtitle: "Featured in USF School of Information Newsletter, Spring 2026",
    link: "https://www.usf.edu/arts-sciences/departments/information/documents/newsletter/si-newsletter-vol4-no1-compressed.pdf",
  },
  {
    id: 2,
    testimonial: "Working with municipal data across 20+ jurisdictions taught me that the hardest part isn't the SQL or the pipeline. It's understanding what city officials actually need to make decisions, then building the analytics layer that gives them that answer in plain English.",
    author: "Chris Reddish",
    subtitle: "On building AI analytics agents for municipal clients",
  },
  {
    id: 3,
    testimonial: "I transitioned from 14 years of retail management into data science because I saw how much untapped potential there was in making data accessible to everyday decision makers. The leadership and communication skills from that experience are what set my technical work apart.",
    author: "Chris Reddish",
    subtitle: "On career transition into data science",
  },
]

function TestimonialCard({ handleShuffle, testimonial, position, id, author, subtitle, link }) {
  const dragRef = { current: 0 }
  const isFront = position === "front"

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 2 : position === "middle" ? 1 : 0,
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        x: position === "front" ? "0%" : position === "middle" ? "33%" : "66%",
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      onDragStart={(e) => {
        dragRef.current = e.clientX || e.touches?.[0]?.clientX || 0
      }}
      onDragEnd={(e) => {
        const endX = e.clientX || e.changedTouches?.[0]?.clientX || 0
        if (dragRef.current - endX > 100) {
          handleShuffle()
        }
        dragRef.current = 0
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[400px] w-[350px] select-none place-content-center space-y-5 rounded-2xl border border-slate-700/30 bg-slate-800/20 p-8 shadow-xl backdrop-blur-md ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      <span className="text-center text-base italic text-slate-300 leading-relaxed">
        "{testimonial}"
      </span>
      <div className="text-center">
        <span className="text-sm font-semibold text-primary-400 block">{author}</span>
        {subtitle && (
          <span className="text-xs text-slate-500 block mt-1">{subtitle}</span>
        )}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary-400/70 hover:text-primary-400 mt-2 inline-block"
          >
            Read more →
          </a>
        )}
      </div>
      {isFront && (
        <span className="text-xs text-slate-600 text-center">← Swipe to see more</span>
      )}
    </motion.div>
  )
}

export default function TestimonialCards() {
  const [positions, setPositions] = useState(["front", "middle", "back"])

  const handleShuffle = () => {
    setPositions(prev => {
      const next = [...prev]
      next.unshift(next.pop())
      return next
    })
  }

  return (
    <div className="relative h-[420px] w-[350px] -ml-[100px] md:-ml-[175px]">
      {testimonials.map((t, index) => (
        <TestimonialCard
          key={t.id}
          {...t}
          handleShuffle={handleShuffle}
          position={positions[index]}
        />
      ))}
    </div>
  )
}
