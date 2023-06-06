const filterObj = (obj: Object) =>
  Object.fromEntries(Object.entries(obj).filter(([key, value]) => !!value))

export default filterObj
