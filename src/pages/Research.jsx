import { Link } from 'react-router-dom'
import { FileText, Users, ExternalLink, BookOpen, Award, Newspaper } from 'lucide-react'
import EmailLink from '../components/EmailLink'

const publications = [
  {
    title: 'Human and AI Alignment on Stance Detection: A Case Study of the United Healthcare CEO Assassination',
    authors: ['Alina Hagen', 'Daniel Tafmizi', 'Christopher Reddish', 'Loni Hagen', 'Ashley Fox', 'Nic DePaula'],
    venue: '38th International FLAIRS Conference',
    location: 'Daytona Beach, FL',
    date: 'May 2025',
    type: 'Conference Paper',
    description: 'Studied public discourse on X (Twitter) following the UnitedHealthcare CEO assassination, using LLMs and human annotation to detect stance (In Favor, Neutral, Against) toward Luigi Mangione. Contributed to prompt engineering for stance detection and developed interactive BERTopic visualizations.',
    links: [
      { label: 'USF News Article', url: 'https://www.usf.edu/arts-sciences/departments/information/news/2025/38th-international-flairs-conference.aspx' },
      { label: 'Interactive Demo', url: '/bert' },
    ],
    topics: ['NLP', 'Stance Detection', 'LLMs', 'BERTopic', 'Social Media Analysis'],
  },
]

const features = [
  {
    title: 'USF School of Information Newsletter — FLAIRS Q&A Feature',
    publication: 'SI Newsletter Vol. 4, No. 1',
    date: 'Spring 2026',
    description: 'Featured in a multi-page Q&A discussing our FLAIRS research methodology, experience in the Big Data Analytics Lab, and the collaborative process of studying social media discourse with AI tools.',
    url: 'https://www.usf.edu/arts-sciences/departments/information/documents/newsletter/si-newsletter-vol4-no1-compressed.pdf',
    quote: '"It\'s fast, collaborative, and iterative—the closest thing to an applied analytics shop I\'ve experienced at school. Beyond modeling, we emphasize validation, reproducibility, and communication. That cadence—ship, critique, refine—leveled up my data cleaning, modeling, and dashboarding skills far more than one-and-done class projects."',
  },
]

const research = [
  {
    title: 'Stance Detection in Social Media Text',
    type: 'Active Research',
    lab: "USF Big Data Analytics Lab",
    advisor: 'Professor Loni Hagen',
    description: 'Investigating natural language processing techniques for detecting stance (favor, against, neutral) in social media posts. Research focuses on improving model accuracy for nuanced political and social discourse. Currently extending methodology to wildfire disaster communication and public trust analysis.',
    topics: ['NLP', 'Stance Detection', 'Transformer Models', 'Social Media Analysis', 'BERTopic'],
    status: 'Ongoing',
  },
]

const coursework = [
  {
    code: 'COP5230',
    name: 'Object-Oriented Programming',
    semester: 'Fall 2025',
    description: 'Advanced OOP principles, design patterns, and software engineering practices.',
  },
  {
    code: 'ESI6613',
    name: 'Applied Data Intelligence',
    semester: 'Fall 2025',
    description: 'Statistical modeling, machine learning applications, and business intelligence.',
  },
  {
    code: 'ISM6XXX',
    name: 'Predictive Analytics',
    semester: 'Fall 2025',
    description: 'Machine learning for prediction, model validation, and feature engineering.',
  },
]

export default function Research() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Research & Publications</h1>
          <p className="text-slate-400 max-w-2xl">
            My academic research in NLP and stance detection at USF's Big Data Analytics Lab.
          </p>
        </div>

        {/* Publications Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-accent-400" />
            <h2 className="text-xl font-semibold">Publications</h2>
          </div>

          {publications.map((pub, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-primary-900/30 to-accent-900/30 rounded-xl border border-primary-500/30 p-6 sm:p-8 mb-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-accent-500/20 text-accent-400 rounded mb-2">
                    {pub.type}
                  </span>
                  <h3 className="text-xl font-semibold">{pub.title}</h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 mb-2">
                {pub.authors.map((author, j) => (
                  <span key={j}>
                    <span className={author === 'Christopher Reddish' ? 'text-primary-400 font-medium' : ''}>
                      {author}
                    </span>
                    {j < pub.authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {pub.venue}
                </div>
                <div>{pub.location}</div>
                <div>{pub.date}</div>
              </div>

              <p className="text-slate-400 mb-6">{pub.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {pub.topics.map(topic => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {pub.links.map((link, j) => (
                  link.url.startsWith('http') ? (
                    <a
                      key={j}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 rounded-lg text-sm transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={j}
                      to={link.url}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 rounded-lg text-sm transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {link.label}
                    </Link>
                  )
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Media Features Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Newspaper className="w-5 h-5 text-primary-400" />
            <h2 className="text-xl font-semibold">Featured In</h2>
          </div>

          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-primary-400">{feature.publication} • {feature.date}</p>
                </div>
                <a
                  href={feature.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Read Newsletter
                </a>
              </div>

              <p className="text-slate-400 mb-4">{feature.description}</p>

              <blockquote className="border-l-2 border-primary-500 pl-4 italic text-slate-300 text-sm">
                {feature.quote}
                <footer className="text-slate-500 mt-2 not-italic">— Christopher Reddish, FLAIRS Q&A</footer>
              </blockquote>
            </div>
          ))}
        </section>

        {/* Current Research Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-5 h-5 text-primary-400" />
            <h2 className="text-xl font-semibold">Current Research</h2>
          </div>

          {research.map((item, i) => (
            <div
              key={i}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block px-2 py-0.5 text-xs font-medium bg-accent-500/20 text-accent-400 rounded mb-2">
                    {item.type}
                  </span>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <span className="px-3 py-1 text-sm bg-primary-500/20 text-primary-400 rounded-full">
                  {item.status}
                </span>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {item.lab}
                </div>
                <div>
                  Advisor: <span className="text-slate-300">{item.advisor}</span>
                </div>
              </div>

              <p className="text-slate-400 mb-6">{item.description}</p>

              <div className="flex flex-wrap gap-2">
                {item.topics.map(topic => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Coursework Section */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <FileText className="w-5 h-5 text-primary-400" />
            <h2 className="text-xl font-semibold">Relevant Coursework</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {coursework.map((course, i) => (
              <div
                key={i}
                className="bg-slate-800/50 rounded-xl border border-slate-700 p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-primary-400">{course.code}</span>
                  <span className="text-xs text-slate-500">{course.semester}</span>
                </div>
                <h3 className="font-semibold mb-2">{course.name}</h3>
                <p className="text-sm text-slate-400">{course.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Academic Links */}
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-6">Academic Profiles</h2>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/Cred1747"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/christopher-reddish-192a402a5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              LinkedIn
            </a>
            <EmailLink className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors">
              <ExternalLink className="w-4 h-4" />
              Academic Email
            </EmailLink>
          </div>
        </section>
      </div>
    </div>
  )
}
