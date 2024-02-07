// this modal is rendered by the ToyShow component
// the state that controls the modal (whether the modal is open or not) will live in the ToyShow component (this modal's parent component)
// the state AND updater function associated with that state will be pass here as a prop

// we'll also use an instance of our reuseable ToyForm

import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
import messages from '../shared/AutoDismissAlert/messages'
import { updateToy } from '../../api/toy'

const EditToyModal = (props) => {
    // pull important things from props
    const { user, show, handleClose, msgAlert, triggerRefresh, pet } = props

    // we're brinnging in the toy from props but only for the initial state
    // by using the original pet as our initial state for a NEW piece of state, 
    // specific to this component (called toy), we'll be able to modify the toy we are updating
    // without affecting the original state in the parent component
    const [toy, setToy] = useState(props.toy)

    const onChange = (evt) => {
        evt.persist()
        setToy( prevToy => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

            if (updatedName === 'isSqueaky' && evt.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isSqueaky' && !evt.target.checked) {
                updatedValue = false
            }

            const updatedToy = { [updatedName] : updatedValue }

            return {
                ...prevToy, ...updatedToy
            }
        })
    }

    const onSubmit = (evt) => {
        evt.preventDefault()

        // make API call
        updateToy(user, pet, toy)
            // close the modal
            .then(() => handleClose())
            // message user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateToySuccess,
                    variant: 'success'
                })
            })
            // trigger refresh
            .then(() => triggerRefresh())
            // send error message if applicable
            .catch(err => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.generalError,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ToyForm 
                    toy={toy}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Toy"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditToyModal