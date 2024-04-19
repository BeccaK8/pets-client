// This card will be used to display the toys of a pet
// the pet's toys array will be mapped, producing one of these componnets
// for every toy in the array

import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeToy } from '../../api/toy'
import messages from '../shared/AutoDismissAlert/messages'
import EditToyModal from './EditToyModal'

const ToyShow = (props) => {
    // for teh first iteration of this component, we'll only need one prop - the toy
    const { user, pet, toy, msgAlert, triggerRefresh } = props

    // hook used to display/hide modal
    const [editModalShow, setEditModalShow] = useState(false)

    const setBgCondition = (cond) => {
        // a toy can be either new, used, or disgusting
        if (cond === 'new') {
            return ({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return ({width: '18rem', backgroundColor: '#ffdac1'})
        } else { // disgusting
            return ({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    // the api calling function that destroys a toy
    const destroyToy = () => {
        // remove the toy
        removeToy(user, pet._id, toy._id)
            // notify user of success
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.deleteToySuccess,
                    variant: 'success'
                })
            })
            // refresh the parent page (component)
            .then(() => triggerRefresh())
            // catch any errors
            .catch(err => {
                msgAlert({
                    heading: 'Oh no!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className='m-2' style={setBgCondition(toy.condition)}>
                <Card.Header>{toy.name}</Card.Header>
                <Card.Body>
                    <small>{toy.description}</small>
                    <br />
                    <small>{toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}</small>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {toy.condition}</small><br />
                    {
                        user && pet.owner && user._id === pet.owner._id 
                        ?
                        <>
                            <Button
                                className='m-2'
                                variant='warning'
                                onClick={() => setEditModalShow(true)}
                            >
                                Update Toy
                            </Button>
                            <Button
                                className='m-2'
                                variant='danger'
                                onClick={() => destroyToy()}
                            >
                                Delete Toy
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
Compl
        </>
    )
}

export default ToyShow