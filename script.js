const WEB_APP_URL = "YOUR_WEB_APP_URL_HERE"; // 여기 Apps Script 배포 주소 넣기

function submitData() {
  const className = document.getElementById("class-select").value;
  const studentName = document.getElementById("student-name").value.trim();
  const habits = document.querySelectorAll(".habit");
  const checkedCount = Array.from(habits).filter(h => h.checked).length;

  if (!studentName) {
    alert("이름을 입력해주세요.");
    return;
  }

  const message = document.getElementById("message");
  if (checkedCount >= 5) {
    message.textContent = "🎉 매우 잘했어요!";
  } else if (checkedCount >= 3) {
    message.textContent = "😊 건강한 몸을 위해 조금만 더 힘내요!";
  } else {
    message.textContent = "💪 건강한 몸을 위해 더 노력해요! 할 수 있어요!";
  }

  const data = {
    class: className,
    name: studentName,
    date: new Date().toLocaleDateString("ko-KR"),
    count: checkedCount
  };

  fetch(WEB_APP_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.text())
    .then(res => console.log("전송 완료:", res))
    .catch(err => console.error("전송 실패:", err));
}
function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([data.class, data.name, data.date, data.count]);
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  }
  function doPost(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    sheet.appendRow([data.class, data.name, data.date, data.count]);
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  }
    