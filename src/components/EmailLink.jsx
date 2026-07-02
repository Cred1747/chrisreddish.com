import { useState } from 'react'
import { Check } from 'lucide-react'

export const EMAIL = 'ChristopherReddish@USF.edu'

// mailto: silently does nothing on machines without a default mail app,
// so also copy the address to the clipboard and show feedback on click.
export default function EmailLink({ className, children, iconOnly = false, ...props }) {
  const [copied, setCopied] = useState(false)

  const handleClick = () => {
    const done = () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done).catch(done)
    } else {
      done()
    }
  }

  return (
    <a href={`mailto:${EMAIL}`} onClick={handleClick} className={className} {...props}>
      {copied ? (
        <>
          <Check className={iconOnly ? 'w-5 h-5' : 'w-4 h-4'} />
          {!iconOnly && 'Email Copied!'}
        </>
      ) : (
        children
      )}
    </a>
  )
}
