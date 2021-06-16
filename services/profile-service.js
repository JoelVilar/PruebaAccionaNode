const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

async function initData(){
        const res = await fetch('https://randomuser.me/api/?page=1&results=100&seed=abc')
        const data = await res.json()
        apiData = data.results
}

const favLists = [{ name : '' , data : [] }]
let apiData = initData()

router.get('', (req,res) =>{
    res.send(apiData)
})

router.get('/favs', (req,res) => {
    res.send( favLists )
})

router.get('/favs/:listName', (req,res) => {
    const listSelected = data.filter(lista => lista.name.match(req.params.listName))
    res.send( listSelected.length > 0 ? listSelected : [] )
})

router.get('/:profileId', (req,res) => {
    let requestedProfile = {}
    apiData.filter( profile => profile.login.uuid.match(req.params.profileId) ? requestedProfile = profile : profile)
    res.send(requestedProfile)
})

router.post('/favs', (req,res) => {
    let favList = req.body
    favList.length > 0 ?? favLists.push(favList)
    res.send(favList)
})

router.post('', (req,res) => {
    let profileList = req.body
    console.log(req.body)
    if(profileList.length > 0){
        apiData = profileList
    }
    res.send(profileList.slice(0,2))
})

module.exports = router