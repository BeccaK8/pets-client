import { useState, useEffect } from 'react'
import { getAllPets } from '../api/pet'


const Home = (props) => {
	//console.log('props in home', props)
	const { msgAlert, user } = props

	const [pets, setPets] = useState(null)

	// useEffect is an effect hook, and it requires two arguments
	// the first arg is a callback function
	// the second arg is a dependency array
	// the dependency array tells React when to run the effect hook
	// If we want this to run only on the first render and anytime the page refreshes,
	// we keep the dependency array empty
	// be careful what you put in the array so you don't cause an infinite loop
	useEffect(() => {
		getAllPets()
			.then(res => console.log('pets: \n', res.data.pets))
			.catch(error => console.error) 
	}, [])

	return (
		<>
			<h2>Home Page</h2>
		</>
	)
}

export default Home
