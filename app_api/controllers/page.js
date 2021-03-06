const mongoose = require('mongoose');
const Lists = mongoose.model('List');

const getAllLists = (req, res) => {
  Lists
    .find()
    .exec((napaka, lists) => {
      res.status(200).json(lists);
    });
};

const addNewList = (req, res) => {
  console.log(req.body.title);

    var newList = new Lists(req.body);
    // save model to database
    newList.save(function (err, list1) {
      if (err){
        res.status(500).json({"status": "error"});
         return console.error(err);
       }
      res.status(200).json({"status": "uspešno"});
      console.log(list1.title + " saved to Lists collection.");
    });


};

const getListById = (req, res) => {

  Lists
    .findById(req.params.idList)
    .exec((napaka, list) => {

      if (!list) {
        return res.status(404).json({
          "message":
            "Can't find the specified list"
        });
      } else if (napaka) {
        return res.status(500).json(napaka);
      }


      res.status(200).json(list);
    });
};

const addNewTask = (req, res) => {

  console.log("ddddd");
  console.log(req.params.idList);
  Lists.findById(req.params.idList).exec((napaka, list) => {
    console.log(req.body);
    list.tasks.push(req.body);
    list.save(function (err, list1) {
      if (err){
        res.status(500).json({"status": "error"});
        console.log("slabo");
         return console.error(err);
       }
       console.log("haha");
      res.status(200).json({"status": "uspešno"});
      console.log(list1.title + " saved.");
    });

  });

};

const markTaskAsDone = (req, res) => {
  console.log("ddddd");
  console.log(req.params.idList);
  Lists.findById(req.params.idList).exec((napaka, list) => {
    console.log(list.tasks);
    console.log(req.body.taskId);
    for(var i = 0; i<list.tasks.length; i++){
      if(list.tasks[i]._id == req.body.taskId){
        list.tasks[i].done = true;
      }
    }
    console.log(list.tasks);
    list.save(function (err, list1) {
      if (err){
        res.status(500).json({"status": "error"});
        console.log("slabo");
         return console.error(err);
       }
      res.status(200).json({"status": "uspešno"});
      console.log(list1.title + " saved.");
    });

  });

};


const updateList = (req, res) => {
  console.log("ddddd");
  console.log(req.params.idList);
  Lists.findById(req.params.idList).exec((napaka, list) => {
    console.log(list.tasks);
    console.log(req.body);
    list.tasks = req.body.tasks;
    console.log(list.tasks);
    list.save(function (err, list1) {
      if (err){
        res.status(500).json({"status": "error"});
        console.log("slabo");
         return console.error(err);
       }
      res.status(200).json({"status": "uspešno"});
      console.log(list1.title + " saved.");
    });

  });

};


const deleteTask = (req, res) => {
  Lists.findById(req.params.idList).exec((napaka, list) => {
    console.log(list.tasks);
    console.log(req.body.taskId);
    for(var i = 0; i<list.tasks.length; i++){
      if(list.tasks[i]._id == req.body.taskId){
        list.tasks.splice(i, 1);
        break;
      }
    }
    console.log(list.tasks);
    list.save(function (err, list1) {
      if (err){
        res.status(500).json({"status": "error"});
        console.log("slabo");
         return console.error(err);
       }
      res.status(200).json({"status": "uspešno"});
      console.log(list1.title + " saved.");
    });

  });

};

const deleteList = (req, res) => {
  Lists.findById(req.params.idList).exec((napaka, list) => {
    list.remove(function (err, list1) {
      if (err){
        res.status(500).json({"status": "error"});
        console.log("slabo");
         return console.error(err);
       }
      console.log(list1.title + " saved.");
    });

  });
  res.status(200).json({"status": "uspešno"});
};

module.exports = {
  getAllLists,
  addNewList,
  addNewTask,
  getListById,
  updateList,
  markTaskAsDone,
  deleteTask,
  deleteList
};
