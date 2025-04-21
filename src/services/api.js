import axios from "axios";

// Base API URL
export const API_URL = "http://localhost:5000"; // Change this 

// ------------------------ ADMIN API ------------------------
export const fetchAdmins = () => axios.get(`${API_URL}/api/admin`);
export const fetchAdminById = (id) => axios.get(`${API_URL}/api/admin/${id}`);

// --------------------- ADMISSION API -----------------------
export const createAdmission = (admission) => axios.post(`${API_URL}/admissions/add`, admission);
export const fetchAdmissions = () => axios.get(`${API_URL}/admissions`);
export const fetchAdmissionById = (id) => axios.get(`${API_URL}/admissions/${id}`);
export const updateAdmission = (id, admission) => axios.put(`${API_URL}/admissions/update/${id}`, admission);
export const deleteAdmission = (id) => axios.delete(`${API_URL}/admissions/delete/${id}`);
export const filterAdmissions = (status) => axios.get(`${API_URL}/admissions/filter?status=${status}`);

// --------------------- APPLICATIONS API ---------------------
export const fetchApplications = () => axios.get(`${API_URL}/applications`);
export const fetchApplicationById = (id) => axios.get(`${API_URL}/applications/${id}`);
export const createApplication = (application) => axios.post(`${API_URL}/applications`, application);
export const updateApplication = (id, application) => axios.put(`${API_URL}/applications/${id}`, application);
export const deleteApplication = (id) => axios.delete(`${API_URL}/applications/${id}`);

// ------------------------ COLLEGE API ------------------------
export const createCollege = (college) => axios.post(`${API_URL}/colleges/add`, college);
export const fetchColleges = () => axios.get(`${API_URL}/colleges`);
export const fetchCollegeById = (id) => axios.get(`${API_URL}/colleges/${id}`);
export const updateCollege = (id, college) => axios.put(`${API_URL}/colleges/update/${id}`, college);
export const deleteCollege = (id) => axios.delete(`${API_URL}/colleges/delete/${id}`);

// ------------------------ COURSE API ------------------------
export const createCourse = (course) => axios.post(`${API_URL}/courses/add`, course);
export const fetchCourses = () => axios.get(`${API_URL}/courses`);
export const fetchCourseById = (id) => axios.get(`${API_URL}/courses/${id}`);
export const updateCourse = (id, course) => axios.put(`${API_URL}/courses/update/${id}`, course);
export const deleteCourse = (id) => axios.delete(`${API_URL}/courses/delete/${id}`);
export const fetchCoursesByAffiliation = (affiliation) => axios.get(`${API_URL}/courses/by-affiliation?affiliation=${affiliation}`);
export const searchCourses = (affiliation, keyword) => axios.get(`${API_URL}/courses/search?affiliation=${affiliation}&keyword=${keyword}`);

// ----------------------- ENROLLMENT API -----------------------
export const createEnrollment = (enrollment) => axios.post(`${API_URL}/enrollments`, enrollment);
export const fetchEnrollments = () => axios.get(`${API_URL}/enrollments`);
export const fetchEnrollmentById = (id) => axios.get(`${API_URL}/enrollments/${id}`);
export const updateEnrollment = (id, enrollment) => axios.put(`${API_URL}/enrollments/${id}`, enrollment);
export const deleteEnrollment = (id) => axios.delete(`${API_URL}/enrollments/${id}`);

// ------------------------- NOTE API -------------------------
export const createNote = (note) => axios.post(`${API_URL}/notes/add`, note);
export const fetchNotes = () => axios.get(`${API_URL}/notes`);
export const fetchNoteById = (id) => axios.get(`${API_URL}/notes/${id}`);
export const fetchRecentNotes = () => axios.get(`${API_URL}/notes/recent`);
export const updateNote = (id, note) => axios.put(`${API_URL}/notes/update/${id}`, note);
export const deleteNote = (id) => axios.delete(`${API_URL}/notes/delete/${id}`);
export const searchNotes = (query) => axios.get(`${API_URL}/notes/search?query=${query}`);

// ------------------------- SEARCH API -------------------------
export const globalSearch = (query) => axios.get(`${API_URL}/api/search?query=${query}`);

// ------------------------ SYLLABUS API ------------------------
export const fetchSyllabus = () => axios.get(`${API_URL}/api/syllabus`);
export const fetchSyllabusById = (id) => axios.get(`${API_URL}/api/syllabus/${id}`);
export const createSyllabus = (syllabus) => axios.post(`${API_URL}/api/syllabus`, syllabus);
export const updateSyllabus = (id, syllabus) => axios.put(`${API_URL}/api/syllabus/${id}`, syllabus);
export const deleteSyllabus = (id) => axios.delete(`${API_URL}/api/syllabus/${id}`);

// ------------------------ TRAINING API ------------------------
export const fetchTrainings = () => axios.get(`${API_URL}/api/trainings`);
export const fetchRecentTrainings = () => axios.get(`${API_URL}/api/trainings/recent`);
export const fetchTrainingById = (id) => axios.get(`${API_URL}/api/trainings/${id}`);
export const createTraining = (training) => axios.post(`${API_URL}/api/trainings/add`, training);
export const updateTraining = (id, training) => axios.put(`${API_URL}/api/trainings/update/${id}`, training);
export const deleteTraining = (id) => axios.delete(`${API_URL}/api/trainings/delete/${id}`);

// -------------------------- USER API --------------------------
export const createUser = (user) => axios.post(`${API_URL}/api/users`, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/api/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/api/users/${id}`);
export const fetchUserById = (id) => axios.get(`${API_URL}/api/users/${id}`);
export const fetchUsers = () => axios.get(`${API_URL}/api/users`);

// -------------------------- AD API --------------------------
export const createAd = (ad) => axios.post(`${API_URL}/ads/add`, ad);
export const fetchAds = () => axios.get(`${API_URL}/ads`);
export const fetchAdById = (id) => axios.get(`${API_URL}/ads/${id}`);
export const updateAd = (id, ad) => axios.put(`${API_URL}/ads/update/${id}`, ad);
export const deleteAd = (id) => axios.delete(`${API_URL}/ads/delete/${id}`);
