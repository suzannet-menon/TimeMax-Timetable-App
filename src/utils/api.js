const APIKEY = import.meta.env.VITE_GEMINI_API_KEY
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${APIKEY}`

export const fetchSchedule = async (tasks, focusminutes, commitments, startTime, dateRange) => {

  if (!APIKEY) throw new Error("API key missing - check .env file")

  const now = new Date()
  const currentDate = now.toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  })

  const tasklist = tasks.map(t => {
    const daysleft = t.deadline
      ? Math.ceil((new Date(t.deadline) - new Date()) / 86400000)
      : "unknown"
    return `- "${t.taskname}" | effort: ${t.effort} | energy needed: ${t.energy} | deadline in ${daysleft} days`
  }).join("\n")

  const isMultiDay = dateRange.from !== dateRange.to

  const prompt = `
You are a productivity planner. Build a realistic schedule from ${dateRange.from} to ${dateRange.to}.

Today's date: ${currentDate}
Schedule starts from: ${startTime} on ${dateRange.from}
User's focus window: ${focusminutes} minutes per session.

User's commitments and blocked time:
${commitments?.trim() || "Not specified — assume full availability during standard hours 9am to 9pm"}

Tasks to schedule:
${tasklist}

Rules:
- Start from ${startTime} on ${dateRange.from}
- Plan day by day across the entire date range
- Only schedule during free windows, never during blocked times
- Add 5-10 min breaks between focus sessions
- Prioritize tasks with closer deadlines first
- Spread tasks sensibly across days, do not overload one day
- Match high effort tasks to morning slots
- Each focus session is ${focusminutes} minutes
- If the user describes their commitments conversationally, interpret them intelligently

Return ONLY raw JSON, no markdown, no backticks, no explanation.
{
  "riskSummary": "2-3 sentence summary of the plan and deadline risks",
  "warnings": ["any warnings"],
  "days": [
    {
      "date": "Monday, 15 March",
      "schedule": [
        {"time": "9:00 AM", "duration": "${focusminutes} min", "task": "task name or Break", "tip": "short tip"}
      ]
    }
  ]
}
`

  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  })

  const data = await response.json()
  if (!response.ok) throw new Error(data.error?.message || "Request failed")

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error("No AI response returned")

  const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim()
  return JSON.parse(cleaned)
}