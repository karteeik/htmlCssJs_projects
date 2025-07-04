const CalculateAge = () => {
  const BirthDate = document.getElementById("dob").value;
  const TodayDate = document.getElementById("today").value;
  const result = document.getElementById("result");

  if (!BirthDate) {
    result.innerHTML = "❗ Please Select Date of Birth";
    return;
  }

  if (!TodayDate) {
    result.innerHTML = "❗ Please Select 'Age at the Date of'";
    return;
  }

  const dob = new Date(BirthDate);
  const today = new Date(TodayDate);

  if (today < dob) {
    result.innerHTML = "❗ 'Age at the Date of' must be after Date of Birth";
    return;
  }

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  result.innerHTML = ` Your Age is <strong>${years}</strong> Years, <strong>${months}</strong> Months, and <strong>${days}</strong> Days`;
};

document.getElementById("calculateBtn").addEventListener("click", CalculateAge);
