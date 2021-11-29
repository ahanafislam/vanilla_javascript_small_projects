const dateInputForm = document.getElementById('date-input-form');
const inputBirthday = document.getElementById('input-birthday');
const calculateBtn = document.getElementById('calculate-btn');
const result = document.getElementById('result');
const loading = document.getElementById('loading');

// Call Main Function
main();

// Create Main Function
function main(){
    // Calculate Age Event Listener
    dateInputForm.addEventListener('submit', function(e){
        // Hide Result view
        result.style.display = 'none';

        // Show Lodder
        loading.style.display = 'block';

        setTimeout(calculateAge,1000);

        e.preventDefault();
    });
}

// calculateAge Function
function calculateAge(){
    const birthday = getBirthDayObj(inputBirthday.value);
    const displayAge = document.getElementById('display-age');
    let todayDate = getToday().date;
    let todayMonth = getToday().month;
    let todayYear = getToday().year;
    let birthDate = birthday.date;
    let birthMonth = birthday.month;
    let birthYear = birthday.year;

    if(birthDate > todayDate){
        todayDate += 30;
        todayMonth -= 1;
    }

    if(birthMonth > todayMonth){
        todayMonth += 12;
        todayYear -= 1;
    }

    const age = {
        year : todayYear - birthYear,
        month : todayMonth - birthMonth,
        day : todayDate - birthDate,
    }

    if(isFinite(age.day)){
        displayAge.textContent = `${age.year} Year ${age.month} Month ${age.day} Day`;
        result.style.display = "block";
        loading.style.display = 'none';
    }
    else{
        showError("Please enter your Date of Birth");
    }

    console.log(`Today Date: ${todayDate}`);
    console.log(`Today Month: ${todayMonth}`);
    console.log(`Today Year: ${todayYear}`);
    console.log(`Your age is ${age.year} Year ${age.month} Month ${age.day} Day`);
}

// Get todays function
function getToday(){
    const today = new Date();
    const date = {
        year: today.getFullYear(),
        month: (today.getMonth()+1),
        date: today.getDate(),
    };

    return date;
}

// Get Birthday Function
function getBirthDayObj(birthdayStr){
    const birthdayArr = birthdayStr.split('-');
    const birthdayObj = {
        year: parseInt(birthdayArr[0]),
        month: parseInt(birthdayArr[1]),
        date: parseInt(birthdayArr[2]),
    }

    return birthdayObj;
}

// Show error function
function showError(text){
    result.style.display = "none";
    loading.style.display = 'none';
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    errorDiv.classList = 'alert alert-danger';
    errorDiv.textContent = text;

    card.insertBefore(errorDiv,dateInputForm);

    setTimeout(cleanError,3000);
}

// Clean error div function
function cleanError(){
    const alert = document.querySelector('.alert');
    alert.remove();
}
