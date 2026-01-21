import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {COLORS} from '../../config/colors';
import {styles} from './LoginScreen.styles';
import type {DocumentType} from '../../types/auth.types';
import {login} from '../../store/slices/authSlice';

const DOC_MAP: Record<string, string> = {
  '1030627891': 'HfEmh0dDdtpw9yKetdnZ7Q%3D%3D',
};

const LoginScreen: React.FC = () => {
  const dispatch = useDispatch();

  const [documentType, setDocumentType] = useState<DocumentType>('CC');
  const [documentNumber, setDocumentNumber] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const documentTypes: DocumentType[] = ['CC', 'CE', 'PA'];

  const docTrimmed = useMemo(() => documentNumber.trim(), [documentNumber]);
  const canSubmit = docTrimmed.length >= 5;

  const onLogin = () => {
    const doc = docTrimmed;
    if (!doc) return;

    const encoded = DOC_MAP[doc];

    if (!encoded) {
      setFormError('Documento no habilitado en QA. Usa 1030627891.');
      return;
    }

    setFormError('');

    dispatch(
      login({
        documentType,
        documentNumber: doc,
        documentEncoded: encoded
      }),
    );
  };

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
          onChangeText={(v) => {
            setDocumentNumber(v);
            if (formError) setFormError('');
          }}
          placeholder="Ingrese su documento"
          placeholderTextColor={COLORS.gray}
          keyboardType="number-pad"
          returnKeyType="done"
          onSubmitEditing={onLogin}
        />

        {!!formError && (
          <Text style={{color: '#FFD6D6', marginTop: -14, marginBottom: 16}}>
            {formError}
          </Text>
        )}

        {/* Botón Ingresar */}
        <TouchableOpacity
          style={[styles.button, !canSubmit && {opacity: 0.6}]}
          onPress={onLogin}
          disabled={!canSubmit}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        {/* Footer */}
        <Text style={styles.footer}>Demo técnico - Prueba Terpel 2025</Text>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
