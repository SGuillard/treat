const updateObject = (oldObject: object, updatedProperties: object) => ({
  ...oldObject,
  ...updatedProperties,
});

export default updateObject;
