import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import DaySchedule from '../../components/DaySchedule/DaySchedule';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useScheduleContext } from '../context/ScheduleContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Schedule = () => {
  const scrollRef = useRef<ScrollView>(null);
  const { scheduleData, setScheduleData } = useScheduleContext();


  const loadData = async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      console.log("loadData", data)
      if (data !== null) {
        setScheduleData(JSON.parse(data));
      } else {
          setScheduleData([
            {day: 'SEG', activities: [],},
            {day: 'TER', activities: [],},
            {day: 'QUA', activities: [],},
            {day: 'QUI', activities: [],},
            {day: 'SEX', activities: [],},
            {day: 'SAB', activities: [],},
            {day: 'DOM', activities: [],},
          ])
       
          
      }
    } catch (e) {
      console.error('Failed to load data:', e);
    }
  };
 

  useEffect(() => {
    loadData('scheduleData');
  }, []);
  

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
  editContainer: {
    alignItems: 'flex-end',
  }
});

export default Schedule;
