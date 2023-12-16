import {Link} from 'react-router-dom'

const Todos = () => {
  return (
    <>
        This is Todo app
        <Link to={'/notes'} >Notes</Link>
        <br/>

        <p>
            lorem1000
        </p>
    </>
  )
}

export default Todos