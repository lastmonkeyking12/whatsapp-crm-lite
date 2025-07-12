import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Dashboard() {
  const [credits, setCredits] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserAndCredits = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUser(user)

      const { data, error } = await supabase
        .from('credits')
        .select('amount')
        .eq('user_id', user.id)
        .single()

      if (!error && data) setCredits(data.amount)
    }

    fetchUserAndCredits()
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Dashboard</h1>
      {user && <p>Logged in as: {user.email}</p>}
      {credits !== null ? (
        <p style={{ fontWeight: 'bold', color: 'green' }}>
          You have {credits} credit{credits !== 1 ? 's' : ''} remaining.
        </p>
      ) : (
        <p>Loading credits...</p>
      )}
    </div>
  )
}

// Placeholder for dashboard page
export default function Dashboard() { return <div>Dashboard</div>; }
