import React,{useState} from 'react'

const Sidebar = ({ history, onSelect,selected ,onDelete}) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  return (
    <div className="h-screen bg-white flex flex-col p-4 overflow-y-auto">
      <div className='flex justify-between items-center '>
        <div className=''>
          <h2 className="text-xl font-semibold mb-4">💬 Lịch sử</h2>
        </div>
        <div className=' ml-auto'>
          {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg> */}
         <div 
         className="text-xl bg-slate-200  font-semibold mb-4 cursor-pointer hover:bg-white justify-center w-6 h-6 hover:text-gray-300 rounded-2xl shadow-md"
          onClick={() => onSelect(null)}
         >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
         </div>
        </div>
      </div>
      <div className="flex-1 space-y-1">
        {history?.map((conv, index) => (
          <div>
            <p
              key={index}
              onClick={() => onSelect(conv._id)}
              className={`w-full rounded-lg text-left hover:bg-gray-200 hover:drop-shadow-2xl
                 p-2 cursor-pointer ${selected === conv._id ? 'bg-gray-200 hover:drop-shadow-2xl' : ''}`}
            >
              {conv.title || "New Conversation"}...
            </p>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
