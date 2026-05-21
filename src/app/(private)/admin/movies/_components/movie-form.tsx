interface MovieFormProps {
  formType: 'add' | 'edit'
}

function MovieForm({ formType}: MovieFormProps) {
  return (
    <div className='mt-5'>
      Movie Form
    </div>
  )
}

export default MovieForm
