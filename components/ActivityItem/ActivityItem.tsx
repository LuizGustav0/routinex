import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalTask  from '../ModalTask/ModalTask';

type ActivityItemProps = {
  id: string;
  time: string;
  description: string;
  status: string;
  day?:string;
};

const ActivityItem = ({ id,time, description, status, day }: ActivityItemProps) => {
  const [showModal, setShowModal] = useState(false);


  return (
    <View style={styles.activityItem}>
      <View style={styles.container}>
        <Text style={styles.itemText}>
          {time} - {description}
        </Text>

     
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Icon name="edit" size={20} color="grey" />
          </TouchableOpacity>
        </View>        
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.fail,
            status === 'FAILED' && { borderWidth: 2, borderColor: 'black' },
            status === 'CONCLUDED' && { opacity: 0.5 },
          ]}
          onPress={() => console.log('Botão 1 pressionado')}>
          <Text style={styles.buttonText}>Falhei ☹️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            styles.success,
            status === 'CONCLUDED' && { borderWidth: 2, borderColor: 'black' },
            status === 'FAILED' && { opacity: 0.5 },
          ]}
          onPress={() => console.log('Botão 1 pressionado')}>
          <Text style={styles.buttonText}>Conclui 😁</Text>
        </TouchableOpacity>
      </View>

      <ModalTask isVisible={showModal} day={day || ''} isEdit={true} onClose={() => { setShowModal(false) }} initialTime={time} endTime={'12:00'} textTask={description} id={id}  />
    </View>
  );
};

const styles = StyleSheet.create({
  activityItem: {
    marginBottom: 30,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
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

export default ActivityItem;
