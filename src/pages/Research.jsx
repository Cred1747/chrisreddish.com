import { FileText, Users, ExternalLink, BookOpen } from 'lucide-react'

const research = [
  {
    title: 'Stance Detection in Social Media Text',
    type: 'Active Research',
    lab: "USF Big Data Analytics Lab",
    advisor: 'Professor Loni Hagen',
    description: 'Investigating natural language processing techniques for detecting stance (favor, against, neutral) in social media posts. Research focuses on improving model accuracy for nuanced political and social discourse.',
    topics: ['NLP', 'Stance Detection', 'Transformer Models', 'Social Media Analysis'],
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Research & Academics</h1>
          <p className="text-slate-400 max-w-2xl">
            My academic research in NLP and relevant graduate coursework at USF.
          </p>
        </div>

        {/* Research Section */}
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
            <a
              href="mailto:ChristopherReddish@USF.edu"
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Academic Email
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
