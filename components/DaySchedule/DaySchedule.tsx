import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ActivityItem from '../ActivityItem/ActivityItem';
import ModalTask  from '../ModalTask/ModalTask';


type Activity = {
  id: string;
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
};

const DaySchedule = ({ schedule, scrollRef }: DayScheduleProps) => {

  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const currentDayOfWeek = daysOfWeek[currentDate.getDay()];

  
    if (schedule.day === currentDayOfWeek) {
      setIsOpen(true);
      scrollRef.current.scrollTo({ y: 10, animated: true });
    }
  }, []);

  const openModal = () => {
    setShowModal(true);
  }
  

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
          {schedule.activities.length > 0 && schedule.activities.map((activity, index) => (
            <>
        
            <ActivityItem
              key={index}
              id={activity.id}
              time={activity.time}
              day={schedule.day}
              description={activity.description}
              status={activity.status}
            />

        </>
          ))}


 
            <View style={styles.activitiesList}>
              <TouchableOpacity onPress={openModal}   style={[
                styles.button,
                { backgroundColor: schedule.activities.length > 0 ? '#D3D3D3' : '#3498db' },
                ]}>
                <Text style={styles.buttonText}>Adicionar Tarefa</Text>
              </TouchableOpacity>   
            </View>           

            <ModalTask isVisible={showModal} isEdit={false} day={schedule.day} onClose={() => setShowModal(false)} />
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DaySchedule;
