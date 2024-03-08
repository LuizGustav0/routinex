import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ActivityItem from '../ActivityItem/ActivityItem';

type Activity = {
  time: string;
  description: string;
  status: string;
};

type Schedule = {
  date: string;
  day: string;
  activities: Activity[];
};

type DayScheduleProps = {
  schedule: Schedule;
  scrollRef: any;
  isShowEdit: boolean;
};

const DaySchedule = ({ schedule, scrollRef, isShowEdit }: DayScheduleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const currentDayOfWeek = daysOfWeek[currentDate.getDay()];

  
    if (schedule.day === currentDayOfWeek) {
      setIsOpen(true);
      scrollRef.current.scrollTo({ y: 10, animated: true });
    }
  }, []);
  

  return (
    <View style={styles.daySchedule}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start' }}>{schedule.date}</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'flex-start' }}>{schedule.day}</Text>
          </View>
          <Text style={[styles.dayTitle, { alignSelf: 'flex-end' }]}>Finalizado 7/10</Text>
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.activitiesList}>
          {schedule.activities.map((activity, index) => (
            <ActivityItem
              key={index}
              time={activity.time}
              description={activity.description}
              status={activity.status}
              isShowEdit={isShowEdit}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  daySchedule: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  activitiesList: {
    padding: 8,
  },
});

export default DaySchedule;
