import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

type Activity = {
  time: string;
  description: string;
};

type Schedule = {
  date: string;
  day: string;
  activities: Activity[];
};

const scheduleData = [
  {
    date: '04/03',
    day: 'SEG',
    activities: [
      { time: '5:00', description: 'Acordar e tomar banho' },
      { time: '6:00', description: 'Treinar / Academia' },
      { time: '9:00', description: 'Estudar' },
  
      { time: '15:00', description: 'Limpeza de Casa' },
      { time: '20:00', description: 'Ler Livro' },
      { time: '20:30', description: 'Dormir 8h' },
    ],
  },
  {
    date: '05/03',
    day: 'TER',
    activities: [
      { time: '5:00', description: 'Acordar e tomar banho' },
      { time: '6:00', description: 'Treinar / Academia' },
      { time: '9:00', description: 'Estudar' },  
      { time: '15:00', description: 'Limpeza de Casa' },
      { time: '20:00', description: 'Ler Livro' },
      { time: '20:30', description: 'Dormir 8h' },
    ],
  },
  {
    date: '06/03',
    day: 'QUA',
    activities: [
      { time: '5:00', description: 'Acordar e tomar banho' },
      { time: '6:00', description: 'Treinar / Academia' },
      { time: '9:00', description: 'Estudar' },  
      { time: '15:00', description: 'Limpeza de Casa' },
      { time: '20:00', description: 'Ler Livro' },
      { time: '20:30', description: 'Dormir 8h' },
    ],
  },
  {
    date: '07/03',
    day: 'QUI',
    activities: [
      { time: '5:00', description: 'Acordar e tomar banho' },
      { time: '6:00', description: 'Treinar / Academia' },
      { time: '9:00', description: 'Estudar' },  
      { time: '15:00', description: 'Limpeza de Casa' },
      { time: '20:00', description: 'Ler Livro' },
      { time: '20:30', description: 'Dormir 8h' },
    ],
  },
  {
    date: '08/03',
    day: 'SEX',
    activities: [
      { time: '5:00', description: 'Acordar e tomar banho' },
      { time: '6:00', description: 'Treinar / Academia' },
      { time: '9:00', description: 'Estudar' },  
      { time: '15:00', description: 'Limpeza de Casa' },
      { time: '20:00', description: 'Ler Livro' },
      { time: '20:30', description: 'Dormir 8h' },
    ],
  },
  {
    date: '09/03',
    day: 'SAB',
    activities: [
      { time: '9:00', description: 'Livre' },
    ],
  },
  {
    date: '10/03',
    day: 'DOM',
    activities: [
      { time: '9:00', description: 'Livre' },
    ],
  },
]

const DaySchedule = ({ schedule }: { schedule: Schedule }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.daySchedule}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.dayTitle}>{schedule.date} {schedule.day}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.activitiesList}>
          {schedule.activities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <Text style={styles.itemText}>
                {activity.time} - {activity.description}
              </Text>
              <View style={styles.containerButtons}>
                <TouchableOpacity style={[styles.button, styles.success]} onPress={() => console.log('Botão 1 pressionado')}>
                  <Text style={styles.buttonText}>Realizado 😁</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.fail]} onPress={() => console.log('Botão 1 pressionado')}>
                  <Text style={styles.buttonText}>Não Realizado ☹️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default function Schedule() {
  return (
    <ScrollView style={styles.container}>
      {scheduleData.map((day, index) => (
        <DaySchedule key={index} schedule={day} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
  activityItem: {
    marginBottom: 30,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 7,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  success: {
    backgroundColor: '#3498db',
  },
  fail: {
    backgroundColor: '#FF6666',
  },
});
