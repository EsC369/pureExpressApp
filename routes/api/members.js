const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid");

// Since the routes will be basically called from the app file, meaning it will always be looking in /api/members, so no need to have that in the code.
router.get("/", (req, res) => {
    res.json(members);
});

// Get single member:
router.get("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
        // res.send(req.params.id);
        // res.json(req.params.id);
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`}); // send 400  bad request member error and display json msg.
    }
});


// Old Way ---- When modularizing, had to change from app, to router.
// Gets all members
// app.get("/api/members", (req, res) => {
//     res.json(members);
// });

// // Get single member:
// app.get("/api/members/:id", (req, res) => {
//     const found = members.some(member => member.id === parseInt(req.params.id));
//     if(found) {
//         res.json(members.filter(member => member.id === parseInt(req.params.id)));
//         // res.send(req.params.id);
//         // res.json(req.params.id);
//     }else{
//         res.status(400).json({ msg: `No member with the id of ${req.params.id}`}); // send 400  bad request member error and display json msg.
//     }
// });


// Create Member:
router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    };
    // res.send(req.body);
    if(!newMember.name || !newMember.email) {
        res.status(400).json({ msg: "Please include a name and email"});
    }
    // if db more like:   members.save(newMember);
    members.push(newMember);
    // render template:
    // res.redirect("/");
    res.json(members); // for front end
});

// Update Member:
router.put("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;  // if member.name =  if it does the equald updated member.name else member.name (stays the same)
                member.email = updateMember.email ? updateMember.email : member.email;   // Basically "ternary operator" if changed info was sent, then change it to what was sent, otherwise keep it the same.
                res.json({ msg: "Member updated", member});
            }
        });
        // res.send(req.params.id);
        // res.json(req.params.id);
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`}); // send 400  bad request member error and display json msg.
    }
});

// Delete Member:
// Get single member:
router.delete("/:id", (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json({ msg: "Member deleted", members: members.filter(member => member.id !== parseInt(req.params.id)) 
    });
        // res.send(req.params.id);
        // res.json(req.params.id);
    }else{
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`}); // send 400  bad request member error and display json msg.
    }
});

module.exports = router;