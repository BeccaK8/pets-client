import { useState, useEffect } from 'react'
import PetsIndex from '../components/pets/PetsIndex'


const Home = (props) => {
	//console.log('props in home', props)
	const { msgAlert, user } = props

	return (
		<>
			<h2>Home Page</h2>
			{ user != null ? <h5>Hello, { user.email }</h5> : null }
			{/* { pets == null ? <LoadingScreen /> : <p>{pets[0].name}</p>} */}
			<PetsIndex msgAlert={msgAlert} />
		</>
	)
}

export default Home
