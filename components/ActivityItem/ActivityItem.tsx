import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type ActivityItemProps = {
  time: string;
  description: string;
  status: string;
  isShowEdit: boolean
};

const ActivityItem = ({ time, description, status, isShowEdit }: ActivityItemProps) => {
  return (
    <View style={styles.activityItem}>
      <View style={styles.container}>
        <Text style={styles.itemText}>
          {time} - {description}
        </Text>

        {isShowEdit &&
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => console.log('Editar pressionado')}>
            <Icon name="edit" size={20} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Deletar pressionado')}>
            <Icon name="trash" size={20} color="black" />
          </TouchableOpacity>
        </View>
        }
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
  icon: {
    paddingRight: 15, 
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
