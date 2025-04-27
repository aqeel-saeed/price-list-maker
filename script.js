function addItem() {
  const itemName = document.getElementById("itemName").value;
  const itemPrice = document.getElementById("itemPrice").value;

  if (!itemName || !itemPrice) {
    alert("الرجاء إدخال اسم المنتج والسعر");
    return;
  }

  const tbody = document.getElementById("itemsList");
  const row = document.createElement("tr");

  row.innerHTML = `
        <td>${itemName}</td>
        <td>${itemPrice} ل.س</td>
    `;

  tbody.appendChild(row);

  // Clear inputs
  document.getElementById("itemName").value = "";
  document.getElementById("itemPrice").value = "";
}

function exportAsImage() {
  const exportArea = document.querySelector(".export-area");
  // Add force-desktop class to body and export-area
  document.body.classList.add("force-desktop");
  exportArea.classList.add("force-desktop");

  html2canvas(exportArea, {
    backgroundColor: null,
    scale: 2, // Higher quality
    logging: false,
    useCORS: true,
  }).then((canvas) => {
    // Remove force-desktop class
    document.body.classList.remove("force-desktop");
    exportArea.classList.remove("force-desktop");

    const link = document.createElement("a");
    link.download = "قائمة-الأسعار.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const dateElement = document.getElementById("todayDate");
  if (dateElement) {
    const today = new Date();
    // Levantine Arabic month names
    const levantineMonths = [
      "كانون الثاني", // January
      "شباط", // February
      "آذار", // March
      "نيسان", // April
      "أيار", // May
      "حزيران", // June
      "تموز", // July
      "آب", // August
      "أيلول", // September
      "تشرين الأول", // October
      "تشرين الثاني", // November
      "كانون الأول", // December
    ];
    // Arabic day names (starting with Sunday)
    const arabicDays = [
      "الأحد", // Sunday
      "الاثنين", // Monday
      "الثلاثاء", // Tuesday
      "الأربعاء", // Wednesday
      "الخميس", // Thursday
      "الجمعة", // Friday
      "السبت", // Saturday
    ];
    const dayName = arabicDays[today.getDay()];
    const day = today.getDate().toLocaleString("ar-EG", { useGrouping: false });
    const month = levantineMonths[today.getMonth()];
    const year = today
      .getFullYear()
      .toLocaleString("ar-EG", { useGrouping: false });
    dateElement.textContent = `نشرة أسعار ${dayName} - ${day} ${month} ${year}`;
  }
});
