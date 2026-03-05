import { useState } from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    testimonial: "It's fast, collaborative, and iterative, the closest thing to an applied analytics shop I've experienced at school. Beyond modeling, we emphasize validation, reproducibility, and communication. That cadence, ship, critique, refine, leveled up my data cleaning, modeling, and dashboarding skills far more than one and done class projects.",
    author: "Chris Reddish",
    subtitle: "USF School of Information Newsletter, Spring 2026",
    link: "https://www.usf.edu/arts-sciences/departments/information/documents/newsletter/si-newsletter-vol4-no1-compressed.pdf",
  },
  {
    id: 2,
    testimonial: "Studied public discourse on X following the UnitedHealthcare CEO assassination, using LLMs and human annotation to detect stance toward Luigi Mangione. Contributed to prompt engineering for stance detection and developed interactive BERTopic visualizations.",
    author: "Chris Reddish, Alina Hagen, Daniel Tafmizi, Loni Hagen, Ashley Fox, Nic DePaula",
    subtitle: "38th International FLAIRS Conference, Daytona Beach, FL, May 2025",
    link: "https://www.usf.edu/arts-sciences/departments/information/news/2025/38th-international-flairs-conference.aspx",
  },
  {
    id: 3,
    testimonial: "Our research focuses on improving model accuracy for nuanced political and social discourse. We're currently extending our stance detection methodology to wildfire disaster communication and public trust analysis at USF's Big Data Analytics Lab.",
    author: "Chris Reddish",
    subtitle: "Ongoing NLP Research, USF Big Data Analytics Lab, Advisor: Prof. Loni Hagen",
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
      className={`absolute left-0 top-0 grid h-[420px] w-[350px] select-none place-content-center space-y-5 rounded-2xl border border-slate-700/30 bg-slate-800/20 p-8 shadow-xl backdrop-blur-md ${
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
    <div className="relative h-[440px] w-[350px] -ml-[100px] md:-ml-[175px]">
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
