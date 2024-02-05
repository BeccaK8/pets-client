// PetCreate is going to render a form
// This form will build a pet object in state
// Once the form has been used to build that object,
// we can submit it as part of an API request
// That will be a POST request, and an API function that we import
// We'll want to send success/failure messages
// on success, redirect to the new pet's show page
// upon failure, component should send a message, clear the form, and remain on the same page
// we'll build a form in another file that we can use in multiple places
// because our Pet Create and Pet Update will use the same form inputs

import { useState } from 'react'

import PetForm from '../shared/PetForm'

const PetCreate = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // build our state object
    const [pet, setPet] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    const onChange = (evt) => {
        // evt is the placeholder for the event
        // evt.persist() handles the virtual dom because React uses the virtual dom 
        // we want our form data to persist every time the page renders, which will be a lot of times
        evt.persist()

        // if you pass an argument to the callback function of your state hook updater/setter
        // that argument is a placeholder for the most recent state
        // this will maintain our state, anything you have typed before the  next letter
        setPet( prevPet => {
            const updatedName = evt.target.name
            let updatedValue = evt.target.value

            // the above two items work great for strings
            // however we need to handle numbers and booleans as well
            if (evt.target.type === 'number') {
                // if the target is a number, parse integers from the value
                updatedValue = parseInt(evt.target.value)
            }

            // to handle checkbox, we need to tell it when to send true and when to send false
            // because the default values for a checkbox are 'checked' or 'unchecked'
            // we need to convert those to the appropriate boolean value
            if (updatedName === 'adoptable' && evt.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !evt.target.checked) {
                updatedValue = false
            }

            // this will actually build our pet object
            // we grab an attribute name and assign the respective value
            const updatedPet = { [updatedName] : updatedValue }

            // to keep all the old stuff and add the newly typed letters, numbers, etc.
            return {
                ...prevPet, ...updatedPet
            }
        })
    }

    console.log('the pet inside create: \n', pet)
    return (
        <PetForm 
            pet={pet}
            handleChange={onChange}
            handleSubmit={() => {console.log('handle submit')}}
            heading="Add a New Pet"
        />
    )
}

export default PetCreate
