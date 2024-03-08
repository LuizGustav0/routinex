import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ActivityItem from '../ActivityItem/ActivityItem';
import { useNavigation } from '@react-navigation/native';
import ModalTask  from '../ModalTask/ModalTask';


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
  const navigation = useNavigation();

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
            <ActivityItem
              key={index}
              time={activity.time}
              description={activity.description}
              status={activity.status}
              isShowEdit={isShowEdit}
            />
          ))}


          {schedule.activities.length <= 0 &&
            <View style={styles.activitiesList}>
               <TouchableOpacity onPress={openModal} style={styles.button}>
            <Text style={styles.buttonText}>Adicionar Tarefa</Text>
          </TouchableOpacity>

          <ModalTask isVisible={showModal} onClose={() => setShowModal(false)} />
      
              </View>
          } 


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
    backgroundColor: '#3498db',
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
