import { createSlice } from "@reduxjs/toolkit";
const data = [{
  "id": 1,
  "first_name": "Jonathan",
  "last_name": "Nzete",
  "email": "nzejoe@company.com",
  "gender": "Genderqueer",
  "password": "godknows2",
  "avatar": "https://robohash.org/cumqueremrepudiandae.png?size=100x100&set=set1"
}, {
  "id": 2,
  "first_name": "Maya",
  "last_name": "Jonathan",
  "email": "maya@company.com",
  "gender": "Genderfluid",
  "password": "godknows2",
  "avatar": "https://robohash.org/dignissimosaperiamvoluptate.png?size=100x100&set=set1"
}, {
  "id": 3,
  "first_name": "Maxine",
  "last_name": "Jonathan",
  "email": "maxine@company.com",
  "gender": "Bigender",
  "password": "godknows2",
  "avatar": "https://robohash.org/adipiscierrorvoluptatem.png?size=100x100&set=set1"
}, {
  "id": 4,
  "first_name": "Arnuad",
  "last_name": "Tute",
  "email": "error: Function 'lover' not found",
  "gender": "Genderfluid",
  "password": "indonesian",
  "avatar": "https://robohash.org/anisidolorem.png?size=100x100&set=set1"
}, {
  "id": 5,
  "first_name": "Sidonnie",
  "last_name": "Perulli",
  "email": "error: Function 'lover' not found",
  "gender": "Genderfluid",
  "password": "apache",
  "avatar": "https://robohash.org/cumaspernaturenim.png?size=100x100&set=set1"
}, {
  "id": 6,
  "first_name": "Kissiah",
  "last_name": "Verryan",
  "email": "error: Function 'lover' not found",
  "gender": "Female",
  "password": "delaware",
  "avatar": "https://robohash.org/providentmaioresnulla.png?size=100x100&set=set1"
}, {
  "id": 7,
  "first_name": "Mariska",
  "last_name": "Oldham",
  "email": "error: Function 'lover' not found",
  "gender": "Bigender",
  "password": "peruvian",
  "avatar": "https://robohash.org/nonmolestiasadipisci.png?size=100x100&set=set1"
}, {
  "id": 8,
  "first_name": "Helene",
  "last_name": "Greyes",
  "email": "error: Function 'lover' not found",
  "gender": "Genderqueer",
  "password": "american indian and alaska native (aian)",
  "avatar": "https://robohash.org/voluptaseligendiea.png?size=100x100&set=set1"
}, {
  "id": 9,
  "first_name": "Angeli",
  "last_name": "Thoday",
  "email": "error: Function 'lover' not found",
  "gender": "Non-binary",
  "password": "fijian",
  "avatar": "https://robohash.org/doloremquevelalias.png?size=100x100&set=set1"
}, {
  "id": 10,
  "first_name": "Claiborne",
  "last_name": "Heales",
  "email": "error: Function 'lover' not found",
  "gender": "Bigender",
  "password": "malaysian",
  "avatar": "https://robohash.org/facilisanimiet.png?size=100x100&set=set1"
}]


const userSlice = createSlice({
    name: "users",
    initialState: {
        users: data,
        isAuthenticated: false,
        authenticatedUser:{}
    },
    reducers:{
        
    }
})

export const userReducer = userSlice.reducer;

const userAction = userSlice.actions;

export default userAction;