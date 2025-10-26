const API_BASE_URL = "https://learning-obec.com/api/practice"; // ✅ แก้เป็น URL จริง

document
    .getElementById("practice-form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = document.getElementById("practice-id").value.trim();
        const resultBox = document.getElementById("result");
        resultBox.innerHTML = "⌛ กำลังโหลดข้อมูล...";

        if (!id) return;

        try {
            const res = await fetch(`${API_BASE_URL}/${id}`);

            if (!res.ok) {
                throw new Error(`API Error: ${res.status}`);
            }

            const data = await res.json();
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("ไม่พบข้อมูล Practice นี้");
            }

            const practice = data[0];
            const htmlResult = [];

            practice.questions.forEach((idx, q) => {
                const correct = q.answers.find((a) => a.option === "true");

                htmlResult.push(`
        <div class="question-card">
          <div><strong>Q${idx+1}:</strong> ${q.question}</div>
          ${
              correct
                  ? `<div class="correct-answer">✅ คำตอบที่ถูก: ${correct.answer}</div>`
                  : `<div>⚠ ไม่มีข้อมูลคำตอบที่ถูกต้อง</div>`
          }
        </div>
      `);
            });

            resultBox.innerHTML = htmlResult.join("");
        } catch (err) {
            resultBox.innerHTML = `<span style="color:red">❌ ${err.message}</span>`;
        }
    });
