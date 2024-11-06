const TitleLayout = ({children}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center h-40 w-full bg-gray-900 rounded-2xl">
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Authify
        </h1>
      </div>
      <div className="w-full max-w-md mt-5">{children}</div>
    </div>
  )
}

export default TitleLayout;