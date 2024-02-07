// this modal is rendered by the PetShow component
// the state that controls this modal, whether it's open or not will live in PetShow
// the state and the updater function for that state will be passed in as a prop from PetShow

import React, { useState } from "react"
import { Modal } from "react-bootstrap"

import ToyForm from "../shared/ToyForm"
import messages from "../shared/AutoDismissAlert/messages"
import { createToy } from '../../api/toy'

// api call needed!!

// we'll also need the same props we're passing to ToyForm if they come from the parent

const NewToyModal = (props) => {
    const { pet, show, handleClose, msgAlert, triggerRefresh } = props
    
    // new piece of state, initial value is an empty object
    // we'll build this object out, using our handleChange function
    const [toy, setToy] = useState([])


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

        // make api call
        createToy(pet, toy)
            // close the modal
            .then(() => handleClose())
            // notify user of success
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createToySuccess,
                    variant: 'success'
                })
            })
            // refresh the parent page (component)
            .then(() => triggerRefresh())
            // set toy back to initial state to clear out form
            .then(() => setToy({}))
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ToyForm 
                    toy={toy}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${pet.name} a toy!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewToyModal