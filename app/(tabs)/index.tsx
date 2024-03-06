import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DaySchedule from '../../components/DaySchedule/DaySchedule';

const Schedule = () => {
  const scrollRef = useRef<ScrollView>(null);

  const scheduleData = [
    {
      date: '04/03',
      day: 'SEG',
      activities: [
        { time: '5:00', description: 'Acordar e tomar banho', status: 'PENDING' },
        { time: '6:00', description: 'Treinar / Academia', status: 'PENDING' },
        { time: '9:00', description: 'Estudar', status: 'PENDING' },  
        { time: '15:00', description: 'Limpeza de Casa', status: 'PENDING' },
        { time: '20:00', description: 'Ler Livro', status: 'PENDING' },
        { time: '20:30', description: 'Dormir 8h', status: 'PENDING' },
      ],
    },
    {
      date: '05/03',
      day: 'TER',
      activities: [
        { time: '5:00', description: 'Acordar e tomar banho', status: 'PENDING' },
        { time: '6:00', description: 'Treinar / Academia', status: 'PENDING' },
        { time: '9:00', description: 'Estudar', status: 'PENDING' },  
        { time: '15:00', description: 'Limpeza de Casa', status: 'PENDING' },
        { time: '20:00', description: 'Ler Livro', status: 'PENDING' },
        { time: '20:30', description: 'Dormir 8h', status: 'PENDING' },
      ],
    },
    {
      date: '06/03',
      day: 'QUA',
      activities: [
        { time: '5:00', description: 'Acordar e tomar banho', status: 'PENDING' },
        { time: '6:00', description: 'Treinar / Academia', status: 'CONCLUDED' },
        { time: '9:00', description: 'Estudar', status: 'FAILED' },  
        { time: '15:00', description: 'Limpeza de Casa', status: 'PENDING' },
        { time: '20:00', description: 'Ler Livro', status: 'PENDING' },
        { time: '20:30', description: 'Dormir 8h', status: 'PENDING' },
      ],
    },
    {
      date: '07/03',
      day: 'QUI',
      activities: [
        { time: '5:00', description: 'Acordar e tomar banho', status: 'PENDING' },
        { time: '6:00', description: 'Treinar / Academia', status: 'PENDING' },
        { time: '9:00', description: 'Estudar', status: 'PENDING' },  
        { time: '15:00', description: 'Limpeza de Casa', status: 'PENDING' },
        { time: '20:00', description: 'Ler Livro', status: 'PENDING' },
        { time: '20:30', description: 'Dormir 8h', status: 'PENDING' },
      ],
    },
    {
      date: '08/03',
      day: 'SEX',
      activities: [
        { time: '5:00', description: 'Acordar e tomar banho', status: 'PENDING' },
        { time: '6:00', description: 'Treinar / Academia', status: 'PENDING' },
        { time: '9:00', description: 'Estudar', status: 'PENDING' },  
        { time: '15:00', description: 'Limpeza de Casa', status: 'PENDING' },
        { time: '20:00', description: 'Ler Livro', status: 'PENDING' },
        { time: '20:30', description: 'Dormir 8h', status: 'PENDING' },
      ],
    },
  ]

  return (
    <ScrollView style={styles.container} ref={scrollRef}>
      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={80}
          width={10}
          fill={70}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
        />
        <Text style={styles.progressText}>70%</Text>
      </View>

      {scheduleData.map((day, index) => (
        <DaySchedule key={index} schedule={day} scrollRef={scrollRef} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 25,
  },
});

export default Schedule;
