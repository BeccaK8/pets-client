// this component is going to take functionality away from Home.js
// and focus on displaying a list of pets gathered from the database, via an API call

// used for updating state with API data
import { useState, useEffect } from 'react'
import { getAllPets } from '../../api/pet'

// used for rendering things
import LoadingScreen from '../shared/LoadingScreen'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// react allows you to create something called a stying object 
const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const PetsIndex = (props) => {
    // first we want two pieces of state to use for rendering
    const [pets, setPets] = useState(null)
    const [error, setError] = useState(false)

    // destructure our props
    const { msgAlert } = props

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
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: 'Got all the pets!',
                    variant: 'success'
                })
            })
			.catch(error => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something when wrong!',
                    variant: 'danger'
                })
                setError(true)
            }) 
	}, [])

	// WE NEVER EVER DO THIS
	// getAllPets()
	//	.then(res => setPets(res.data.pets))
	// 	.catch(err => console.log(err))
	// API calls need to happen in an effect hook, or as a result of a singular action (like a form submission)
	console.log('the pets in PetsIndex: \n', pets)

    // we need to handle multiple states of our data
    // what if we have an error
    if (error) {
        return <LoadingScreen />
    }
    // what if we have no data
    if (!pets) {
        return <LoadingScreen />
    } else if (pets.length === 0) {
        // what if the expected array is empty
        return <p>No pets yet, go add some!</p>
    } else {
        // what do we display when our data comes through fine
        // we want to loop over the array of pets 
        // and produce one card for each and every pet we get back from the database

        const petCards = pets.map(pet => (
            <Card key={ pet.id } style={{ width: '30%', margin: 5 }}>
                <Card.Header>{ pet.fullTitle }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        { pet.name }
                    </Card.Text>
                    { pet.owner ?
                        <Card.Footer>Owner: { pet.owner.email }</Card.Footer>
                        :
                        null
                    }
                </Card.Body>
            </Card>
        ))
        return (
            <div className="container-md" style={cardContainerLayout} >
                { petCards }
            </div>
        )
    }
} 

export default PetsIndex
