import { expect } from 'chai'
import createEditableConstants from '../create-editable-constants'
import createEditableSagas from '../create-editable-sagas'

const constants = createEditableConstants('postCategory')

let editableSagas

describe('Create Editable Sagas', () => {
  editableSagas = createEditableSagas({ constants })
  it('success', () => {
    expect(editableSagas).to.have.property('submitAddSaga')
    expect(editableSagas).to.have.property('submitEditSaga')
    expect(editableSagas).to.have.property('submitRemoveSaga')
    expect(editableSagas).to.have.property('createSaga')
    expect(editableSagas).to.have.property('editSaga')
    expect(editableSagas).to.have.property('list')
  })
})

describe('submitAddSaga', () => {

})

describe('submitEditSaga', () => {

})

describe('submitRemoveSaga', () => {

})

describe('createSaga', () => {

})

describe('editSaga', () => {

})
