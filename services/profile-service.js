const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

async function initData(){
        const res = await fetch('https://randomuser.me/api/?page=1&results=100&seed=abc')
        const data = await res.json()
        apiData = data.results
}

const favLists = []
let apiData = initData()

router.get('', (req,res) =>{
    res.send(apiData)
})

router.get('/favs', (req,res) => {
    res.send( favLists )
})

router.get('/favs/:listName', (req,res) => {
    const listSelected = favLists.find(lista => lista.name.match(req.params.listName))
    res.send( listSelected ? listSelected : {} )
})

router.get('/:profileId', (req,res) => {
    let requestedProfile = {}
    apiData.filter( profile => profile.login.uuid.match(req.params.profileId) ? requestedProfile = profile : profile)
    res.send(requestedProfile)
})

router.post('/favs', (req,res) => {
    let favList = req.body
    if(favList){
        let existingFavList = favLists.some(list => list.name.match(favList.name))
        if(existingFavList) {
            let existingProfile = favLists.find(list => list.name.match(favList.name))
            const profileUuid = favList.profile.login.uuid
            if(existingProfile.data.some(profile => profile.login.uuid.includes(profileUuid))) {
                favLists.map(list => 
                    list.name.match(favList.name) ?
                        list.data = list.data.filter( profile => !profile.login.uuid.match(profileUuid)) : list
                )
                res.send({ msg: "Profile removed succesfully." })
            }else{
                favLists.map(list => list.name.match(favList.name) ? list.data.push(favList.profile) : list)
                res.send({ msg: "Profile added succesfully." })
            }
        }else{
            favLists.push({
                        name: favList.name,
                        data: [ favList.profile ]
                    })
            res.send({ msg: "Profile added succesfully." })
        }
    }else{
        res.send({ msg: "Something went wrong, try again." })
    }
})

router.post('', (req,res) => {
    let profileList = req.body
    if(profileList.length > 0){
        apiData = profileList
    }
    res.send(profileList.slice(0,2))
})

module.exports = router