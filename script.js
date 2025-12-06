const studentForm = document.getElementById("studentForm")
const studentsTable = document.querySelector("#studentsTable tbody")
const studentsDisplay = document.getElementById("display")
const studentId = document.getElementById("studentId")
const studentName = document.getElementById("studentName")
const studentDepartment = document.getElementById("studentDepartment")
const studentCourseOfStudy = document.getElementById("studentCourseOfStudy")
const studentEmail = document.getElementById("studentEmail")
const studentPhoneNo = document.getElementById("studentPhoneNo")
const studentGender = document.getElementById("studentGender")
const attendance = document.getElementById("studentAttendance")
const studentAddress = document.getElementById("studentAddress")
const errorP = document.getElementById('errorP')

let studentAttendance = JSON.parse(localStorage.getItem("attendance")) || []

function storeData() {
    localStorage.setItem("attendance", JSON.stringify(studentAttendance))
}



studentForm.addEventListener("submit", (e) => {
    e.preventDefault()

    if(!studentId.value || !studentName.value || !studentDepartment.value || !studentCourseOfStudy.value || !studentEmail.value || !studentPhoneNo.value || !studentGender.value || !studentAddress.value || !attendance.value){
        errorP.style.color = 'red';
        errorP.style.textAlign = 'center'
        errorP.style.marginBottom = '40px'
        errorP.textContent = 'Invalid Input Field';
        return;
    }
    
    const student = {
        id: Date.now(),
        studentID: studentId.value,
        studentName: studentName.value,
        studentDepartment: studentDepartment.value,
        studentCourseOfStudy: studentCourseOfStudy.value,
        studentEmail: studentEmail.value,
        studentPhoneNo: studentPhoneNo.value,
        studentGender: studentGender.value,
        studentAttendance: attendance.value,
        studentAddress: studentAddress.value
    }
    console.log(student)

    studentAttendance.push(student)
    errorP.textContent = ''
    studentsDisplay.innerHTML = ''
    storeData()
    displayInfo()
    studentForm.reset()
})



const displayInfo = ()=> {
    const data = JSON.parse(localStorage.getItem('attendance'))
    console.log(data);
    
    
    
    data.sort((a,b) => b-a).forEach(item => {
        let tr = document.createElement('tr');
        
        tr.innerHTML=`
            <td>${item.studentID}</td>
            <td>${item.studentName}</td>
            <td>${item.studentDepartment}</td>
            <td>${item.studentCourseOfStudy}</td>
            <td>${item.studentEmail}</td>
            <td>${item.studentPhoneNo}</td>
            <td>${item.studentGender}</td>
            <td>${item.studentAddress}</td>
            <td>${item.studentAttendance}</td>
        `;

        let deleteBtn = document.createElement('td')
        deleteBtn.style.color = 'red';
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.cursor = 'pointer'
        deleteBtn.onclick = () => deleteInfo(item.id)

        tr.appendChild(deleteBtn)


        studentsDisplay.appendChild(tr)
    });
}


displayInfo()

const deleteInfo = (studentId)=>{
    const find = studentAttendance.filter(student => student.id !== studentId);

    if(find){
        localStorage.setItem("attendance", JSON.stringify(find));
        studentsDisplay.innerHTML = ''
        displayInfo()
    }
}







//JSON.stringify will convert javascript object to JSON object
//JSON.parse will convert JSON Object to Javascript Object