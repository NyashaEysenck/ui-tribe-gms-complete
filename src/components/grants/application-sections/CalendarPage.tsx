
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { useGrantsData } from "@/hooks/useGrantsData";
import { toast } from "sonner";
import { format } from "date-fns";

const CalendarPage: React.FC = () => {
  const { grants, opportunities, loading } = useGrantsData();
  const [view, setView] = useState<"month" | "list">("month");

  // Process grants and opportunities into calendar events
  const events = React.useMemo(() => {
    const allEvents = [];
    
    // Add grant deadlines and milestones
    if (grants) {
      for (const grant of grants) {
        // Add grant start date
        if (grant.startDate) {
          allEvents.push({
            date: new Date(grant.startDate),
            title: `Grant Start: ${grant.title}`,
            type: "start",
            id: `start-${grant.id}`,
            grantId: grant.id,
          });
        }
        
        // Add grant end date
        if (grant.endDate) {
          allEvents.push({
            date: new Date(grant.endDate),
            title: `Grant End: ${grant.title}`,
            type: "end",
            id: `end-${grant.id}`,
            grantId: grant.id,
          });
        }
      }
    }
    
    // Add opportunity deadlines
    if (opportunities) {
      for (const opportunity of opportunities) {
        if (opportunity.deadline) {
          allEvents.push({
            date: new Date(opportunity.deadline),
            title: `Deadline: ${opportunity.title}`,
            type: "deadline",
            id: `opp-${opportunity.id}`,
            opportunityId: opportunity.id,
          });
        }
      }
    }
    
    // Sort events by date
    return allEvents.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [grants, opportunities]);

  // Group events by month and day for the list view
  const groupedEvents = React.useMemo(() => {
    const grouped: Record<string, Record<string, typeof events>> = {};
    
    for (const event of events) {
      const monthKey = format(event.date, "MMMM yyyy");
      const dayKey = format(event.date, "d");
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = {};
      }
      
      if (!grouped[monthKey][dayKey]) {
        grouped[monthKey][dayKey] = [];
      }
      
      grouped[monthKey][dayKey].push(event);
    }
    
    return grouped;
  }, [events]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="spinner mb-4"></div>
          <p className="text-muted-foreground">Loading calendar events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Research Calendar</h1>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-md ${
              view === "month" ? "bg-primary text-white" : "bg-muted"
            }`}
            onClick={() => setView("month")}
          >
            Month View
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              view === "list" ? "bg-primary text-white" : "bg-muted"
            }`}
            onClick={() => setView("list")}
          >
            List View
          </button>
        </div>
      </div>

      {events.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Events Found</h3>
            <p className="text-muted-foreground max-w-md">
              There are no deadlines or milestones in your calendar.
              As you apply for grants or receive notifications, they'll appear here.
            </p>
          </CardContent>
        </Card>
      ) : view === "list" ? (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines & Milestones</CardTitle>
            <CardDescription>
              All grant and funding opportunity deadlines in chronological order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {Object.entries(groupedEvents).map(([month, days]) => (
                <div key={month} className="space-y-4">
                  <h3 className="font-medium text-lg border-b pb-2">{month}</h3>
                  <div className="space-y-6">
                    {Object.entries(days)
                      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                      .map(([day, dayEvents]) => (
                        <div key={day} className="grid grid-cols-[50px_1fr] gap-4">
                          <div className="text-3xl font-bold text-muted-foreground">{day}</div>
                          <div className="space-y-3">
                            {dayEvents.map((event) => (
                              <div
                                key={event.id}
                                className="border rounded-md p-3 hover:bg-muted transition-colors"
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <p className="font-medium">{event.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {format(event.date, "h:mm a")}
                                    </p>
                                  </div>
                                  <Badge
                                    variant={
                                      event.type === "deadline"
                                        ? "destructive"
                                        : event.type === "end"
                                        ? "outline"
                                        : "default"
                                    }
                                  >
                                    {event.type === "deadline"
                                      ? "Deadline"
                                      : event.type === "start"
                                      ? "Start Date"
                                      : "End Date"}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* Simple month view simulation - in real app would use a calendar component */}
          {Array.from({ length: 28 }, (_, i) => (
            <Card key={i} className="min-h-[100px] relative">
              <div className="absolute top-2 left-2 text-sm font-medium">{i + 1}</div>
              <div className="pt-8 p-2">
                {events
                  .filter(
                    (event) =>
                      event.date.getDate() === i + 1 &&
                      event.date.getMonth() === new Date().getMonth()
                  )
                  .map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 mb-1 rounded-sm ${
                        event.type === "deadline"
                          ? "bg-red-100 text-red-800"
                          : event.type === "end"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
