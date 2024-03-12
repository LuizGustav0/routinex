import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useScheduleContext } from '../../app/context/ScheduleContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import UUIDGenerator from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';


type ModalTaskProps = {
  isVisible: boolean;
  day: string;
  onClose: () => void;
  isEdit?: boolean;
  initialTime?: string;
  endTime?: string;
  textTask?: string;
  id?: string;
};

const ModalTask: React.FC<ModalTaskProps> = ({ isVisible, day, onClose, isEdit, initialTime, endTime, textTask,id }) => {
  const { scheduleData, setScheduleData } = useScheduleContext();

  const [timeInitial, setTimeInitial] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [task, setTask] = useState('');

  useEffect(() => {
    if (isEdit) {
      if (initialTime) {
        setTimeInitial(initialTime);
      }
      if (endTime) {
        setTimeEnd(endTime);
      }
      if (textTask) {
        setTask(textTask);
      }
    }
  }, [initialTime, endTime, textTask, isEdit]);
  
  

  const formatarHora = (hora: string) => {
    let horaFormatada = hora.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1:$2');
    const [horasStr, minutosStr] = horaFormatada.split(':');
    let horas = parseInt(horasStr, 10);
    let minutos = parseInt(minutosStr, 10);
  
    if (isNaN(horas)) horas = 0;
    if (isNaN(minutos)) minutos = 0;
  
    if (horas > 23) horas = 23;
    if (minutos > 59) minutos = 59;
  
    horaFormatada = `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
    return horaFormatada;
  }


  const AddTask = async () => {

    const dayIndex = scheduleData.findIndex((item) => item.day === day);
    const uuid = UUIDGenerator.v4();

    const notificationId = await scheduleWeeklyNotification(day, timeInitial, task);
    
    
    const newActivity = { id: uuid, time: timeInitial, endTime: timeEnd, description: task, status: 'PENDING', notificationId: notificationId };
    
    const activities = [...scheduleData[dayIndex].activities, newActivity];
    activities.sort((a, b) => {
      const [aHours, aMinutes] = a.time.split(':').map(Number);
      const [bHours, bMinutes] = b.time.split(':').map(Number);
      return (aHours * 60 + aMinutes) - (bHours * 60 + bMinutes);
    });
  
    setScheduleData((prevScheduleData) => {
      const newScheduleData = [...prevScheduleData];
      newScheduleData[dayIndex] = { ...newScheduleData[dayIndex], activities };
  
      
      AsyncStorage.setItem('scheduleData', JSON.stringify(newScheduleData)).then(() => {
        console.log('Data saved to AsyncStorage');
      }).catch((error) => {
        console.error('Error saving data to AsyncStorage:', error);
      });
  
      return newScheduleData;
    });

  
    clearInput(); 
  }

  async function scheduleWeeklyNotification(day: string, time: string, description: string) {
    
  const result =  await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Lembrete da sua rotina',
        body: description,
      },
      trigger: {
        weekday: getWeekdayNumber(day),
        hour: parseInt(time.split(':')[0]),
        minute: parseInt(time.split(':')[1]),
        repeats: true,
    }
    });

    return result 
}

function getWeekdayNumber(day: any) {
    switch (day) {
        case 'DOM':
            return 1;
        case 'SEG':
            return 2;
        case 'TER':
            return 3;
        case 'QUA':
            return 4;
        case 'QUI':
            return 5;
        case 'SEX':
            return 6;
        case 'SAB':
            return 7;
        default:
            return 0;
    }
}

  const clearInput = () => {
    setTimeInitial('');
    setTimeEnd('');
    setTask('');  
    onClose();  
  }

  const UpdateTask = async () => {
    const dayIndex = scheduleData.findIndex((item) => item.day === day);
    if (dayIndex === -1) {
      console.error('Day not found');
      return;
    }

    const activityToUpdate = scheduleData[dayIndex].activities.find((activity: { id: string | undefined; }) => activity.id === id);
    if (!activityToUpdate) {
      console.error('Activity not found');
      return;
    }

    await deleteNotification(activityToUpdate.notificationId);

    const updatedActivities = scheduleData[dayIndex].activities.map((activity: { id: string | undefined; }) =>
      activity.id === id ? { ...activity, time: timeInitial, endTime: timeEnd, description: task } : activity
    );

    const updatedActivity = updatedActivities.find((activity: { id: string | undefined; }) => activity.id === id);
    if (!updatedActivity) {
      console.error('Updated activity not found');
      return;
    }

    const newNotificationId = await scheduleWeeklyNotification(day, updatedActivity.time, updatedActivity.description);

    updatedActivity.notificationId = newNotificationId;


    setScheduleData((prevScheduleData) => {
      const newScheduleData = [...prevScheduleData];
      newScheduleData[dayIndex] = { ...newScheduleData[dayIndex], activities: updatedActivities };

      AsyncStorage.setItem('scheduleData', JSON.stringify(newScheduleData)).then(() => {
        console.log('Data saved to AsyncStorage');
      }).catch((error) => {
        console.error('Error saving data to AsyncStorage:', error);
      });

      return newScheduleData;
    });

    clearInput();
}


  const DeleteTask = async () => {
    const dayIndex = scheduleData.findIndex((item) => item.day === day);
    if (dayIndex === -1) {
      console.error('Day not found');
      return;
    }
  
    const activityToDelete = scheduleData[dayIndex].activities.find((activity: { id: string | undefined; }) => activity.id === id);
    if (!activityToDelete) {
      console.error('Activity not found');
      return;
    }

    await deleteNotification(activityToDelete.notificationId);

    const activities = scheduleData[dayIndex].activities.filter((activity: { id: string | undefined; }) => activity.id !== id);
  
    setScheduleData((prevScheduleData) => {
      const newScheduleData = [...prevScheduleData];
      newScheduleData[dayIndex] = { ...newScheduleData[dayIndex], activities };

      AsyncStorage.setItem('scheduleData', JSON.stringify(newScheduleData)).then(() => {
        console.log('Data saved to AsyncStorage');
      }).catch((error) => {
        console.error('Error saving data to AsyncStorage:', error);
      });
      return newScheduleData;
    });

    clearInput();
}


async function deleteNotification(notificationId: string) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
}
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >

<View style={styles.centeredView}>
    <View style={styles.modalView}>
        {isEdit && (
            <TouchableOpacity onPress={DeleteTask} style={styles.iconContainer}>
                <Icon name="trash" size={20} color="grey" />
            </TouchableOpacity>
        )}
        <View style={styles.row}>
            <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Hora de Início"
                value={timeInitial}
                onBlur={() => setTimeInitial(formatarHora(timeInitial))}
                onChangeText={(text) => setTimeInitial(text)}
                maxLength={5}
                keyboardType="numeric"
            />
            <TextInput
                style={[styles.input]}
                placeholder="Hora de Término"
                value={timeEnd}
                onBlur={() => setTimeEnd(formatarHora(timeEnd))}
                onChangeText={(text) => setTimeEnd(text)}
                maxLength={5}
                keyboardType="numeric"
            />
        </View>

        <View style={styles.row}>
            <TextInput
                style={[styles.input, styles.fullInput]}
                placeholder="Tarefa"
                multiline={true}
                value={task}
                onChangeText={(text) => setTask(text)}
            />
        </View>

        <View style={styles.row}>
            <TouchableOpacity onPress={clearInput} style={styles.buttonCancel}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={isEdit ? UpdateTask : AddTask} style={styles.button}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    </View>
</View>



    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    flex: 1,
  },
  halfInput: {
    marginRight: 10
  },
  fullInput: {
    width: '100%',  
    marginBottom: 20,
  },
  largeInput: {
    height: 120,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#3498db',
  },
  buttonCancel: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#FF6666',
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalTask;
