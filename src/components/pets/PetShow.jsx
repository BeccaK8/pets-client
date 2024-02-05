// PETSHOW is our details page. The show page for a single pet
// This is where a LOT of our key functionality will exist
// we'll be building this component over time, as it will be the star component of our app
// eventually this is where we will give our pets toys
// this is where we will be able to update and delete them
// this will be rendered by its own route -> pets/<:id>

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Container } from 'react-bootstrap'

import { getOnePet } from '../../api/pet'

import LoadingScreen from '../shared/LoadingScreen'

const PetShow = (props) => {
    const { petId } = useParams()
    const { user, msgAlert } = props

    const [pet, setPet] = useState(null)

    useEffect(() => {
        getOnePet(petId)
            .then(res => setPet(res.data.pet))
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'We found the pet',
                    variant: 'success'
                })
            })
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong',
                    variant: 'danger'
                })
            })
    }, [])

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
                            pet.owner ? `Owner: ${pet.owner.email}` : null
                        }
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default PetShow