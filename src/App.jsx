import { useState } from 'react'

import initialEmails from './data/emails'
import Emails from './components/Emails'
import EmailDetail from './components/EmailDetail'
import './styles/App.css'
import Header from './components/Header'
import LeftNavbar from './components/LeftNavbar'

const getReadEmails = emails => emails.filter(email => !email.read)
const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)

  const toggleStar = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      )
    setEmails(updatedEmails)
  }

  const toggleRead = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setEmails(updatedEmails)
  }

  let filteredEmails = emails

  if (hideRead) filteredEmails = getReadEmails(filteredEmails)

  if (currentTab === 'starred')
    filteredEmails = getStarredEmails(filteredEmails)

  if (searchTerm) {
    filteredEmails = filteredEmails.filter(email =>
      email.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="app">
      <Header handleSearchInputChange={handleSearchInputChange} searchTerm={searchTerm} />
      <LeftNavbar currentTab={currentTab} setCurrentTab={setCurrentTab} unreadEmails={unreadEmails} starredEmails={starredEmails} hideRead={hideRead} setHideRead={setHideRead} />
      <main className="emails">
                {selectedEmail ? (
          <EmailDetail email={selectedEmail} setSelectedEmail={setSelectedEmail} />
        ) : (
          <Emails
            filteredEmails={filteredEmails}
            toggleRead={toggleRead}
            toggleStar={toggleStar}
            setSelectedEmail={setSelectedEmail}
          />
        )}
      </main>
    </div>
  )
}

export default App
