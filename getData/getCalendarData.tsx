export interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    location: string;
    start: Date;
    end: Date;
    isAllDay: boolean;
    link: string;
}

export const getUpcomingEvents = async (maxResults = 60) => {
    const now = new Date().toISOString();
    const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

    const params = new URLSearchParams({
        key: GOOGLE_API_KEY,
        timeMin: now,
        singleEvents: "true",
        orderBy: "startTime",
    });

    if (maxResults) {
        params.append("maxResults", maxResults.toString());
    }

    try {
        const res = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(GOOGLE_CALENDAR_ID)}/events?${params.toString()}`
        );

        const data = await res.json();
        console.log(data.items);

        if (!data.items) return [];


        return data.items.map((item: any) => {
            // 1. Create the Date object safely (handles both specific time and all-day events)
            const startDate = new Date(item.start.dateTime || item.start.date);
            const endDate = new Date(item.end.dateTime || item.end.date);

            // 2. Format Month: "DEC", "JUL"
            const month = startDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();

            // 3. Format Day: "01", "05", "10"
            // '2-digit' automatically adds the leading zero if needed
            const day = startDate.toLocaleString('en-US', { day: '2-digit' });

            // 4. Format Time: "20:00 - 23:00"
            const isAllDay = !item.start.dateTime;
            let timeStr = "All Day";

            if (!isAllDay) {
                const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
                timeStr = `${startDate.toLocaleTimeString('en-GB', timeOptions)} - ${endDate.toLocaleTimeString('en-GB', timeOptions)}`;
            }

            // 5. Robust "Is Today" check
            const now = new Date();
            const isToday = startDate.toDateString() === now.toDateString();

            return {
                id: item.id,
                title: item.summary,
                description: item.description || "",
                location: item.location || "TBD", 
                date: { month, day }, // Returns { month: "DEC", day: "21" }
                startDate: startDate,
                time: timeStr,
                isToday: isToday,
                isAllDay: isAllDay,
                link: item.htmlLink,
            };
        });

    } catch (error) {
        console.error("Failed to fetch calendar events", error);
        return [];
    }
};