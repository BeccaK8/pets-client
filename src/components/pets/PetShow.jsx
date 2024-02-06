// PETSHOW is our details page. The show page for a single pet
// This is where a LOT of our key functionality will exist
// we'll be building this component over time, as it will be the star component of our app
// eventually this is where we will give our pets toys
// this is where we will be able to update and delete them
// this will be rendered by its own route -> pets/<:id>

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Container, Button } from 'react-bootstrap'

import { getOnePet, updatePet, removePet } from '../../api/pet'

import messages from '../shared/AutoDismissAlert/messages'
import LoadingScreen from '../shared/LoadingScreen'
import EditPetModal from './EditPetModal'
import ToyShow from '../toys/ToyShow'

// set a style object for our toy card container
const toyCardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const PetShow = (props) => {
    const { petId } = useParams()
    const { user, msgAlert } = props

    const [pet, setPet] = useState(null)
    // this determines if the editPetModel is open or not
    const [editModalShow, setEditModalShow] = useState(false)

    // this is a boolean that we can switch between to trigger a page rerender
    const [updated, setUpdated] = useState(false)

    // this gives us a function we can use to navigate via react-router
    const navigate = useNavigate()

    useEffect(() => {
        getOnePet(petId)
            .then(res => setPet(res.data.pet))
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }, [updated])

    // this is an api call function, so we'll need to handle promise chain
    // this means sending appropriate messages as well as navigating upon success
    const setPetFree = () => {
        // we want to remove pet 
        removePet(user, pet._id)
            // display a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deletePetSuccess,
                    variant: 'success'
                })
            })
            // navigate the user back to the index page (home) (/)
            .then(() => navigate('/'))
            // if an error occurs, tell the user
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    // Produce our Toy Cards
    // This is going to map over the pet's toys array
    // and produce cards for every toy
    let toyCards
    // if we have a pet and their toys array length > 0, make cards; otherwise, don't
    if (pet) {
        if (pet.toys.length > 0) {
            toyCards = pet.toys.map(toy => (
                <ToyShow 
                    key={toy._id}
                    toy={toy}    
                />
            ))
        } else {
            toyCards = <p>Pet has no toys, ain't that sad?</p>
        }
    }

    // if we don't have a pet, show LoadingScreen
    if (!pet) {
        return <LoadingScreen />
    }

    console.log('the pet in showPet: \n', pet)
    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header>
                        { pet.fullTitle }
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Age: { pet.age }</small><br />
                            <small>Type: { pet.type }</small><br />
                            <small>Adoptable: { pet.adoptable ? 'Yes' : 'No' }</small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            pet.owner && user && pet.owner._id === user._id
                            ?
                            <>
                                <Button
                                    className="m-2"
                                    variant="warning"
                                    onClick={() => setEditModalShow(true)}
                                >
                                    Edit Pet
                                </Button>
                                <Button 
                                    className="m-2"
                                    variant="danger"
                                    onClick={() => setPetFree()}
                                >
                                    Set Pet Free
                                </Button>
                            </>
                            :
                            null
                        }
                        <br /> 
                        { 
                            pet.owner ? `Owner: ${pet.owner.email}` : null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container className="m-2" style={toyCardContainerLayout}>
                { toyCards }
            </Container>
            <EditPetModal 
                user={user}
                show={editModalShow}
                updatePet={updatePet}
                msgAlert={msgAlert}
                handleClose={() => setEditModalShow(false)}
                pet={pet}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        </>
    )
}

export default PetShow