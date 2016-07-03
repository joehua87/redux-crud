import createQueryConstants from '../create-editable-constants';
import { expect } from 'chai';

describe('Create Editable Constants', () => {
  const constants = createQueryConstants('post');
  const {
    CREATE_START,
    CREATE_SUCCESS,
    CREATE_FAIL,

    ADD,
    CANCEL_ADD,

    SUBMIT_ADD_START,
    SUBMIT_ADD_SUCCESS,
    SUBMIT_ADD_FAIL,

    EDIT,
    CANCEL_EDIT,

    SUBMIT_EDIT_START,
    SUBMIT_EDIT_SUCCESS,
    SUBMIT_EDIT_FAIL,

    REMOVE,
    CANCEL_REMOVE,

    SUBMIT_REMOVE_START,
    SUBMIT_REMOVE_SUCCESS,
    SUBMIT_REMOVE_FAIL,
  } = constants;

  it('Create', () => {
    expect(CREATE_START).to.equal('post/CREATE_START');
    expect(CREATE_SUCCESS).to.equal('post/CREATE_SUCCESS');
    expect(CREATE_FAIL).to.equal('post/CREATE_FAIL');
  });

  it('Add', () => {
    expect(ADD).to.equal('post/ADD');
    expect(CANCEL_ADD).to.equal('post/CANCEL_ADD');
    expect(SUBMIT_ADD_START).to.equal('post/SUBMIT_ADD_START');
    expect(SUBMIT_ADD_SUCCESS).to.equal('post/SUBMIT_ADD_SUCCESS');
    expect(SUBMIT_ADD_FAIL).to.equal('post/SUBMIT_ADD_FAIL');
  });

  it('Edit', () => {
    expect(EDIT).to.equal('post/EDIT');
    expect(CANCEL_EDIT).to.equal('post/CANCEL_EDIT');
    expect(SUBMIT_EDIT_START).to.equal('post/SUBMIT_EDIT_START');
    expect(SUBMIT_EDIT_SUCCESS).to.equal('post/SUBMIT_EDIT_SUCCESS');
    expect(SUBMIT_EDIT_FAIL).to.equal('post/SUBMIT_EDIT_FAIL');
  });

  it('Edit', () => {
    expect(REMOVE).to.equal('post/REMOVE');
    expect(CANCEL_REMOVE).to.equal('post/CANCEL_REMOVE');
    expect(SUBMIT_REMOVE_START).to.equal('post/SUBMIT_REMOVE_START');
    expect(SUBMIT_REMOVE_SUCCESS).to.equal('post/SUBMIT_REMOVE_SUCCESS');
    expect(SUBMIT_REMOVE_FAIL).to.equal('post/SUBMIT_REMOVE_FAIL');
  });
});
