const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../modules/Notes");
const { body, validationResult } = require("express-validator");
const { route } = require("./auth");
//ROUTE 1 : fetch all notes using get - login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some internal server error occured");
  }
});

//ROUTE 2 : add a new note using post - login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Please enter valid tile").isLength({ min: 3 }),
    body("description", "Please enter valid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Handling validation error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savenote = await note.save();

      res.send(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some internal server error occured");
    }
  }
);

//ROUTE 3 : update a existing notes using put - login required
router.put('/updatenote/:id', fetchuser, async (req, res)=>{

  const{title, description, tag}=req.body;

  //create a new note obj
  const newNote = {};
  if(title) {newNote.title = title};
  if(description) {newNote.description = description};
  if(tag) {newNote.tag = tag};

  // // check note is existing or not
  var note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not Found");}

  const id =note.user;
  console.log(id);
  console.log(req.user.id);

  //check logged user id and note's user id is same or not
  if(note.user.toString() != req.user.id){
    return res.status(401).send("Not Allowed !");
  }

  //find the note to be updated and update it
  note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true});
  
  res.send(note);
});


module.exports = router;
