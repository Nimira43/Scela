function InfoMessage({
  message
}: {
  message: string
}) {
  return (
    <div className='bg-grey-4 p-3 round text-sm mt-10'>
      {message}
    </div>
  )
}

export default InfoMessage
