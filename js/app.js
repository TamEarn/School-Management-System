
/* =================================
   SCHOOL MANAGEMENT SYSTEM
   LOCAL STORAGE DATABASE
================================= */

const DB = {

    get(key, fallback = []) {
        try {
            return JSON.parse(localStorage.getItem(key)) ?? fallback;
        } catch {
            return fallback;
        }
    },

    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

};

// INITIAL DATABASE

function initializeDatabase() {

    if (!localStorage.getItem("schools")) {

        DB.save("schools", [
            {
                id: "SCH001",
                name: "Main School",
                campus: "Main Campus",
                status: "Active"
            },
            {
                id: "SCH002",
                name: "City School",
                campus: "City Campus",
                status: "Active"
            },
            {
                id: "SCH003",
                name: "Model School",
                campus: "Model Campus",
                status: "Active"
            }
        ]);

    }

    const collections = [
        "students",
        "teachers",
        "attendance",
        "fees",
        "exams",
        "timetable"
    ];

    collections.forEach(key => {

        if (!localStorage.getItem(key)) {
            DB.save(key, []);
        }

    });

}

// SCHOOL FUNCTIONS

function getSchools() {
    return DB.get("schools");
}

function addSchool(name, campus) {

    const schools = getSchools();

    schools.push({
        id: "SCH" + Date.now(),
        name,
        campus,
        status: "Active"
    });

    DB.save("schools", schools);

}

// STUDENT FUNCTIONS

function getStudents() {
    return DB.get("students");
}

function addStudent(student) {

    const students = getStudents();

    student.id = "STU" + Date.now();
    student.createdAt = new Date().toISOString();

    students.push(student);

    DB.save("students", students);

    return student;

}

// TEACHER FUNCTIONS

function getTeachers() {
    return DB.get("teachers");
}

function addTeacher(teacher) {

    const teachers = getTeachers();

    teacher.id = "TCH" + Date.now();

    teachers.push(teacher);

    DB.save("teachers", teachers);

}

// ATTENDANCE FUNCTIONS

function getAttendance() {
    return DB.get("attendance");
}

function saveAttendance(record) {

    const records = getAttendance();

    records.push({
        ...record,
        id: "ATT" + Date.now()
    });

    DB.save("attendance", records);

}

// FEES FUNCTIONS

function getFees() {
    return DB.get("fees");
}

function addFee(payment) {

    const fees = getFees();

    fees.push({
        ...payment,
        id: "FEE" + Date.now()
    });

    DB.save("fees", fees);

}

// EXAM FUNCTIONS

function getExams() {
    return DB.get("exams");
}

function addExam(exam) {

    const exams = getExams();

    exams.push({
        ...exam,
        id: "EXM" + Date.now()
    });

    DB.save("exams", exams);

}

// TIMETABLE FUNCTIONS

function getTimetable() {
    return DB.get("timetable");
}

function addTimetable(entry) {

    const timetable = getTimetable();

    timetable.push({
        ...entry,
        id: "TIME" + Date.now()
    });

    DB.save("timetable", timetable);

}

// START DATABASE

initializeDatabase();

console.log("School Management Database Initialized!");
