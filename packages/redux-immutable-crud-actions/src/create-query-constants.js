// @flow

export default function createQueryConstants(name: string, { keyField }: { keyField: string } = {}) {
  return {
    keyField: keyField || '_id',

    SELECT: `${name}/SELECT`,

    LOAD_ENTITIES_START: `${name}/LOAD_ENTITIES_START`,
    LOAD_ENTITIES_SUCCESS: `${name}/LOAD_ENTITIES_SUCCESS`,
    LOAD_ENTITIES_FAIL: `${name}/LOAD_ENTITIES_FAIL`,

    LOAD_MORE_START: `${name}/LOAD_MORE_START`,
    LOAD_MORE_SUCCESS: `${name}/LOAD_MORE_SUCCESS`,
    LOAD_MORE_FAIL: `${name}/LOAD_MORE_FAIL`,

    LOAD_DETAIL_START: `${name}/LOAD_DETAIL_START`,
    LOAD_DETAIL_SUCCESS: `${name}/LOAD_DETAIL_SUCCESS`,
    LOAD_DETAIL_FAIL: `${name}/LOAD_DETAIL_FAIL`,
    CLOSE_DETAIL: `${name}/CLOSE_DETAIL`,

    SHOW_FILTER_GUIDE_START: `${name}/SHOW_FILTER_GUIDE_START`,
    SHOW_FILTER_GUIDE_SUCCESS: `${name}/SHOW_FILTER_GUIDE_SUCCESS`,
    SHOW_FILTER_GUIDE_FAIL: `${name}/SHOW_FILTER_GUIDE_FAIL`,
    CLOSE_FILTER_GUIDE: `${name}/CLOSE_FILTER_GUIDE`,

    CHANGE_FILTER_STRING: `${name}/CHANGE_FILTER_STRING`,
    DISMISS_NOTIFICATION: `${name}/DISMISS_NOTIFICATION`,
  }
}
