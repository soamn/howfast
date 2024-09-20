import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );
  const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    console.log("Selected day:", day);
  };

  // Prepare marked dates
  const markedDates = {
    [currentDate]: {
      marked: true,
      dotColor: "red", // Color for today's date
    },
    ...(selectedDate && {
      [selectedDate]: {
        selected: true,
        marked: true,
        dotColor: "blue", // Color for selected date
      },
    }),
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: "#333",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          arrowColor: "black",
          monthTextColor: "black",
        }}
        markedDates={markedDates}
      />
      {selectedDate && (
        <View style={styles.selectedDateContainer}>
          <Text style={styles.selectedDateText}>
            Selected Date: {selectedDate}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F3E4",
  },
  calendar: {
    width: "100%",
    borderRadius: 10,
    elevation: 3,
  },
  selectedDateContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 2,
  },
  selectedDateText: {
    fontSize: 16,
    color: "#333",
  },
});

export default CalendarComponent;
