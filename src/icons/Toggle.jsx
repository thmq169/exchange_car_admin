const Toggle = ({ isActive, setIsActive }) => {
  return (
    <button
      onClick={setIsActive}
      className={`relative h-[10px] w-8 rounded-full ${isActive ? 'bg-[#e69e6b]' : 'bg-[#D7D7D7]'} transition-all ease-in-out`}
    >
      <div
        className={`absolute top-[-100%] h-5 w-5 translate-y-[25%] rounded-full ${isActive ? 'right-0 bg-[#f97316]' : 'left-0 bg-slate-400'} transition-all ease-in-out`}
      ></div>
    </button>
  )
}

export default Toggle
