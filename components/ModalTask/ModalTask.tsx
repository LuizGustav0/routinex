import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useScheduleContext } from '../../app/context/ScheduleContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import UUIDGenerator from 'react-native-uuid';

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


  const AddTask = () => {
 
    const dayIndex = scheduleData.findIndex((item) => item.day === day);
    const uuid = UUIDGenerator.v4();

    const newActivity = { id: uuid, time: timeInitial, endTime: timeEnd, description: task, status: 'PENDING' };
    const activities = [...scheduleData[dayIndex].activities, newActivity];
    activities.sort((a, b) => {
      const [aHours, aMinutes] = a.time.split(':').map(Number);
      const [bHours, bMinutes] = b.time.split(':').map(Number);
      return (aHours * 60 + aMinutes) - (bHours * 60 + bMinutes);
    });
  
    setScheduleData((prevScheduleData) => {
      const newScheduleData = [...prevScheduleData];
      newScheduleData[dayIndex] = { ...newScheduleData[dayIndex], activities };
      return newScheduleData;
    });

    clearInput()

  }

  const clearInput = () => {
    setTimeInitial('');
    setTimeEnd('');
    setTask('');  
    onClose();  
  }

  const UpdateTask = () => {
    console.log(JSON.stringify(scheduleData))
    const dayIndex = scheduleData.findIndex((item) => item.day === day);
    if (dayIndex === -1) {
      console.error('Day not found');
      return;
    }
  
    const activities = scheduleData[dayIndex].activities.map((activity: { id: string | undefined; }) =>
      activity.id === id ? { ...activity, time: timeInitial, endTime: timeEnd, description: task } : activity
    );
  
    setScheduleData((prevScheduleData) => {
      const newScheduleData = [...prevScheduleData];
      newScheduleData[dayIndex] = { ...newScheduleData[dayIndex], activities };
      return newScheduleData;
    });

    clearInput()
  }

  const DeleteTask = () => {}
  

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
                style={[styles.input, styles.halfInput]}
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
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
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
