import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

function App() {
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', course: '' })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  
  // 🔥 Professional Update 1: Starting Theme - White Mode
  const [isDarkMode, setIsDarkMode] = useState(false); 
  
  const [refreshKey, setRefreshKey] = useState(Date.now())

  const fileInputRef = useRef(null);

  useEffect(() => { fetchStudents() }, [])

  const fetchStudents = async () => {
    try {
      const res = await axios.post("[https://mern-project-92xy.vercel.app/api/user](https://mern-project-92xy.vercel.app/api/user)");
      setStudents(res.data)
      setRefreshKey(Date.now()) 
    } catch (err) { console.error("Sync Error") }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file)) 
    }
  }

  const handleEdit = (s) => {
    setEditId(s._id)
    setFormData({ name: s.name, email: s.email, course: s.course })
    setPreview(`http://localhost:5000/uploads/${s.image}?v=${refreshKey}`)
    setImage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData()
    data.append('name', formData.name)
    data.append('email', formData.email)
    data.append('course', formData.course)
    if (image) data.append('image', image)

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/update/${editId}`, data)
      } else {
        await axios.post('http://localhost:5000/api/register', data)
      }
      resetForm()
      
      // 🔥 Professional Update 2: Instant Fetch (No more setTimeout delay)
      fetchStudents(); 
    } catch (err) { alert("Action Failed") }
    finally { setLoading(false) }
  }

  const resetForm = () => {
    setEditId(null); setFormData({ name: '', email: '', course: '' });
    setImage(null); setPreview(null);
  }

  const theme = {
    bg: isDarkMode ? '#08090d' : '#f8f9fa',
    sidebar: isDarkMode ? 'rgba(15, 18, 28, 0.9)' : 'rgba(255, 255, 255, 0.95)',
    card: isDarkMode ? '#111420' : '#ffffff',
    text: isDarkMode ? '#f1f5f9' : '#1e293b', 
    accent: '#8b5cf6', // Indigo Purple
    secondary: '#3b82f6', // Cyber Blue
    border: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
  }

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: '100vh', color: theme.text, transition: '0.4s ease', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* 🎨 PROFESSIONAL STYLING & RESPONSIVENESS (Media Queries) */}
      <style>{`
        @keyframes fadeInCard { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        
        .main-container { display: flex; flex-direction: row; transition: flex-direction 0.4s ease; }
        .sidebar-glass { width: 400px; padding: 50px 40px; height: 100vh; position: sticky; top: 0; backdrop-filter: blur(20px); border-right: 1px solid ${theme.border}; background-color: ${theme.sidebar}; transition: width 0.4s ease; }
        .member-card { animation: fadeInCard 0.6s ease-out backwards; transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); background: ${theme.card}; border: 1px solid ${theme.border}; color: ${theme.text}; }
        .member-card:hover { transform: translateY(-8px); border-color: ${theme.accent} !important; box-shadow: 0 15px 30px ${theme.accent}20; }
        
        .input-cyber { background: ${isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'}; border: 1px solid ${theme.border}; color: ${theme.text}; padding: 16px; border-radius: 12px; transition: 0.3s; width: 100%; outline: none; }
        .input-cyber:focus { border-color: ${theme.accent}; box-shadow: 0 0 15px ${theme.accent}15; background: ${isDarkMode ? 'rgba(255,255,255,0.05)' : '#fff'}; }
        
        /* 🔥 Professional Update 3: Stickers-Pro */
        .sticker-pro { font-size: 10px; font-weight: 800; padding: 5px 12px; border-radius: 20px; text-transform: uppercase; border: 1px solid ${theme.accent}30; color: ${theme.accent}; background: ${theme.accent}10; display: inline-flex; align-items: center; gap: 4px; }
        .btn-grad { background: linear-gradient(135deg, ${theme.accent}, ${theme.secondary}); color: white; padding: 18px; border-radius: 12px; border: none; font-weight: 800; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 20px ${theme.accent}30; width: 100%; }
        .btn-grad:hover { transform: translateY(-2px); box-shadow: 0 15px 30px ${theme.accent}50; filter: brightness(1.1); }

        /* 🔥 Professional Update 4: MOBILE RESPONSIVENESS */
        @media (max-width: 992px) {
          .main-container { flex-direction: column; }
          .sidebar-glass { width: 100%; height: auto; position: relative; border-right: none; border-bottom: 1px solid ${theme.border}; padding: 30px 20px; }
          .directory-main { padding: 30px 20px !important; }
        }
      `}</style>

      <div className="main-container">
        {/* 🔮 PRO SIDEBAR */}
        <aside className="sidebar-glass">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '26px', fontWeight: '900', letterSpacing: '-1.5px', color: theme.text, margin: 0 }}>
              SIMPLE<span style={{color: theme.accent}}>HQ</span>
            </h2>
            <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '22px' }}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div 
              onClick={() => fileInputRef.current.click()} 
              style={{ width: '130px', height: '130px', borderRadius: '35px', border: `2px solid ${theme.accent}`, margin: '0 auto', cursor: 'pointer', overflow: 'hidden', display: 'flex', position: 'relative' }}
            >
              {preview ? <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{width:'100%', display:'grid', placeItems:'center', color:theme.accent, fontWeight:'800', fontSize:'10px'}}>UPLOAD</div>}
              <div style={{position:'absolute', bottom:0, width:'100%', background:theme.accent, color:'white', fontSize:'9px', textAlign:'center', padding:'4px', fontWeight:'800'}}>REPLACE</div>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />

            <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
              <input className="input-cyber" placeholder="Legal Identity" value={formData.name} onChange={(e)=>setFormData({...formData, name:e.target.value})} required />
              <input className="input-cyber" placeholder="Email Protocol" value={formData.email} onChange={(e)=>setFormData({...formData, email:e.target.value})} required />
              <input className="input-cyber" placeholder="Assign Unit" value={formData.course} onChange={(e)=>setFormData({...formData, course:e.target.value})} required />
            </div>

            <button type="submit" className="btn-grad">
              {loading ? 'PROCESSING...' : editId ? 'SYNC CHANGES' : 'DEPLOY MEMBER'}
            </button>
            {editId && <button onClick={resetForm} style={{color:'#ff4757', background:'none', border:'none', cursor:'pointer', fontWeight:'800', fontSize:'11px', marginTop:'10px'}}>ABORT MISSION</button>}
          </form>
        </aside>

        {/* 📊 MAIN DIRECTORY */}
        <main className="directory-main" style={{ flex: 1, padding: '60px 80px', overflowY: 'auto' }}>
          <header style={{ marginBottom: '60px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '900', margin: 0, letterSpacing: '-2px', color: theme.text }}>
              Enterprise <span style={{color: theme.accent}}>Directory</span>
            </h1>
            <div style={{ display: 'flex', gap: '12px', marginTop: '15px', flexWrap: 'wrap' }}>
              <span className="sticker-pro" style={{borderColor: '#10b98140', color: '#10b981', background: '#10b98110'}}>● System Online</span>
              <span className="sticker-pro" style={{borderColor: theme.secondary + '40', color: theme.secondary, background: theme.secondary + '10'}}>Active Nodes: {students.length}</span>
            </div>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '25px' }}>
            {students.map((s, idx) => (
              <div key={s._id} className="member-card" style={{ padding: '30px', borderRadius: '30px', display: 'flex', alignItems: 'center', animationDelay: `${idx * 0.05}s`, flexWrap: 'wrap', gap: '15px' }}>
                <img 
                  src={`http://localhost:5000/uploads/${s.image}?v=${refreshKey}`} 
                  style={{ width: '100px', height: '100px', borderRadius: '24px', objectFit: 'cover', border: `4px solid ${theme.bg}`, boxShadow: `0 10px 20px rgba(0,0,0,0.15)` }} 
                  alt="Profile"
                />
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div className="sticker-pro" style={{fontSize:'8px', marginBottom:'8px'}}>{s.course}</div>
                  <h4 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: theme.text }}>{s.name}</h4>
                  <p style={{ margin: '5px 0 0', fontSize: '13px', color: '#8892b0', fontWeight: '500' }}>{s.email}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', paddingLeft: '20px', borderLeft: `1px solid ${theme.border}`, marginLeft: 'auto' }}>
                  <button onClick={() => handleEdit(s)} style={{ border: 'none', background: 'none', color: theme.secondary, fontWeight: '900', cursor: 'pointer', fontSize: '11px' }}>EDIT</button>
                  <button onClick={() => { if(window.confirm("Permanent Wipe?")) axios.delete(`http://localhost:5000/api/delete/${s._id}`).then(fetchStudents) }} style={{ border: 'none', background: 'none', color: '#ff4757', fontWeight: '900', cursor: 'pointer', fontSize: '11px' }}>WIPE</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App