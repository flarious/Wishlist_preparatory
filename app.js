// Author : Nattawut Klinsawas (Nut)

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const port = 5000

const courseDetail = [
    { code: "CSS101", name: "Introduction JS", semester: 1, active: true },
    { code: "CSS102", name: "Introduction ExpressJS", semester: 2, active: false },
    { code: "CSS201", name: "Web programming ", semester: 1, active: false },
    { code: "CSS202", name: "Database", semester: 2, active: true },
    { code: "CSS999", name: "How to win a lottery", semester: 3, active: true }
]

const lecturerDetail = [
    { name: "Tony Stark", department: "TECH", teachingHours: 100 },
    { name: "Harry Potter", department: "MAGIC", teachingHours: 50 }
]

// Item 2
app.get('/hello', (req, res) => {
    res.send('hello endpoint')
})

// Item 3
app.get('/helloJson', (req, res) => {
    res.json({ message: "Hello JSON" })
})

// Item 4
app.post('/concat', (req, res) => {
    res.json({ concat_string: req.body.str1.concat("-", req.body.str2.toUpperCase()) })
})

// Item 5, 7, 9
app.get('/course', (req, res) => {
    var data = []

    // Item 7 and 9
    if (req.query.length !== 0) {
        data = courseDetail.filter((course) => {
            for (let key in req.query) {
                if (course[key] !== undefined && course[key].toString() !== req.query[key]) {
                    return false
                }
            }
            return true
        })
    }
    // Item 5
    else {
        data = courseDetail
    }

    res.json({ data: data })
})

// Item 6
app.get('/course/:course_code', (req, res) => {
    var searched = courseDetail.find(course => course.code === req.params.course_code)
    if(searched !== undefined) {
        res.json({ data: searched })
    }
    else {
        res.send("Not found")
    }
    
})

// Part of item 10
app.post('/course', (req, res) => {
    courseDetail.push(req.body)
    res.json({ data: req.body })
})

// Part of item 10
app.put('/course/:course_code', (req, res) => {
    var searched = courseDetail.find(course => course.code === req.params.course_code)

    if(searched !== undefined) {
        courseDetail.splice(courseDetail.indexOf(searched), 1)
        courseDetail.push(req.body)
        res.json({ data: req.body })
    }
    else {
        res.send("Not found")
    }

})

// Part of item 10
app.delete('/course/:course_code', (req, res) => {
    var searched = courseDetail.find(course => course.code === req.params.course_code)
    
    if(searched !== undefined) {
        var deletedCourse = courseDetail.splice(courseDetail.indexOf(searched), 1)
        res.json({ data: deletedCourse[0] })
    }
    else {
        res.send("Not found")
    }
    
})

// Item 8
app.post('/lecturer', (req, res) => {
    lecturerDetail.push(req.body)
    res.json({ data: req.body })
})

// Item 1
app.listen(port, () => {
    console.log('Server was started at', port)
})