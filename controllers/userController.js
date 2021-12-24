const Student = require('../models/Student')

module.exports.home_get = async (req, res) => {
    const students = await Student.find({ createdBy: res.locals.user._id })
    res.render('user/home', { students })
}

module.exports.add_student_post = async (req, res) => {
    const newStudent = new Student({
        name: req.body.name,
        dob: new Date(req.body.dob),
        school: req.body.school,
        class: req.body.class,
        division: req.body.division,
        status: req.body.status,
        createdBy: res.locals.user._id
    });
    newStudent.save(err => {
        if (err) {
            console.log(err)
            res.redirect('/errorAddingStudent')
        }
        else
            res.redirect('/')
    });
}

module.exports.delete_student_get = async (req, res) => {
    Student.findOneAndDelete({ _id: req.params.id }, function (err, docs) {
        if (err) {
            console.log(err)
            res.redirect('/errorDeletingStudent')
        }
        else {
            res.redirect('/')
        }
    })
}

module.exports.edit_student_post = async (req, res) => {
    Student.findOneAndUpdate({ _id: req.body.id },
        {
            name: req.body.name,
            dob: req.body.dob,
            school: req.body.school,
            class: req.body.class,
            division: req.body.division,
            status: req.body.status
        }, function (err, doc) {
            if (err) {
                console.log(err)
                res.redirect('/errorEditingStudent')
            }
            else {
                res.redirect('/')
            }
        })
}
