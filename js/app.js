
/* =================================
   SCHOOL MANAGEMENT SYSTEM
   LOCAL STORAGE DATABASE
================================= */

const DB = {

    get(key, fallback = []) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : fallback;
        } catch (error) {
            console.error("Database read error:", error);
            return fallback;
        }
    },

    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

};

/* INITIAL DATABASE */

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

/* SCHOOL FUNCTIONS */

function getSchools() {
    return DB.get("schools");
}

function addSchool(name, campus) {

    const schools = getSchools();

    const school = {
        id: "SCH" + Date.now(),
        name: name,
        campus: campus,
        status: "Active",
        createdAt: new Date().toISOString()
    };

    schools.push(school);

    DB.save("schools", schools);

    return school;
}

/* STUDENT FUNCTIONS */

function getStudents() {
    return DB.get("students");
}

function addStudent(student) {

    const students = getStudents();

    const newStudent = {
        ...student,
        id: "STU" + Date.now(),
        createdAt: new Date().toISOString()
    };

    students.push(newStudent);

    DB.save("students", students);

    return newStudent;
}

function updateStudent(id, updatedData) {

    const students = getStudents();

    const index = students.findIndex(
        student => student.id === id
    );

    if (index === -1) return false;

    students[index] = {
        ...students[index],
        ...updatedData,
        id: students[index].id
    };

    DB.save("students", students);

    return true;
}

function deleteStudent(id) {

    const students = getStudents();

    const updatedStudents = students.filter(
        student => student.id !== id
    );

    DB.save("students", updatedStudents);

}

/* TEACHER FUNCTIONS */

function getTeachers() {
    return DB.get("teachers");
}

function addTeacher(teacher) {

    const teachers = getTeachers();

    const newTeacher = {
        ...teacher,
        id: "TCH" + Date.now(),
        subjects: Array.isArray(teacher.subjects)
            ? teacher.subjects.slice(0, 8)
            : [],
        createdAt: new Date().toISOString()
    };

    teachers.push(newTeacher);

    DB.save("teachers", teachers);

    return newTeacher;
}

function updateTeacher(id, updatedData) {

    const teachers = getTeachers();

    const index = teachers.findIndex(
        teacher => teacher.id === id
    );

    if (index === -1) return false;

    teachers[index] = {
        ...teachers[index],
        ...updatedData,
        id: teachers[index].id
    };

    DB.save("teachers", teachers);

    return true;
}

function deleteTeacher(id) {

    const teachers = getTeachers();

    const updatedTeachers = teachers.filter(
        teacher => teacher.id !== id
    );

    DB.save("teachers", updatedTeachers);

}

/* ATTENDANCE FUNCTIONS */

function getAttendance() {
    return DB.get("attendance");
}

function saveAttendance(record) {

    const records = getAttendance();

    const newRecord = {
        ...record,
        id: "ATT" + Date.now(),
        createdAt: new Date().toISOString()
    };

    records.push(newRecord);

    DB.save("attendance", records);

    return newRecord;
}

/* FEES FUNCTIONS */

function getFees() {
    return DB.get("fees");
}

function addFee(payment) {

    const fees = getFees();

    const newPayment = {
        ...payment,
        id: "FEE" + Date.now(),
        createdAt: new Date().toISOString()
    };

    fees.push(newPayment);

    DB.save("fees", fees);

    return newPayment;
}

/* EXAM FUNCTIONS */

function getExams() {
    return DB.get("exams");
}

function addExam(exam) {

    const exams = getExams();

    const newExam = {
        ...exam,
        id: "EXM" + Date.now(),
        createdAt: new Date().toISOString()
    };

    exams.push(newExam);

    DB.save("exams", exams);

    return newExam;
}

/* TIMETABLE FUNCTIONS */

function getTimetable() {
    return DB.get("timetable");
}

function addTimetable(entry) {

    const timetable = getTimetable();

    const newEntry = {
        ...entry,
        id: "TIME" + Date.now(),
        createdAt: new Date().toISOString()
    };

    timetable.push(newEntry);

    DB.save("timetable", timetable);

    return newEntry;
}

/* DATABASE START */

initializeDatabase();

console.log("School Management Database Initialized!");
console.log("Students:", getStudents().length);
console.log("Teachers:", getTeachers().length);
