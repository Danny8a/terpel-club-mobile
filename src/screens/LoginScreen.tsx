import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {COLORS} from '../config/colors';
import {styles} from './LoginScreen.styles';
import type {DocumentType} from '../types/auth.types';

const LoginScreen: React.FC = () => {
  const [documentType, setDocumentType] = useState<DocumentType>('CC');
  const [documentNumber, setDocumentNumber] = useState<string>('');

  const documentTypes: DocumentType[] = ['CC', 'CE', 'PA'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

      <View style={styles.content}>
        {/* Logo/Icono */}
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Text style={styles.iconText}>T</Text>
          </View>
        </View>

        {/* Título */}
        <Text style={styles.title}>Terpel Club</Text>
        <Text style={styles.subtitle}>Ingresa tus datos para continuar</Text>

        {/* Tipo de Documento */}
        <Text style={styles.label}>Tipo de Documento</Text>
        <View style={styles.pickerContainer}>
          {documentTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.pickerOption,
                documentType === type && styles.pickerOptionActive,
              ]}
              onPress={() => setDocumentType(type)}>
              <Text
                style={[
                  styles.pickerText,
                  documentType === type && styles.pickerTextActive,
                ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Número de Documento */}
        <Text style={styles.label}>Número de Documento</Text>
        <TextInput
          style={styles.input}
          value={documentNumber}
          onChangeText={setDocumentNumber}
          placeholder="Ingrese su documento"
          placeholderTextColor={COLORS.gray}
          keyboardType="number-pad"
          returnKeyType="done"
        />

        {/* Botón Ingresar */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>Demo técnico - Prueba Terpel 2025</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;