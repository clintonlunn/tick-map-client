const NameSearch = () => {
  return (
    // <div className='absolute top-16 right-4 p-4 bg-white shadow-md rounded-md'>
    <div>
      <input
        type='text'
        placeholder='Enter your name'
        className='p-2 rounded-md border w-full'
      />
      <button className='mt-2 bg-blue-600 text-white p-2 rounded-md w-full'>
        Submit
      </button>
    </div>
  )
}

export default NameSearch
