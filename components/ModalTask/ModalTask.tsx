import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

type ModalTaskProps = {
  isVisible: boolean;
  onClose: () => void;
};

const ModalTask: React.FC<ModalTaskProps> = ({ isVisible, onClose }) => {
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');

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
  
  

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Hora de Início"
            value={horaInicio}
            onBlur={() => setHoraInicio(formatarHora(horaInicio))}
            onChangeText={(text) => setHoraInicio(text)}
            maxLength={5}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Hora de Término"
            value={horaFim}
            onBlur={() => setHoraFim(formatarHora(horaFim))}
            onChangeText={(text) => setHoraFim(text)}
            maxLength={5}
            keyboardType="numeric"
          />

          </View>

          <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.halfInput]}
                placeholder="Tarefa"
                multiline={true}        
              />
          </View>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalTask;
