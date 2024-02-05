import { useState, useEffect } from 'react'
import { getAllPets } from '../api/pet'
import LoadingScreen from './shared/LoadingScreen'


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
	// useEffect is called RIGHT after the FIRST render of the component
	useEffect(() => {
		getAllPets()
			// .then(res => console.log('pets from axios: \n', res.data.pets))
			.then(res => {
				console.log('use Effect hook ran')
				setPets(res.data.pets)
			})
			.catch(error => console.error) 
	}, [])

	// WE NEVER EVER DO THIS
	// getAllPets()
	//	.then(res => setPets(res.data.pets))
	// 	.catch(err => console.log(err))
	// API calls need to happen in an effect hook, or as a result of a singular action (like a form submission)
	
	console.log('the pets in Home: \n', pets)

	return (
		<>
			<h2>Home Page</h2>
			{ user != null ? <h5>Hello, { user.email }</h5> : null }
			{ pets == null ? <LoadingScreen /> : <p>{pets[0].name}</p>}
		</>
	)
}

export default Home
