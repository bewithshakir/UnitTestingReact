/**
 * Returns node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} val - Value of data-test attribute to search. 
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper: any, val: any)=> wrapper.find(`[data-test="${val}"]`);

export const findByIdAttr = (wrapper: any, val: any)=> wrapper.find(`#${val}`);