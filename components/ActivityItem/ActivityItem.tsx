import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ActivityItemProps = {
  time: string;
  description: string;
  status: string;
};

const ActivityItem = ({ time, description, status }: ActivityItemProps) => {
  return (
    <View style={styles.activityItem}>
      <Text style={styles.itemText}>
        {time} - {description}
      </Text>

      <View style={styles.containerButtons}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.fail,
                status === 'FAILED' &&  { borderWidth: 2, borderColor: 'black' },
                status === 'CONCLUDED' && { opacity: 0.5 },
              ]}
              onPress={() => console.log('Botão 1 pressionado')}>
              <Text style={styles.buttonText}>Falhei ☹️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.success,
                status === 'CONCLUDED' &&  { borderWidth: 2, borderColor: 'black' },
                status === 'FAILED' &&  { opacity: 0.5 },
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

export default ActivityItem;
