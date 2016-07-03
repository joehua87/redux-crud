import { PropTypes } from 'react';

export const queryListPropTypes = {
  entities: PropTypes.object.isRequired,
  filterFields: PropTypes.array.isRequired,
  loadEntities: PropTypes.func.isRequired,
  showFilterGuide: PropTypes.func.isRequired,
  closeDetail: PropTypes.func.isRequired,
  closeFilterGuide: PropTypes.func.isRequired,
  selected: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  isShowDetail: PropTypes.bool.isRequired,
  isShowFilterGuide: PropTypes.bool.isRequired,
};

export const editableListPropTypes = {
  ...queryListPropTypes,
  edit: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  submitEdit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  submitRemove: PropTypes.func.isRequired,
};
