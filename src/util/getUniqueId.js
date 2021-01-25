const getUniqueId = (prefix) => (
  `${prefix}${Date.now()}`
)

export default getUniqueId;
