const getAuthUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const onFocusLost = (e, ref, isFocused, setIsFocuced) => {
  if(isFocused && ref.current && !ref.current.contains(e.target))
  setIsFocuced(false)
}

export { getAuthUser, onFocusLost };