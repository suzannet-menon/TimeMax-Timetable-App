const APIKEY = import.meta.env.VITE_GEMINI_API_KEY
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${APIKEY}`

function parseDateInput(value) {
  if (!value) return null
  const [year, month, day] = value.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return Number.isNaN(date.getTime()) ? null : date
}

function extractJson(text) {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim()

  try {
    return JSON.parse(cleaned)
  } catch {
    const firstBrace = cleaned.indexOf("{")
    const lastBrace = cleaned.lastIndexOf("}")

    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      throw new Error("Gemini returned a response, but it was not valid schedule JSON.")
    }

    return JSON.parse(cleaned.slice(firstBrace, lastBrace + 1))
  }
}

export const fetchSchedule = async (tasks, focusminutes, commitments, startTime, dateRange, startSource = "current") => {
  if (!APIKEY) throw new Error("API key missing - check .env file")

  const now = new Date()
  const currentDate = now.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const tasklist = tasks
    .map((task) => {
      const deadlineDate = parseDateInput(task.deadline)
      const daysleft = deadlineDate
        ? Math.ceil((deadlineDate - new Date()) / 86400000)
        : "unknown"
      const estimatedSessions = {
        low: 1,
        medium: 2,
        high: 3,
      }[task.effort] ?? 2

      return `- "${task.taskname}" | effort: ${task.effort} | estimated sessions: ${estimatedSessions} | energy needed: ${task.energy} | deadline in ${daysleft} days`
    })
    .join("\n")

  const prompt = `
You are a productivity planner. Build a realistic schedule from ${dateRange.from} to ${dateRange.to}.

Today's date: ${currentDate}
Schedule starts from: ${startTime} on ${dateRange.from}
Start-time source: ${startSource === "explicit" ? "The user explicitly mentioned when to begin." : "No explicit begin time was found, so this is the user's real current time rounded to the next planning slot."}
User's focus window: ${focusminutes} minutes per session.

User's planning context:
${commitments?.trim() || "Not specified - assume full availability during standard hours 9am to 9pm"}

Tasks to schedule:
${tasklist}

Rules:
- Start from ${startTime} on ${dateRange.from}
- If the user explicitly wrote a begin/start time, use that time instead of real current time
- If no explicit begin/start time is provided, do not default to 9am; start from the real current time above
- Plan day by day across the entire date range
- Produce a full-day timeline, not a short task list
- Include fixed commitments, meals, commute, classes, appointments, family time, and breaks as visible schedule blocks when the user mentions them
- Use task blocks only inside free/available windows; never place task work inside blocked commitments or meal times
- If availability windows are given, schedule inside those windows and show the surrounding fixed blocks so the day feels complete
- If commitments mention "lunch", "dinner", "meal", "breakfast", "college", "class", "commute", "gym", or similar, include those as blocks with practical durations
- Only schedule during free windows, never during blocked times
- Add 5-15 min breaks between focus sessions when there is enough time
- Prioritize tasks with closer deadlines first
- Spread tasks sensibly across days, do not overload one day
- Match high effort tasks to morning slots
- Each focus session is ${focusminutes} minutes
- Do not schedule each task only once unless it is low effort
- Low effort tasks need about 1 focus session, medium effort tasks need about 2-3 focus sessions, and high effort tasks need about 3-5 focus sessions across the date range
- If there are few tasks, continue with useful repeat sessions, review blocks, practice blocks, revision blocks, or progress checkpoints so the plan covers the available day realistically
- For a normal free day, aim for 7-12 total visible blocks including commitments, meals, task sessions, and breaks; use fewer only when the user has very little available time
- On the first day, continue from the requested start time until the user's stated end time, or until about 9pm if no end time is stated
- Do not return only 1-2 sessions unless the user has only 1-2 genuinely available slots
- If the user describes their commitments conversationally, interpret them intelligently

Return ONLY raw JSON, no markdown, no backticks, no explanation.
{
  "riskSummary": "2-3 sentence summary of the plan and deadline risks",
  "warnings": ["any warnings"],
  "days": [
    {
      "date": "Monday, 15 March",
      "schedule": [
        {"time": "9:00 AM", "duration": "${focusminutes} min", "task": "task name - session 1", "tip": "short tip"},
        {"time": "10:00 AM", "duration": "10 min", "task": "Break", "tip": "short tip"},
        {"time": "1:00 PM", "duration": "45 min", "task": "Lunch", "tip": "short tip"}
      ]
    }
  ]
}
`

  const response = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        maxOutputTokens: 8192,
        temperature: 0.35,
      },
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error?.message || "Request failed")

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error("No AI response returned")

  return extractJson(text)
}
